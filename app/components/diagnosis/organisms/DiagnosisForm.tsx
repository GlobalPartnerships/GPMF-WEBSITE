"use client";

import { useState } from "react";
import type { DiagnosisDict } from "@/app/dictionaries/diagnosis/types";
import { RadioOption } from "../atoms/RadioOption";
import { SelectField } from "../atoms/SelectField";
import { TextareaField } from "../atoms/TextareaField";
import { TextInput } from "../atoms/TextInput";
import styles from "./DiagnosisForm.module.css";

interface DiagnosisFormProps {
  dict: DiagnosisDict["form"];
  success: DiagnosisDict["success"];
}

type Status = "idle" | "loading" | "success" | "error";

export function DiagnosisForm({ dict, success }: DiagnosisFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const { questions, contact, submit, disclaimer } = dict;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const data = new FormData(e.currentTarget);
    const payload = {
      nombre: data.get("nombre"),
      email: data.get("email"),
      empresa: data.get("empresa"),
      desafio: data.get("desafio"),
      etapa: data.get("etapa"),
      dolor: data.get("dolor"),
      urgencia: data.get("urgencia"),
      presupuesto: data.get("presupuesto"),
    };

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${API_BASE_URL}/diagnosis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("server_error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.successMessage}>
              <div className={styles.checkIcon}>
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>
                <strong>{success.title}</strong>
                {success.titleEn && <span className={styles.successTitleEn}>{success.titleEn}</span>}
              </h3>
              <p className={styles.successBody}>
                {success.body}
                {success.bodyEn && <span className={styles.successBodyEn}>{success.bodyEn}</span>}
              </p>
              <a href="/" className={styles.backLink}>{success.backLink}</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>

            {/* Question 1: Challenge */}
            <div className={styles.questionBlock}>
              <p className={styles.questionLabel}>
                <strong className={styles.labelPrimary}>{questions.challenge.label}</strong>
                <span className={styles.labelSecondary}>{questions.challenge.labelEn}</span>
              </p>
              <div className={styles.radioGroup}>
                {questions.challenge.options.map((opt) => (
                  <RadioOption
                    key={opt.value}
                    name="desafio"
                    value={opt.value}
                    label={opt.label}
                    labelEn={opt.labelEn}
                    required
                  />
                ))}
              </div>
            </div>

            {/* Question 2: Stage */}
            <div className={styles.questionBlock}>
              <p className={styles.questionLabel}>
                <strong className={styles.labelPrimary}>{questions.stage.label}</strong>
                <span className={styles.labelSecondary}>{questions.stage.labelEn}</span>
              </p>
              <SelectField
                name="etapa"
                placeholder={questions.stage.placeholder}
                options={questions.stage.options}
                required
              />
            </div>

            {/* Question 3: Pain */}
            <div className={styles.questionBlock}>
              <p className={styles.questionLabel}>
                <strong className={styles.labelPrimary}>{questions.pain.label}</strong>
                <span className={styles.labelSecondary}>{questions.pain.labelEn}</span>
              </p>
              <TextareaField
                name="dolor"
                placeholder={questions.pain.placeholder}
                rows={3}
                required
              />
            </div>

            {/* Question 4: Urgency */}
            <div className={styles.questionBlock}>
              <p className={styles.questionLabel}>
                <strong className={styles.labelPrimary}>{questions.urgency.label}</strong>
                <span className={styles.labelSecondary}>{questions.urgency.labelEn}</span>
              </p>
              <div className={styles.urgencyGrid}>
                {questions.urgency.options.map((opt) => (
                  <RadioOption
                    key={opt.value}
                    name="urgencia"
                    value={opt.value}
                    label={opt.label}
                    labelEn={opt.labelEn}
                    centered
                    required
                  />
                ))}
              </div>
            </div>

            {/* Question 5: Budget */}
            <div className={`${styles.questionBlock} ${styles.budgetSection}`}>
              <p className={styles.questionLabel}>
                <strong className={styles.labelPrimary}>{questions.budget.label}</strong>
                <span className={styles.labelSecondary}>{questions.budget.labelEn}</span>
              </p>
              <p className={styles.budgetNote}>
                <strong>{questions.budget.note}</strong>
                <span className={styles.labelSecondary}>{questions.budget.noteEn}</span>
              </p>
              <SelectField
                name="presupuesto"
                placeholder={questions.budget.placeholder}
                options={questions.budget.options}
                required
              />
            </div>

            {/* Contact */}
            <div className={styles.contactSection}>
              <h3 className={styles.contactTitle}>
                <strong>{contact.title}</strong>
                <span className={styles.labelSecondary}>{contact.titleEn}</span>
              </h3>
              <div className={styles.contactGrid}>
                <TextInput name="nombre" placeholder={contact.namePlaceholder} required />
                <TextInput name="email" type="email" placeholder={contact.emailPlaceholder} required />
              </div>
              <TextInput name="empresa" placeholder={contact.companyPlaceholder} required />
            </div>

            {/* Submit */}
            <div className={styles.submitBlock}>
              {status === "error" && (
                <p className={styles.errorMessage}>{dict.errorMessage}</p>
              )}
              <button type="submit" disabled={status === "loading"} className={styles.submitButton}>
                <strong>{status === "loading" ? submit.sending : submit.label}</strong>
                {submit.labelEn && status !== "loading" && (
                  <span className={styles.submitLabelEn}>{submit.labelEn}</span>
                )}
              </button>
              <p className={styles.disclaimer}>
                <strong>{disclaimer.text}</strong>
                <span className={styles.labelSecondary}>{disclaimer.textEn}</span>
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
