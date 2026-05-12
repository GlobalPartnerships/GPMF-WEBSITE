import Image from "next/image";
import type { PilarsDict } from "@/app/dictionaries/pilars/types";
import styles from "./Pilars.module.css";

interface PilarsCtaProps {
  cta: PilarsDict["cta"];
  separator: string;
}

export function PilarsCta({ cta, separator }: PilarsCtaProps) {
  return (
    <>
      {/* Separator */}
      <div className={styles.separatorSection}>
        <div className="reveal flex items-center gap-6">
          <div className="h-px flex-1 bg-foreground/8" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-foreground/30 font-medium">
            {separator}
          </span>
          <div className="h-px flex-1 bg-foreground/8" />
        </div>
      </div>

      {/* CTA Bento Section */}
      <section className={styles.ctaSection}>
        <div className="reveal">
          <div className={styles.ctaBento}>
            {/* Box 1: Geometric art + text */}
            <div className={styles.ctaBoxHero}>
              <svg
                className={styles.ctaGeoArt}
                viewBox="0 0 520 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="520" height="380" fill="#f5f1ec" />
                <circle cx="420" cy="320" r="150" fill="#e8e8e8" />
                <rect x="400" y="0" width="120" height="200" fill="#7a0f32" rx="2" />
                <polygon points="0,220 200,380 0,380" fill="#d4d4d4" opacity="0.6" />
                <path d="M180,380 A130,130 0 0,1 440,380" fill="#ddbfc3" opacity="0.7" />
                <circle cx="360" cy="280" r="70" fill="#56001f" opacity="0.85" />
                <rect x="320" y="160" width="120" height="28" fill="#e2e2e2" rx="2" />
                <circle cx="460" cy="240" r="30" fill="#ffffff" opacity="0.8" />
                <path d="M0,0 Q60,10 50,100 L0,100 Z" fill="#eeeeee" opacity="0.5" />
                <rect
                  x="280"
                  y="100"
                  width="60"
                  height="3"
                  fill="#7a0f32"
                  opacity="0.4"
                  rx="1"
                />
                <circle cx="470" cy="310" r="5" fill="#897174" opacity="0.25" />
                <circle cx="490" cy="330" r="5" fill="#897174" opacity="0.25" />
                <circle cx="470" cy="350" r="5" fill="#897174" opacity="0.25" />
                <circle cx="490" cy="350" r="5" fill="#897174" opacity="0.25" />
              </svg>
              <div className={styles.ctaBoxHeroContent}>
                <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
                  {cta.eyebrow}
                </span>
                <h2 className="font-serif text-[28px] lg:text-[34px] leading-[1.12] font-semibold mt-4 whitespace-pre-line">
                  {cta.headline}
                </h2>
                <p className="text-[14px] text-surface-variant leading-relaxed mt-3 max-w-[260px]">
                  {cta.description}
                </p>
              </div>
            </div>

            {/* Display text */}
            <div className={styles.ctaBoxDisplay}>
              <span className={`font-serif ${styles.displayText}`}>
                {cta.displayText}
              </span>
            </div>

            {/* Box 2: Globe image */}
            <div className={styles.ctaBoxImg1}>
              <div className={styles.ctaImgWrap}>
                <Image
                  src="/images/globe.png"
                  alt={cta.globalReachTitle}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={styles.ctaImgCaption}>
                <h4 className="font-serif text-[22px] font-semibold leading-tight">
                  {cta.globalReachTitle}
                </h4>
                <p className="text-[13px] text-surface-variant leading-relaxed mt-2">
                  {cta.globalReachDescription}
                </p>
              </div>
            </div>

            {/* Box 3: Cherry blossom image */}
            <div className={styles.ctaBoxImg2}>
              <div className={styles.ctaImgWrap}>
                <Image
                  src="/images/cherry-blossom.png"
                  alt={cta.artfulDetailTitle}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={styles.ctaImgCaption}>
                <h4 className="font-serif text-[22px] font-semibold leading-tight">
                  {cta.artfulDetailTitle}
                </h4>
                <p className="text-[13px] text-surface-variant leading-relaxed mt-2">
                  {cta.artfulDetailDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
