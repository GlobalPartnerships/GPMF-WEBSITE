import styles from "./Pilars.module.css";

export function PilarsDecorations() {
  return (
    <>
      {/* Vertical side text */}
      <div className={styles.sideText}>
        <span className="text-[10px] tracking-[0.32em] uppercase text-foreground/40 font-medium leading-relaxed">
          Global Partnerships &amp;
          <br />
          Multidisciplinary Firm
        </span>
      </div>

      {/* Decorative floating elements */}
      <div
        className={`${styles.decoLine} ${styles.decoHorizontal} ${styles.floatAnim}`}
        style={{ top: 180, left: "3%", width: 80, color: "rgba(26,28,28,0.08)" }}
      />
      <div
        className={`${styles.decoDot} ${styles.floatAnimDelay}`}
        style={{ top: 176, left: "calc(3% + 84px)", color: "rgba(26,28,28,0.12)" }}
      />
      <div
        className={`${styles.decoLine} ${styles.decoVertical} ${styles.floatAnimSlow}`}
        style={{ top: 120, left: "6%", height: 50, color: "rgba(26,28,28,0.06)" }}
      />
      <div
        className={`${styles.decoCross} ${styles.floatAnimDelay}`}
        style={{ top: 140, right: "7%", color: "rgba(122,15,50,0.10)" }}
      />
      <div
        className={`${styles.decoLine} ${styles.decoHorizontal} ${styles.floatAnim}`}
        style={{ top: 200, right: "4%", width: 60, color: "rgba(26,28,28,0.06)" }}
      />
      <div
        className={`${styles.decoRect} ${styles.floatAnimSlow}`}
        style={{
          top: 160,
          right: "12%",
          width: 20,
          height: 20,
          color: "rgba(26,28,28,0.06)",
        }}
      />
      <div
        className={`${styles.decoLine} ${styles.decoVertical} ${styles.floatAnim}`}
        style={{ bottom: 200, left: "2%", height: 120, color: "rgba(122,15,50,0.06)" }}
      />
      <div
        className={`${styles.decoDot} ${styles.floatAnimDelay}`}
        style={{ bottom: 200, left: "2%", color: "rgba(39,39,39,0.15)" }}
      />
      <div
        className={`${styles.decoCross} ${styles.floatAnimSlow}`}
        style={{ bottom: 260, left: "5%", color: "rgba(26,28,28,0.07)" }}
      />
      <div
        className={`${styles.decoLine} ${styles.decoHorizontal} ${styles.floatAnimDelay}`}
        style={{ bottom: 180, right: "3%", width: 100, color: "rgba(39,39,39,0.06)" }}
      />
      <div
        className={`${styles.decoRect} ${styles.floatAnim}`}
        style={{
          bottom: 220,
          right: "6%",
          width: 14,
          height: 14,
          color: "rgba(122,15,50,0.08)",
        }}
      />
      <div
        className={`${styles.decoDot} ${styles.floatAnimSlow}`}
        style={{ bottom: 170, right: "8%", color: "rgba(26,28,28,0.10)" }}
      />
    </>
  );
}
