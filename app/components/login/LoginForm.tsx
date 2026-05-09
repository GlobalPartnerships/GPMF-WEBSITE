"use client";

import { useState } from "react";
import type { LoginDict } from "@/app/dictionaries/login/types";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  dict: Pick<
    LoginDict,
    | "emailLabel"
    | "emailPlaceholder"
    | "passwordLabel"
    | "passwordPlaceholder"
    | "rememberMe"
    | "forgotPassword"
    | "submitButton"
  >;
}

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

export function LoginForm({ dict }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label
          className="block text-[10px] tracking-[0.22em] uppercase text-foreground font-semibold mb-3"
          htmlFor="email"
        >
          {dict.emailLabel}
        </label>
        <input
          className={`${styles.input} w-full px-4 py-3.5 bg-white text-[15px] rounded-sm`}
          id="email"
          placeholder={dict.emailPlaceholder}
          type="email"
          autoComplete="email"
        />
      </div>

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
            placeholder={dict.passwordPlaceholder}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-burgundy transition-colors"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 rounded-sm border-outline accent-burgundy"
            id="remember"
            type="checkbox"
          />
          <span className="text-[10px] tracking-[0.22em] uppercase text-surface-variant font-medium">
            {dict.rememberMe}
          </span>
        </label>
        <a
          className="text-[10px] tracking-[0.22em] uppercase text-burgundy font-semibold hover:text-burgundy-dark transition-colors"
          href="#"
        >
          {dict.forgotPassword}
        </a>
      </div>

      <button
        className="btn-sweep w-full py-4 bg-burgundy text-white text-[12px] uppercase tracking-[0.22em] font-semibold rounded-sm mt-4"
        type="submit"
      >
        <span>{dict.submitButton}</span>
      </button>
    </form>
  );
}
