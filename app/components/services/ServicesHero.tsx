import type { ServicesDict } from "@/app/dictionaries/services/types";
import { ServicesTicker } from "./ServicesTicker";
import styles from "./ServicesHero.module.css";

interface ServicesHeroProps {
  dict: ServicesDict["hero"];
}

export function ServicesHero({ dict }: ServicesHeroProps) {
  const badgeText = dict.badgeItems.join(" • ") + " • ";

  return (
    <section className={styles.hero}>
      <div className={styles.bgTextBlock} aria-hidden="true">
        <span className={styles.bgText}>{dict.backgroundText}</span>
        <span className={styles.bgCompany}>GPMF</span>
      </div>

      <div className={styles.ringGroup} aria-hidden="true">
        <div className={styles.solidCircle} />
        <div className={styles.ring} />
      </div>

      <div className={styles.badge} aria-hidden="true">
        <svg viewBox="0 0 300 300" className={styles.badgeSvg}>
          <defs>
            <path
              id="badgeCirclePath"
              d="M 150,150 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
            />
          </defs>
          <circle cx="150" cy="150" r="110" fill="#D7D7D7" />
          <text className={styles.badgeText}>
            <textPath href="#badgeCirclePath" startOffset="0%">
              {badgeText}
            </textPath>
          </text>
        </svg>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.heroLegend}>{dict.legend}</p>
        <h1 className={styles.heroTitle}>{dict.title}</h1>
        <p className={styles.heroDescription}>{dict.description}</p>
      </div>

      <ServicesTicker dict={dict} />
    </section>
  );
}
