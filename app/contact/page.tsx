import type { Metadata } from "next";
import ContactForm from "@/Components/Contact/ContactForm";
import ContactHero from "@/Components/Contact/ContactHero";
import contact from "@/data/contact.json";
import styles from "@/Components/Contact/Contact.module.css";

export const metadata: Metadata = contact.metadata;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <ContactHero />
      <section aria-labelledby="contact-title" className={styles.section}>
        <ContactForm />
      </section>
    </div>
  );
}
