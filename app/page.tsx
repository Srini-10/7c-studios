import OurApproach from "@/Components/Home/OurApproach";
import HeroSection from "../Components/Home/HeroSection";
import WhyChoose from "@/Components/Home/WhyChoose";
import ClientStories from "@/Components/Home/ClientStories";
import FeaturedFilm from "@/Components/Home/FeaturedFilm";
import InstagramGallery from "@/Components/Home/InstagramGallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="relative z-10 flow-root bg-[#FAEBD7]">
        <OurApproach />
        <WhyChoose />
        <ClientStories />
        <FeaturedFilm />
        <InstagramGallery />
      </div>
    </>
  );
}
