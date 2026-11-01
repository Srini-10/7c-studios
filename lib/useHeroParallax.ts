"use client";

import { useEffect, useRef } from "react";

const PARALLAX_FACTOR = 0.10;
const SMOOTHING = 0.055;

export function useHeroParallax<
  H extends HTMLElement = HTMLElement,
  L extends HTMLElement = HTMLDivElement
>() {
  const heroRef = useRef<H>(null);
  const layerRef = useRef<L>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const layer = layerRef.current;

    if (!hero || !layer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let lastFrame = 0;
    let raf = 0;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const tick = (now: number) => {
      const height = hero.offsetHeight;
      const progress = Math.min(1.2, Math.max(0, window.scrollY / (height || 1)));
      const target = progress * height * PARALLAX_FACTOR;
      const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 1 / 60;
      const k = 1 - Math.exp(-dt / SMOOTHING);

      lastFrame = now;
      current += (target - current) * k;

      if (Math.abs(target - current) < 0.05) {
        current = target;
        layer.style.transform = current === 0 ? "" : `translate3d(0, ${current}px, 0)`;
        raf = 0;
        return;
      }

      layer.style.transform = `translate3d(0, ${current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduce.matches) {
        layer.style.transform = "";
        return;
      }
      if (window.scrollY > hero.offsetHeight * 1.2) {
        stop();
        return;
      }
      if (!raf) {
        lastFrame = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { heroRef, layerRef };
}

