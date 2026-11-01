import type { Metadata } from "next";
import FilmGallery from "@/Components/Films/FilmGallery";
import FilmsHero from "@/Components/Films/FilmsHero";
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
      <FilmsHero />
      <section aria-labelledby="films-title" className={styles.gallery}>
        <h2 id="films-title" className={styles.heading}>{films.heading}</h2>
        <FilmGallery films={films.films} />
      </section>
      <PosterStories />
    </div>
  );
}
