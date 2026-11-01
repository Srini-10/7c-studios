import type { Metadata } from "next";
import { Cormorant_Infant, Montserrat } from "next/font/google";
import Navbar from "../Components/Navbar";
import Footer from "@/Components/Footer";
import StoryCallToAction from "@/Components/StoryCallToAction";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal","italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "7C Studio | Wedding Photography & Films",
  description:
    "7C Studio captures soulful wedding photography and cinematic films.",
  openGraph: {
    type: "website",
    siteName: "7C Studio",
    url: siteUrl,
    title: "7C Studio | Wedding Photography & Films",
    description:
      "Soulful wedding photography and cinematic films from Salem, Tamil Nadu.",
    images: [{ url: "/home/walpaper-1.png", width: 1672, height: 941, alt: "A beach wedding ceremony beneath a floral arch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "7C Studio | Wedding Photography & Films",
    description:
      "Soulful wedding photography and cinematic films from Salem, Tamil Nadu.",
    images: ["/home/walpaper-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantInfant.variable} ${montserrat.variable}`}
    >
      <body id="top">
        <a
          href="#main-content"
          className="sr-only z-[70] bg-brand-red px-5 py-3 font-sans text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
          <StoryCallToAction />
        </main>
        <Footer />
      </body>
    </html>
  );
}
