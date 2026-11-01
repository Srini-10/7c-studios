"use client";

import { useEffect, useRef, useState } from "react";
import FilmCard from "@/Components/Films/FilmCard";
import type { Film } from "@/lib/film";
import homepage from "@/data/homepage.json";
import styles from "./SpatialFeaturedFilms.module.css";

interface SpatialFeaturedFilmsProps {
  films: Film[];
  onPlay: (film: Film) => void;
}

export default function SpatialFeaturedFilms({
  films,
  onPlay,
}: SpatialFeaturedFilmsProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;
    let rafId: number | null = null;

    const renderFrame = () => {
      // Smooth lerp physics for organic, 120fps fluid deceleration
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0004) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
      }

      const progress = currentProgress;

      // Complete assembly across the first 65% of scroll, then hold steadily
      const t = Math.min(1, Math.max(0, progress / 0.65));
      // Organic cubic ease-out
      const e = 1 - Math.pow(1 - t, 3);

      setHasScrolledPast(progress > 0.03);

      // 1. Center Content: starts significantly scaled up at the initial stage (1.60), smoothly scales down to 1.0 as cards reveal
      if (centerContentRef.current) {
        const contentScale = 1.60 * (1 - e) + 1.0 * e;
        centerContentRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${contentScale.toFixed(4)})`;
      }

      // Elegant, spatial float trajectories (natural travel distance from spatial depth)
      const travelX = 14; // vw
      const travelY = 10; // vh
      const startScale = 0.88;

      const curScale = startScale * (1 - e) + 1.0 * e;
      const op = Math.min(1, Math.max(0, t * 2.2));

      // 2. Main Card (Bottom-Left - Film 0): glides from lower-left depth
      if (mainCardRef.current) {
        const offX = -travelX * (1 - e);
        const offY = travelY * (1 - e);
        const rot = -6 * (1 - e) + -1.5 * e;
        mainCardRef.current.style.transform = `translate3d(${offX.toFixed(2)}vw, ${offY.toFixed(2)}vh, 0) scale(${curScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        mainCardRef.current.style.opacity = op.toFixed(3);
        mainCardRef.current.style.pointerEvents = e > 0.35 ? "auto" : "none";
      }

      // 3. Card 1 (Top-Left - Film 1): glides from upper-left depth
      if (card1Ref.current) {
        const offX = -travelX * (1 - e);
        const offY = -travelY * (1 - e);
        const rot = -6 * (1 - e) + -2 * e;
        card1Ref.current.style.transform = `translate3d(${offX.toFixed(2)}vw, ${offY.toFixed(2)}vh, 0) scale(${curScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        card1Ref.current.style.opacity = op.toFixed(3);
        card1Ref.current.style.pointerEvents = e > 0.35 ? "auto" : "none";
      }

      // 4. Card 2 (Top-Right - Film 2): glides from upper-right depth
      if (card2Ref.current) {
        const offX = travelX * (1 - e);
        const offY = -travelY * (1 - e);
        const rot = 6 * (1 - e) + 2 * e;
        card2Ref.current.style.transform = `translate3d(${offX.toFixed(2)}vw, ${offY.toFixed(2)}vh, 0) scale(${curScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        card2Ref.current.style.opacity = op.toFixed(3);
        card2Ref.current.style.pointerEvents = e > 0.35 ? "auto" : "none";
      }

      // 5. Card 3 (Bottom-Right - Film 3): glides from lower-right depth
      if (card3Ref.current) {
        const offX = travelX * (1 - e);
        const offY = travelY * (1 - e);
        const rot = 6 * (1 - e) + 1.5 * e;
        card3Ref.current.style.transform = `translate3d(${offX.toFixed(2)}vw, ${offY.toFixed(2)}vh, 0) scale(${curScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        card3Ref.current.style.opacity = op.toFixed(3);
        card3Ref.current.style.pointerEvents = e > 0.35 ? "auto" : "none";
      }

      // 6. Scroll Hint: fades out quickly as user scrolls
      if (scrollHintRef.current) {
        const hintOp = Math.max(0, 1 - e * 3);
        scrollHintRef.current.style.opacity = hintOp.toFixed(2);
      }

      // Loop until currentProgress reaches targetProgress
      if (Math.abs(targetProgress - currentProgress) > 0.0004) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        isRunning = false;
      }
    };

    const onScroll = () => {
      const rect = runway.getBoundingClientRect();
      const maxScroll = runway.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.min(1, Math.max(0, scrolled / maxScroll));

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const heroFilm = films[0];
  const floatingFilm1 = films[1] || films[0];
  const floatingFilm2 = films[2] || films[0];
  const floatingFilm3 = films[3] || films[0];

  return (
    <div ref={runwayRef} className={styles.runway}>
      <div className={styles.stickyStage}>
        <div className={styles.ambientGlow} aria-hidden="true" />

        {/* 1. Center Content: displayed prominently, scales down gracefully as cards settle */}
        <div ref={centerContentRef} className={styles.centerContent}>
          <p className={styles.eyebrow}>{homepage.featuredFilm.eyebrow}</p>
          <h2 className={styles.heading}>{homepage.featuredFilm.heading}</h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>{homepage.featuredFilm.description}</p>
        </div>

        {/* 2. Main Hero Card (Bottom-Left Corner) */}
        {heroFilm && (
          <div
            ref={mainCardRef}
            className={`${styles.cardPositioner} ${styles.cardBottomLeft}`}
          >
            <div className={styles.cardBase}>
              <div className={styles.cardInner}>
                <FilmCard film={heroFilm} variant="stacked" onPlay={onPlay} />
              </div>
            </div>
          </div>
        )}

        {/* 3. Card 1 (Top Left) */}
        {floatingFilm1 && (
          <div
            ref={card1Ref}
            className={`${styles.cardPositioner} ${styles.cardTopLeft}`}
          >
            <div className={styles.cardBase}>
              <div className={styles.cardInner}>
                <FilmCard film={floatingFilm1} variant="stacked" onPlay={onPlay} />
              </div>
            </div>
          </div>
        )}

        {/* 4. Card 2 (Top Right) */}
        {floatingFilm2 && (
          <div
            ref={card2Ref}
            className={`${styles.cardPositioner} ${styles.cardTopRight}`}
          >
            <div className={styles.cardBase}>
              <div className={styles.cardInner}>
                <FilmCard film={floatingFilm2} variant="stacked" onPlay={onPlay} />
              </div>
            </div>
          </div>
        )}

        {/* 5. Card 3 (Bottom Right) */}
        {floatingFilm3 && (
          <div
            ref={card3Ref}
            className={`${styles.cardPositioner} ${styles.cardBottomRight}`}
          >
            <div className={styles.cardBase}>
              <div className={styles.cardInner}>
                <FilmCard film={floatingFilm3} variant="stacked" onPlay={onPlay} />
              </div>
            </div>
          </div>
        )}

        {/* 6. Subtle scroll indicator */}
        <div
          ref={scrollHintRef}
          className={styles.scrollHint}
          aria-hidden={hasScrolledPast ? "true" : undefined}
        >
          <span>Scroll</span>
          <span className={styles.scrollHintLine} />
        </div>
      </div>
    </div>
  );
}
