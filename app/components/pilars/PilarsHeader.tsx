import type { PilarsDict } from "@/app/dictionaries/pilars/types";
import styles from "./Pilars.module.css";

interface PilarsHeaderProps {
  dict: PilarsDict;
}

export function PilarsHeader({ dict }: PilarsHeaderProps) {
  return (
    <section className={styles.header}>
      <div className="reveal">
        <span className={`tick text-burgundy ${styles.headerEyebrow}`}>
          {dict.eyebrow}
        </span>
        <h1 className={`font-serif ${styles.headerTitle}`}>
          {dict.headline}{" "}
          <span className={`text-burgundy ${styles.headerAccent}`}>
            {dict.headlineAccent}
          </span>
        </h1>
        <p className={`text-surface-variant ${styles.headerSubtitle}`}>
          {dict.subtitle}
        </p>
      </div>
    </section>
  );
}
