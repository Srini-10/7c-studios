"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { home } from "@/content/home";
import { featuredFilms, type Film } from "@/content/films";
import { ArrowUpRight, Play } from "@/components/ui/icons";
import { FilmDialog } from "@/components/films/film-dialog";

export function LoveInMotion() {
  const [active, setActive] = useState<Film | null>(null);
  const [featured, ...rest] = featuredFilms;

  return (
    <section className="bg-ink py-20 text-bone md:py-28 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-bone/45">{home.films.eyebrow}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1.02]">
              {home.films.titleLead}{" "}
              <em className="display-italic text-red-bright">{home.films.titleAccent}</em>
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-bone/58">
              {home.films.description}
            </p>
          </div>
          <Link href={home.films.cta.href} className="text-link shrink-0">
            {home.films.cta.label}
            <ArrowUpRight />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {featured ? (
            <div className="lg:col-span-7">
              <button
                type="button"
                onClick={() => setActive(featured)}
                aria-label={`Play ${featured.name} wedding film`}
                className="group relative block w-full overflow-hidden text-left"
              >
                <div className="relative aspect-video bg-wine/40">
                  <Image
                    src={featured.poster}
                    alt={featured.posterAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    quality={82}
                    className="image-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-ink/10" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="flex size-[4.5rem] items-center justify-center rounded-full border border-bone/45 bg-ink/25 text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                      <Play width={22} height={22} className="translate-x-0.5" />
                    </span>
                  </span>
                  <span className="absolute left-6 top-6 border border-bone/30 bg-ink/35 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/80 backdrop-blur-sm">
                    Featured film
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-bone/55">
                      {featured.category} · {featured.location}
                    </p>
                    <h3 className="display mt-2 text-[clamp(1.7rem,3.2vw,2.6rem)] leading-tight">
                      {featured.name}
                    </h3>
                  </div>
                </div>
              </button>
            </div>
          ) : null}

          <ul className="flex flex-col justify-between lg:col-span-5">
            {rest.map((film) => (
              <li key={film.id} className="border-t border-bone/10 last:border-b">
                <button
                  type="button"
                  onClick={() => setActive(film)}
                  aria-label={`Play ${film.name} wedding film`}
                  className="group flex w-full items-center gap-5 py-4 text-left transition-colors hover:bg-bone/[0.03]"
                >
                  <span className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden bg-wine/30 sm:w-32">
                    <Image
                      src={film.poster}
                      alt={film.posterAlt}
                      fill
                      sizes="128px"
                      quality={70}
                      className="image-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-ink/20">
                      <span className="flex size-8 items-center justify-center rounded-full border border-bone/50 bg-ink/30 text-bone backdrop-blur-sm transition group-hover:bg-bone group-hover:text-ink">
                        <Play width={11} height={11} className="translate-x-px" />
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/40">
                      {film.category}
                    </span>
                    <span className="display mt-1 block text-xl leading-snug text-bone transition-colors group-hover:text-red-bright">
                      {film.name}
                    </span>
                    <span className="mt-1 block text-[0.7rem] text-bone/40">{film.location}</span>
                  </span>
                  <ArrowUpRight
                    width={16}
                    height={16}
                    className="shrink-0 text-bone/25 transition group-hover:text-red-bright"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FilmDialog film={active} onClose={() => setActive(null)} />
    </section>
  );
}
