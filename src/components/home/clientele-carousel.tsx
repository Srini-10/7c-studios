"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

export type ClienteleCard = {
  slug: string;
  name: string;
  location: string;
  category: string;
  image: string;
  imageAlt: string;
};

type ClienteleCarouselProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  items: ClienteleCard[];
};

export function ClienteleCarousel({
  eyebrow,
  title,
  description,
  cta,
  items,
}: ClienteleCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: true });

  const sync = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setCanScroll({
      previous: track.scrollLeft > 8,
      next: track.scrollLeft < max - 8,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");

    if (!track || !card) return;

    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-oxblood">{eyebrow}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1.02]">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-taupe">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <Link href={cta.href} className="text-link">
                {cta.label}
                <ArrowUpRight />
              </Link>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScroll.previous}
                aria-label="Previous stories"
                className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScroll.next}
                aria-label="More stories"
                className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:mt-16"
        >
          {items.map((item, index) => (
            <li
              key={item.slug}
              data-card
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%] xl:w-[27.5%]"
            >
              <Link href={`/stories/${item.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                    quality={78}
                    className="image-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute left-5 top-5 text-[0.6rem] font-semibold tracking-[0.24em] text-bone/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-bone/35 text-bone opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight width={15} height={15} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-bone/60">
                      {item.category} · {item.location}
                    </p>
                    <h3
                      className={cx(
                        "display mt-2 text-[1.65rem] leading-tight text-bone",
                        "transition-transform duration-500 group-hover:-translate-y-0.5",
                      )}
                    >
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 sm:hidden">
          <Link href={cta.href} className="text-link">
            {cta.label}
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
