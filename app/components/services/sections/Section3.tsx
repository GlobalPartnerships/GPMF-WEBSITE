import { SectionLegend } from "../SectionLegend";
import styles from "./Section3.module.css";
import Image from "next/image";


export function Section3({ bagroundColor }: { bagroundColor: string }) {
    return (
        <section className={`${styles.section} ${bagroundColor} overflow-hidden py-20`}>
            <SectionLegend 
                number="03"
                title="Intercultural and Interdisciplinary Management"
                description="Strengthening internal capabilities to collaborate, innovate, and lead in global environments."
                numberColor="#00000050"
                lineColor="#0000008e"
                titleColor="rgb(0, 0, 0)"
                descriptionColor="#070707"
            
            />

            <article className={styles.art_1}>
                <Image 
                    src="/REFERENCE_IMAGES/5962a10ec960a3dd9980617ffdf932b8 1.png" 
                    alt="Description" 
                    width={350}
                    height={640}
                />
                <div className={styles.art_1_bodyWrap}>
                    <h2 className={styles.art_1_title}>
                        The jockey for position and prestige
                    </h2>
                    <p className={styles.art_1_body} >
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam phasellus montes feugiat luctus convallis, justo vehicula dui nostra egestas nec. Nostra lacus vehicula luctus felis platea turpis sem gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
                    </p>
                </div>
                <div className={styles.art_1_circle}></div>
            </article>
            <article className={styles.art_2}>
                <div className={styles.art_2_bodyWrap}>
                    <h2 className={styles.art_2_title}>
                        The jockey for position and prestige
                    </h2>
                    <p className={styles.art_2_body} >
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam phasellus montes feugiat luctus convallis, justo vehicula dui nostra egestas nec. Nostra lacus vehicula luctus felis platea turpis sem gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
                    </p>
                </div>
                <Image 
                    src="/REFERENCE_IMAGES/image 4.png" 
                    alt="Description" 
                    width={550}
                    height={640}
                />
            </article>
            <article className={styles.art_3}>
                <Image 
                    src="/REFERENCE_IMAGES/image 5.png" 
                    alt="Description" 
                    width={550}
                    height={640}
                />
                <div className={styles.art_3_bodyWrap}>
                    <h2 className={styles.art_3_title}>
                        The jockey for position and prestige
                    </h2>
                    <p className={styles.art_3_body} >
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam phasellus montes feugiat luctus convallis, justo vehicula dui nostra egestas nec. Nostra lacus vehicula luctus felis platea turpis sem gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
                    </p>
                    <ul className={styles.art_3_list}>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, in?</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit amet consectetur.</li>
                        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                    </ul>
                </div>
                <div className={styles.art_3_ring}></div>
            </article>
        </section>
    )
}