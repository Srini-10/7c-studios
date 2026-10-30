"use client";

import Link from "next/link";
import type { Film } from "@/content/films";
import { ArrowUpRight } from "@/components/ui/icons";
import { FilmPlayer } from "@/components/ui/film-player";
import { MediaDialog } from "@/components/ui/media-dialog";
import { youtubeWatchUrl } from "@/lib/youtube";

type FilmDialogProps = {
  film: Film | null;
  onClose: () => void;
};

export function FilmDialog({ film, onClose }: FilmDialogProps) {
  return (
    <MediaDialog
      open={Boolean(film)}
      onClose={onClose}
      label={film ? `${film.name} film player` : "Film player"}
      panelClassName="w-full max-w-5xl px-3 md:px-6"
    >
      {film ? (
        <div>
          <FilmPlayer film={film} />
          <div className="mt-5 flex flex-col gap-4 px-1 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-bone/45">
                {film.category} · {film.location}
              </p>
              <h2 className="display mt-1 text-3xl">{film.name}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone/55">
                {film.description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              {film.source.type === "youtube" ? (
                <a
                  href={youtubeWatchUrl(film.source.videoId)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-link text-bone/70"
                >
                  YouTube
                  <ArrowUpRight />
                </a>
              ) : null}
              <Link href="/films" className="text-link text-bone/70">
                All films
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </MediaDialog>
  );
}
