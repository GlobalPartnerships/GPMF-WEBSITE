"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/app/dictionaries";
import type { LayoutDict } from "@/app/dictionaries/layout/types";
import headerStyles from "./Header.module.css";

const localeConfig = [
  { locale: "es", flag: "es", label: "Español" },
  { locale: "en", flag: "us", label: "English" },
  { locale: "fr", flag: "fr", label: "Français" },
  { locale: "de", flag: "de", label: "Deutsch" },
] as const;

interface HeaderProps {
  lang: Locale;
  dict: LayoutDict["nav"];
}

function LanguageDropdown({
  lang,
  pathWithoutLocale,
  onSelect,
}: {
  lang: string;
  pathWithoutLocale: string;
  onSelect?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex items-center border border-outline px-3 py-2.5 transition-all duration-300 hover:bg-burgundy hover:border-burgundy text-foreground/60 hover:text-white"
        aria-label="Select language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6.371c0 4.418 -2.239 6.629 -5 6.629" />
          <path d="M4 6.371h7" />
          <path d="M5 9c0 2.144 2.252 3.908 6 4" />
          <path d="M12 20l4 -9l4 9" />
          <path d="M19.1 18h-6.2" />
          <path d="M6.694 3l.793 .582" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[150px] z-50">
          {localeConfig.map(({ locale, flag, label }) => (
            <Link
              key={locale}
              href={`/${locale}${pathWithoutLocale}`}
              className={`flex items-center gap-3 px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors ${
                locale === lang
                  ? "text-burgundy bg-burgundy/5"
                  : "text-foreground/60 hover:text-burgundy hover:bg-gray-50"
              }`}
              onClick={() => {
                setOpen(false);
                onSelect?.();
              }}
            >
              <span
                className={`fi fi-${flag} fis rounded-full`}
                style={{ width: 18, height: 18, flexShrink: 0 }}
              />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header({ lang, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  const navLinks = [
    { label: dict.home, href: `/${lang}` },
    { label: dict.pilars, href: `/${lang}/pilars` },
    { label: dict.partners, href: `/${lang}/partners` },
    { label: dict.services, href: `/${lang}/services` },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-gray-100/80">
        <nav className="max-w-[1280px] mx-auto flex items-center justify-between lg:grid lg:grid-cols-3 px-8 py-5 gap-8">
          {/* Logo */}
          <Link href={`/${lang}`}>
            <Image
              src="/images/gpmf-logo-white.png"
              alt="GPMF Logo"
              width={120}
              height={40}
              className="h-10 w-auto invert"
              priority
            />
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden lg:flex items-center justify-center gap-10 text-[11px] uppercase tracking-[0.22em] text-foreground/70 font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={headerStyles.navLink}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="flex items-center justify-end gap-4">
            {/* Sign in */}
            <Link
              href={`/${lang}/login`}
              className="hidden xl:inline whitespace-nowrap text-[11px] uppercase tracking-[0.22em] text-foreground/60 hover:text-burgundy transition-colors"
            >
              {dict.login}
            </Link>

            {/* Plans */}
            <Link
              href={`/${lang}/plans`}
              className="btn-sweep bg-burgundy text-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] rounded whitespace-nowrap"
            >
              <span>{dict.plans}</span>
            </Link>

             {/* Language switcher */}
            <div className="hidden xl:flex">
              <LanguageDropdown lang={lang} pathWithoutLocale={pathWithoutLocale} />
            </div>
            
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-foreground/70 ml-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col pt-24 px-8 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-bold text-foreground tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="py-2">
            <LanguageDropdown
              lang={lang}
              pathWithoutLocale={pathWithoutLocale}
              onSelect={() => setMobileOpen(false)}
            />
          </div>

          <Link
            href={`/${lang}/login`}
            className="text-lg text-foreground/60 uppercase tracking-[0.22em]"
            onClick={() => setMobileOpen(false)}
          >
            {dict.login}
          </Link>

          <Link
            href={`/${lang}/plans`}
            className="btn-sweep bg-burgundy text-white px-6 py-4 text-[12px] uppercase tracking-[0.22em] rounded text-center"
            onClick={() => setMobileOpen(false)}
          >
            <span>{dict.plans}</span>
          </Link>

          <Link
            href={`/${lang}/schedule`}
            className="btn-sweep bg-burgundy text-white px-6 py-4 text-[12px] uppercase tracking-[0.22em] rounded text-center"
            onClick={() => setMobileOpen(false)}
          >
            <span>{dict.schedule}</span>
          </Link>

          <button
            className="absolute top-6 right-8 text-3xl text-foreground/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
