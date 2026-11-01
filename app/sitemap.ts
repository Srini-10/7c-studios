import type { MetadataRoute } from "next";
import { publishedStories } from "@/lib/client-stories";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/stories", "/films", "/contact"].map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const storyRoutes = publishedStories.map((story) => ({
    url: new URL(`/stories/${story.slug}`, siteUrl).toString(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...storyRoutes];
}
