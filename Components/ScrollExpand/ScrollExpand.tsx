'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';

import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'mobileStartWidth'
  | 'mobileSquare'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'overlayAfterExpand'
  | 'useWindowScroll'
  | 'revealOnScroll'
  | 'collapseOnScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  quote?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  mobileStartWidth?: number;
  mobileSquare?: boolean;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  overlayAfterExpand?: boolean;
  useWindowScroll?: boolean;
  revealOnScroll?: boolean;
  /** Runs the reveal backwards: the media starts full-bleed and settles into the framed card. */
  collapseOnScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  quote = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  mobileStartWidth = 88,
  mobileSquare = false,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.05,
  overlayScrim = 0.45,
  overlayAfterExpand = false,
  useWindowScroll = false,
  revealOnScroll = false,
  collapseOnScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const frameTitleRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  // Cached stage box so the per-frame writer never forces a layout read.
  const stageSize = useRef({ width: 0, height: 0 });
  // Desktop leaves the media box fixed; cache it so the writer skips no-op layout invalidation.
  const mediaBox = useRef("");

  const config = useMemo<Required<Pick<ScrollExpandProps, ConfigKey>>>(() => ({
    startWidth,
    startHeight,
    mobileStartWidth,
    mobileSquare,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    overlayAfterExpand,
    useWindowScroll,
    revealOnScroll,
    collapseOnScroll,
    enabled
  }), [startWidth, startHeight, mobileStartWidth, mobileSquare, startRadius, endRadius, mediaZoom, scrollDistance,
    holdDistance, smoothing, overlayScrim, overlayAfterExpand, useWindowScroll, revealOnScroll, collapseOnScroll, enabled]);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = config;

    // Collapse mode plays the same timeline backwards: 1 = full-bleed at rest, 0 = framed card.
    const e = c.collapseOnScroll ? 1 - smoothstep(0, 1, p) : smoothstep(0, 1, p);

    const stageWidth = stageSize.current.width;
    const stageHeight = stageSize.current.height;
    const useMobileSquare = c.mobileSquare && stageWidth > 0 && stageWidth < 768 && stageHeight > 0;
    const squareSize = Math.min(stageWidth * clamp(c.mobileStartWidth, 0, 100) / 100,
      Math.max(stageHeight - 192, stageHeight * 0.4));
    const initialWidth = useMobileSquare ? squareSize / stageWidth * 100 : c.startWidth;
    const initialHeight = useMobileSquare ? squareSize / stageHeight * 100 : c.startHeight;
    const w = initialWidth + (100 - initialWidth) * e;
    const h = initialHeight + (100 - initialHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    // In collapse mode the full-bleed rest state is the expanded one, before any scroll.
    const expanded = c.collapseOnScroll ? p <= 0.001 : p >= 1;
    const expandedValue = expanded ? 'true' : 'false';
    if (frame.dataset.expanded !== expandedValue) frame.dataset.expanded = expandedValue;

    if (p <= 0.001) {
      media.style.transform = "";
    } else {
      if (media.style.animation) media.style.animation = "none";
      media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;
    }
    const box = `${useMobileSquare ? w : 100}%|${useMobileSquare ? h : 100}%|${useMobileSquare ? ix : 0}%|${useMobileSquare ? iy : 0}%`;
    if (box !== mediaBox.current) {
      mediaBox.current = box;
      const [bw, bh, bl, bt] = box.split("|");
      media.style.width = bw;
      media.style.height = bh;
      media.style.left = bl;
      media.style.top = bt;
    }

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = c.collapseOnScroll ? 1 - smoothstep(0.3, 0.85, p) : smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (frameTitleRef.current) {
      const out = c.collapseOnScroll ? 1 - smoothstep(0.3, 0.85, p) : smoothstep(0.4, 0.88, p);
      frameTitleRef.current.style.opacity = `${1 - out}`;
      frameTitleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (quoteRef.current) {
      const out = c.collapseOnScroll ? 1 - smoothstep(0.3, 0.85, p) : smoothstep(0.4, 0.88, p);
      quoteRef.current.style.opacity = `${1 - out}`;
      quoteRef.current.style.transform = `translate3d(0, ${14 * out}px, 0)`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = c.overlayAfterExpand
        ? (c.collapseOnScroll ? 1 - smoothstep(0.02, 0.3, p) : (expanded ? 1 : 0))
        : smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${c.overlayAfterExpand ? 0 : 18 * (1 - inn)}px, 0)`;
      if (c.overlayAfterExpand) {
        overlayRef.current.setAttribute('aria-hidden', String(!expanded));
        overlayRef.current.inert = !expanded;
      }
    }
  }, [config]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;
    let lastFrame = 0;

    const measure = () => {
      const c = config;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      const trackLength = reduceMotion || !c.enabled
        ? 1
        : 1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * trackLength}px`;
      stageSize.current.height = stageH;
      stageSize.current.width = stage.clientWidth || root.clientWidth || stageH;

      const w = stageSize.current.width;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = config;
      // With no motion the hero holds its resting state, which is full-bleed in collapse mode.
      if (!c.enabled || reduceMotion) return c.collapseOnScroll ? 0 : 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      const offset = c.useWindowScroll ? -track.getBoundingClientRect().top : root.scrollTop;
      // A small scroll starts the full reveal; further input is not required.
      if (c.revealOnScroll) return offset > 2 ? 1 : 0;
      return clamp(offset / span, 0, 1);
    };

    const tick = (now: number) => {
      const c = config;
      const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 1 / 60;
      lastFrame = now;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-dt / c.smoothing);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
      if (!running) lastFrame = 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (config.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      running = false;
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    const onMotionChange = () => {
      reduceMotion = motionPreference.matches;
      onResize();
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motionPreference.addEventListener('change', onMotionChange);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionPreference.removeEventListener('change', onMotionChange);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll, config]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <Image ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} fill priority sizes="100vw" draggable={false} quality={90} />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${collapseOnScroll ? 'scroll-expand--collapse' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track" style={useWindowScroll ? {
        height: `${100 * (enabled ? 1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance) : 1)}svh`
      } : undefined}>
        <div ref={stageRef} className="scroll-expand__stage">
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {title ? (
              <div
                ref={frameTitleRef}
                className="scroll-expand__title scroll-expand__title--clipped"
                aria-hidden="true"
              >
                {title}
              </div>
            ) : null}
            {quote ? (
              <p ref={quoteRef} className="scroll-expand__quote">
                &ldquo;{quote}&rdquo;
              </p>
            ) : null}
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay" aria-hidden={overlayAfterExpand ? true : undefined} inert={overlayAfterExpand ? true : undefined}>
                {children}
              </div>
            ) : null}
          </div>
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
