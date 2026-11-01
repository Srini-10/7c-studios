import type { CSSProperties } from "react";
import motionStyles from "./AboutMotion.module.css";
import styles from "./AboutApproach.module.css";

type Item = { id: string; heading: string; headingLines?: string[]; description: string };

export default function AboutApproach({ items }: { items: Item[] }) {
  return (
    <div className={styles.approach}>
      {items.map((item, index) => (
        <div
          key={item.id}
          data-about-reveal
          style={{ "--about-delay": `${index * 100}ms` } as CSSProperties}
          className={`${motionStyles.textReveal} ${styles.item}`}
        >
          <h3 className={styles.heading}>
            {item.headingLines ? item.headingLines.map((line, lineIndex) => (
              <span key={line} className="block">
                {line}{lineIndex < item.headingLines!.length - 1 ? " " : ""}
              </span>
            )) : item.heading}
          </h3>
          <p className={styles.body}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
