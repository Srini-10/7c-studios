import type { Metadata } from "next";
import Image from "next/image";
import StoriesGallery from "@/Components/Stories/StoriesGallery";
import { clientStories } from "@/lib/client-stories";
import styles from "@/Components/Stories/StoriesHero.module.css";

export const metadata: Metadata = {
  title: "Wedding Stories | 7C Studio",
  description:
    "Explore the love stories, heartfelt moments and wedding photographs captured by 7C Studio.",
};

export default function StoriesPage() {
  const { listing } = clientStories;
  const stories = [...clientStories.stories]
    .sort((a, b) => a.listingOrder - b.listingOrder)
    .map(({ id, slug, published, name, category, location, image, imageAlt, listingOrder, cardLayout, filter }) => ({
      id, slug, published, name, category, location, image, imageAlt, listingOrder, cardLayout, filter,
    }));

  return (
    <div className="bg-white">
      <section aria-labelledby="stories-hero-title" className={styles.hero}>
        <Image
          src={listing.heroImage}
          alt={listing.heroImageAlt}
          fill
          preload
          quality={90}
          // Match the covered image width to the photo's approximately 3:2 ratio.
          sizes="(max-width: 767px) max(100vw, 150svh, 54rem), max(100vw, min(106.8vw, 1650px), 600px)"
          className={styles.image}
        />
        <div aria-hidden="true" className={styles.shade} />
        <div className={styles.content}>
          <h1 id="stories-hero-title" className={styles.title}>{listing.heroText.title}</h1>
          <p className={styles.description}>{listing.heroText.description}</p>
        </div>
      </section>
      <StoriesGallery heading={listing.heading} stories={stories} filters={listing.filters} />
    </div>
  );
}
