import Image from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  priority?: boolean;
  meta?: ReactNode;
  size?: "screen" | "tall" | "compact";
};

const heights = {
  screen: "min-h-[100svh]",
  tall: "min-h-[82svh] lg:min-h-[88svh]",
  compact: "min-h-[68svh]",
};

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  imagePosition = "center",
  priority = false,
  meta,
  size = "tall",
}: PageHeroProps) {
  return (
    <section
      className={cx(
        "relative isolate flex flex-col justify-end overflow-hidden bg-ink text-bone",
        heights[size],
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        quality={82}
        className="image-cover -z-20 animate-soft"
        style={{ objectPosition: imagePosition }}
      />
      <div className="scrim-full absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-ink/70 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink via-ink/55 to-transparent" />

      <div className="container-page pb-14 pt-[calc(var(--header-height)+4rem)] md:pb-20">
        <div className="max-w-5xl">
          <p className="eyebrow animate-rise text-bone/65">{eyebrow}</p>
          <h1
            className="display animate-rise mt-6 text-[clamp(3.2rem,8.4vw,7.6rem)] leading-[0.96]"
            style={{ animationDelay: "90ms" }}
          >
            {title}
            {accent ? (
              <>
                {" "}
                <em className="display-italic text-red-bright">{accent}</em>
              </>
            ) : null}
          </h1>
          {description ? (
            <p
              className="animate-rise mt-7 max-w-2xl text-[0.98rem] leading-[1.85] text-bone/68 md:text-[1.05rem]"
              style={{ animationDelay: "180ms" }}
            >
              {description}
            </p>
          ) : null}
          {meta ? (
            <div className="animate-rise mt-8" style={{ animationDelay: "260ms" }}>
              {meta}
            </div>
          ) : null}
        </div>
      </div>
      <div className="container-page">
        <hr className="hairline text-bone/20" />
      </div>
    </section>
  );
}
