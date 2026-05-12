import type { PilarsDict } from "@/app/dictionaries/pilars/types";
import styles from "./Pilars.module.css";

const ACCORDION_IMAGES = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
];

const COLUMN_BACKGROUNDS = ["#faf8f6", "#f5f1ec", "#faf8f6"];

interface PilarsAccordionProps {
  principles: PilarsDict["principles"];
}

export function PilarsAccordion({ principles }: PilarsAccordionProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-8 relative z-10">
      <div className="reveal">
        <div className={styles.accordionContainer}>
          {principles.map((item, idx) => (
            <div
              key={item.number}
              className={styles.accordionColumn}
              style={{ backgroundColor: COLUMN_BACKGROUNDS[idx] }}
            >
              <div className={styles.accordionBg}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ACCORDION_IMAGES[idx]} alt="" />
                <div className={styles.accordionOverlay} />
              </div>
              <span className={`font-serif ${styles.accordionNumber}`}>
                {item.number}
              </span>
              <div className={styles.accordionContent}>
                <span
                  className={`tick text-[11px] tracking-[0.28em] uppercase font-semibold mb-4 ${styles.accordionLabel}`}
                >
                  {item.label}
                </span>
                <h3
                  className={`font-serif mb-0 ${styles.accordionTitle}`}
                >
                  {item.title}
                  <br />
                  {item.titleLine2}
                </h3>
                <div className={styles.accordionDivider} />
                <p className={`text-[15px] leading-relaxed ${styles.accordionDesc}`}>
                  {item.description}
                </p>
                <div className={`mt-6 ${styles.accordionCta}`}>
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium">
                    {item.ctaLabel}
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
