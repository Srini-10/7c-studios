"use client";

import Image from "next/image";
import homepage from "../../data/homepage.json";
import { useHeroParallax } from "@/lib/useHeroParallax";
import styles from "../HeroSection.module.css";

export default function HeroSection() {
  const { heroRef, layerRef } = useHeroParallax();

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
