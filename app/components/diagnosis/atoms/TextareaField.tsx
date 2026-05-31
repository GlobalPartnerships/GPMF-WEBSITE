import styles from "./TextareaField.module.css";

interface TextareaFieldProps {
  name: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
}

export function TextareaField({ name, placeholder, rows = 3, required }: TextareaFieldProps) {
  return (
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className={styles.textarea}
    />
  );
}
