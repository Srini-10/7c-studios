"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import contact from "@/data/contact.json";
import footer from "@/data/footer.json";
import styles from "./Contact.module.css";

export default function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      `Wedding date: ${value("weddingDate")}`,
      `Wedding location: ${value("location")}`,
      `Wedding type: ${value("weddingType")}`,
      "",
      "Our story:",
      value("story"),
    ].join("\r\n");
    const subject = `Wedding enquiry — ${value("name")}`;

    window.location.assign(
      `mailto:${footer.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setDraftOpened(true);
  }

  return (
    <form
      id="contact-form"
      className={styles.form}
      action={`mailto:${footer.contact.email}`}
      method="get"
      onSubmit={handleSubmit}
    >
      <div className={styles.formContent}>
        <p className={styles.eyebrow}>{(contact as { eyebrow?: string }).eyebrow ?? "Get in touch"}</p>
        <h2 id="contact-title" className={styles.formHeading}>
          {contact.heading}
        </h2>
        {(contact as { subheading?: string }).subheading && (
          <p className={styles.formDescription}>{(contact as { subheading?: string }).subheading}</p>
        )}
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={100} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your email" required maxLength={254} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-phone">Phone number <span aria-hidden="true">*</span></label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" required minLength={7} maxLength={25} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-date">Wedding date <span aria-hidden="true">*</span></label>
            <input id="contact-date" name="weddingDate" type="date" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-location">Wedding location <span aria-hidden="true">*</span></label>
            <input id="contact-location" name="location" type="text" placeholder="City or Venue" required maxLength={200} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-type">Wedding type <span aria-hidden="true">*</span></label>
            <select id="contact-type" name="weddingType" defaultValue="" required>
              <option value="" disabled>Select</option>
              {contact.weddingTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className={`${styles.field} ${styles.storyField}`}>
            <label htmlFor="contact-story">Tell us your story <span aria-hidden="true">*</span></label>
            <textarea id="contact-story" name="story" placeholder="How you met, what the celebration looks like..." rows={3} required maxLength={3000} />
          </div>
        </div>
      </div>

      <aside aria-label="Studio contact details" className={styles.sidebar}>
        <div className={styles.studio}>
          <p className={styles.eyebrow}>{(contact as { studioEyebrow?: string }).studioEyebrow ?? "The studio"}</p>
          <h3 className={styles.studioHeading}>{contact.studioHeading}</h3>
          <address className={styles.address}>
            <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
            <a href={footer.contact.phoneHref}>{footer.contact.phone}</a>
            <p>{contact.address}</p>
          </address>
        </div>
        <div className={styles.follow}>
          <p className={styles.eyebrow}>{(contact as { followEyebrow?: string }).followEyebrow ?? "Connect"}</p>
          <h3 className={styles.followHeading}>{contact.followHeading}</h3>
          <div className={styles.socials}>
            {footer.socials.map((social) => {
              const Icon = social.platform === "youtube"
                ? FiYoutube
                : social.platform === "instagram" ? FiInstagram : FiFacebook;
              const iconEl = <Icon aria-hidden="true" size={20} strokeWidth={1.5} />;
              return social.href ? (
                <a key={social.platform} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  {iconEl}
                </a>
              ) : (
                <span key={social.platform} role="img" aria-label={social.label}>
                  {iconEl}
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.submitArea}>
          <button type="submit" className={styles.submitButton}>
            <span>{contact.submitLabel}</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
          <p className={styles.submitHint}>Opens your email app.</p>
          {draftOpened && (
            <p className={styles.status} role="status">
              Send the prepared draft from your email app to complete your enquiry.
              You can also email us directly at {footer.contact.email}.
            </p>
          )}
        </div>
      </aside>
    </form>
  );
}
