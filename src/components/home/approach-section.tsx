import Image from "next/image";
import { home } from "@/content/home";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";

export function ApproachSection() {
  return (
    <section className="relative bg-paper py-20 text-ink md:py-28 lg:py-36">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={home.approach.image.src}
              alt={home.approach.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              quality={80}
              className="image-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035]"
              style={{ objectPosition: "58% center" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
            <p className="absolute bottom-5 left-5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-bone/70">
              The archive · Salem
            </p>
          </div>
          <span
            aria-hidden
            className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 border-b border-l border-oxblood/30 md:-bottom-6 md:-left-6 md:h-36 md:w-36"
          />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow text-oxblood">{home.approach.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[1.02]">
              {home.approach.title[0]}
              <br />
              {home.approach.title[1]}{" "}
              <em className="display-italic font-normal text-oxblood">
                {home.approach.accent}
              </em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 max-w-xl space-y-5 text-[0.95rem] leading-[1.9] text-taupe">
              {home.approach.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10">
              <ArrowLink href="/about">Meet the studio</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
