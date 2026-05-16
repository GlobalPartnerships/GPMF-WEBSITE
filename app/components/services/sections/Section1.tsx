import Image from "next/image";
import { SectionLegend } from "../SectionLegend";
import styles from "./Section1.module.css";

interface Section1Props {
  bagroundColor?: string;
}

export function Section1({ bagroundColor }: Section1Props) {
  return (
    <section className={`${styles.section} ${bagroundColor ?? ""}`}>
      <SectionLegend
        number="01"
        title="Internationalization and Strategic Alliances"
        description="Expanding businesses globally, building bridges between Europe and Latin America."
        numberColor="rgba(0, 0, 0, 0.12)"
        lineColor="rgba(0, 0, 0, 0.15)"
        titleColor="rgba(0, 0, 0, 0.85)"
        descriptionColor="rgba(0, 0, 0, 0.5)"
      />

      {/* Zone 1: Subtitle + Burgundy Circle */}
      <article className={styles.subtitleArticle}>
        <div className={styles.subtitleTitleWrap}>
          <div className={styles.burgundyCircle} />
          <h2 className={styles.subtitleHeading}>
            Here an impactful subtitle for it to look great
          </h2>
        </div>
        <p className={styles.subtitleBody}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam
          phasellus montes feugiat luctus convallis, justo vehicula dui nostra
          egestas nec. Nostra lacus vehicula luctus felis platea turpis sem
          gravida, mollis risus pharetra vestibulum eleifend dapibus habitant,
          lectus nec velit placerat accumsan scelerisque mus. Et turpis praesent
          eget fusce nisi varius donec platea pron, lobortis egestas lacusis
          aliquet parturient vitae fermentum isi, curae arcu torquent ultricies
          libero erat cum sagittis.
        </p>
      </article>

      {/* Zone 2: Jockey Block */}
      <article className={styles.jockeyArticle}>
        <div className={styles.jockeyTitleWrap}>
          <div className={styles.blackRing} />
          <h2 className={styles.jockeyHeading}>
            The jockey for position and prestige
          </h2>
        </div>
        <div className={styles.jockeyBodyWrap}>
          <div className={styles.redCircleSmall} />
          <p className={styles.jockeyBody}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam
            phasellus montes feugiat luctus convallis, justo vehicula dui nostra
            egestas nec. Nostra lacus vehicula luctus felis platea turpis sem
            gravida, mollis risus pharetra vestibulum eleifend dapibus habitant.
          </p>
        </div>
      </article>

      {/* Zone 3: Impact Area */}
      <article className={styles.impactArticle}>
        <div className={styles.photoWrapper}>
          <Image
            src="/images/services/section1-photo.jpg"
            alt="Professional speaker at a conference"
            width={480}
            height={640}
            z-index={2}
            className={styles.photo}
          />
          <div className={styles.photoRing} />
        </div>
        <div className={styles.impactContent}>
          <div className={styles.impactTextBlock}>
            <div className={styles.impactTitleWrap}>
              <h2 className={styles.impactHeading}>Impact key</h2>
              <div className={styles.pinkCircle} />
            </div>
            <p className={styles.impactBody}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, felis nam
              phasellus montes feugiat luctus convallis, justo vehicula dui
              nostra egestas nec. Nostra lacus vehicula luctus felis platea
              turpis sem gravida, mollis risus pharetra vestibulum eleifend
              dapibus habitant.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
