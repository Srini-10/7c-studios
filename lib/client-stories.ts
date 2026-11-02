import data from "@/data/clientStories.json";

export type StoryImage = {
  id: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  layout?: string;
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
  imagePosition: string;
  imageObjectPosition?: string;
  homepageOrder?: number;
  listingOrder: number;
  cardLayout: string;
  filter: string;
  heroImage?: string;
  introQuote?: string;
  introText?: string;
  storyParagraphs?: string[];
  weddingDetails?: { label: string; value: string }[];
  storyImages: StoryImage[];
};

export const clientStories: {
  eyebrow: string;
  heading: string;
  description: string;
  listing: {
    heading: string;
    heroImage: string;
    heroImageAlt: string;
    heroText: { title: string; description: string };
    closingImage: string;
    closingImageAlt: string;
    filters: { id: string; label: string }[];
  };
  stories: ClientStory[];
} = data;

export const publishedStories = clientStories.stories
  .filter((story) => story.published)
  .sort((a, b) => a.listingOrder - b.listingOrder);

export function getStory(slug: string) {
  return publishedStories.find((story) => story.slug === slug);
}
