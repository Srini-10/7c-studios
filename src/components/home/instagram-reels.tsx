"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { home } from "@/content/home";
import { reels, type Reel } from "@/content/instagram";
import { ArrowUpRight, Instagram, Play } from "@/components/ui/icons";
import { MediaDialog } from "@/components/ui/media-dialog";

export function InstagramReels() {
  const [active, setActive] = useState<Reel | null>(null);

  return (
    <section className="bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-oxblood">{home.instagram.eyebrow}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1.02]">
              Small moments,{" "}
              <em className="display-italic text-oxblood">in motion.</em>
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-taupe">
              {home.instagram.description}
            </p>
          </div>
          <a
            href={home.instagram.href}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-outline-dark shrink-0"
          >
            <Instagram />
            {home.instagram.cta}
          </a>
        </div>

        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-16 md:gap-5">
          {reels.map((reel, index) => (
            <li
              key={reel.id}
              className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:w-[23.5%] xl:w-[19%]"
            >
              <ReelCard reel={reel} index={index} onOpen={() => setActive(reel)} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6 text-[0.7rem] text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>Select a reel to watch in full. Hover previews on desktop.</p>
          <a
            href={home.instagram.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-ink/55 transition hover:text-oxblood"
          >
            {home.instagram.handle}
            <ArrowUpRight width={13} height={13} />
          </a>
        </div>
      </div>

      <MediaDialog
        open={Boolean(active)}
        onClose={() => setActive(null)}
        label={active ? `${active.title} Instagram reel` : "Instagram reel"}
        panelClassName="flex w-full max-w-[32rem] flex-col items-center px-4"
      >
        {active ? (
          <div className="w-full pb-6">
            <video
              key={active.id}
              src={active.video}
              poster={active.poster}
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="none"
              className="mx-auto max-h-[76svh] w-auto max-w-full bg-ink"
            />
            <div className="mt-5 flex flex-row items-end justify-between gap-4 px-1">
              <div>
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/45">
                  Instagram · 7C Studio
                </p>
                <h2 className="display mt-1 text-2xl">{active.title}</h2>
              </div>
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-link shrink-0 text-bone/75"
              >
                View on Instagram
                <ArrowUpRight />
              </a>
            </div>
          </div>
        ) : null}
      </MediaDialog>
    </section>
  );
}

function ReelCard({
  reel,
  index,
  onOpen,
}: {
  reel: Reel;
  index: number;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => {
        const video = videoRef.current;
        if (!video) return;
        void video.play().catch(() => undefined);
      }}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
      }}
      aria-label={`Play reel: ${reel.title}`}
      className="group relative block w-full overflow-hidden bg-ink text-left"
    >
      <span className="relative block aspect-[9/16] overflow-hidden">
        <Image
          src={reel.poster}
          alt=""
          fill
          sizes="(max-width: 640px) 62vw, (max-width: 1024px) 36vw, 20vw"
          quality={70}
          className="image-cover"
        />
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />
        <span className="absolute left-4 top-4 flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-bone/70">
          <Instagram width={13} height={13} />
          Reel {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border border-bone/40 bg-ink/30 text-bone backdrop-blur-sm transition-all duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
          <Play width={12} height={12} className="translate-x-px" />
        </span>
        <span className="absolute inset-x-4 bottom-4 pr-14">
          <span className="display block text-[1.2rem] leading-tight text-bone">{reel.title}</span>
        </span>
      </span>
    </button>
  );
}
