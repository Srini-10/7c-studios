export const site = {
  name: "7C Studio",
  tagline: "Wedding Photography & Films",
  url: "https://7cstudio.in",
  description:
    "7C Studio captures soulful wedding photography and cinematic films across South India — quiet, honest and made to be remembered.",
  locale: "en_IN",
  contact: {
    phone: "+91 85025 69780",
    phoneHref: "tel:+918502569780",
    whatsapp: "https://wa.me/918502569780",
    email: "7cstudio@gmail.com",
    address: "24, Yercaud Road, Fairlands, Salem, Tamil Nadu – 636016",
    studio: "7C Studio",
  },
  socials: {
    youtube: {
      label: "YouTube",
      href: "https://youtube.com/@7cstudiophotography",
    },
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/7c_studio_photography/",
      handle: "@7c_studio_photography",
    },
    facebook: {
      label: "Facebook",
      href: "https://www.facebook.com/7cPhotography/",
    },
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/stories" },
    { label: "Films", href: "/films" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline: "Stories of love, tradition and moments worth remembering.",
    copyright: `© ${new Date().getFullYear()} 7C Studio. All rights reserved.`,
    explore: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/stories" },
      { label: "Films", href: "/films" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export type NavItem = (typeof site.nav)[number];
