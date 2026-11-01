"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import styles from "./InstagramGallery.module.css";

export type InstagramReelItem = {
  id: string;
  title: string;
  poster: string;
  video: string;
  href: string;
};

type Props = {
  reel: InstagramReelItem;
  sizes: string;
};

export default function InstagramReel({ reel, sizes }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  const startPreview = () => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.play().then(() => setPreviewing(true)).catch(() => setPreviewing(false));
  };

  const stopPreview = () => {
    videoRef.current?.pause();
    setPreviewing(false);
  };

  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${reel.title} — watch this reel on Instagram`}
      className={styles.reel}
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <Image src={reel.poster} alt="" fill sizes={sizes} className={styles.image} />
      <video
        ref={videoRef}
        className={`${styles.video} ${previewing ? styles.videoVisible : ""}`}
        src={reel.video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <span aria-hidden="true" className={styles.vignette} />
      <span aria-hidden="true" className={styles.vignetteHover} />
      <span aria-hidden="true" className={styles.badge}>
        <FaInstagram aria-hidden="true" size={11} />
        Reel
      </span>
      <span className={styles.caption}>{reel.title}</span>
    </a>
  );
}
