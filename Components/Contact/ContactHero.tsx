"use client";

import Image from "next/image";
import { useHeroParallax } from "@/lib/useHeroParallax";
import contact from "@/data/contact.json";
import styles from "./Contact.module.css";

export default function ContactHero() {
  const { heroRef, layerRef } = useHeroParallax();

  return (
    <section aria-labelledby="contact-hero-title" className={styles.hero} ref={heroRef}>
      <div ref={layerRef} className={styles.layer}>
        <Image
          src={contact.heroImage.src}
          alt={contact.heroImage.alt}
          fill
          priority
          quality={90}
          sizes="(max-width: 767px) max(100vw, 150svh, 54rem), 100vw"
          className={styles.heroImage}
        />
      </div>
      <div aria-hidden="true" className={styles.heroShade} />
      <div className={styles.heroContent}>
        <h1 id="contact-hero-title" className={styles.heroTitle}>
          <span className={styles.heroTitleLead}>{contact.heroText.title}</span>
          <span className={styles.heroTitleAccent}>{contact.heroText.accent}</span>
        </h1>
        <p className={styles.heroDescription}>{contact.heroText.description}</p>
      </div>
      <p aria-hidden="true" className={styles.scrollHint}>
        Scroll to explore
      </p>
    </section>
  );
}

