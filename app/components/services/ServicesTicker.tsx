import type { ServicesDict } from "@/app/dictionaries/services/types";
import styles from "./ServicesTicker.module.css";

interface ServicesTickerProps {
  dict: ServicesDict["hero"];
}

export function ServicesTicker({ dict }: ServicesTickerProps) {
  const items = Array(24).fill(`${dict.tickerText}  •`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {items.map((text, i) => (
          <span key={i} className={styles.item}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
