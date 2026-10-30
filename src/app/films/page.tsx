import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FilmLibrary } from "@/components/films/film-library";
import { PosterStories } from "@/components/films/poster-stories";
import { PageHero } from "@/components/ui/page-hero";
import { films, filmsHero } from "@/content/films";

export const metadata: Metadata = {
  title: "Wedding films",
  description:
    "Cinematic wedding films by 7C Studio — vows, music and the people in the room, cut as short documentaries across South India.",
  alternates: { canonical: "/films" },
  openGraph: {
    title: "Wedding films — 7C Studio",
    description:
      "Cinematic wedding films by 7C Studio — vows, music and the people in the room.",
    images: ["/images/heroes/films.webp"],
  },
};

export default function FilmsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Wedding films · ${films.length} selected`}
        title="Moments"
        accent="that move."
        description={filmsHero.description}
        image={filmsHero.image.src}
        imageAlt={filmsHero.image.alt}
        imagePosition="center 38%"
        priority
        meta={
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-bone/45">
            <span>Documentary-led</span>
            <span>Original sound</span>
            <span>South India & beyond</span>
          </div>
        }
      />
      <FilmLibrary />
      <PosterStories />
      <ClosingCta
        image="/images/heroes/film-closing.webp"
        imageAlt="A couple walking together in warm evening light"
        title="Let’s make your film."
        description="Tell us about your day and the feeling you want to remember. We will take it from there."
        cta={{ label: "Start a conversation", href: "/contact#contact-form" }}
        imagePosition="center 50%"
        eyebrow="Films & photography"
      />
    </>
  );
}
