import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import StoryDetail from "@/Components/Stories/StoryDetail";
import { getStory, publishedStories } from "@/lib/client-stories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishedStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  return {
    title: `${story.name} | Wedding Stories | 7C Studio`,
    description: story.introText ?? story.description,
  };
}

export default function StoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={<div className="min-h-screen animate-pulse bg-white" />}
    >
      <StoryContent params={params} />
    </Suspense>
  );
}

async function StoryContent({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const index = publishedStories.findIndex((entry) => entry.slug === slug);

  return (
    <StoryDetail
      story={story}
      previous={publishedStories[index - 1]}
      next={publishedStories[index + 1]}
    />
  );
}
