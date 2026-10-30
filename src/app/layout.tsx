import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "7C Studio — Wedding Photography & Films in South India",
    template: "%s — 7C Studio",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "wedding photographer",
    "wedding films",
    "South India wedding photography",
    "Tamil wedding photographer",
    "Salem wedding studio",
    "7C Studio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "7C Studio — Wedding Photography & Films",
    description: site.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A bride and groom wearing jasmine garlands at their wedding, photographed by 7C Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7C Studio — Wedding Photography & Films",
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
  authors: [{ name: "7C Studio" }],
  creator: "7C Studio",
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "24, Yercaud Road, Fairlands",
    addressLocality: "Salem",
    addressRegion: "Tamil Nadu",
    postalCode: "636016",
    addressCountry: "IN",
  },
  sameAs: [
    site.socials.instagram.href,
    site.socials.youtube.href,
    site.socials.facebook.href,
  ],
  areaServed: "South India",
  priceRange: "₹₹₹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body id="top">
        <a
          href="#main"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
