import data from "@/content/stories.json";

export type StoryImage = {
  id: string;
  src: string;
  width?: number;
  height?: number;
  layout?: "wide" | "half" | "centered";
  alt?: string;
};

export type WeddingDetail = {
  label: string;
  value: string;
};

export type ClientStory = {
  id: number;
  slug: string;
  published: boolean;
  isHomepage: boolean;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  imagePosition: "left" | "right";
  homepageOrder?: number;
  listingOrder: number;
  cardLayout: "landscape" | "portrait";
  filter: string;
  heroImage?: string;
  introQuote?: string;
  introText?: string;
  storyParagraphs?: string[];
  weddingDetails?: WeddingDetail[];
  storyImages: StoryImage[];
};

type Listing = {
  heading: string;
  heroImage: string;
  heroImageAlt: string;
  heroText: { title: string; description: string };
  closingImage: string;
  closingImageAlt: string;
  filters: { id: string; label: string }[];
};

export const storiesListing = data.listing as Listing;

export const allStories = data.stories as ClientStory[];

export const publishedStories = [...allStories]
  .filter((story) => story.published)
  .sort((a, b) => a.listingOrder - b.listingOrder);

export const portfolioFilters: { id: string; label: string }[] = [
  ...storiesListing.filters,
  { id: "couple-portraits", label: "Couple portraits" },
];

export function getStory(slug: string) {
  return publishedStories.find((story) => story.slug === slug);
}

export function getAdjacentStories(slug: string) {
  const index = publishedStories.findIndex((story) => story.slug === slug);
  const count = publishedStories.length;

  return {
    previous: publishedStories[(index - 1 + count) % count],
    next: publishedStories[(index + 1) % count],
  };
}

export function matchesFilter(story: ClientStory, selected: string) {
  if (selected === "all") return true;
  if (selected === "weddings") {
    return story.filter === "weddings" || story.filter === "brahmin-weddings";
  }
  return story.filter === selected;
}

const categoryLabels: Record<string, string> = {
  weddings: "Wedding",
  "brahmin-weddings": "Brahmin wedding",
  "pre-weddings": "Pre-wedding story",
  "baby-shower": "Baby shower",
  maternity: "Maternity",
  "bride-stories": "Bride portraits",
  "couple-portraits": "Couple portraits",
};

export function storyCategory(story: ClientStory) {
  return categoryLabels[story.filter] ?? "Wedding story";
}

export const clienteleStories = publishedStories.filter(
  (story) => story.slug !== "kavin-yazhini",
);
