"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, Close, Facebook, Instagram, Menu, YouTube } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 text-bone transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          solid
            ? "border-b border-bone/12 bg-[linear-gradient(100deg,rgba(12,10,9,0.95)_0%,rgba(42,10,9,0.92)_54%,rgba(125,23,20,0.9)_100%)] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-6">
          <Link href="/" aria-label="7C Studio — home" className="relative block shrink-0">
            <Image
              src="/brand/7c-logo-light.webp"
              alt="7C Studio"
              width={2010}
              height={500}
              priority
              sizes="(max-width: 768px) 140px, 176px"
              className="h-auto w-[140px] drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] md:w-[176px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group relative px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bone/72 transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] hover:text-bone",
                    active && "text-bone",
                  )}
                >
                  {item.label}
                  <span
                    className={cx(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-red-bright transition-transform duration-500",
                      active ? "scale-x-100" : "group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden min-h-10 items-center gap-2 border border-bone/30 px-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bone transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] hover:border-bone hover:bg-bone hover:text-ink hover:[text-shadow:none] sm:inline-flex"
            >
              Enquire
              <ArrowUpRight width={14} height={14} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center border border-bone/25 text-bone transition hover:border-bone/60 lg:hidden"
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        className={cx(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink text-bone transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="grain relative flex min-h-full flex-col justify-between px-[var(--page-gutter)] pb-10 pt-[calc(var(--header-height)+2.5rem)]">
          <nav aria-label="Mobile" className="relative z-10">
            <ul>
              {site.nav.map((item, index) => {
                const active = isActive(pathname, item.href);

                return (
                  <li key={item.href} className="border-b border-bone/10">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      <span className="w-6 shrink-0 font-sans text-[0.6rem] tracking-[0.2em] text-bone/35">
                        0{index + 1}
                      </span>
                      <span
                        className={cx(
                          "display text-[clamp(2.1rem,9vw,3.1rem)] leading-none transition-colors group-hover:text-red-bright",
                          active ? "text-red-bright" : "text-bone",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 mt-12 flex flex-col gap-6 text-sm">
            <div>
              <p className="eyebrow text-bone/40">Visit</p>
              <p className="mt-3 max-w-xs leading-relaxed text-bone/70">{site.contact.address}</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-bone/80">
              <a href={site.contact.phoneHref} className="hover:text-red-bright">
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="hover:text-red-bright">
                {site.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={site.socials.instagram.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-bone/65 transition hover:text-red-bright"
              >
                <Instagram />
              </a>
              <a
                href={site.socials.youtube.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YouTube"
                className="text-bone/65 transition hover:text-red-bright"
              >
                <YouTube />
              </a>
              <a
                href={site.socials.facebook.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="text-bone/65 transition hover:text-red-bright"
              >
                <Facebook />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
