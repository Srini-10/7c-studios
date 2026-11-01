'use client';

import { Children, isValidElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export interface ScrollStackItemProps {
  children?: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: number | string;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
  holdDistance?: number;
}

interface StackCard {
  node: HTMLElement;
  media: HTMLElement | null;
  shade: HTMLElement | null;
}

const toLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

const CARD_SHADOW = [
  '0 0 0 1px light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.08))',
  '0 -12px 40px -16px rgb(0 0 0 / 0.35)',
  '0 24px 48px -24px rgb(0 0 0 / 0.4)'
].join(', ');

const DRIFT = 6;
const MEDIA_ZOOM = 0.1;
const MEDIA_DEPTH = 0.02;
const SMOOTHING = 0.04;
const TRAVEL = 0.85;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Ease scroll position into each card slot: the deck responds at once, then decelerates
// into exact alignment with every card index without hijacking the page scroll.
const align = (progress: number) => {
  const segment = Math.floor(progress);
  const fraction = progress - segment;
  return segment + fraction * (2 - fraction);
};

export const ScrollStackItem = ({ children, itemClassName = '', style }: ScrollStackItemProps) => (
  <div
    className={`relative box-border h-80 w-full origin-top rounded-[28px] p-10 [background:light-dark(#ffffff,#18181b)] [color:light-dark(#18181b,#fafafa)] ${itemClassName}`.trim()}
    style={{ boxShadow: CARD_SHADOW, ...style }}
  >
    {children}
    <span
      aria-hidden="true"
      data-stack-shade=""
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black"
      style={{ opacity: 0 }}
    />
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemStackDistance = 24,
  stackPosition = '15%',
  itemScale = 0.05,
  baseScale = 0.8,
  dimAmount = 0.2,
  holdDistance = 200
}: ScrollStackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return undefined;

    const cards: StackCard[] = (Array.from(inner.children) as HTMLElement[])
      .filter(node => node.hasAttribute('data-stack-card'))
      .map(node => ({
        node,
        media: node.querySelector<HTMLElement>('[data-stack-parallax]'),
        shade: node.querySelector<HTMLElement>('[data-stack-shade]')
      }));
    const count = cards.length;
    if (!count) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cache = new Map<string, string>();
    let points: number[] = [];
    let top = 0;
    let step = 0;
    let pTarget = 0;
    let pSmooth = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = true;

    const write = (key: string, value: string, apply: (next: string) => void) => {
      if (cache.get(key) === value) return;
      cache.set(key, value);
      apply(value);
    };

    const render = () => {
      const still = motion.matches;
      for (let index = 0; index < count; index++) {
        const card = cards[index];
        let depth = 0;
        for (let k = index + 1; k < count; k++) depth += clamp(pSmooth - (k - 1), 0, 1);
        const arrive = index === 0 ? 1 : clamp(pSmooth - (index - 1), 0, 1);
        const scale = Math.max(Math.min(baseScale, 1), 1 - depth * itemScale);
        const shift = still ? 0 : Math.max(0, index - pSmooth) * step * TRAVEL - depth * DRIFT;
        const transform = still || (Math.abs(shift) < 0.01 && scale > 0.9999)
          ? ''
          : `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        write(`card${index}`, transform, value => {
          card.node.style.transform = value;
        });

        if (card.media) {
          const mediaScale = still ? 1 : 1 + (1 - arrive) * MEDIA_ZOOM + depth * MEDIA_DEPTH;
          write(`media${index}`, mediaScale.toFixed(4), value => {
            if (card.media) card.media.style.scale = value;
          });
        }

        if (card.shade) {
          const dim = still ? 0 : 1 - Math.pow(1 - clamp(dimAmount, 0, 1), depth);
          write(`shade${index}`, dim.toFixed(3), value => {
            if (card.shade) card.shade.style.opacity = value;
          });
        }
      }
    };

    const measure = (sync = false) => {
      const cardHeight = cards[0].node.offsetHeight;
      step = Math.max(80, cardHeight + itemDistance - itemStackDistance);
      top = root.getBoundingClientRect().top + window.scrollY;
      // The stage is exactly one viewport, so the pinned offset stays stable no matter
      // how tall the cards render at a given width.
      const height = `calc(100svh + ${Math.max(0, (count - 1) * step + holdDistance)}px)`;
      if (root.style.height !== height) root.style.height = height;
      points = cards.map((_, index) => top + index * step);
      if (sync) {
        pTarget = align(clamp((window.scrollY - top) / step, 0, count - 1));
        pSmooth = pTarget;
        render();
      }
      schedule();
    };

    const schedule = () => {
      if (frame || !visible) return;
      frame = requestAnimationFrame(loop);
    };

    const loop = (now: number) => {
      frame = 0;
      if (!visible) return;
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;
      const factor = motion.matches ? 1 : 1 - Math.exp(-dt / SMOOTHING);
      pSmooth += (pTarget - pSmooth) * factor;
      if (Math.abs(pTarget - pSmooth) < 0.0004) pSmooth = pTarget;
      render();
      if (pSmooth !== pTarget) schedule();
      else lastTime = 0;
    };

    const onScroll = () => {
      if (!visible) return;
      const next = align(clamp((window.scrollY - top) / step, 0, count - 1));
      if (next !== pTarget) {
        pTarget = next;
        schedule();
      }
    };

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const node = event.target.closest('[data-stack-card]');
      const index = node ? cards.findIndex(card => card.node === node) : -1;
      if (index < 0 || points[index] === undefined) return;
      window.scrollTo({ top: points[index], behavior: 'instant' });
    };

    const onResize = () => measure(true);
    const onMotionChange = () => measure(true);

    const resize = new ResizeObserver(() => measure(true));
    resize.observe(root);
    resize.observe(cards[0].node);

    const visibility = new IntersectionObserver(records => {
      const next = records.some(entry => entry.isIntersecting);
      if (!next) {
        visible = false;
        return;
      }
      const wasHidden = !visible;
      visible = true;
      if (wasHidden) measure(true);
    }, { rootMargin: '200px 0px' });
    visibility.observe(root);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motion.addEventListener('change', onMotionChange);
    inner.addEventListener('focusin', onFocus);

    measure(true);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motion.removeEventListener('change', onMotionChange);
      inner.removeEventListener('focusin', onFocus);
    };
  }, [itemDistance, itemStackDistance, stackPosition, itemScale, baseScale, dimAmount, holdDistance]);

  return (
    <div ref={rootRef} data-stack-root="" className={`relative w-full ${className}`.trim()}>
      <div data-stack-stage="" className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={innerRef} data-stack-inner="" className="relative mx-auto h-full px-[clamp(1rem,6%,5rem)]">
          {items.map((child, index) => (
            <div
              key={isValidElement(child) ? (child.key ?? index) : index}
              data-stack-card=""
              className="absolute will-change-transform"
              style={{
                left: 'var(--stack-pad, 24px)',
                right: 'var(--stack-pad, 24px)',
                top: `calc(${toLength(stackPosition)} + ${index * itemStackDistance}px)`,
                transformOrigin: 'top center',
                zIndex: index + 1
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
