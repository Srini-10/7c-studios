"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Film } from "@/lib/film";
import { getFilmPlayback, getYouTubeWatchUrl } from "@/lib/film";
import styles from "./FilmPlayerDialog.module.css";

type Props = {
  film: Film | null;
  onClose: () => void;
};

export default function FilmPlayerDialog({ film, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(film);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  const playback = film ? getFilmPlayback(film) : null;
  const watchUrl = film ? getYouTubeWatchUrl(film) : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={film ? `${film.name} wedding film` : "Wedding film"}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close film player"
        className={styles.close}
      >
        <X aria-hidden="true" size={22} strokeWidth={1.5} />
      </button>

      {film && (
        <div className={styles.panel}>
          <div className={styles.frame}>
            {playback?.type === "youtube" ? (
              <iframe
                key={film.id}
                className={styles.video}
                src={`${playback.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${film.name} wedding film`}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : playback?.type === "local" ? (
              <video
                key={film.id}
                className={styles.video}
                src={playback.url}
                poster={film.image}
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <p className={styles.unavailable}>Coming soon</p>
            )}
          </div>

          <div className={styles.meta}>
            <div>
              <p className={styles.kicker}>
                {film.category} · {film.location}
              </p>
              <h2 className={styles.title}>{film.name}</h2>
              <p className={styles.description}>{film.description}</p>
            </div>

            {watchUrl && (
              <a
                className={styles.watchLink}
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
