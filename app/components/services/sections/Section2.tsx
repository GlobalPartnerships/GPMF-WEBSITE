import { SectionLegend } from "../SectionLegend";
import styles from "./Section2.module.css";
import Image from "next/image";
interface Section2Props {
  bagroundColor?: string;
}

export function Section2({ bagroundColor }: Section2Props) {
    return (
        <section className={`${styles.section} overflow-hidden ${bagroundColor ?? ""}`}>
            <SectionLegend
                number="02"
                title="AI & Analytics Consulting"
                description="Transforming data into strategic decisions for high-potential SMEs and NGOs. Systems for small and mid level enterprises"
                numberColor="#fff8f875"
                lineColor="#d3d3d350"
                titleColor="rgba(255, 255, 255, 0.85)"
                descriptionColor="#D4D4D4"
            />

            <article className={styles.article_1}>
                <div className={styles.art_1_titleWrap}>
                    <h2 className={styles.art_1_title}>Here an impactful subtitle for it to look great</h2>
                    <div className={styles.art_1_ring}></div>
                </div>
                <div className={styles.art_1_bodyWrap}>
                    <p className={styles.art_1_body}>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam phasellus montes feugiat luctus convallis, justo vehicula dui nostra egestas nec. Nostra lacus vehicula luctus felis platea turpis sem gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
                    </p>
                    <div className={styles.art_1_circle}></div>
                </div>
            </article>

            <article className={styles.article_2}>
                <div>
                    <h2 className={styles.art_2_title}>Impact key</h2>
                    <div className={styles.art_2_body}>Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam phasellus montes feugiat luctus convallis, justo vehicula dui nostra egestas nec. Nostra lacus vehicula luctus felis platea turpis sem gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
                    <div className={styles.art_2_ring}></div>

                    </div>
                </div>
                <div>
                    <Image 
                        src="/REFERENCE_IMAGES/image_2.png" 
                        alt="Description" 
                        width={350}
                        height={640}
                    />
                </div>
            </article>
            <article className={styles.article_3}>
                <h2 className={styles.art_3_title}>Our step by step for your company</h2>
                <ul className={styles.art_3_list}>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, in?</li>
                    <li>Lorem, ipsum dolor.</li>
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                </ul>
                <div className={styles.art_3_badge} aria-hidden="true">
                  <svg viewBox="0 0 300 300" className={styles.art_3_badgeSvg}>
                    <defs>
                      <path
                        id="art3BadgeCirclePath"
                        d="M 150,150 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                      />
                    </defs>
                    <text className={styles.art_3_badgeText}>
                      <textPath href="#art3BadgeCirclePath" startOffset="0%">
                        INTERNATIONAL STRATEGY • LEADERSHIP • AI CONSULTING • GLOBAL EXPANSION • TRANSFORMATION •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className={styles.art_3_circle}></div>
                <Image 
                    src="/REFERENCE_IMAGES/Screenshot 2026-05-15 203722.png" 
                    alt="Description" 
                    width={350}
                    height={640}
                />
            </article>
        </section>
    )
}