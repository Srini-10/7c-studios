import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import AboutMotion from "@/Components/About/AboutMotion";
import AboutHero from "@/Components/About/AboutHero";
import AboutApproach from "@/Components/About/AboutApproach";
import styles from "@/Components/About/AboutMotion.module.css";
import about from "@/data/about.json";

export const metadata: Metadata = about.metadata;

const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[100px]";
const eyebrow =
  "font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-brand-gold md:text-[14px]";

function revealDelay(delay: number): CSSProperties {
  return { "--about-delay": `${delay}ms` } as CSSProperties;
}

export default function AboutPage() {
  return (
    <AboutMotion>
      <AboutHero {...about.hero} />

      <div
        className={`${container} relative z-10`}
        style={{ marginTop: "calc(-21svh + clamp(96px, 13vh, 144px))" }}
      >
        <section
          aria-labelledby="about-title"
          className="grid gap-8 border-y border-[#D7C3B6] py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-14 md:py-20 lg:gap-20 lg:py-24"
        >
          <div data-about-reveal className={`${styles.imageReveal} mx-auto w-full max-w-[560px] self-center md:mx-0`}>
            <div className={`${styles.imageFrame} rounded-2xl`}>
              <Image
                src={about.story.image.src}
                alt={about.story.image.alt}
                width={about.story.image.width}
                height={about.story.image.height}
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 43vw, 560px"
                className={`${styles.revealImage} h-auto w-full`}
              />
            </div>
          </div>
          <div className="self-center">
            <p data-about-reveal className={`${styles.textReveal} ${eyebrow} mb-2.5 md:mb-3`}>{about.story.eyebrow}</p>
            <h2
              id="about-title"
              className="font-cormorant text-[clamp(2.5rem,4.6vw,4.5rem)] font-normal leading-[1.08] text-brand-red"
            >
              {about.story.heading.map((line, index) => (
                <span key={line} data-about-reveal style={revealDelay(100 + index * 140)} className={`${styles.textReveal} block`}>
                  {line}
                  {index < about.story.heading.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
            <div className="prose-copy mt-5 space-y-4 font-sans text-[15px] font-normal leading-[1.7] tracking-normal text-[#554840] sm:text-[16px]">
              {about.story.paragraphs.map((paragraph, index) => (
                <p key={paragraph} data-about-reveal style={revealDelay(index * 120)} className={styles.textReveal}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="team-title"
        className="bg-[#FAF6F0] py-14 md:py-20 lg:py-24"
      >
        <div className={container}>
          <p data-about-reveal className={`${styles.textReveal} mb-3 font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-brand-gold md:text-[14px]`}>
            {about.team.eyebrow}
          </p>
          <h2
            id="team-title"
            data-about-reveal
            style={revealDelay(120)}
            className={`${styles.textReveal} mb-8 font-cormorant text-[clamp(2.25rem,4.1vw,3.75rem)] font-normal leading-[1.08] text-[#1A0D0E] md:mb-12`}
          >
            {about.team.heading}
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {about.team.members.map((member, index) => (
              <figure key={member.id} data-about-reveal style={revealDelay(index * 140)} className={`${styles.imageReveal} ${styles.teamCard} group`}>
                <div className={`${styles.imageFrame} relative aspect-[1180/1400] rounded-2xl bg-[#F4E5D8]`}>
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 767px) 43vw, (max-width: 1439px) 27vw, 380px"
                    className={`${styles.revealImage} object-cover`}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <h3 className="mt-4 font-cormorant text-[22px] font-normal leading-tight text-[#1A0D0E] lg:text-[27px]">
                    {member.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.16em] text-brand-gold">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="approach-title"
        className={`${container} py-14 md:py-20 lg:py-26`}
      >
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
          <div data-about-reveal className={`${styles.imageReveal} mx-auto w-full max-w-[480px] md:mx-0`}>
            <div className={`${styles.imageFrame} rounded-2xl`}>
              <Image
                src={about.approach.image.src}
                alt={about.approach.image.alt}
                width={about.approach.image.width}
                height={about.approach.image.height}
                sizes="(max-width: 767px) 90vw, (max-width: 1439px) 42vw, 480px"
                className={`${styles.revealImage} h-auto w-full`}
              />
            </div>
          </div>
          <div className="w-full">
            <h2 id="approach-title" data-about-reveal className={`${styles.textReveal} mb-3 font-serif text-[clamp(14px,1.4vw,17px)] font-bold uppercase tracking-[0.28em] text-brand-gold`}>
              {about.approach.eyebrow}
            </h2>
            <AboutApproach items={about.approach.items} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="craft-title"
        className={`${container} border-t border-[#D7C3B6] py-14 md:py-24 lg:py-28`}
      >
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <p data-about-reveal className={`${styles.textReveal} ${eyebrow} mb-2.5`}>{about.craft.eyebrow}</p>
            <h2
              id="craft-title"
              className="font-cormorant text-[clamp(2rem,4.1vw,3.75rem)] font-normal leading-[1.08] text-brand-red"
            >
              {about.craft.heading.map((line, index) => (
                <span key={line} data-about-reveal style={revealDelay(100 + index * 140)} className={`${styles.textReveal} block`}>
                  {line}
                </span>
              ))}
            </h2>
            <div className="prose-copy mt-5 space-y-4 font-sans text-[15px] font-normal leading-[1.7] tracking-normal text-[#554840] sm:text-[16px]">
              {about.craft.paragraphs.map((paragraph, index) => (
                <p key={paragraph} data-about-reveal style={revealDelay(index * 120)} className={styles.textReveal}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ol className="grid gap-x-10 gap-y-9 self-center sm:grid-cols-2 md:pt-6">
            {about.craft.items.map((item, index) => (
              <li
                key={item.id}
                data-about-reveal
                style={revealDelay(index * 140)}
                className={`${styles.textReveal} border-t border-[#D7C3B6] pt-5 ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <p className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 font-cormorant text-[23px] font-normal leading-tight text-[#1A0D0E] lg:text-[27px]">
                  {item.heading}
                </h3>
                <p className="mt-2.5 font-sans text-[14px] font-normal leading-[1.7] text-[#554840] sm:text-[15px]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Royal Burgundy Call-to-Action Section */}
      <section className="bg-brand-red py-16 text-center text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6">
          <p className="font-serif text-[13px] font-bold uppercase tracking-[0.28em] text-brand-gold">
            Begin Your Story
          </p>
          <h2 className="mt-3 font-cormorant text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.08] text-white">
            Ready to document your celebration?
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-sans text-[14px] leading-[1.7] text-white/85 sm:text-[15px]">
            We take on a limited number of weddings each year to ensure every couple receives our undivided attention, artistry, and heart.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red transition-all duration-300 hover:bg-brand-gold hover:text-[#1A0D0E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

    </AboutMotion>
  );
}
