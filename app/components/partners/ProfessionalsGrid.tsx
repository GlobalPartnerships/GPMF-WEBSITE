import Image from "next/image";
import type { PartnersDict } from "@/app/dictionaries/partners/types";
import styles from "./Partners.module.css";

interface ProfessionalsGridProps {
  dict: PartnersDict["professionals"];
}

function AvatarFallback() {
  return (
    <div className={styles.cardAvatarFallback}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ProfessionalsGrid({ dict }: ProfessionalsGridProps) {
  return (
    <section className={`${styles.section} ${styles.professionalsSection}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className="reveal">
            <span className={styles.sectionEyebrow}>{dict.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{dict.title}</h2>
          </div>
          <span className={`reveal ${styles.sectionSubtitle}`}>{dict.subtitle}</span>
        </div>

        <div className={styles.professionalsGrid}>
          {dict.items.map((person, i) => (
            <article
              key={person.name}
              className={`reveal ${styles.card}`}
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              {person.image ? (
                <div className={styles.cardAvatar}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <AvatarFallback />
              )}
              <h3 className={styles.cardName}>{person.name}</h3>
              <p className={styles.cardRole}>{person.role}</p>
              <p className={styles.cardDesc}>{person.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
