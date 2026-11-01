"use client";

import Image from "next/image";
import { useHeroParallax } from "@/lib/useHeroParallax";
import { clientStories } from "@/lib/client-stories";
import styles from "./StoriesHero.module.css";

export default function StoriesHero() {
  const { listing } = clientStories;
  const { heroRef, layerRef } = useHeroParallax();

  return (
    <section aria-labelledby="stories-hero-title" className={styles.hero} ref={heroRef}>
      <div ref={layerRef} className={styles.layer}>
        <Image
          src={listing.heroImage}
          alt={listing.heroImageAlt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div aria-hidden="true" className={styles.shade} />
      <div className={styles.content}>
        <h1 id="stories-hero-title" className={styles.title}>{listing.heroText.title}</h1>
        <p className={styles.description}>{listing.heroText.description}</p>
      </div>
      <p aria-hidden="true" className={styles.scrollHint}>
        Scroll to explore
      </p>
    </section>
  );
}

