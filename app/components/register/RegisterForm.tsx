"use client";

import { useActionState, useState } from "react";
import type { RegisterDict } from "@/app/dictionaries/register/types";
import { registerAction, type RegisterState } from "@/app/actions/register";
import styles from "./RegisterForm.module.css";

interface RegisterFormProps {
  dict: RegisterDict;
  lang: string;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Password strength ────────────────────────────────────────────────────────

type StrengthLevel = "weak" | "fair" | "good" | "strong";

function getStrength(password: string): { score: number; level: StrengthLevel | null } {
  if (!password) return { score: 0, level: null };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  // Map 1-5 → 1-4
  const clamped = Math.min(4, Math.max(1, score)) as 1 | 2 | 3 | 4;
  const levels: Record<1 | 2 | 3 | 4, StrengthLevel> = {
    1: "weak",
    2: "fair",
    3: "good",
    4: "strong",
  };
  return { score: clamped, level: levels[clamped] };
}

const STRENGTH_LABELS: Record<StrengthLevel, keyof RegisterDict> = {
  weak: "passwordStrengthWeak",
  fair: "passwordStrengthFair",
  good: "passwordStrengthGood",
  strong: "passwordStrengthStrong",
};

// ─── Email validation ─────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Component ────────────────────────────────────────────────────────────────

const initialState: RegisterState = {};

export function RegisterForm({ dict, lang }: RegisterFormProps) {
  const [state, action, isPending] = useActionState(registerAction, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const { score, level } = getStrength(password);
  const emailValid = EMAIL_RE.test(email);
  const confirmMismatch = confirmPassword.length > 0 && confirmPassword !== password;

  return (
    <form className="space-y-5" action={action}>
      <input type="hidden" name="lang" value={lang} />

      {state.formError && (
        <div className={styles.formError} role="alert">
          {state.formError}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="name"
        >
          {dict.nameLabel}
        </label>
        <input
          className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm`}
          id="name"
          name="name"
          placeholder={dict.namePlaceholder}
          type="text"
          autoComplete="name"
          disabled={isPending}
        />
        {state.errors?.name && (
          <p className={styles.fieldError}>{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="email"
        >
          {dict.emailLabel}
        </label>
        <div className="relative">
          <input
            className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm pr-10 ${
              emailTouched && email
                ? emailValid
                  ? styles.inputValid
                  : styles.inputError
                : ""
            }`}
            id="email"
            name="email"
            placeholder={dict.emailPlaceholder}
            type="email"
            autoComplete="email"
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {emailTouched && email && (
            <span className={styles.emailIndicator}>
              {emailValid ? <CheckIcon /> : <XIcon />}
            </span>
          )}
        </div>
        {emailTouched && email && !emailValid && (
          <p className={styles.fieldError}>{dict.emailInvalid}</p>
        )}
        {state.errors?.email && (
          <p className={styles.fieldError}>{state.errors.email[0]}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="password"
        >
          {dict.passwordLabel}
        </label>
        <div className="relative">
          <input
            className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm pr-12`}
            id="password"
            name="password"
            placeholder={dict.passwordPlaceholder}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-burgundy transition-colors"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>

        {/* Strength bar */}
        {password && (
          <>
            <div className={styles.strengthBar}>
              {([1, 2, 3, 4] as const).map((n) => (
                <div
                  key={n}
                  className={styles.strengthSegment}
                  data-active={n <= score && level ? level : undefined}
                />
              ))}
            </div>
            {level && (
              <p className={styles.strengthLabel} data-level={level}>
                {dict[STRENGTH_LABELS[level]] as string}
              </p>
            )}
          </>
        )}

        {state.errors?.password && (
          <p className={styles.fieldError}>{state.errors.password[0]}</p>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="confirmPassword"
        >
          {dict.confirmPasswordLabel}
        </label>
        <div className="relative">
          <input
            className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm pr-12 ${
              confirmMismatch ? styles.inputError : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            placeholder={dict.confirmPasswordPlaceholder}
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            disabled={isPending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-burgundy transition-colors"
          >
            <EyeIcon open={showConfirm} />
          </button>
        </div>
        {confirmMismatch && (
          <p className={styles.fieldError}>{dict.passwordMismatch}</p>
        )}
        {state.errors?.confirmPassword && (
          <p className={styles.fieldError}>{state.errors.confirmPassword[0]}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="phone"
        >
          {dict.phoneLabel}
        </label>
        <input
          className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm`}
          id="phone"
          name="phone"
          placeholder={dict.phonePlaceholder}
          type="tel"
          autoComplete="tel"
          disabled={isPending}
        />
        {state.errors?.phone && (
          <p className={styles.fieldError}>{state.errors.phone[0]}</p>
        )}
      </div>

      <button
        className="btn-sweep w-full py-4 bg-burgundy text-white text-[12px] uppercase tracking-[0.22em] font-semibold rounded-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={isPending}
      >
        <span>{isPending ? "..." : dict.submitButton}</span>
      </button>

      <p className="text-center text-[14px] text-surface-variant pt-2">
        {dict.haveAccount}{" "}
        <a
          className="text-burgundy font-semibold hover:text-burgundy-dark transition-colors"
          href={`/${lang}/login`}
        >
          {dict.signInLink}
        </a>
      </p>
    </form>
  );
}
