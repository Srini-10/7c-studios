import type { Metadata } from "next";
import StoriesGallery from "@/Components/Stories/StoriesGallery";
import StoriesHero from "@/Components/Stories/StoriesHero";
import { clientStories } from "@/lib/client-stories";

export const metadata: Metadata = {
  title: "Wedding Stories | 7C Studio",
  description:
    "Explore the love stories, heartfelt moments and wedding photographs captured by 7C Studio.",
};

const excludedListingSlugs = new Set(["kavin-yazhini"]);

export default function StoriesPage() {
  const { listing } = clientStories;
  const stories = [...clientStories.stories]
    .filter((story) => !excludedListingSlugs.has(story.slug))
    .sort((a, b) => a.listingOrder - b.listingOrder)
    .map(({ id, slug, published, name, category, location, image, imageAlt, listingOrder, cardLayout, filter }) => ({
      id, slug, published, name, category, location, image, imageAlt, listingOrder, cardLayout, filter,
    }));

  return (
    <div className="bg-white">
      <StoriesHero />
      <StoriesGallery heading={listing.heading} stories={stories} filters={listing.filters} />
    </div>
  );
}
