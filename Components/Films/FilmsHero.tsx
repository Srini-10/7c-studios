"use client";

import Image from "next/image";
import { useHeroParallax } from "@/lib/useHeroParallax";
import films from "@/data/films.json";
import styles from "./Films.module.css";

export default function FilmsHero() {
  const { heroRef, layerRef } = useHeroParallax();

  return (
    <section aria-labelledby="films-hero-title" className={styles.hero} ref={heroRef}>
      <div ref={layerRef} className={styles.layer}>
        <Image
          src={films.heroImage.src}
          alt={films.heroImage.alt}
          fill
          priority
          quality={90}
          sizes="(max-width: 767px) max(100vw, 158svh, 56.9rem), max(100vw, min(112.5vw, 1738px), 632px)"
          className={`${styles.coverImage} ${styles.heroImage}`}
        />
      </div>
      <div aria-hidden="true" className={styles.heroShade} />
      <div className={styles.heroContent}>
        <h1 id="films-hero-title" className={styles.heroTitle}>
          {films.heroText.title}
        </h1>
        <p className={styles.heroDescription}>
          {films.heroText.description}
        </p>
      </div>
      <p aria-hidden="true" className={styles.scrollHint}>
        Scroll to explore
      </p>
    </section>
  );
}

