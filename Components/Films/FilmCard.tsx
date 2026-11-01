"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import type { Film } from "@/lib/film";
import styles from "./Films.module.css";

type Props = {
  film: Film;
  variant?: "gallery" | "stacked";
  caption?: string;
  onPlay: (film: Film) => void;
};

export default function FilmCard({ film, variant = "gallery", caption, onPlay }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const isFeatured = variant !== "gallery";

  useEffect(() => {
    const card = cardRef.current;
    if (isFeatured || !card || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = () => {
      card.setAttribute("data-film-visible", "");
      observer.unobserve(card);
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, { threshold: 0.2, rootMargin: "0px 0px -24px 0px" });

    card.setAttribute("data-film-pending", "");
    observer.observe(card);
    card.addEventListener("focusin", reveal);

    return () => {
      observer.disconnect();
      card.removeEventListener("focusin", reveal);
      card.removeAttribute("data-film-pending");
      card.removeAttribute("data-film-visible");
    };
  }, [isFeatured]);

  function playFilm() {
    onPlay(film);
  }

  return (
    <article ref={cardRef} className={isFeatured ? styles.featuredCard : `${styles.card} ${film.layout === "wide" ? styles.wideCard : ""}`}>
      <div className={`${styles.thumbnail} ${isFeatured ? styles.featuredThumbnail : ""} ${variant === "stacked" ? styles.stackedPreview : ""}`}>
        <Image
          src={film.image}
          alt={film.imageAlt}
          fill
          sizes={variant === "stacked"
            ? "(max-width: 639px) calc(100vw - 48px), (max-width: 1247px) calc(88vw - 42px), 1060px"
            : film.layout === "wide"
            ? "(max-width: 639px) calc(100vw - 48px), (max-width: 1439px) 74vw, 1070px"
            : "(max-width: 639px) calc(100vw - 48px), (max-width: 1439px) 42vw, 600px"}
          className={styles.cardImage}
          {...(variant === "stacked" ? { "data-stack-parallax": "" } : {})}
        />
        <span aria-hidden="true" className={isFeatured ? styles.featuredShade : styles.thumbnailShade} />
        <button
          type="button"
          className={isFeatured ? styles.featuredPlayButton : styles.galleryPlayButton}
          aria-label={`Play ${film.name}'s film`}
          aria-haspopup="dialog"
          onClick={playFilm}
        >
          <span aria-hidden="true" className={styles.playButton}><Play strokeWidth={1.25} /></span>
          {isFeatured ? (
            caption && <span className={styles.featuredCaption}>{caption}</span>
          ) : (
            film.duration && <span className={styles.duration}>{film.duration}</span>
          )}
        </button>
      </div>
      {!isFeatured && <div className={styles.details}>
        <h2 className={styles.name}>{film.name}</h2>
        <p className={styles.category}>{film.category}</p>
        <p className={styles.description}>{film.description}</p>
        <p className={styles.location}>{film.location}</p>
        <button
          type="button"
          className={styles.watchButton}
          onClick={playFilm}
          aria-label={`Play ${film.name}'s film`}
          aria-haspopup="dialog"
        >
          <span>Watch film</span><ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </button>
      </div>}
    </article>
  );
}
