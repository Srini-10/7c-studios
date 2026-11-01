"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import postersData from "@/data/posters.json";
import styles from "./PosterStories.module.css";

const STORY_DURATION = 7000;
const { posters } = postersData;

export default function PosterStories() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = activeIndex !== null;
  const activePoster = activeIndex === null ? null : posters[activeIndex];

  const goTo = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + direction + posters.length) % posters.length;
    });
  }, []);

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
      setActiveIndex(null);
    };

    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goTo]);

  useEffect(() => {
    if (activeIndex === null) return;

    const timer = window.setTimeout(() => goTo(1), STORY_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo]);

  return (
    <section aria-labelledby="posters-title" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{postersData.eyebrow}</p>
        <h2 id="posters-title" className={styles.heading}>
          {postersData.heading}
        </h2>
        <div aria-hidden="true" className={styles.rule} />
        <p className={styles.description}>{postersData.description}</p>
      </div>

      <div className={styles.grid}>
        {posters.map((poster, index) => (
          <button
            key={poster.id}
            type="button"
            className={styles.card}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${poster.name} wedding poster`}
            aria-haspopup="dialog"
          >
            <Image
              src={poster.poster}
              alt={poster.alt}
              fill
              sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 360px"
              className={styles.cardImage}
            />
            <span aria-hidden="true" className={styles.cardShade} />
            <span aria-hidden="true" className={styles.cardShadeHover} />
            <span aria-hidden="true" className={styles.cardIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardName}>{poster.name}</span>
              <span className={styles.cardCategory}>{poster.category}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label={activePoster ? `${activePoster.name} wedding poster` : "Wedding poster viewer"}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null);
        }}
      >
        {activePoster && (
          <div className={styles.viewerInner}>
            <div className={styles.progress} aria-hidden="true">
              {posters.map((poster, index) => (
                <span key={poster.id} className={styles.progressTrack}>
                  <span
                    key={`${poster.id}-${activeIndex}`}
                    className={`${styles.progressFill} ${
                      index < activeIndex! ? styles.progressDone : ""
                    } ${index === activeIndex ? styles.progressActive : ""}`}
                  />
                </span>
              ))}
            </div>

            <div className={styles.viewerTop}>
              <p className={styles.viewerCount}>
                {String(activeIndex! + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                className={styles.viewerClose}
                onClick={() => setActiveIndex(null)}
                aria-label="Close poster viewer"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className={styles.stage}>
              <button
                type="button"
                className={`${styles.nav} ${styles.navBack}`}
                onClick={() => goTo(-1)}
                aria-label="Previous poster"
              >
                <ArrowLeft aria-hidden="true" size={22} strokeWidth={1.4} />
              </button>

              <Image
                key={activePoster.id}
                src={activePoster.poster}
                alt={activePoster.alt}
                width={1080}
                height={1620}
                sizes="(max-width: 639px) 100vw, min(62vh, 640px)"
                className={styles.posterImage}
              />

              <button
                type="button"
                className={`${styles.nav} ${styles.navForward}`}
                onClick={() => goTo(1)}
                aria-label="Next poster"
              >
                <ArrowRight aria-hidden="true" size={22} strokeWidth={1.4} />
              </button>
            </div>

            <div className={styles.viewerFooter}>
              <div>
                <p className={styles.viewerCategory}>
                  {activePoster.category} · {activePoster.location}
                </p>
                <h3 className={styles.viewerName}>{activePoster.name}</h3>
              </div>
              <Link
                href={`/stories/${activePoster.storySlug}`}
                className={styles.storyLink}
                onClick={() => setActiveIndex(null)}
              >
                View the story
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
