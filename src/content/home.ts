export const home = {
  hero: {
    eyebrow: "Wedding photography & films · South India",
    title: "The day passes.",
    accent: "The feeling stays.",
    description:
      "Quiet photographs and cinematic films for weddings, held with the care of something you will return to for decades.",
    primaryCta: { label: "View the portfolio", href: "/stories" },
    secondaryCta: { label: "Watch the films", href: "/films" },
    marquee: ["Weddings", "Pre-weddings", "Films", "Portraits", "Celebrations"],
  },
  approach: {
    eyebrow: "Our approach",
    title: ["We don’t just", "photograph weddings."],
    accent: "We preserve the feeling.",
    paragraphs: [
      "A wedding is not a sequence of events to be documented. It is a room full of people who have known each other for decades, a grandmother who has waited years for this morning, a friendship that changes shape by the end of the night.",
      "We work quietly and from the edges — reading relationships before we raise a camera, letting atmosphere and detail carry as much weight as the ceremony itself. The result is an archive that feels less like a wedding album and more like a year you can walk back into.",
    ],
    image: {
      src: "/images/heroes/portfolio.webp",
      alt: "A groom and bride in jasmine garlands during their wedding ceremony",
      width: 2400,
      height: 1600,
    },
  },
  whyChoose: {
    eyebrow: "Why choose 7C",
    title: "More than photographs.",
    accent: "A story you can return to.",
    description:
      "At 7C Studio, every wedding is treated as its own film — cast, paced and edited around the people in it. These are the numbers behind that work, and the instinct that shapes it.",
    items: [
      {
        number: "01",
        value: "10+",
        label: "Years of stories",
        copy: "A decade spent learning how a room feels before a photograph is made.",
        image: "/images/wedding/detail.webp",
        alt: "A couple holding rings during a traditional wedding ceremony",
      },
      {
        number: "02",
        value: "25+",
        label: "Destinations covered",
        copy: "From Salem courtyards to coastal celebrations, we travel where the story takes us.",
        image: "/images/wedding/landscape.webp",
        alt: "A couple beneath carved stone pillars at a temple",
      },
      {
        number: "03",
        value: "100+",
        label: "Weddings captured",
        copy: "Each celebration approached with a documentary eye and a filmmaker’s patience.",
        image: "/images/wedding/ceremony.webp",
        alt: "A wedding ceremony unfolding among guests and garlands",
      },
      {
        number: "04",
        value: "100K",
        label: "Moments preserved",
        copy: "The glances, rituals and small details that outlast the schedule.",
        image: "/images/wedding/portrait.webp",
        alt: "A bride seated in a red silk sari during her wedding",
      },
    ],
  },
  clientele: {
    eyebrow: "Clientele",
    title: "Stories we’ve been trusted with.",
    description:
      "A selection of celebrations photographed across South India. Each one began with a conversation and became an archive of its own.",
    cta: { label: "View the full portfolio", href: "/stories" },
  },
  films: {
    eyebrow: "Love in motion",
    titleLead: "Your day.",
    titleAccent: "Felt all over again.",
    description:
      "The vows, the laughter, the voices you never want to forget. Films that bring you back to the way it all felt.",
    cta: { label: "Explore all films", href: "/films" },
  },
  instagram: {
    eyebrow: "Follow us on Instagram",
    title: "Small moments, in motion.",
    description:
      "Short-form stories from recent celebrations — the details, the laughter and the quiet in between.",
    handle: "@7c_studio_photography",
    href: "https://www.instagram.com/7c_studio_photography/",
    cta: "Follow on Instagram",
  },
} as const;
