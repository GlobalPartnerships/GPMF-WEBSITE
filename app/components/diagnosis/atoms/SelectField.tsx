import styles from "./SelectField.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
}

export function SelectField({ name, placeholder, options, required }: SelectFieldProps) {
  return (
    <select name={name} required={required} className={styles.select} defaultValue="">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
