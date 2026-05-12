import type { PartnersDict } from "@/app/dictionaries/partners/types";
import styles from "./Partners.module.css";

interface PartnersHeroProps {
  dict: PartnersDict["hero"];
}

export function PartnersHero({ dict }: PartnersHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="reveal">
        <span className={`tick text-burgundy ${styles.heroEyebrow}`}>
          {dict.eyebrow}
        </span>
        <h1 className={`font-serif ${styles.heroTitle}`}>
          {dict.headline}{" "}
          <span className={styles.heroKeyword}>{dict.headlineKeyword}</span>{" "}
          <span className={styles.heroAccent}>{dict.headlineAccent}</span>
        </h1>
        <p className={styles.heroDescription}>{dict.description}</p>
      </div>
    </section>
  );
}
