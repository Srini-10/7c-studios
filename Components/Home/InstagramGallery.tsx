import homepage from "@/data/homepage.json";
import InstagramReel from "./InstagramReel";
import styles from "./InstagramGallery.module.css";

export default function InstagramGallery() {
  const { instagram } = homepage;

  return (
    <section id="instagram" aria-labelledby="instagram-title" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 id="instagram-title" className={styles.heading}>
            {instagram.heading}
          </h2>
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={styles.handle}>
            {instagram.handle}
          </a>
        </div>

        <div className={styles.grid}>
          {instagram.reels.map((reel) => (
            <InstagramReel
              key={reel.id}
              reel={reel}
              sizes="(max-width: 479px) calc((100vw - 48px) / 2), (max-width: 639px) calc((100vw - 80px) / 2), (max-width: 959px) calc((100vw - 96px) / 3), 300px"
            />
          ))}
        </div>

        <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={styles.followButton}>
          {instagram.buttonLabel}
        </a>
      </div>
    </section>
  );
}
