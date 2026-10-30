export type FilmSource =
  | { type: "youtube"; videoId: string }
  | { type: "local"; src: string };

export type Film = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  poster: string;
  posterAlt: string;
  source: FilmSource;
  homepage: boolean;
  featured?: boolean;
};

export const filmsHero = {
  title: "Moments that move.",
  description:
    "Films built like short documentaries — scored, paced and cut to hold up with the sound turned off.",
  image: {
    src: "/images/heroes/films.webp",
    alt: "A bride in a red silk sari and groom sharing a smile outside a traditional home",
  },
} as const;

export const films: Film[] = [
  {
    id: "adhavan-kayal",
    name: "Adhavan & Kayal",
    category: "Traditional Wedding",
    description:
      "A traditional wedding framed by the carved stone architecture of Salem’s historic temples.",
    location: "Salem · Tamil Nadu",
    poster: "/images/films/adhavan-kayal.webp",
    posterAlt: "Adhavan and Kayal at a historic temple",
    source: { type: "local", src: "/videos/adhavan-kayal.mp4" },
    homepage: true,
    featured: true,
  },
  {
    id: "sowmithri-vaasanthika",
    name: "Sowmithri & Vaasanthika",
    category: "Brahmin Wedding",
    description:
      "A Brahmin wedding film carried by ritual, family and the quiet in between.",
    location: "Tamil Nadu",
    poster: "/images/films/sowmithri-vaasanthika.webp",
    posterAlt: "Sowmithri and Vaasanthika during their wedding",
    source: { type: "youtube", videoId: "TgtB7LhR7L0" },
    homepage: true,
  },
  {
    id: "mahesh-shujitra",
    name: "Mahesh & Shujitra",
    category: "Tamil Brahmin Wedding",
    description:
      "A Tamil Brahmin wedding in Trichy, observed as it unfolds rather than staged for the camera.",
    location: "Trichy · Tamil Nadu",
    poster: "/images/films/mahesh-shujitra.webp",
    posterAlt: "Mahesh and Shujitra at their Tamil Brahmin wedding in Trichy",
    source: { type: "youtube", videoId: "pS7xfSh9cSw" },
    homepage: true,
  },
  {
    id: "sabari-maha",
    name: "Sabari & Maha",
    category: "Traditional Telugu Wedding",
    description:
      "An Arani Telugu wedding, filmed around the ceremony’s rhythm and the people who carry it.",
    location: "Arani · Tamil Nadu",
    poster: "/images/films/sabari-maha.webp",
    posterAlt: "Sabari and Maha at their traditional Telugu wedding in Arani",
    source: { type: "youtube", videoId: "q84dXv2hwGU" },
    homepage: true,
  },
  {
    id: "srikanth-sangeetha",
    name: "Srikanth & Sangeetha",
    category: "Temple Wedding",
    description:
      "A South Indian temple wedding, held in warm light and the sound of a family coming together.",
    location: "Tamil Nadu",
    poster: "/images/films/srikanth-sangeetha.webp",
    posterAlt: "Srikanth and Sangeetha during their South Indian temple wedding",
    source: { type: "youtube", videoId: "zSAt5EjX2X4" },
    homepage: true,
  },
  {
    id: "jayaraj-ruby",
    name: "Jayaraj & Ruby",
    category: "Christian Wedding",
    description:
      "A Christian wedding in Arani, told through the vows, the music and the faces in the room.",
    location: "Arani · Tamil Nadu",
    poster: "/images/films/jayaraj-ruby.webp",
    posterAlt: "Jayaraj and Ruby at their Christian wedding in Arani",
    source: { type: "youtube", videoId: "Jch2s12FM50" },
    homepage: false,
  },
  {
    id: "mohan-sneha",
    name: "Mohan & Sneha",
    category: "Chennai Wedding",
    description:
      "A Chennai wedding film shaped by the city’s energy and the intimacy of a close family circle.",
    location: "Chennai · Tamil Nadu",
    poster: "/images/films/mohan-sneha.webp",
    posterAlt: "Mohan and Sneha at their Chennai wedding",
    source: { type: "youtube", videoId: "u5N9mCrHRc0" },
    homepage: false,
  },
  {
    id: "anuprasanth-mahalakshmi",
    name: "Anuprasanth & Mahalakshmi",
    category: "Engagement",
    description:
      "An engagement film that holds the anticipation of the celebration still to come.",
    location: "Tamil Nadu",
    poster: "/images/films/anuprasanth-mahalakshmi.webp",
    posterAlt: "Anuprasanth and Mahalakshmi at their engagement",
    source: { type: "youtube", videoId: "FlP2Iw-CnGE" },
    homepage: false,
  },
];

export const featuredFilms = films.filter((film) => film.homepage);
