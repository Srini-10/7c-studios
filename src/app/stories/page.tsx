import type { Metadata } from "next";
import { PortfolioGallery, type PortfolioCard } from "@/components/stories/portfolio-gallery";
import { PageHero } from "@/components/ui/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  portfolioFilters,
  publishedStories,
  storiesListing,
  storyCategory,
} from "@/lib/stories";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A portfolio of South Indian weddings, pre-weddings, bride portraits and celebrations photographed by 7C Studio — quiet, honest and made to be remembered.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Portfolio — 7C Studio",
    description:
      "A portfolio of South Indian weddings, pre-weddings, bride portraits and celebrations photographed by 7C Studio.",
    images: ["/images/heroes/portfolio.webp"],
  },
};

export default function StoriesPage() {
  const cards: PortfolioCard[] = publishedStories.map((story) => ({
    slug: story.slug,
    name: story.name,
    category: storyCategory(story),
    location: story.location,
    filter: story.filter,
    layout: story.cardLayout,
    image: story.image,
    imageAlt: story.imageAlt,
  }));

  return (
    <>
      <PageHero
        eyebrow="Selected work · 2014 — 2026"
        title="Portfolio"
        accent="of stories."
        description={storiesListing.heroText.description}
        image="/images/heroes/portfolio.webp"
        imageAlt="A bride and groom wearing jasmine garlands during a South Indian wedding ceremony"
        imagePosition="center 40%"
        priority
        meta={
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-bone/45">
            <span>{publishedStories.length} published stories</span>
            <span>Weddings · Pre-weddings · Portraits</span>
            <span>Salem · Tamil Nadu</span>
          </div>
        }
      />

      <PortfolioGallery items={cards} filters={portfolioFilters} />

      <ClosingCta
        image="/images/heroes/story-closing.webp"
        imageAlt="A couple in silhouette against a dusk sky"
        title="Your story, next."
        description="Tell us about your celebration — the people, the place and the feeling you want to hold on to."
        cta={{ label: "Start a conversation", href: "/contact#contact-form" }}
        imagePosition="center 58%"
      />
    </>
  );
}
