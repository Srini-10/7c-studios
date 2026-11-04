
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Stories", href: "/stories" },
  { name: "Films", href: "/films" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return <NavbarMenu key={pathname} pathname={pathname} />;
}

const BRAND_RED = "#6D0F1A";


function NavbarMenu({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastBar: boolean | null = null;
    let lastHide: boolean | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      const showBar = y > 100;
      if (showBar !== lastBar) {
        lastBar = showBar;
        setScrolled(showBar);
      }
      const delta = y - lastY;
      // A threshold keeps trackpad jitter and tiny final-pixel scrolls from toggling the bar.
      if (Math.abs(delta) > 6) {
        const hide = delta > 0 && y > 240;
        if (hide !== lastHide) {
          lastHide = hide;
          setHidden(hide);
        }
        lastY = y;
      } else if (y <= 240 && lastHide === true) {
        // Scrolling into the transparent zone must always reveal the bar.
        lastHide = false;
        setHidden(false);
        lastY = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isDark = isOpen || scrolled;

  // The whole bar - cream surface, edge shadow and contents - slides out
  // together; the surfaces use `translate` so the nav row can keep its own.
  const slideOut = hidden && !isOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* One transition on the bar itself moves surface, edge and contents together. */}
      <div
        className={`transition-[translate] duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          slideOut ? "-translate-y-full" : "translate-y-0"
        }`}
      >
      {/* Bar surfaces swap by opacity only; animating background, shadow or blur
          would repaint the full-width strip on every frame of the transition.
          At the very top the bar stays transparent so the hero image reads edge to edge. */}
      <div
        aria-hidden
        style={{ backgroundColor: BRAND_RED }}
        className={`absolute inset-0 transition-opacity duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-full h-10 bg-gradient-to-b from-black/22 via-black/6 via-45% to-transparent transition-opacity duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isDark && !slideOut ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-full h-px bg-brand-gold/35 transition-opacity duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isDark && !slideOut ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Transparent-mode scrim: the golden logo and links sit on imagery that can be
          bright at the very top of the page, so a soft dark halo keeps them readable. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-transparent transition-opacity duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isDark || slideOut ? "opacity-0" : "opacity-100"
        }`}
      />

      <nav
        aria-label="Main navigation"
        className={`relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 transition-[height] duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] sm:px-10 lg:px-20 ${
          scrolled ? "h-[56px] lg:h-[68px]" : "h-[68px] lg:h-[82px]"
        }`}
      >
        <Link
          href="/"
          aria-label="7C Studio Home"
          className="relative z-50 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
        >
          <Image
            src="/brand/7c-transprent.png"
            alt="7C Studio"
            width={220}
            height={272}
            loading="eager"
            className="h-auto w-[34px] object-contain transition-opacity duration-300 hover:opacity-90 sm:w-[40px]"
          />
        </Link>

        <div className="ml-auto hidden items-center gap-6 lg:flex xl:gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${styles.navLink} whitespace-nowrap font-cormorant text-[15px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold xl:text-[16px] text-brand-gold`}
              >
                <span className={styles.linkLabel}>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-brand-gold transition-colors hover:text-brand-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold lg:hidden"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>
      </div>

      <div
        id="mobile-navigation"
        inert={!isOpen}
        className={`absolute left-0 top-full w-full max-h-[calc(100dvh-68px)] overflow-y-auto bg-brand-red transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col px-8 pb-10 pt-5 sm:px-12">
          {navLinks.map((link, index) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`${styles.navLink} flex items-center justify-between border-b border-brand-gold/20 py-5 font-cormorant text-xl font-bold uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold text-brand-gold`}
              >
                <span className={styles.linkLabel}>{link.name}</span>
                <span className="text-xs text-brand-gold">
                  0{index + 1}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
