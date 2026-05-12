import Link from "next/link";
import type { PartnersDict } from "@/app/dictionaries/partners/types";
import styles from "./Partners.module.css";

interface PartnersCollaborationCtaProps {
  dict: PartnersDict["cta"];
}

export function PartnersCollaborationCta({ dict }: PartnersCollaborationCtaProps) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div className="reveal">
          <span className={styles.ctaEyebrow}>{dict.eyebrow}</span>
          <h2 className={styles.ctaTitle}>{dict.title}</h2>
          <p className={styles.ctaDescription}>{dict.description}</p>
          <ul className={styles.ctaBullets}>
            {dict.bullets.map((bullet, i) => (
              <li key={i} className={styles.ctaBullet}>
                <span className={styles.ctaBulletStar}>★</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`reveal ${styles.allyBox}`}>
          <h3 className={styles.allyBoxTitle}>{dict.allyBox.title}</h3>
          <p className={styles.allyBoxDesc}>{dict.allyBox.description}</p>
          <div className={styles.allyBoxActions}>
            <Link href={dict.allyBox.emailCta.href} className={styles.allyBtnPrimary}>
              {dict.allyBox.emailCta.label}
            </Link>
            <Link href={dict.allyBox.scheduleCta.href} className={styles.allyBtnSecondary}>
              {dict.allyBox.scheduleCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
