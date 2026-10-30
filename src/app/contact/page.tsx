import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ContactForm } from "@/components/contact/contact-form";
import { ArrowUpRight, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about wedding photography and films with 7C Studio in Salem, Tamil Nadu. Tell us about your date, your celebration and the feeling you want to remember.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — 7C Studio",
    description:
      "Enquire about wedding photography and films with 7C Studio in Salem, Tamil Nadu.",
    images: ["/images/heroes/contact.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact the studio"
        title="Say"
        accent="hello."
        description="Tell us about your day — the people, the place and what you want to remember. We reply to every enquiry personally."
        image="/images/heroes/contact.webp"
        imageAlt="A bride and groom sharing a quiet moment at their wedding"
        imagePosition="center 40%"
        size="compact"
        priority
      />

      <section className="bg-paper py-20 text-ink md:py-28 lg:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-oxblood">The studio</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[1.04]">
              A conversation
              <br />
              <em className="display-italic text-oxblood">first.</em>
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-[1.9] text-taupe">
              We take on a limited number of weddings each year so every celebration gets our full
              attention. Share a few details and we will arrange a call to talk it through.
            </p>

            <ul className="mt-10 border-t border-ink/12">
              <li className="border-b border-ink/12">
                <a
                  href={site.contact.phoneHref}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-oxblood"
                >
                  <Phone className="shrink-0 text-oxblood" />
                  <span className="flex-1 text-[0.9rem]">{site.contact.phone}</span>
                  <ArrowUpRight className="text-ink/25 transition group-hover:text-oxblood" />
                </a>
              </li>
              <li className="border-b border-ink/12">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-oxblood"
                >
                  <Mail className="shrink-0 text-oxblood" />
                  <span className="flex-1 text-[0.9rem]">{site.contact.email}</span>
                  <ArrowUpRight className="text-ink/25 transition group-hover:text-oxblood" />
                </a>
              </li>
              <li className="border-b border-ink/12">
                <div className="flex items-start gap-4 py-4">
                  <MapPin className="mt-1 shrink-0 text-oxblood" />
                  <address className="flex-1 text-[0.9rem] not-italic leading-relaxed text-ink/80">
                    {site.contact.address}
                  </address>
                </div>
              </li>
            </ul>

            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline-dark mt-8"
            >
              <WhatsApp />
              Message on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-ink/12 bg-bone/40 p-6 md:p-9">
              <h2 className="display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                Tell us about your day.
              </h2>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-taupe">
                Share as much or as little as you like — every enquiry is read personally.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        image="/images/heroes/contact-closing.webp"
        imageAlt="A newly married couple walking together in warm light"
        title="We’d love to hear from you."
        description="Dates for the coming season are limited. Tell us when and where, and we will take it from there."
        cta={{ label: "Call the studio", href: site.contact.phoneHref }}
        eyebrow="7C Studio · Salem"
        imagePosition="center 55%"
      />
    </>
  );
}
