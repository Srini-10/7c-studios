import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/Components/Contact/ContactForm";
import contact from "@/data/contact.json";
import styles from "@/Components/Contact/Contact.module.css";

export const metadata: Metadata = contact.metadata;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="contact-hero-title" className={styles.hero}>
        <Image
          src={contact.heroImage.src}
          alt={contact.heroImage.alt}
          fill
          preload
          quality={90}
          // On mobile, the 3:2 photo scales to cover the full viewport height.
          sizes="(max-width: 767px) max(100vw, 150svh, 54rem), 100vw"
          className={styles.heroImage}
        />
        <div aria-hidden="true" className={styles.heroShade} />
        <div className={styles.heroContent}>
          <h1 id="contact-hero-title" className={styles.heroTitle}>
            <span className={styles.heroTitleLead}>{contact.heroText.title}</span>
            <span className={styles.heroTitleAccent}>{contact.heroText.accent}</span>
          </h1>
          <p className={styles.heroDescription}>{contact.heroText.description}</p>
        </div>
      </section>
      <section aria-labelledby="contact-title" className={styles.section}>
        <ContactForm />
      </section>
    </div>
  );
}
