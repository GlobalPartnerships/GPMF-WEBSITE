import styles from "./RadioOption.module.css";

interface RadioOptionProps {
  name: string;
  value: string;
  label: string;
  labelEn?: string;
  required?: boolean;
  centered?: boolean;
}

export function RadioOption({ name, value, label, labelEn, required, centered }: RadioOptionProps) {
  return (
    <label className={`${styles.option} ${centered ? styles.centered : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        className={styles.input}
      />
      <span className={styles.content}>
        <strong className={styles.label}>{label}</strong>
        {labelEn && <span className={styles.secondary}>{labelEn}</span>}
      </span>
    </label>
  );
}
