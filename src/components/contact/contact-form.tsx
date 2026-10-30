"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const services = [
  "Wedding photography",
  "Wedding film",
  "Photography & film",
  "Pre-wedding story",
  "Bride / couple portraits",
  "Something else",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone") || "Not provided"}`,
      `Wedding date: ${value("date") || "Not confirmed"}`,
      `Location: ${value("location") || "Not provided"}`,
      `Services: ${value("services") || "Not specified"}`,
      "",
      value("message"),
    ];

    const subject = `Wedding enquiry — ${value("name")}`;
    const body = lines.join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="scroll-mt-32">
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your names"
            className="form-input"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="form-input"
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91"
            className="form-input"
          />
        </Field>

        <Field label="Wedding date" htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            className="form-input [color-scheme:light]"
          />
        </Field>

        <Field label="Location" htmlFor="location">
          <input
            id="location"
            name="location"
            type="text"
            placeholder="City / venue"
            className="form-input"
          />
        </Field>

        <Field label="What are you looking for?" htmlFor="services">
          <select id="services" name="services" defaultValue="" className="form-input">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Tell us about the day" htmlFor="message">
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="The people, the place, and what you want to remember most."
              className="form-input resize-none"
            />
          </Field>
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-dark">
          Send enquiry
          <ArrowUpRight width={15} height={15} />
        </button>
        <p className="max-w-xs text-[0.68rem] leading-relaxed text-taupe">
          This opens your email app with the details filled in. Prefer WhatsApp?{" "}
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
          >
            Message us directly
          </a>
          .
        </p>
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-[0.72rem] text-oxblood">
        {sent ? "Your email app should now be open. We look forward to hearing from you." : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-taupe"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
