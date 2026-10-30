export type WeddingPoster = {
  id: string;
  name: string;
  category: string;
  location: string;
  poster: string;
  alt: string;
  storySlug: string;
};

export const weddingPosters: WeddingPoster[] = [
  {
    id: "adhavan-kayal",
    name: "Adhavan & Kayal",
    category: "Traditional wedding",
    location: "Salem · Tamil Nadu",
    poster: "/images/posters/adhavan-kayal.webp",
    alt: "Adhavan and Kayal framed by carved stone pillars at a temple",
    storySlug: "adhavan-kayal",
  },
  {
    id: "arjun-dhanya",
    name: "Arjun & Dhanya",
    category: "Couple portraits",
    location: "Tamil Nadu",
    poster: "/images/posters/arjun-dhanya.webp",
    alt: "Arjun and Dhanya beneath a floral doorway during their wedding",
    storySlug: "arjun-dhanya",
  },
  {
    id: "arun-nila",
    name: "Arun & Nila",
    category: "Muslim wedding",
    location: "Tamil Nadu",
    poster: "/images/posters/arun-nila.webp",
    alt: "Arun and Nila in a quiet moment at their wedding",
    storySlug: "arun-nila",
  },
  {
    id: "saran-nandhini",
    name: "Saran & Nandhini",
    category: "Brahmin wedding",
    location: "Tamil Nadu",
    poster: "/images/posters/saran-nandhini.webp",
    alt: "Saran and Nandhini wearing jasmine garlands at their wedding",
    storySlug: "saran-nandhini",
  },
  {
    id: "surya-iniya",
    name: "Surya & Iniya",
    category: "Baby shower",
    location: "Tamil Nadu",
    poster: "/images/posters/surya-iniya.webp",
    alt: "Surya and Iniya beneath a marigold backdrop at their celebration",
    storySlug: "surya-iniya",
  },
  {
    id: "kavin-yazhini",
    name: "Kavin & Yazhini",
    category: "Tamil wedding",
    location: "Salem · Tamil Nadu",
    poster: "/images/posters/kavin-yazhini.webp",
    alt: "Kavin and Yazhini in an embrace at their wedding",
    storySlug: "kavin-yazhini",
  },
];
