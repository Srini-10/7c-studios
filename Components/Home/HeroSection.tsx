"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import homepage from "../../data/homepage.json";
import styles from "../HeroSection.module.css";

// Subtle parallax fraction (16% of hero height across the scroll)
const PARALLAX_FACTOR = 0.16;
const SMOOTHING = 0.055;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section aria-labelledby="hero-title" className={styles.hero} ref={heroRef}>
      <h1 id="hero-title" className={styles.srTitle}>
        {homepage.heroText.title}
      </h1>
      <div ref={layerRef} className={styles.layer}>
        <Image
          src="/home/hero-mandap.jpg"
          alt="A couple beneath a floral mandap at a beachside wedding altar"
          fill
          priority
          unoptimized
          className={styles.image}
          draggable={false}
        />
      </div>
      {homepage.heroText.quote && (
        <>
          <div className={styles.bottomShade} aria-hidden="true" />
          <div className={styles.quoteContainer}>
            <p className={styles.quote}>
              &ldquo;{homepage.heroText.quote}&rdquo;
            </p>
          </div>
        </>
      )}
    </section>
  );
}
