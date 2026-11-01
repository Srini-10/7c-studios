"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ClientStory } from "@/lib/client-stories";

type Props = {
  story: ClientStory;
  previous?: ClientStory;
  next?: ClientStory;
};

function revealStyle(delay = 0): CSSProperties {
  return {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;
}

export default function StoryDetail({ story, previous, next }: Props) {
  const articleRef = useRef<HTMLElement>(null);
  const isWedding = story.filter === "weddings" || story.filter === "brahmin-weddings";

  useEffect(() => {
    const article = articleRef.current;

    if (
      !article ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements = article.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -24px 0px",
      },
    );

    // Reveal a section immediately when keyboard focus enters it.
    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;

      const element = event.target.closest<HTMLElement>("[data-reveal]");

      if (!element) return;

      element.classList.add("is-visible");
      observer.unobserve(element);
    };

    elements.forEach((element) => {
      element.classList.add("reveal-pending");
      observer.observe(element);
    });

    article.addEventListener("focusin", handleFocus);

    return () => {
      observer.disconnect();
      article.removeEventListener("focusin", handleFocus);

      elements.forEach((element) => {
        element.classList.remove("reveal-pending");
      });
    };
  }, [story]);

  return (
    <article
      key={story.id}
      ref={articleRef}
      className="story-detail bg-white text-[#77736c]"
      aria-labelledby="story-title"
    >
      {/* Hero */}
      <div className="detail-hero relative isolate h-[71.2vw] min-h-[420px] max-h-[1100px] w-full overflow-hidden">
        <Image
          src={story.heroImage ?? story.image}
          alt={story.imageAlt}
          fill
          preload
          sizes="100vw"
          className="detail-hero-image object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,22,15,0.25)_0%,rgba(31,22,15,0.08)_45%,rgba(20,14,10,0.8)_100%)]"
        />

        <div
          aria-hidden="true"
          className="hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-white/75 md:bottom-12"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em]">
            Scroll to explore
          </span>

          <span className="hero-scroll-track">
            <span className="hero-scroll-line" />
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-[100px]">
        {/* Introduction */}
        <div className="grid gap-7 py-14 md:grid-cols-2 md:gap-20 md:py-24 lg:gap-36">
          <p
            data-reveal
            className="detail-text-reveal max-w-[520px] font-cormorant text-[clamp(1.75rem,2.85vw,2.75rem)] italic leading-[1.1]"
          >
            {story.introQuote ?? story.name}
          </p>

          <p
            data-reveal
            style={revealStyle(120)}
            className="detail-text-reveal prose-copy max-w-[520px] self-center font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] sm:text-[16px]"
          >
            {story.introText ?? story.description}
          </p>
        </div>

        {/* Photo gallery */}
        <div
          aria-label={`${story.name} photo gallery`}
          className="grid grid-cols-2 items-start gap-3 pb-16 md:gap-6 md:pb-24 lg:gap-7"
        >
          {story.storyImages.map((photo, index) => (
            <figure
              key={photo.id}
              data-reveal
              style={revealStyle((index % 2) * 160)}
              className={`detail-photo ${
                photo.layout === "half"
                  ? "col-span-1"
                  : photo.layout === "centered"
                    ? "col-span-2 mx-auto w-[85%] md:w-[74.6%]"
                    : "col-span-2 w-full"
              }`}
            >
              <div className="detail-photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt ?? `${story.name} — photograph`}
                  width={photo.width ?? 1600}
                  height={photo.height ?? 1000}
                  sizes={
                    photo.layout === "half"
                      ? "(max-width: 767px) 45vw, (max-width: 1439px) 43vw, 606px"
                      : photo.layout === "centered"
                        ? "(max-width: 767px) 75vw, (max-width: 1439px) 65vw, 925px"
                        : "(max-width: 767px) 95vw, (max-width: 1439px) 86vw, 1240px"
                  }
                  className="detail-gallery-image block h-auto w-full"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Story and wedding details */}
      <section
        aria-labelledby="story-title"
        className="bg-[#351e0e] px-6 py-16 text-[#bea995] sm:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[1.25fr_1fr] md:gap-20 lg:gap-40">
          <div>
            <p
              data-reveal
              className="detail-text-reveal mb-7 font-sans text-[10px] uppercase tracking-[0.3em] text-[#a58b73]"
            >
              The story
            </p>

            <h1
              id="story-title"
              data-reveal
              style={revealStyle(80)}
              className="detail-text-reveal mb-6 font-cormorant text-[clamp(2rem,3vw,3rem)] font-normal leading-tight text-[#e1d0bd]"
            >
              {story.name}
            </h1>

            <div className="prose-copy max-w-[540px] space-y-5 font-sans text-[15px] font-normal leading-[1.8] tracking-normal sm:text-[16px]">
              {(story.storyParagraphs ?? [story.description]).map(
                (paragraph, index) => (
                  <p
                    key={`${story.id}-paragraph-${index}`}
                    data-reveal
                    style={revealStyle(Math.min(index * 70, 210))}
                    className="detail-text-reveal"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>

          <div>
            <h2
              data-reveal
              className="detail-text-reveal mb-5 font-sans text-[10px] font-normal uppercase tracking-[0.18em] text-[#a58b73]"
            >
              {isWedding ? "Wedding details" : "Session details"}
            </h2>

            <dl className="border-t border-[#bea995]/20">
              {(
                story.weddingDetails ?? [
                  {
                    label: "Location",
                    value: story.location,
                  },
                  {
                    label: isWedding ? "Wedding type" : "Session type",
                    value: story.category,
                  },
                ]
              ).map((detail, index) => (
                <div
                  key={`${detail.label}-${index}`}
                  data-reveal
                  style={revealStyle(Math.min(index * 60, 240))}
                  className="detail-text-reveal wedding-detail-row flex flex-wrap items-baseline justify-between gap-4 border-b border-[#bea995]/20 py-5"
                >
                  <dt className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#a58b73]">
                    {detail.label}
                  </dt>

                  <dd className="font-cormorant text-base tracking-[0.06em] text-[#e1d0bd]">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              data-reveal
              style={revealStyle(120)}
              className="detail-text-reveal mt-9"
            >
              <Link
                href="/contact"
                className="detail-enquire inline-flex min-h-12 items-center gap-7 border border-[#bea995]/70 px-7 py-3 font-sans text-[9px] uppercase tracking-[0.22em] text-[#e1d0bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1d0bd]"
              >
                <span className="detail-enquire-text">Enquire now</span>

                <span aria-hidden="true" className="detail-enquire-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Previous and next stories */}
      <nav
        aria-label="Story navigation"
        className="px-6 py-12 sm:px-10 md:py-16"
      >
        <div
          data-reveal
          className="detail-text-reveal mx-auto grid max-w-[1240px] grid-cols-2 items-center gap-8 border-b border-[#dedbd5] pb-12 md:grid-cols-3 md:pb-16"
        >
          <div>
            {previous ? (
              <Link
                href={`/stories/${previous.slug}`}
                className="detail-navigation-link group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                <span className="block font-sans text-[9px] uppercase tracking-[0.15em] text-[#99958f]">
                  <span aria-hidden="true" className="detail-previous-arrow">
                    ←
                  </span>{" "}
                  Previous story
                </span>

                <span className="detail-navigation-name mt-2 inline-block font-cormorant text-2xl group-hover:text-brand-red group-focus-visible:text-brand-red">
                  {previous.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/#client-stories"
                className="detail-simple-link inline-block font-sans text-[9px] uppercase tracking-[0.15em] hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                ← Back to home
              </Link>
            )}
          </div>

          <Link
            href="/stories"
            className="detail-simple-link justify-self-end font-sans text-[10px] uppercase tracking-[0.3em] text-brand-red hover:text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red md:justify-self-center"
          >
            All stories
          </Link>

          {next && (
            <Link
              href={`/stories/${next.slug}`}
              className="detail-navigation-link group col-span-2 text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red md:col-span-1"
            >
              <span className="block font-sans text-[9px] uppercase tracking-[0.15em] text-[#99958f]">
                Next story{" "}
                <span aria-hidden="true" className="detail-next-arrow">
                  →
                </span>
              </span>

              <span className="detail-navigation-name mt-2 inline-block font-cormorant text-2xl group-hover:text-brand-red group-focus-visible:text-brand-red">
                {next.name}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <style jsx global>{`
        .story-detail {
          --detail-ease: cubic-bezier(0.22, 1, 0.36, 1);
          --detail-reveal-ease: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Cinematic hero entrance */

        .story-detail .detail-hero {
          animation: detail-hero-enter 900ms ease both;
        }

        .story-detail .detail-hero-image {
          animation: detail-hero-zoom 1800ms var(--detail-ease) both;
        }

        /* Scroll indicator */

        .story-detail .hero-scroll-indicator {
          animation: detail-indicator-enter 900ms ease 500ms both;
        }

        .story-detail .hero-scroll-track {
          position: relative;
          display: block;
          width: 1px;
          height: 48px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.2);
        }

        .story-detail .hero-scroll-line {
          position: absolute;
          inset: 0;
          display: block;
          background: rgba(255, 255, 255, 0.85);
          transform-origin: top;
          animation: detail-scroll-line 1800ms ease-in-out 3 both;
        }

        /* Visible before JavaScript enhancement */

        .story-detail [data-reveal] {
          --reveal-delay: 0ms;
        }

        /* Image curtain reveals */

        .story-detail .detail-photo-frame {
          clip-path: inset(0 0 0 0);
          transition: clip-path 1800ms var(--detail-reveal-ease) var(--reveal-delay);
        }

        .story-detail .detail-photo.reveal-pending:not(.is-visible) .detail-photo-frame {
          clip-path: inset(0 0 100% 0);
          transition: none;
        }

        .story-detail .detail-photo-frame {
          overflow: hidden;
          background: white;
        }

        .story-detail .detail-gallery-image {
          scale: 1;
          transform: scale(1);
          transition:
            scale 2200ms var(--detail-reveal-ease) var(--reveal-delay),
            transform 1000ms var(--detail-ease);
        }

        .story-detail
          .detail-photo.reveal-pending:not(.is-visible)
          .detail-gallery-image {
          scale: 1.08;
          transition: none;
        }

        /* Text reveals */

        .story-detail .detail-text-reveal {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 750ms ease var(--reveal-delay),
            transform 950ms var(--detail-ease) var(--reveal-delay);
        }

        .story-detail .detail-text-reveal.reveal-pending:not(.is-visible) {
          opacity: 0;
          transform: translateY(24px);
          transition: none;
        }

        /* Enquiry button fill */

        .story-detail .detail-enquire {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .story-detail .detail-enquire::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: rgba(190, 169, 149, 0.15);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 550ms var(--detail-ease);
        }

        .story-detail .detail-enquire-arrow {
          display: inline-block;
          transition: transform 450ms var(--detail-ease);
        }

        .story-detail .detail-enquire:focus-visible::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .story-detail .detail-enquire:focus-visible .detail-enquire-arrow {
          transform: translateX(5px);
        }

        /* Navigation underline */

        .story-detail .detail-navigation-name,
        .story-detail .detail-simple-link {
          position: relative;
          transition: color 300ms ease;
        }

        .story-detail .detail-navigation-name::after,
        .story-detail .detail-simple-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 500ms var(--detail-ease);
        }

        .story-detail .detail-previous-arrow,
        .story-detail .detail-next-arrow {
          display: inline-block;
          transition: transform 450ms var(--detail-ease);
        }

        .story-detail
          .detail-navigation-link:focus-visible
          .detail-navigation-name::after,
        .story-detail .detail-simple-link:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Mouse and trackpad hover effects */

        @media (hover: hover) and (pointer: fine) {
          .story-detail .detail-photo:hover .detail-gallery-image {
            transform: scale(1.035);
          }

          .story-detail .detail-enquire:hover::before {
            transform: scaleX(1);
            transform-origin: left;
          }

          .story-detail .detail-enquire:hover .detail-enquire-arrow {
            transform: translateX(5px);
          }

          .story-detail
            .detail-navigation-link:hover
            .detail-navigation-name::after,
          .story-detail .detail-simple-link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }

          .story-detail .detail-navigation-link:hover .detail-previous-arrow {
            transform: translateX(-5px);
          }

          .story-detail .detail-navigation-link:hover .detail-next-arrow {
            transform: translateX(5px);
          }
        }

        @keyframes detail-hero-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes detail-hero-zoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes detail-indicator-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes detail-scroll-line {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }
          45% {
            transform: scaleY(1);
            transform-origin: top;
          }
          55% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }

        /* Reduced motion */

        @media (prefers-reduced-motion: reduce) {
          .story-detail .detail-hero,
          .story-detail .detail-hero-image,
          .story-detail .hero-scroll-indicator,
          .story-detail .hero-scroll-line {
            animation: none;
          }

          .story-detail .detail-photo-frame,
          .story-detail .detail-gallery-image,
          .story-detail .detail-text-reveal,
          .story-detail .detail-enquire::before,
          .story-detail .detail-enquire-arrow,
          .story-detail .detail-navigation-name,
          .story-detail .detail-navigation-name::after,
          .story-detail .detail-simple-link,
          .story-detail .detail-simple-link::after,
          .story-detail .detail-previous-arrow,
          .story-detail .detail-next-arrow {
            transition: none !important;
          }

          .story-detail .detail-photo.reveal-pending:not(.is-visible) .detail-photo-frame {
            clip-path: none;
          }

          .story-detail .detail-gallery-image,
          .story-detail
            .detail-photo.reveal-pending:not(.is-visible)
            .detail-gallery-image,
          .story-detail .detail-photo:hover .detail-gallery-image {
            scale: 1;
            transform: none;
          }

          .story-detail .detail-text-reveal.reveal-pending:not(.is-visible) {
            opacity: 1;
            transform: none;
          }

          .story-detail .detail-enquire-arrow,
          .story-detail .detail-previous-arrow,
          .story-detail .detail-next-arrow {
            transform: none !important;
          }
        }
      `}</style>
    </article>
  );
}
