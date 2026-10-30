export const about = {
  hero: {
    eyebrow: "About the studio",
    title: "The people",
    accent: "behind the frame.",
    description:
      "From quiet glances to unforgettable celebrations, we document every emotion, connection and detail that makes your wedding uniquely yours.",
    image: {
      src: "/images/about/hero.webp",
      alt: "A newly married couple laughing together on the steps of a sunlit home",
    },
  },
  manifesto: {
    eyebrow: "Our belief",
    statement: "We capture more than moments. We preserve the feeling.",
    text: "A photograph is not proof that something happened. It is a way back to how it felt. That is the standard we hold every frame to — and the reason families return to their albums years later.",
  },
  story: {
    eyebrow: "Our story",
    heading: ["It started with", "one camera."],
    paragraphs: [
      "7C Studio began with one camera and a simple belief: the moments that matter most are often the ones you cannot plan. A shared glance, a familiar laugh, the quiet before a celebration begins.",
      "That belief shapes the way we photograph. We pay attention to the people, the traditions and the small details that make every celebration its own.",
      "Today, we bring that same care to photographs and films, creating a collection that holds the feeling of your day and gives you a way to return to it.",
    ],
    image: {
      src: "/images/about/story.webp",
      alt: "A bride in a gold and blue silk sari with traditional jewellery",
      credit: "Photograph — Hari",
    },
  },
  craft: {
    eyebrow: "Our craft",
    heading: "Photography is how we listen.",
    accent: "Cinema is how we remember.",
    description:
      "We work in two languages — the still frame and the moving image. One holds the detail; the other holds the feeling between details. Both begin with the same thing: paying attention.",
    principles: [
      {
        number: "01",
        title: "Quietly, from the edges of the room",
        copy: "Two photographers and one filmmaker on most weddings. Available light wherever possible. No shot lists read off a phone, no group photographs that take an hour.",
      },
      {
        number: "02",
        title: "The same hands, start to finish",
        copy: "The person who meets you photographs your wedding and edits your gallery. No outsourced teams, no unfamiliar faces on the day.",
      },
      {
        number: "03",
        title: "A consistent, considered grade",
        copy: "One colour language across every frame, every film and every print, so your archive holds together decades from now.",
      },
      {
        number: "04",
        title: "Made to be printed",
        copy: "Every commission can end in something physical: hand-bound albums and archival prints produced in our own studio.",
      },
    ],
  },
  team: {
    eyebrow: "The team",
    heading: "The people you’ll meet.",
    members: [
      {
        id: "kajal",
        name: "Kajal",
        role: "Lead filmmaker",
        image: "/images/about/team-kajal.webp",
        alt: "Kajal standing behind a camera in the studio",
      },
      {
        id: "sindhu",
        name: "Sindhu",
        role: "Portrait photographer",
        image: "/images/about/team-sindhu.webp",
        alt: "Sindhu taking a photograph in a studio lighting setup",
      },
    ],
  },
  closing: {
    image: {
      src: "/images/about/closing.webp",
      alt: "A couple holding hands in silhouette beneath a sunset sky",
    },
    title: "Your story deserves to be remembered.",
    description:
      "Tell us about your celebration and let’s create something timeless.",
    cta: { label: "Start a conversation", href: "/contact#contact-form" },
  },
} as const;
