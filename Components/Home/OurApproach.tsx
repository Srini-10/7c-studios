"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import homeData from "../../data/homepage.json";
import styles from "./OurApproach.module.css";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const revealScale = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function OurApproach() {
  const { approach } = homeData;
  const { badge, pillars, cta } = approach as typeof approach & {
    badge?: { tag: string; title: string; subtitle: string };
    story?: string;
    pillars?: Array<{ number: string; title: string; description: string }>;
    cta?: { label: string; href: string };
  };

  return (
    <section className={styles.section} aria-labelledby="approach-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Layered Editorial Frame with Floating Studio Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            variants={revealScale}
            className={styles.mediaCol}
          >
            <div className={styles.imageFrame}>
              <Image
                src={approach.image.src}
                alt={approach.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 540px"
                className={styles.image}
              />
            </div>

            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
                className={styles.sealBadge}
              >
                <span className={styles.badgeTag}>{badge.tag}</span>
                <span className={styles.badgeTitle}>{badge.title}</span>
                <span className={styles.badgeSubtitle}>{badge.subtitle}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Editorial Typography, Narrative, Pillars & CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
            variants={revealFade}
            className={styles.contentCol}
          >
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <p className={styles.eyebrow}>{approach.eyebrow}</p>
            </div>

            <h2 id="approach-heading" className={styles.heading}>
              {approach.heading.map((line) => (
                <span key={line} className={styles.headingLine}>
                  {line}
                </span>
              ))}
            </h2>

            <p className={styles.highlight}>
              &ldquo;{approach.highlight}&rdquo;
            </p>

            <p className={styles.story}>
              {(approach as { story?: string }).story || approach.paragraphs[0]}
            </p>

            {pillars && pillars.length > 0 && (
              <div className={styles.pillarsList}>
                {pillars.map((pillar) => (
                  <div key={pillar.number} className={styles.pillarItem}>
                    <span className={styles.pillarNumber}>{pillar.number}</span>
                    <div className={styles.pillarBody}>
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                      <p className={styles.pillarDesc}>{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cta && (
              <Link href={cta.href} className={styles.ctaBtn}>
                <span>{cta.label}</span>
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} className={styles.ctaIcon} />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
