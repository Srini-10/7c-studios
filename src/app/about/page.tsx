import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/about";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = {
  title: "About the studio",
  description:
    "Meet 7C Studio — a wedding photography and film studio in Salem, South India, working quietly to preserve feeling, tradition and the people at the centre of every celebration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        accent={about.hero.accent}
        description={about.hero.description}
        image={about.hero.image.src}
        imageAlt={about.hero.image.alt}
        imagePosition="center 42%"
        priority
      />

      <section className="bg-paper pt-20 text-ink md:pt-28 lg:pt-32">
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-oxblood">{about.manifesto.eyebrow}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8 lg:col-start-5">
            <p className="display text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08]">
              We capture more than moments.{" "}
              <em className="display-italic text-oxblood">We preserve the feeling.</em>
            </p>
            <p className="mt-8 max-w-2xl text-[0.95rem] leading-[1.9] text-taupe">
              {about.manifesto.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-20 pt-16 text-ink md:pb-28 md:pt-24 lg:pb-32">
        <div className="container-page grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image
                  src={about.story.image.src}
                  alt={about.story.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={82}
                  className="image-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.03]"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
              <figcaption className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-taupe">
                {about.story.image.credit}
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <Reveal>
              <p className="eyebrow text-oxblood">{about.story.eyebrow}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[1.04]">
                {about.story.heading[0]}
                <br />
                <em className="display-italic text-oxblood">{about.story.heading[1]}</em>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.9] text-taupe">
                {about.story.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-9">
                <ArrowLink href="/stories">See the work</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-bone md:py-28 lg:py-32">
        <div className="container-page">
          <Reveal>
            <div className="max-w-4xl">
              <p className="eyebrow text-bone/45">{about.craft.eyebrow}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[1.02]">
                {about.craft.heading}{" "}
                <em className="display-italic text-red-bright">{about.craft.accent}</em>
              </h2>
              <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.85] text-bone/55">
                {about.craft.description}
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-x-16 md:mt-20 md:grid-cols-2">
            {about.craft.principles.map((principle, index) => (
              <li key={principle.number} className="border-t border-bone/12 py-8 md:py-10">
                <Reveal delay={index * 70}>
                  <div className="flex items-baseline gap-5">
                    <span className="text-[0.6rem] font-semibold tracking-[0.24em] text-bone/35">
                      {principle.number}
                    </span>
                    <div>
                      <h3 className="display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight">
                        {principle.title}
                      </h3>
                      <p className="mt-3 max-w-md text-[0.88rem] leading-[1.85] text-bone/50">
                        {principle.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink md:py-28 lg:py-32">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-oxblood">{about.team.eyebrow}</p>
                <h2 className="display mt-5 text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02]">
                  {about.team.heading}
                </h2>
              </div>
              <p className="max-w-sm text-[0.9rem] leading-[1.8] text-taupe">
                A small, deliberate team. The people who meet you are the people who photograph,
                film and edit your wedding.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:max-w-4xl lg:gap-10">
            {about.team.members.map((member, index) => (
              <li key={member.id}>
                <Reveal delay={index * 90}>
                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      <Image
                        src={member.image}
                        alt={member.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={78}
                        className="image-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035]"
                      />
                    </div>
                    <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-4">
                      <span className="display text-2xl">{member.name}</span>
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-taupe">
                        {member.role}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        image={about.closing.image.src}
        imageAlt={about.closing.image.alt}
        title={about.closing.title}
        description={about.closing.description}
        cta={about.closing.cta}
        imagePosition="center 55%"
      />
    </>
  );
}
