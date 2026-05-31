import type { DiagnosisDict } from "@/app/dictionaries/diagnosis/types";
import styles from "./DiagnosisCta.module.css";

interface DiagnosisCtaProps {
  dict: DiagnosisDict["cta"];
}

export function DiagnosisCta({ dict }: DiagnosisCtaProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <strong>{dict.title}</strong>
          {dict.titleEn && <span className={styles.titleEn}>{dict.titleEn}</span>}
        </h2>
        <p className={styles.body}>
          <em>{dict.body}</em>
          {dict.bodyEn && <span className={styles.bodyEn}>{dict.bodyEn}</span>}
        </p>
      </div>
    </section>
  );
}
