import styles from "./SectionLegend.module.css";

interface SectionLegendProps {
  number: string;
  title: string;
  description: string;
  numberColor?: string;
  lineColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export function SectionLegend({
  number,
  title,
  description,
  numberColor,
  lineColor,
  titleColor,
  descriptionColor,
}: SectionLegendProps) {
  return (
    <div className={styles.legend}>
      <span className={styles.number} style={{ color: numberColor }}>
        {number}
      </span>
      <div className={styles.line} style={{ background: lineColor }} />
      <div className={styles.textBlock}>
        <h2 className={styles.title} style={{ color: titleColor }}>
          {title}
        </h2>
        <p className={styles.description} style={{ color: descriptionColor }}>
          {description}
        </p>
      </div>
    </div>
  );
}
