"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import footer from "@/data/footer.json";
import styles from "./StoryCallToAction.module.css";

export default function StoryCallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const content = footer.callToAction;
  const image = Object.entries(content.pageImages).find(
    ([route]) => pathname === route || pathname.startsWith(`${route}/`),
  )?.[1] ?? content.image;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    section.setAttribute("data-pending", "");
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      section.setAttribute("data-visible", "");
      observer.disconnect();
    }, { threshold: 0.15 });

    const revealOnFocus = () => {
      section.setAttribute("data-focused", "");
      section.setAttribute("data-visible", "");
      observer.disconnect();
    };

    observer.observe(section);
    section.addEventListener("focusin", revealOnFocus);
    return () => {
      observer.disconnect();
      section.removeEventListener("focusin", revealOnFocus);
      section.removeAttribute("data-pending");
      section.removeAttribute("data-visible");
      section.removeAttribute("data-focused");
    };
  }, [pathname]);

  return (
    <section ref={sectionRef} id="story-call-to-action" aria-labelledby="story-call-to-action-title" className={styles.section}>
      <Image key={image.src} src={image.src} alt={image.alt} fill sizes="100vw" className={styles.image} />
      <div aria-hidden="true" className={styles.shade} />
      <div className={styles.content}>
        <h2 id="story-call-to-action-title" className={styles.title}>
          <span className={`${styles.reveal} ${styles.lead}`}>{content.title}</span>
          <span className={`${styles.reveal} ${styles.accent}`}>{content.accent}</span>
        </h2>
        <p className={`${styles.reveal} ${styles.description}`}>{content.description}</p>
        <Link href={content.button.href} className={`${styles.reveal} ${styles.button}`}>
          {content.button.label}
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
