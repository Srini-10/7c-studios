"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { weddingPosters } from "@/content/posters";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { MediaDialog } from "@/components/ui/media-dialog";

export function PosterStories() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [scrollState, setScrollState] = useState({ previous: false, next: true });

  const active = weddingPosters[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const syncScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setScrollState({
      previous: track.scrollLeft > 8,
      next: track.scrollLeft < track.scrollWidth - track.clientWidth - 8,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncScroll();
    track.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll);
    return () => {
      track.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, [syncScroll]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex((value) => (value + 1) % weddingPosters.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + weddingPosters.length) % weddingPosters.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open || reduced) return;
    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % weddingPosters.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [index, open, reduced]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-poster]");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-oxblood">Wedding posters</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1.02]">
              Every wedding,{" "}
              <em className="display-italic text-oxblood">a story.</em>
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-taupe">
              Posters from the archive — one frame from each celebration, held full screen the way
              a story should be. Select a poster to enter.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!scrollState.previous}
              aria-label="Previous posters"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!scrollState.next}
              aria-label="More posters"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:mt-16"
        >
          {weddingPosters.map((poster, position) => (
            <li
              key={poster.id}
              data-poster
              className="w-[64%] shrink-0 snap-start sm:w-[36%] lg:w-[23%] xl:w-[19%]"
            >
              <button
                type="button"
                onClick={() => {
                  setIndex(position);
                  setOpen(true);
                }}
                aria-label={`Open poster story for ${poster.name}`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[2/3] overflow-hidden bg-sand">
                  <Image
                    src={poster.poster}
                    alt={poster.alt}
                    fill
                    sizes="(max-width: 640px) 64vw, (max-width: 1024px) 36vw, 20vw"
                    quality={78}
                    className="image-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/5 to-ink/10" />
                  <span className="absolute left-4 top-4 text-[0.55rem] font-semibold tracking-[0.24em] text-bone/65">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-bone/55">
                      {poster.category}
                    </span>
                    <span className="display mt-1.5 block text-[1.35rem] leading-tight text-bone">
                      {poster.name}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <MediaDialog
        open={open}
        onClose={() => setOpen(false)}
        label={`Wedding poster story ${index + 1} of ${weddingPosters.length}`}
        panelClassName="w-full max-w-[min(90vw,420px)] px-2"
      >
        <div className="w-full pb-4">
          <div className="relative mx-auto w-full">
            <div className="absolute inset-x-0 top-3 z-20 flex gap-1.5 px-3">
              {weddingPosters.map((poster, position) => (
                <span
                  key={poster.id}
                  className="h-0.5 flex-1 overflow-hidden bg-bone/30"
                >
                  <span
                    className={
                      position < index
                        ? "story-progress block w-full"
                        : position === index
                          ? reduced
                            ? "story-progress block w-full"
                            : "story-progress story-progress-active block w-full"
                          : "story-progress block w-full scale-x-0"
                    }
                    style={{ transform: position > index ? "scaleX(0)" : undefined }}
                  />
                </span>
              ))}
            </div>

            <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink">
              <Image
                key={active.poster}
                src={active.poster}
                alt={active.alt}
                fill
                sizes="420px"
                quality={88}
                className="image-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-transparent to-ink/35" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-bone/55">
                  {active.category} · {active.location}
                </p>
                <h2 className="display mt-1 text-3xl leading-tight text-bone">{active.name}</h2>
                <Link
                  href={`/stories/${active.storySlug}`}
                  className="mt-4 inline-flex items-center gap-2 border-b border-bone/35 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-bone/75 transition hover:border-bone hover:text-bone"
                >
                  View the story
                  <ArrowUpRight width={13} height={13} />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIndex((value) => (value - 1 + weddingPosters.length) % weddingPosters.length)}
                aria-label="Previous poster"
                className="absolute left-2 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 bg-ink/35 text-bone backdrop-blur-sm transition hover:bg-bone hover:text-ink"
              >
                <ChevronLeft width={16} height={16} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((value) => (value + 1) % weddingPosters.length)}
                aria-label="Next poster"
                className="absolute right-2 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 bg-ink/35 text-bone backdrop-blur-sm transition hover:bg-bone hover:text-ink"
              >
                <ChevronRight width={16} height={16} />
              </button>
            </div>
          </div>
          <p className="mt-3 text-center text-[0.55rem] uppercase tracking-[0.24em] text-bone/40">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(weddingPosters.length).padStart(2, "0")} · {reduced ? "Use the arrows" : "Auto-advancing"}
          </p>
        </div>
      </MediaDialog>
    </section>
  );
}
