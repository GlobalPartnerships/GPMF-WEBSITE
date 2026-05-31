import styles from "./TextInput.module.css";

interface TextInputProps {
  name: string;
  type?: "text" | "email";
  placeholder: string;
  required?: boolean;
}

export function TextInput({ name, type = "text", placeholder, required }: TextInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={styles.input}
    />
  );
}
