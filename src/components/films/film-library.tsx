"use client";

import Image from "next/image";
import { useState } from "react";
import { films, type Film } from "@/content/films";
import { Play } from "@/components/ui/icons";
import { FilmDialog } from "@/components/films/film-dialog";

export function FilmLibrary() {
  const [active, setActive] = useState<Film | null>(null);
  const [featured, ...collection] = films;

  return (
    <section className="bg-ink py-20 text-bone md:py-28 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-bone/45">The collection</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02]">
              Eight weddings,{" "}
              <em className="display-italic text-red-bright">eight films.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[0.9rem] leading-[1.8] text-bone/50">
            Each film is cut from the day as it happened — the vows, the music, the people in the
            room. Press play when you are ready.
          </p>
        </div>

        {featured ? (
          <button
            type="button"
            onClick={() => setActive(featured)}
            aria-label={`Play ${featured.name} wedding film`}
            className="group relative mt-12 block w-full overflow-hidden text-left md:mt-16"
          >
            <div className="relative aspect-[16/9] bg-wine/30 md:aspect-[21/9]">
              <Image
                src={featured.poster}
                alt={featured.posterAlt}
                fill
                sizes="100vw"
                quality={82}
                className="image-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-ink/15" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex size-20 items-center justify-center rounded-full border border-bone/45 bg-ink/25 text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-bone group-hover:text-ink">
                  <Play width={24} height={24} className="translate-x-0.5" />
                </span>
              </span>
              <span className="absolute left-6 top-6 border border-bone/30 bg-ink/35 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/80 backdrop-blur-sm md:left-8 md:top-8">
                Featured film
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-bone/55">
                  {featured.category} · {featured.location}
                </span>
                <span className="display mt-2 block text-[clamp(1.8rem,4vw,3.4rem)] leading-tight">
                  {featured.name}
                </span>
              </span>
            </div>
          </button>
        ) : null}

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collection.map((film) => (
            <li key={film.id}>
              <button
                type="button"
                onClick={() => setActive(film)}
                aria-label={`Play ${film.name} wedding film`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-video overflow-hidden bg-wine/25">
                  <Image
                    src={film.poster}
                    alt={film.posterAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    className="image-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="flex size-12 items-center justify-center rounded-full border border-bone/45 bg-ink/25 text-bone backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-bone group-hover:text-ink">
                      <Play width={14} height={14} className="translate-x-px" />
                    </span>
                  </span>
                </span>
                <span className="mt-3 block border-t border-bone/10 pt-3">
                  <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-bone/40">
                    {film.category}
                  </span>
                  <span className="display mt-1 block text-xl transition-colors group-hover:text-red-bright">
                    {film.name}
                  </span>
                  <span className="mt-1 block text-[0.68rem] text-bone/40">{film.location}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <FilmDialog film={active} onClose={() => setActive(null)} />
    </section>
  );
}
