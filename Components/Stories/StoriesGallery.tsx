"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, LayoutGrid } from "lucide-react";
import type { ClientStory } from "@/lib/client-stories";

export type StoryCard = Pick<
  ClientStory,
  | "id"
  | "slug"
  | "published"
  | "name"
  | "category"
  | "location"
  | "image"
  | "imageAlt"
  | "listingOrder"
  | "cardLayout"
  | "filter"
>;

type Props = {
  heading: string;
  stories: StoryCard[];
  filters: {
    id: string;
    label: string;
  }[];
};

function matchesFilter(story: StoryCard, selected: string) {
  if (selected === "all") return true;

  if (selected === "weddings") {
    return story.filter === "weddings" || story.filter === "brahmin-weddings";
  }

  return story.filter === selected;
}

function StoryCardContent({ story }: { story: StoryCard }) {
  return (
    <>
      <div
        className={`story-image-frame relative overflow-hidden bg-white ${
          story.cardLayout === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={story.image}
          alt={story.imageAlt}
          fill
          sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 43vw, (max-width: 1439px) 29vw, 398px"
          className="story-image object-cover"
        />

        {story.published && (
          <span aria-hidden="true" className="story-view-label">
            View story
            <span className="story-view-arrow">↗</span>
          </span>
        )}
      </div>

      <div className="story-details mt-4 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <h2 className="story-name font-cormorant text-[clamp(1.625rem,2.6vw,2.5rem)] font-normal leading-[1.1] text-[#514c45] group-hover:text-brand-red group-focus-visible:text-brand-red">
          {story.name}
        </h2>

        <span className="font-sans text-[9px] uppercase tracking-[0.08em] text-[#99948b] lg:text-[10px]">
          {story.location}
        </span>
      </div>

      <p className="story-category mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-brand-red lg:text-[10px]">
        {story.category}
      </p>
    </>
  );
}

export default function StoriesGallery({ heading, stories, filters }: Props) {
  const [selected, setSelected] = useState("all");
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);

  const visibleStories = [...stories]
    .sort((a, b) => a.listingOrder - b.listingOrder)
    .filter((story) => matchesFilter(story, selected));

  useEffect(() => {
    const gallery = galleryRef.current;

    if (
      !gallery ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cards = gallery.querySelectorAll<HTMLElement>("[data-story-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;

      const card = event.target.closest<HTMLElement>("[data-story-reveal]");

      if (!card) return;

      card.classList.add("is-visible");
      observer.unobserve(card);
    };

    cards.forEach((card) => {
      card.classList.add("reveal-pending");
      observer.observe(card);
    });

    gallery.addEventListener("focusin", handleFocus);

    return () => {
      observer.disconnect();
      gallery.removeEventListener("focusin", handleFocus);

      cards.forEach((card) => {
        card.classList.remove("reveal-pending");
      });
    };
  }, [selected, stories]);

  return (
    <section
      aria-labelledby="stories-title"
      className="stories-section mx-auto max-w-[1440px] px-6 pb-20 pt-14 sm:px-10 md:pb-24 md:pt-20 lg:px-[100px] lg:pb-28 lg:pt-24"
    >
      {/* Heading and filters */}
      <div className="stories-header flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="stories-title"
            className="font-sans text-[28px] font-medium leading-tight tracking-[-0.045em] text-[#292722] sm:text-[36px]"
          >
            {heading}
          </h2>
          <p role="status" className="font-sans text-[11px] font-medium tracking-[0.02em] text-[#77736c] sm:text-[12px]">
            {visibleStories.length}{" "}
            {visibleStories.length === 1 ? "story" : "stories"}
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter stories by category"
          className="story-filters"
        >
          {filters.map((filter) => {
            const categoryStories = stories.filter((story) => matchesFilter(story, filter.id));
            const preview = filter.id === "all" ? undefined : categoryStories[0];
            const active = selected === filter.id;

            return (
              <motion.button
                key={filter.id}
                type="button"
                aria-pressed={active}
                aria-controls="stories-gallery"
                onClick={() => setSelected(filter.id)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="story-filter"
              >
                <span className={`story-filter-artwork ${preview ? "" : "story-filter-all"}`}>
                  {preview ? (
                    <Image
                      src={preview.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 180px, 144px"
                      className="story-filter-preview"
                    />
                  ) : (
                    <LayoutGrid aria-hidden="true" size={28} strokeWidth={1.5} />
                  )}
                  {active && (
                    <motion.span
                      aria-hidden="true"
                      className="story-filter-selected"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    >
                      <Check size={12} strokeWidth={1.75} />
                    </motion.span>
                  )}
                </span>
                <span className="story-filter-caption">
                  <span className="story-filter-label">{filter.label}</span>
                  <span aria-hidden="true" className="story-filter-count">{categoryStories.length}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <div
        key={selected}
        ref={galleryRef}
        id="stories-gallery"
        className="stories-grid mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
      >
        {[0, 1, 2].map((column) => (
          <div
            key={column}
            className={`contents lg:flex lg:flex-col lg:gap-14 ${
              selected === "all" && column === 1 ? "lg:pt-12" : ""
            }`}
          >
            {visibleStories
              .map((story, index) => ({ story, index }))
              .filter(({ index }) => index % 3 === column)
              .map(({ story, index }) => (
                <article
                  key={story.id}
                  data-story-reveal
                  className="story-reveal"
                  style={
                    {
                      order: index,
                      "--reveal-delay": `${(index % 3) * 160}ms`,
                    } as CSSProperties
                  }
                >
                  {story.published ? (
                    <Link
                      href={`/stories/${story.slug}`}
                      aria-label={`View ${story.name}'s ${story.category.toLowerCase()} story`}
                      className="story-card group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                    >
                      <StoryCardContent story={story} />
                    </Link>
                  ) : (
                    <div className="story-card group">
                      <StoryCardContent story={story} />
                    </div>
                  )}
                </article>
              ))}
          </div>
        ))}

        {visibleStories.length === 0 && (
          <p className="stories-empty col-span-full py-12 text-center font-sans text-[15px] leading-[1.8] text-[#626262] sm:text-[16px]">
            No stories in this category yet.
          </p>
        )}
      </div>

      <style jsx global>{`
        .stories-section {
          --story-ease: var(--motion-ease-out);
          --story-reveal-ease: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Heading entrance */

        .stories-section .stories-header {
          animation: story-heading-enter 850ms var(--story-ease) both;
        }

        /* Filter results entrance */

        .stories-section .stories-grid {
          animation: story-filter-enter 450ms var(--story-ease) both;
        }

        /* Content remains visible before JS enhancement */

        .stories-section .story-reveal {
          --reveal-delay: 0ms;
        }

        /* Top-to-bottom image curtain reveal */

        .stories-section .story-image-frame {
          position: relative;
          isolation: isolate;
          clip-path: inset(0 0 0 0);
          transition:
            clip-path 1100ms var(--story-reveal-ease) var(--reveal-delay),
            box-shadow 550ms ease;
        }

        .stories-section
          .story-reveal.reveal-pending:not(.is-visible)
          .story-image-frame {
          clip-path: inset(0 0 100% 0);
          transition: none;
        }

        /* Scroll zoom and hover zoom use separate properties */

        .stories-section .story-image {
          scale: 1;
          transform: scale(1);
          transition:
            scale 1400ms var(--story-reveal-ease) var(--reveal-delay),
            transform var(--motion-slow) var(--story-ease);
        }

        .stories-section
          .story-reveal.reveal-pending:not(.is-visible)
          .story-image {
          scale: 1.08;
          transition: none;
        }

        /* Details follow the image reveal */

        .stories-section .story-details,
        .stories-section .story-category {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 900ms ease calc(var(--reveal-delay) + 300ms),
            transform 1200ms var(--story-reveal-ease) calc(var(--reveal-delay) + 300ms);
        }

        .stories-section .story-category {
          transition-delay: calc(var(--reveal-delay) + 420ms);
        }

        .stories-section
          .story-reveal.reveal-pending:not(.is-visible)
          .story-details,
        .stories-section
          .story-reveal.reveal-pending:not(.is-visible)
          .story-category {
          opacity: 0;
          transform: translateY(18px);
          transition: none;
        }

        /* Card lift */

        .stories-section .story-card {
          display: block;
          transition: transform 650ms var(--story-ease);
        }

        .stories-section .story-name {
          transition: color 300ms ease;
        }

        /* Soft gradient behind the view label */

        .stories-section a.story-card .story-image-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            to top,
            rgba(28, 22, 18, 0.32),
            transparent 45%
          );
          transition: opacity 650ms ease;
        }

        /* Sliding view story label */

        .stories-section .story-view-label {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          pointer-events: none;
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          color: #fff;
          background: rgba(30, 24, 20, 0.15);
          font-family: sans-serif;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 450ms ease,
            transform 650ms var(--story-ease);
        }

        .stories-section .story-view-arrow {
          display: inline-block;
          font-size: 16px;
          line-height: 1;
          transition: transform 450ms var(--story-ease);
        }

        /* Category filters */

        .stories-section .story-filters {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 18px;
          padding: 8px 4px 12px;
          margin-inline: -4px;
        }

        .stories-section .story-filter {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 14px;
          padding: 0;
          border: 0;
          border-radius: 16px;
          background: transparent;
          color: #5e5954;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .stories-section .story-filter-artwork {
          position: relative;
          display: grid;
          width: 100%;
          aspect-ratio: 4 / 3;
          place-items: center;
          overflow: hidden;
          border-radius: 14px;
          background: #29211e;
          transition: box-shadow 200ms ease;
        }

        .stories-section .story-filter-all {
          background: radial-gradient(circle at 100% 0%, #71362f, transparent 75%), #29211e;
          color: white;
        }

        .stories-section .story-filter-preview {
          object-fit: cover;
          object-position: center top;
          transform-origin: center top;
          transition: transform 600ms var(--story-ease);
        }

        .stories-section .story-filter-selected {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
          display: grid;
          width: 22px;
          height: 22px;
          place-items: center;
          border: 2px solid white;
          border-radius: 50%;
          background: var(--color-brand-red);
          color: white;
          box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
        }

        .stories-section .story-filter-caption {
          display: flex;
          width: 100%;
          min-height: 36px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          padding-inline: 2px;
        }

        .stories-section .story-filter-count {
          display: grid;
          min-width: 22px;
          height: 22px;
          flex-shrink: 0;
          place-items: center;
          padding-inline: 5px;
          border-radius: 6px;
          background: #f3f2f0;
          color: #756c62;
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          transition: background-color 200ms ease, color 200ms ease;
        }

        .stories-section .story-filter[aria-pressed="true"] {
          color: var(--color-brand-red);
        }

        .stories-section .story-filter[aria-pressed="true"] .story-filter-artwork {
          box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-brand-red);
        }

        .stories-section .story-filter[aria-pressed="true"] .story-filter-count {
          background: var(--color-brand-red);
          color: white;
        }

        .stories-section .story-filter:focus-visible {
          outline: 2px solid var(--color-brand-red);
          outline-offset: 4px;
        }

        @media (max-width: 1023px) {
          .stories-section .story-filters {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scroll-snap-type: x proximity;
            scroll-padding-inline: 4px;
            scrollbar-width: thin;
            scrollbar-color: #ddd7d1 transparent;
          }

          .stories-section .story-filter {
            flex: 0 0 144px;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 639px) {
          .stories-section .story-filters {
            gap: 14px;
          }

          .stories-section .story-filter {
            flex-basis: 132px;
            gap: 12px;
            font-size: 11px;
          }
        }

        /* Keyboard interaction */

        .stories-section a.story-card:focus-visible {
          transform: translateY(-5px);
        }

        .stories-section a.story-card:focus-visible .story-image {
          transform: scale(1.055);
        }

        .stories-section a.story-card:focus-visible .story-image-frame::before {
          opacity: 1;
        }

        .stories-section a.story-card:focus-visible .story-view-label {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mouse and trackpad interaction */

        @media (hover: hover) and (pointer: fine) {
          .stories-section .story-card:hover {
            transform: translateY(-7px);
          }

          .stories-section .story-card:hover .story-image {
            transform: scale(1.055);
          }

          .stories-section .story-card:hover .story-image-frame {
            box-shadow: 0 24px 42px -26px rgba(40, 30, 20, 0.4);
          }

          .stories-section a.story-card:hover .story-image-frame::before {
            opacity: 1;
          }

          .stories-section a.story-card:hover .story-view-label {
            opacity: 1;
            transform: translateY(0);
          }

          .stories-section a.story-card:hover .story-view-arrow {
            transform: translate(2px, -2px);
          }

          .stories-section .story-filter[aria-pressed="false"]:hover {
            color: var(--color-brand-red);
          }

          .stories-section .story-filter:hover .story-filter-preview {
            transform: scale(1.045);
          }
        }

        @keyframes story-heading-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes story-filter-enter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reduced motion */

        @media (prefers-reduced-motion: reduce) {
          .stories-section .stories-header,
          .stories-section .stories-grid {
            animation: none;
          }

          .stories-section .story-card,
          .stories-section .story-image,
          .stories-section .story-image-frame,
          .stories-section .story-name,
          .stories-section .story-filter,
          .stories-section .story-filter-count,
          .stories-section .story-filter-preview,
          .stories-section .story-image-frame::before,
          .stories-section .story-details,
          .stories-section .story-category,
          .stories-section .story-view-label,
          .stories-section .story-view-arrow {
            transition: none !important;
          }

          .stories-section
            .story-reveal.reveal-pending:not(.is-visible)
            .story-image-frame {
            clip-path: none;
          }

          .stories-section .story-image,
          .stories-section
            .story-reveal.reveal-pending:not(.is-visible)
            .story-image {
            scale: 1;
            transform: none !important;
          }

          .stories-section .story-card,
          .stories-section .story-filter:hover,
          .stories-section .story-filter .story-filter-preview,
          .stories-section .story-card:hover,
          .stories-section .story-card:focus-visible,
          .stories-section a.story-card:hover .story-view-arrow {
            transform: none;
          }

          .stories-section
            .story-reveal.reveal-pending:not(.is-visible)
            .story-details,
          .stories-section
            .story-reveal.reveal-pending:not(.is-visible)
            .story-category {
            opacity: 1;
            transform: none;
          }

          .stories-section .story-view-label {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
