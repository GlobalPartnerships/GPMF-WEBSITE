"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/app/dictionaries";
import type { LayoutDict } from "@/app/dictionaries/layout/types";
import { useUser } from "@/app/context/UserContext";
import { MenuOverlay } from "./MenuOverlay";

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
        className="group inline-flex items-center border border-outline px-3 py-2.5 transition-all duration-300 hover:border-burgundy text-foreground/60 hover:text-burgundy cursor-pointer"
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
  const { user } = useUser();

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  const navLinks = [
    { label: dict.home, href: `/${lang}` },
    { label: dict.diagnosis, href: `/${lang}/diagnosis` },
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
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="flex items-center justify-end gap-4">
            {/* Login — only when not authenticated */}
            {!user && (
              <Link
                href={`/${lang}/login`}
                className="hidden xl:inline-flex group items-center gap-3 border border-outline px-5 h-[42px] text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition-all duration-300 hover:text-burgundy hover:border-burgundy whitespace-nowrap"
              >
                <span>{dict.login}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}

            {/* Language switcher — only when not authenticated */}
            {!user && (
              <div className="hidden xl:flex">
                <LanguageDropdown lang={lang} pathWithoutLocale={pathWithoutLocale} />
              </div>
            )}

            {/* Plans */}
            <Link
              href={`/${lang}/plans`}
              className="btn-sweep inline-flex items-center justify-center bg-burgundy text-white px-6 h-[42px] text-[11px] uppercase tracking-[0.22em] rounded whitespace-nowrap"
            >
              <span>{dict.plans}</span>
            </Link>

            {/* Hamburger */}
            {user ? (
              <button
                className="group inline-flex items-center gap-3 border border-outline px-4 py-2.5 text-foreground/70 transition-all duration-300 hover:text-burgundy hover:border-burgundy hover:scale-[1.1] cursor-pointer"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            ) : (
              <button
                className="lg:hidden text-foreground/70 ml-2 cursor-pointer transition-transform duration-300 hover:scale-[1.1]"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </header>

      <MenuOverlay
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        lang={lang}
        dict={dict}
        navLinks={navLinks}
        pathWithoutLocale={pathWithoutLocale}
        user={user}
      />
    </>
  );
}
