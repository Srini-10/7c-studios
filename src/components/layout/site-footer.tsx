import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight, Facebook, Instagram, YouTube } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-bone/10 bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(125,23,20,0.32),transparent_68%)]"
      />
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-bone/45">Begin a conversation</p>
            <p className="display mt-6 max-w-2xl text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98]">
              Tell us about
              <br />
              <em className="display-italic text-red-bright">your day.</em>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/contact" className="btn btn-solid">
                Enquire about your date
                <ArrowUpRight width={15} height={15} />
              </Link>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bone/55 transition hover:text-bone"
              >
                Or message on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:pl-10">
            <div>
              <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-bone/40">
                Explore
              </h2>
              <ul className="mt-5 space-y-3">
                {site.footer.explore.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-bone/72 transition-colors hover:text-red-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-bone/40">
                Studio
              </h2>
              <address className="mt-5 space-y-3 text-sm not-italic text-bone/72">
                <p className="max-w-[15rem] leading-relaxed">{site.contact.address}</p>
                <p>
                  <a className="transition-colors hover:text-red-bright" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </p>
                <p>
                  <a
                    className="transition-colors hover:text-red-bright"
                    href={`mailto:${site.contact.email}`}
                  >
                    {site.contact.email}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] text-bone/42">
            <p>{site.footer.copyright}</p>
            <p className="hidden md:block">{site.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={site.socials.instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="7C Studio on Instagram"
              className="inline-flex size-10 items-center justify-center text-bone/55 transition hover:text-red-bright"
            >
              <Instagram />
            </a>
            <a
              href={site.socials.youtube.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="7C Studio on YouTube"
              className="inline-flex size-10 items-center justify-center text-bone/55 transition hover:text-red-bright"
            >
              <YouTube />
            </a>
            <a
              href={site.socials.facebook.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="7C Studio on Facebook"
              className="inline-flex size-10 items-center justify-center text-bone/55 transition hover:text-red-bright"
            >
              <Facebook />
            </a>
            <a
              href="#top"
              className="ml-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bone/45 transition hover:text-bone"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
