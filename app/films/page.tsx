import type { Metadata } from "next";
import Image from "next/image";
import FilmGallery from "@/Components/Films/FilmGallery";
import PosterStories from "@/Components/Films/PosterStories";
import films from "@/data/films.json";
import styles from "@/Components/Films/Films.module.css";

export const metadata: Metadata = {
  title: films.title,
  description: films.description,
};

export default function FilmsPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="films-hero-title" className={styles.hero}>
        <Image
          src={films.heroImage.src}
          alt={films.heroImage.alt}
          fill
          preload
          quality={90}
          // Match the covered image width to the photo's 4096:2593 ratio.
          sizes="(max-width: 767px) max(100vw, 158svh, 56.9rem), max(100vw, min(112.5vw, 1738px), 632px)"
          className={`${styles.coverImage} ${styles.heroImage}`}
        />
        <div aria-hidden="true" className={styles.heroShade} />
        <div className={styles.heroContent}>
          <h1 id="films-hero-title" className={styles.heroTitle}>
            {films.heroText.title}
          </h1>
          <p className={styles.heroDescription}>
            {films.heroText.description}
          </p>
        </div>
      </section>
      <section aria-labelledby="films-title" className={styles.gallery}>
        <h2 id="films-title" className={styles.heading}>{films.heading}</h2>
        <FilmGallery films={films.films} />
      </section>
      <PosterStories />
    </div>
  );
}
