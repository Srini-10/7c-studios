"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { StoryImage } from "@/lib/stories";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { MediaDialog } from "@/components/ui/media-dialog";

export function StoryGallery({ images }: { images: StoryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActive((current) => (current === null ? null : (current + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, images.length]);

  const current = active === null ? null : images[active];

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:gap-6">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View photograph ${index + 1} of ${images.length}`}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-sand text-left lg:mb-6"
          >
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              width={image.width ?? 1600}
              height={image.height ?? 1200}
              sizes="(max-width: 640px) 100vw, 50vw"
              quality={80}
              className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
            />
            <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/45 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/80">
                View · {String(index + 1).padStart(2, "0")}
              </span>
            </span>
          </button>
        ))}
      </div>

      <MediaDialog
        open={active !== null}
        onClose={() => setActive(null)}
        label={current ? `Photograph ${active! + 1} of ${images.length}` : "Photograph viewer"}
        panelClassName="flex w-full max-w-6xl flex-col items-center px-4"
      >
        {current ? (
          <div className="flex w-full flex-col items-center pb-6">
            <Image
              src={current.src}
              alt={current.alt ?? ""}
              width={current.width ?? 1600}
              height={current.height ?? 1200}
              sizes="90vw"
              quality={90}
              className="max-h-[76svh] w-auto max-w-full object-contain"
            />
            <div className="mt-4 flex w-full items-center justify-between gap-6">
              <button
                type="button"
                onClick={() =>
                  setActive((value) =>
                    value === null ? null : (value - 1 + images.length) % images.length,
                  )
                }
                aria-label="Previous photograph"
                className="inline-flex size-10 items-center justify-center rounded-full border border-bone/25 text-bone transition hover:border-bone hover:bg-bone hover:text-ink"
              >
                <ChevronLeft />
              </button>
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-bone/45">
                {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() =>
                  setActive((value) => (value === null ? null : (value + 1) % images.length))
                }
                aria-label="Next photograph"
                className="inline-flex size-10 items-center justify-center rounded-full border border-bone/25 text-bone transition hover:border-bone hover:bg-bone hover:text-ink"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ) : null}
      </MediaDialog>
    </>
  );
}
