import type { PartnersDict } from "@/app/dictionaries/partners/types";
import styles from "./Partners.module.css";

interface CorporatePartnersProps {
  dict: PartnersDict["corporatePartners"];
}

function LogoPlaceholder() {
  return (
    <div className={styles.corporateLogoPlaceholder}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function CorporatePartners({ dict }: CorporatePartnersProps) {
  return (
    <section className={`${styles.section} ${styles.corporateSection}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className="reveal">
            <span className={styles.sectionEyebrow}>{dict.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{dict.title}</h2>
          </div>
          <span className={`reveal ${styles.sectionSubtitle}`}>{dict.subtitle}</span>
        </div>

        <div className={styles.corporateGrid}>
          {dict.items.map((firm, i) => (
            <article
              key={firm.name}
              className={`reveal ${styles.corporateCard}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <LogoPlaceholder />
              <h3 className={styles.corporateName}>{firm.name}</h3>
              <p className={styles.corporateBadge}>{dict.badge}</p>
              <p className={styles.corporateDesc}>{firm.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
