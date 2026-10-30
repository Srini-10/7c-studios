import { ApproachSection } from "@/components/home/approach-section";
import { ClienteleCarousel, type ClienteleCard } from "@/components/home/clientele-carousel";
import { HomeHero } from "@/components/home/home-hero";
import { InstagramReels } from "@/components/home/instagram-reels";
import { LoveInMotion } from "@/components/home/love-in-motion";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { home } from "@/content/home";
import { clienteleStories, storyCategory } from "@/lib/stories";

export default function HomePage() {
  const clientele: ClienteleCard[] = clienteleStories.map((story) => ({
    slug: story.slug,
    name: story.name,
    location: story.location,
    category: storyCategory(story),
    image: story.image,
    imageAlt: story.imageAlt,
  }));

  return (
    <>
      <HomeHero />
      <ApproachSection />
      <WhyChooseSection />
      <ClienteleCarousel
        eyebrow={home.clientele.eyebrow}
        title={home.clientele.title}
        description={home.clientele.description}
        cta={home.clientele.cta}
        items={clientele}
      />
      <LoveInMotion />
      <InstagramReels />
    </>
  );
}
