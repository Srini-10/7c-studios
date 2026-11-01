"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./AboutMotion.module.css";

export default function AboutMotion({ children }: { children: ReactNode }) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = article.querySelectorAll<HTMLElement>("[data-about-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-about-visible", "");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-about-reveal]");
      if (!element) return;
      element.setAttribute("data-about-focused", "");
      element.setAttribute("data-about-visible", "");
      observer.unobserve(element);
    };

    elements.forEach((element) => {
      element.setAttribute("data-about-pending", "");
      observer.observe(element);
    });
    const process = article.querySelector<HTMLElement>("[data-about-process]");
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.toggleAttribute("data-process-active", entry.isIntersecting);
      });
    }, { threshold: 0.05 });
    if (process) processObserver.observe(process);
    article.addEventListener("focusin", handleFocus);

    return () => {
      observer.disconnect();
      processObserver.disconnect();
      process?.removeAttribute("data-process-active");
      article.removeEventListener("focusin", handleFocus);
      elements.forEach((element) => element.removeAttribute("data-about-pending"));
    };
  }, []);

  return (
    <article ref={articleRef} className={`${styles.root} bg-white text-[#77736c]`} aria-labelledby="about-title">
      {children}
    </article>
  );
}
