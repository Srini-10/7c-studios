"use client";

import { useEffect, useRef, useState } from "react";
import FilmCard from "@/Components/Films/FilmCard";
import FilmPlayerDialog from "@/Components/Films/FilmPlayerDialog";
import SpatialFeaturedFilms from "./SpatialFeaturedFilms";
import type { Film } from "@/lib/film";
import films from "@/data/films.json";
import homepage from "@/data/homepage.json";
import styles from "./FeaturedFilm.module.css";

const homepageFilms = [...films.films]
  .sort((first, second) => Number(second.id === homepage.featuredFilm.filmId) - Number(first.id === homepage.featuredFilm.filmId))
  .slice(0, 4);

const STACK_QUERY = "(min-width: 992px)";

function useStackLayout() {
  const [stacked, setStacked] = useState(true);
  useEffect(() => {
    const query = window.matchMedia(STACK_QUERY);
    const sync = () => setStacked(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return stacked;
}

export default function FeaturedFilm() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const stacked = useStackLayout();

  if (!homepageFilms.length) return null;

  return (
    <section
      id="featured-film"
      aria-labelledby="featured-film-title"
      className={stacked ? "w-full bg-[#0d0b0a] overflow-x-clip" : styles.section}
    >
      {stacked ? (
        <SpatialFeaturedFilms films={homepageFilms} onPlay={setSelectedFilm} />
      ) : (
        <>
          <div className="mx-auto mb-8 max-w-[1280px] px-6 text-center md:px-12 md:mb-10 lg:px-16">
            <p className={`${styles.eyebrow} mb-4 font-cormorant text-[16px] font-normal uppercase tracking-[0.3em] text-brand-gold`}>
              {homepage.featuredFilm.eyebrow}
            </p>

            <h2
              id="featured-film-title"
              className="font-cormorant text-[36px] font-normal uppercase tracking-[0.08em] text-[#191919] md:text-[48px]"
            >
              {homepage.featuredFilm.heading}
            </h2>

            <div aria-hidden="true" className="mx-auto my-5 h-[1px] w-16 bg-[#D4A853]" />

            <p className={`${styles.description} mx-auto max-w-[720px] font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] md:text-[16px]`}>
              {homepage.featuredFilm.description}
            </p>
          </div>

          <div className={styles.deck}>
            {homepageFilms.map((film, index) => (
              <div
                key={film.id}
                data-film-card
                className={styles.deckItem}
                style={{ "--deck-index": index } as React.CSSProperties}
              >
                <div className={styles.stackCard}>
                  <FilmCard film={film} variant="stacked" caption={homepage.featuredFilm.caption} onPlay={setSelectedFilm} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <FilmPlayerDialog film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </section>
  );
}
