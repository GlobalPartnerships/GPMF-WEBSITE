import type { DiagnosisDict } from "@/app/dictionaries/diagnosis/types";
import styles from "./DiagnosisHero.module.css";

interface DiagnosisHeroProps {
  dict: DiagnosisDict["hero"];
}

export function DiagnosisHero({ dict }: DiagnosisHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titlePrimary}>
            {dict.title} <span className={styles.highlight}>{dict.titleHighlight}</span>
          </span>
          {dict.titleEn && (
            <span className={styles.titleSecondary}>
              {dict.titleEn} <span className={styles.highlight}>{dict.titleEnHighlight}</span>
            </span>
          )}
        </h1>
        <p className={styles.description}>
          <strong>{dict.description}</strong>
        </p>
        {dict.descriptionEn && (
          <p className={styles.descriptionEn}>{dict.descriptionEn}</p>
        )}
      </div>
    </section>
  );
}
