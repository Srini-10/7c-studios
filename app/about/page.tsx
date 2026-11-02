import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import AboutMotion from "@/Components/About/AboutMotion";
import AboutHero from "@/Components/About/AboutHero";
import AboutApproach from "@/Components/About/AboutApproach";
import styles from "@/Components/About/AboutMotion.module.css";
import about from "@/data/about.json";

export const metadata: Metadata = about.metadata;

const container = "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[100px]";
const eyebrow =
  "font-serif text-[11px] font-normal uppercase tracking-[0.3em] text-brand-red md:text-[13px]";

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
          className="grid gap-8 border-y border-[#e5e1da] py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-14 md:py-20 lg:gap-20 lg:py-24"
        >
          <div data-about-reveal className={`${styles.imageReveal} mx-auto w-full max-w-[560px] self-center md:mx-0`}>
            <div className={styles.imageFrame}>
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
            <p data-about-reveal className={`${styles.textReveal} ${eyebrow} mb-5 md:mb-6`}>{about.story.eyebrow}</p>
            <h2
              id="about-title"
              className="font-cormorant text-[clamp(2.5rem,4.6vw,4.5rem)] font-normal leading-[1.12] text-[#292722]"
            >
              {about.story.heading.map((line, index) => (
                <span key={line} data-about-reveal style={revealDelay(100 + index * 140)} className={`${styles.textReveal} block`}>
                  {line}
                  {index < about.story.heading.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
            <div className="prose-copy mt-8 space-y-5 font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] sm:text-[16px]">
              {about.story.paragraphs.map((paragraph, index) => (
                <p key={paragraph} data-about-reveal style={revealDelay(index * 120)} className={styles.textReveal}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="team-title"
        className="bg-white py-16 md:py-24 lg:py-28"
      >
        <div className={container}>
          <p data-about-reveal className={`${styles.textReveal} mb-9 font-serif text-[11px] uppercase tracking-[0.3em] text-[#49453d] md:text-[13px]`}>
            {about.team.eyebrow}
          </p>
          <h2
            id="team-title"
            data-about-reveal
            style={revealDelay(120)}
            className={`${styles.textReveal} mb-10 font-cormorant text-[clamp(2.25rem,4.1vw,3.75rem)] font-normal leading-[1.2] text-[#3e3b35] md:mb-16`}
          >
            {about.team.heading}
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {about.team.members.map((member, index) => (
              <figure key={member.id} data-about-reveal style={revealDelay(index * 140)} className={`${styles.imageReveal} ${styles.teamCard} group`}>
                <div className={`${styles.imageFrame} relative aspect-[1180/1400] bg-white`}>
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 767px) 43vw, (max-width: 1439px) 27vw, 380px"
                    className={`${styles.revealImage} object-cover`}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <h3 className="mt-5 font-cormorant text-[22px] font-normal leading-tight text-[#514c45] lg:text-[27px]">
                    {member.name}
                  </h3>
                  <p className="mt-3 font-sans text-[9px] uppercase leading-[1.7] tracking-[0.17em] text-brand-red lg:text-[10px]">
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
            <div className={styles.imageFrame}>
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
            <h2 id="approach-title" data-about-reveal className={`${styles.textReveal} mb-5 font-serif text-[clamp(13px,1.35vw,16px)] font-normal uppercase tracking-[0.32em] text-brand-red`}>
              {about.approach.eyebrow}
            </h2>
            <AboutApproach items={about.approach.items} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="craft-title"
        className={`${container} border-t border-[#e5e1da] py-14 md:py-24 lg:py-28`}
      >
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <p data-about-reveal className={`${styles.textReveal} ${eyebrow} mb-8`}>{about.craft.eyebrow}</p>
            <h2
              id="craft-title"
              className="font-cormorant text-[clamp(2rem,4.1vw,3.75rem)] font-normal leading-[1.2] text-[#3e3b35]"
            >
              {about.craft.heading.map((line, index) => (
                <span key={line} data-about-reveal style={revealDelay(100 + index * 140)} className={`${styles.textReveal} block`}>
                  {line}
                </span>
              ))}
            </h2>
            <div className="prose-copy mt-7 space-y-5 font-sans text-[15px] font-normal leading-[1.8] tracking-normal text-[#626262] sm:text-[16px]">
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
                className={`${styles.textReveal} border-t border-[#e5e1da] pt-5 ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <p className="font-sans text-[10px] tracking-[0.14em] text-brand-red">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-cormorant text-[23px] font-normal leading-tight text-[#3e3b35] lg:text-[27px]">
                  {item.heading}
                </h3>
                <p className="mt-3 font-sans text-[14px] font-normal leading-[1.8] text-[#626262] sm:text-[15px]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </AboutMotion>
  );
}
