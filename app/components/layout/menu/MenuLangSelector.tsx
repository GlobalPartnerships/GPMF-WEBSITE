"use client";

import Link from "next/link";

const localeConfig = [
  { locale: "es", flag: "es" },
  { locale: "en", flag: "us" },
  { locale: "fr", flag: "fr" },
  { locale: "de", flag: "de" },
] as const;

interface MenuLangSelectorProps {
  lang: string;
  pathWithoutLocale: string;
  onClose: () => void;
}

export function MenuLangSelector({ lang, pathWithoutLocale, onClose }: MenuLangSelectorProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      {localeConfig.map(({ locale, flag }) => (
        <Link
          key={locale}
          href={`/${locale}${pathWithoutLocale}`}
          onClick={onClose}
          className={`flex items-center gap-1.5 px-2 py-1 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors ${
            locale === lang
              ? "text-burgundy underline underline-offset-4"
              : "text-foreground/50 hover:text-burgundy"
          }`}
        >
          <span
            className={`fi fi-${flag} fis rounded-full`}
            style={{ width: 16, height: 16, flexShrink: 0 }}
          />
          {locale}
        </Link>
      ))}
    </div>
  );
}
