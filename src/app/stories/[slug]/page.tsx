import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections/closing-cta";
import { StoryGallery } from "@/components/stories/story-gallery";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import {
  getAdjacentStories,
  getStory,
  publishedStories,
  storyCategory,
} from "@/lib/stories";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return { title: "Story not found" };
  }

  const description = story.description.slice(0, 158);

  return {
    title: `${story.name} — ${storyCategory(story)}`,
    description,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      type: "article",
      title: `${story.name} — 7C Studio`,
      description,
      images: [{ url: story.image, alt: story.imageAlt }],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const adjacent = getAdjacentStories(slug);
  const paragraphs =
    story.storyParagraphs && story.storyParagraphs.length
      ? story.storyParagraphs
      : [story.description];
  const lead = story.introText ?? story.introQuote;
  const hasGallery = story.storyImages.length > 1;

  const baseDetails = [
    { label: "Category", value: storyCategory(story) },
    { label: "Location", value: story.location },
    { label: "Photography", value: "7C Studio" },
  ];
  const baseLabels = new Set(baseDetails.map((detail) => detail.label.toLowerCase()));
  const details = [
    ...baseDetails,
    ...(story.weddingDetails ?? []).filter(
      (detail) => !baseLabels.has(detail.label.toLowerCase()),
    ),
  ];

  return (
    <article>
      <section className="grain relative isolate overflow-hidden bg-ink pb-14 pt-[calc(var(--header-height)+4.5rem)] text-bone md:pb-20 md:pt-[calc(var(--header-height)+6.5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(125,23,20,0.34),transparent_68%)]"
        />
        <div className="container-page">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-bone/45 transition hover:text-bone"
          >
            <ChevronLeft width={15} height={15} />
            All stories
          </Link>

          <div className="mt-10 max-w-5xl">
            <p className="eyebrow animate-rise text-bone/50">{storyCategory(story)}</p>
            <h1
              className="display animate-rise mt-5 text-[clamp(3rem,8vw,7.4rem)] leading-[0.95]"
              style={{ animationDelay: "90ms" }}
            >
              {story.name}
            </h1>
          </div>

          <div
            className="animate-rise mt-12 flex flex-col gap-5 border-t border-bone/12 pt-6 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-bone/45 sm:flex-row sm:items-center sm:justify-between"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <span>{story.location}</span>
              <span>{storyCategory(story)}</span>
              <span>Photographed by 7C Studio</span>
            </div>
            <span>{hasGallery ? `${story.storyImages.length} photographs` : "A single frame"}</span>
          </div>
        </div>
      </section>

      <section className="bg-ink pb-20 text-bone md:pb-28">
        <div className="container-page">
          <figure
            className={
              story.cardLayout === "portrait"
                ? "relative mx-auto aspect-[3/4] w-full max-w-2xl overflow-hidden bg-wine/30"
                : "relative aspect-[16/10] w-full overflow-hidden bg-wine/30"
            }
          >
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              sizes={
                story.cardLayout === "portrait"
                  ? "(max-width: 768px) 100vw, 640px"
                  : "(max-width: 1440px) 100vw, 1440px"
              }
              quality={85}
              className="image-cover"
              style={{ objectPosition: story.imageObjectPosition ?? "center" }}
            />
            <hr className="absolute inset-x-0 bottom-0 h-px border-0 bg-bone/15" />
          </figure>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <dl className="border-t border-ink/12">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4"
                >
                  <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-taupe">
                    {detail.label}
                  </dt>
                  <dd className="text-right text-[0.8rem] text-ink/75">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {lead ? (
              <blockquote className="display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.15] text-ink">
                <span className="text-oxblood">“</span>
                {lead}
                <span className="text-oxblood">”</span>
              </blockquote>
            ) : null}
            <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.9] text-taupe">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {hasGallery ? (
        <section className="bg-paper pb-20 text-ink md:pb-28">
          <div className="container-page">
            <div className="flex items-end justify-between gap-6 border-t border-ink/12 pt-8">
              <h2 className="display text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">
                More from the day
              </h2>
              <p className="hidden text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-taupe sm:block">
                {String(story.storyImages.length).padStart(2, "0")} frames
              </p>
            </div>
            <div className="mt-10">
              <StoryGallery images={story.storyImages} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-bone/10 bg-ink py-14 text-bone md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { label: "Previous story", story: adjacent.previous, align: "left" as const },
            { label: "Next story", story: adjacent.next, align: "right" as const },
          ].map((item) => (
            <Link
              key={item.label}
              href={`/stories/${item.story.slug}`}
              className={
                item.align === "right"
                  ? "group flex items-center justify-between gap-6 border border-bone/12 p-5 transition-colors hover:border-bone/30 md:flex-row-reverse md:text-right"
                  : "group flex items-center justify-between gap-6 border border-bone/12 p-5 transition-colors hover:border-bone/30"
              }
            >
              <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden bg-wine/30 sm:w-32">
                <Image
                  src={item.story.image}
                  alt=""
                  fill
                  sizes="128px"
                  quality={65}
                  className="image-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-bone/40">
                  {item.align === "right" ? <ChevronRight width={12} height={12} /> : null}
                  {item.label}
                  {item.align === "left" ? <ChevronLeft width={12} height={12} /> : null}
                </span>
                <span className="display mt-2 block truncate text-2xl">{item.story.name}</span>
              </span>
              <ArrowUpRight className="shrink-0 text-bone/30 transition group-hover:text-red-bright" />
            </Link>
          ))}
        </div>
      </section>

      <ClosingCta
        image="/images/heroes/story-closing.webp"
        imageAlt="A couple in silhouette against a dusk sky"
        title="Your day, remembered."
        description="Tell us about the celebration you are planning. We would love to hear its story."
        cta={{ label: "Start a conversation", href: "/contact#contact-form" }}
        imagePosition="center 58%"
      />
    </article>
  );
}
