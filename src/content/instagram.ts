export type Reel = {
  id: string;
  title: string;
  video: string;
  poster: string;
  href: string;
};

const profile = "https://www.instagram.com/7c_studio_photography/";

function reel(id: string, title: string): Reel {
  return {
    id,
    title,
    video: `/videos/reels/${id}.mp4`,
    poster: `/images/reels/${id}.webp`,
    href: `${profile}reel/${id}/`,
  };
}

export const reels: Reel[] = [
  reel("DewkqM3Kxq6", "Tradition in every drape"),
  reel("DScl_PBkT_n", "Sowmithri & Vaasanthika"),
  reel("DUdUNHAkZap", "Seenu & Nandhini"),
  reel("DX_1hFTxmlO", "Arjun & Preethi"),
  reel("DVlg-33kVF3", "Sathish & Ramya"),
  reel("DR9dgJgEdQC", "7C Studio showreel"),
];
