import type { CSSProperties } from "react";
import ScrollExpand, { type ScrollExpandProps } from "@/Components/ScrollExpand/ScrollExpand";
import styles from "./AboutHero.module.css";

type Props = {
  src: string;
  alt: string;
  initialTitle: string;
  scrollHint: string;
  title: string;
  accent: string;
  description: string;
  settings: Pick<ScrollExpandProps,
    "startWidth" | "startHeight" | "mobileStartWidth" | "mobileSquare" | "startRadius" | "endRadius" | "mediaZoom" |
    "scrollDistance" | "holdDistance" | "smoothing" | "overlayScrim" | "revealOnScroll" | "collapseOnScroll" | "enabled"
  >;
};

export default function AboutHero({ src, alt, initialTitle, scrollHint, title, accent, description, settings }: Props) {
  return (
    <section aria-labelledby="about-hero-title" className={styles.hero}>
      <ScrollExpand
        src={src}
        alt={alt}
        title={initialTitle}
        scrollHint={scrollHint}
        {...settings}
        style={{ "--se-mobile-width": `${settings.mobileStartWidth ?? 88}vw` } as CSSProperties}
        useWindowScroll
        overlayAfterExpand
      >
        <div className={styles.content}>
          <h1 id="about-hero-title" className={styles.title}>
            <span className={styles.lead}>{title}</span>
            <span className={styles.accent}>{accent}</span>
          </h1>
          <p className={`${styles.description} prose-copy`}>{description}</p>
        </div>
      </ScrollExpand>
    </section>
  );
}
