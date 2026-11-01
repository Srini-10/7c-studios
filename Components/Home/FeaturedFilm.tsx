"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import FilmCard from "@/Components/Films/FilmCard";
import FilmPlayerDialog from "@/Components/Films/FilmPlayerDialog";
import ScrollStack, { ScrollStackItem } from "@/Components/ScrollStack";
import type { Film } from "@/lib/film";
import films from "@/data/films.json";
import homepage from "@/data/homepage.json";
import styles from "./FeaturedFilm.module.css";

const homepageFilms = [...films.films]
  .sort((first, second) => Number(second.id === homepage.featuredFilm.filmId) - Number(first.id === homepage.featuredFilm.filmId))
  .slice(0, 4);

// Below this, a viewport-pinned stack leaves a screen of empty space under the deck,
// so the cards pin in flow instead and each one scrolls over the previous.
const STACK_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [itemDistance, setItemDistance] = useState(96);
  // Pinned offset and card size are derived from the real viewport so a 720px-tall
  // laptop does not tuck the deck under the navbar and a tall one does not waste it.
  const [stackLayout, setStackLayout] = useState({ pin: 108, cardMax: 1060 });
  const stacked = useStackLayout();

  useEffect(() => {
    if (!stacked) return;
    const card = sectionRef.current?.querySelector<HTMLElement>("[data-stack-card]");
    if (!card) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSpacing = () => {
      if (reducedMotion.matches) {
        // Cards are never pinned out of the navbar's way, so nothing is reserved.
        setStackLayout({ pin: 0, cardMax: 1060 });
        setItemDistance(96);
        return;
      }
      // Sit the deck below the transparent navbar, but keep the share modest on tall screens.
      const pin = Math.min(170, Math.max(104, window.innerHeight * 0.12));
      // Every parked card after the first shows a 24px sliver, and the deck keeps a gap below.
      const allowance = window.innerHeight - pin - (homepageFilms.length - 1) * 24 - 40;
      setStackLayout({
        pin: Math.round(pin),
        cardMax: Math.round(Math.max(320, allowance) * (16 / 9)),
      });
      // One card per screen of scroll, so the deck fits at any laptop height.
      setItemDistance(Math.max(160, window.innerHeight - card.offsetHeight + 120));
    };
    const observer = new ResizeObserver(updateSpacing);
    observer.observe(card);
    window.addEventListener("resize", updateSpacing);
    reducedMotion.addEventListener("change", updateSpacing);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSpacing);
      reducedMotion.removeEventListener("change", updateSpacing);
    };
  }, [stacked, homepageFilms.length]);


  if (!homepageFilms.length) return null;

  return (
    <section
      ref={sectionRef}
      id="featured-film"
      aria-labelledby="featured-film-title"
      className={styles.section}
      style={{ "--stack-card-max": `${stackLayout.cardMax}px` } as CSSProperties}
    >
      <div className="mx-auto mb-8 max-w-[1280px] px-6 text-center md:px-12 md:mb-10 lg:px-16">
        <p className={`${styles.eyebrow} mb-4 font-cormorant text-[16px] font-normal uppercase tracking-[0.3em] text-[#c51d1d]`}>
          {homepage.featuredFilm.eyebrow}
        </p>

        <h2
          id="featured-film-title"
          className="font-cormorant text-[36px] font-normal uppercase tracking-[0.08em] text-[#191919] md:text-[48px]"
        >
          {homepage.featuredFilm.heading}
        </h2>

        <div aria-hidden="true" className="mx-auto my-5 h-[1px] w-16 bg-[#c51d1d]" />

        <p className={`${styles.description} mx-auto max-w-[720px] font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] md:text-[16px]`}>
          {homepage.featuredFilm.description}
        </p>
      </div>

      {stacked ? (
        <ScrollStack
          className={styles.stack}
          stackPosition={stackLayout.pin}
          itemDistance={itemDistance}
          itemStackDistance={24}
          itemScale={0.07}
          baseScale={0.76}
          dimAmount={0.14}
          holdDistance={Math.min(120, itemDistance)}
        >
          {homepageFilms.map((film) => (
            <ScrollStackItem key={film.id} itemClassName={styles.stackCard}>
              <div className={styles.media}>
                <FilmCard film={film} variant="stacked" caption={homepage.featuredFilm.caption} onPlay={setSelectedFilm} />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        <div className={styles.deck}>
          {homepageFilms.map((film, index) => (
            <div
              key={film.id}
              data-film-card
              className={styles.deckItem}
              style={{ "--deck-index": index } as CSSProperties}
            >
              <div className={styles.stackCard}>
                <FilmCard film={film} variant="stacked" caption={homepage.featuredFilm.caption} onPlay={setSelectedFilm} />
              </div>
            </div>
          ))}
        </div>
      )}

      <FilmPlayerDialog film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </section>
  );
}
