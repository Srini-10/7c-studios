"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

export type PortfolioCard = {
  slug: string;
  name: string;
  category: string;
  location: string;
  filter: string;
  layout: "landscape" | "portrait";
  image: string;
  imageAlt: string;
};

type PortfolioGalleryProps = {
  items: PortfolioCard[];
  filters: { id: string; label: string }[];
};

function matches(card: PortfolioCard, selected: string) {
  if (selected === "all") return true;
  if (selected === "weddings") {
    return card.filter === "weddings" || card.filter === "brahmin-weddings";
  }
  return card.filter === selected;
}

export function PortfolioGallery({ items, filters }: PortfolioGalleryProps) {
  const [selected, setSelected] = useState("all");

  const visible = useMemo(
    () => items.filter((item) => matches(item, selected)),
    [items, selected],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();

    for (const filter of filters) {
      map.set(filter.id, items.filter((item) => matches(item, filter.id)).length);
    }

    return map;
  }, [filters, items]);

  return (
    <section className="bg-paper pb-20 text-ink md:pb-28 lg:pb-32">
      <div className="sticky top-[var(--header-height)] z-30 border-y border-ink/10 bg-paper/92 backdrop-blur-md">
        <div className="container-page flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter portfolio"
            className="no-scrollbar flex gap-2 overflow-x-auto"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected === filter.id}
                onClick={() => setSelected(filter.id)}
                className="pill shrink-0"
              >
                {filter.label}
                <span className="ml-2 text-[0.55rem] font-medium tracking-widest opacity-45">
                  {counts.get(filter.id) ?? 0}
                </span>
              </button>
            ))}
          </div>
          <p
            aria-live="polite"
            className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-taupe"
          >
            {visible.length} {visible.length === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>

      <div className="container-page pt-10 md:pt-14">
        {visible.length ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
            {visible.map((story, index) => (
              <Link
                key={`${selected}-${story.slug}`}
                href={`/stories/${story.slug}`}
                className="group mb-5 block break-inside-avoid animate-soft lg:mb-6"
              >
                <div
                  className={cx(
                    "relative overflow-hidden bg-sand",
                    story.layout === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={78}
                    className="image-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-5 top-5 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/70">
                    {story.category}
                  </span>
                  <span className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-bone/35 text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <ArrowUpRight width={14} height={14} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-bone">
                      {story.name}
                    </h2>
                    <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-bone/55">
                      {story.location}
                    </p>
                  </div>
                </div>
                <span className="sr-only">
                  {String(index + 1).padStart(2, "0")} — open story
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-taupe">
            No stories in this collection yet.
          </p>
        )}
      </div>
    </section>
  );
}
