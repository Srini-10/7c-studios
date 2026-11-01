"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clientStories } from "@/lib/client-stories";
import styles from "./ClientStories.module.css";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const excludedSlugs = new Set(["kavin-yazhini"]);

const stories = [...clientStories.stories]
  .filter((story) => !excludedSlugs.has(story.slug))
  .sort((a, b) => a.listingOrder - b.listingOrder);

function getOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function ClientStories() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (direction: 1 | -1) => {
      setActive((current) => (current + direction + stories.length) % stories.length);
    },
    [],
  );

  return (
    <section id="client-stories" className="w-full overflow-hidden bg-white py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="mx-auto mb-10 max-w-[1280px] px-6 text-center md:px-12 md:mb-14 lg:px-16"
      >
        <p className={`mb-4 ${styles.centerText} font-cormorant text-[16px] font-normal uppercase tracking-[0.3em] text-[#c51d1d]`}>
          {clientStories.eyebrow}
        </p>

        <h2 className="font-cormorant text-[36px] font-normal uppercase tracking-[0.08em] text-[#191919] md:text-[48px]">
          {clientStories.heading}
        </h2>

        <div className="mx-auto my-5 h-[1px] w-16 bg-[#c51d1d]" />

        <p className={`mx-auto max-w-[720px] ${styles.centerText} font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] md:text-[16px]`}>
          {clientStories.description}
        </p>
      </motion.div>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client stories"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(1);
          }
        }}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
          if (Math.abs(delta) > 44) goTo(delta < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <p className="sr-only" aria-live="polite">
          Story {active + 1} of {stories.length}: {stories[active]?.name}
        </p>

        <div className={styles.stage}>
          {stories.map((story, index) => {
            const offset = getOffset(index, active, stories.length);
            const distance = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <motion.article
                key={story.id}
                className={styles.card}
                initial={false}
                animate={{
                  x: `${offset * 62}%`,
                  y: distance * 20,
                  scale: 1 - distance * 0.12,
                  opacity: distance > 2 ? 0 : 1,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 150, damping: 24, mass: 0.9 }
                }
                style={{
                  zIndex: 20 - distance,
                  pointerEvents: distance > 2 ? "none" : "auto",
                }}
              >
                {isActive ? (
                  story.published ? (
                    <Link
                      href={`/stories/${story.slug}`}
                      className={styles.cardLink}
                      aria-label={`View ${story.name}'s story`}
                      draggable={false}
                    >
                      <CardContent story={story} offset={offset} distance={distance} reducedMotion={Boolean(reducedMotion)} />
                    </Link>
                  ) : (
                    <span className={styles.cardLink}>
                      <CardContent story={story} offset={offset} distance={distance} reducedMotion={Boolean(reducedMotion)} />
                    </span>
                  )
                ) : (
                  <button
                    type="button"
                    className={styles.cardLink}
                    onClick={() => setActive(index)}
                    aria-label={`Show ${story.name}'s story`}
                    tabIndex={distance <= 2 ? 0 : -1}
                  >
                    <CardContent story={story} offset={offset} distance={distance} reducedMotion={Boolean(reducedMotion)} />
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous client story"
          className={`${styles.arrow} ${styles.navPrevious}`}
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next client story"
          className={`${styles.arrow} ${styles.navNext}`}
        >
          <ArrowRight aria-hidden="true" size={20} strokeWidth={1.4} />
        </button>
      </div>

      <div className="mt-8 flex justify-center px-6">
        <Link
          href="/stories"
          className="border-b border-brand-red/40 pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-red transition-colors hover:text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          View all stories
        </Link>
      </div>
    </section>
  );
}

function CardContent({
  story,
  offset,
  distance,
  reducedMotion,
}: {
  story: (typeof stories)[number];
  offset: number;
  distance: number;
  reducedMotion: boolean;
}) {
  return (
    <>
      <span className={styles.imageFrame}>
        <motion.span
          className={styles.parallax}
          initial={false}
          animate={{ x: `${offset * -5}%` }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 26 }}
        >
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 767px) 68vw, (max-width: 1279px) 36vw, 400px"
            className={styles.image}
          />
        </motion.span>
      </span>

      <motion.span
        aria-hidden="true"
        className={styles.dim}
        initial={false}
        animate={{ opacity: Math.min(distance * 0.18, 0.4) }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
      />

      <span aria-hidden="true" className={styles.shade} />

      <span
        className={styles.caption}
        style={{ opacity: distance === 0 ? 1 : 0 }}
        aria-hidden={distance !== 0}
      >
        <span className={styles.category}>{story.category}</span>
        <span className={styles.name}>{story.name}</span>
        <span className={styles.location}>{story.location}</span>
      </span>
    </>
  );
}
