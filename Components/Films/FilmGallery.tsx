"use client";

import { useState } from "react";
import type { Film } from "@/lib/film";
import FilmCard from "./FilmCard";
import FilmPlayerDialog from "./FilmPlayerDialog";
import styles from "./Films.module.css";

export default function FilmGallery({ films }: { films: Film[] }) {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {films.map((film) => (
          <FilmCard key={film.id} film={film} onPlay={setSelectedFilm} />
        ))}
      </div>
      <FilmPlayerDialog film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </>
  );
}
