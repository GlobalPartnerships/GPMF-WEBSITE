"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/app/dictionaries";
import type { LayoutDict } from "@/app/dictionaries/layout/types";
import headerStyles from "./Header.module.css";

const allLocales = ["es", "en", "fr", "de"] as const;

interface HeaderProps {
  lang: Locale;
  dict: LayoutDict["nav"];
}

export function Header({ lang, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  const navLinks = [
    { label: dict.home, href: `/${lang}` },
    { label: dict.pilars, href: `/${lang}/pilars` },
    { label: dict.partners, href: `/${lang}/partners` },
    { label: dict.services, href: `/${lang}#services` },
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
            {/* Language switcher */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] font-bold text-foreground/70 mr-1">
              {allLocales.map((locale, i) => (
                <span key={locale} className="flex items-center gap-2">
                  {i > 0 && <span className="text-foreground/20">|</span>}
                  {locale === lang ? (
                    <span className="text-burgundy border-b border-burgundy">
                      {locale.toUpperCase()}
                    </span>
                  ) : (
                    <Link
                      href={`/${locale}${pathWithoutLocale}`}
                      className="hover:text-burgundy transition-colors"
                    >
                      {locale.toUpperCase()}
                    </Link>
                  )}
                </span>
              ))}
            </div>

            {/* Sign in */}
            <Link
              href={`/${lang}/login`}
              className="hidden xl:inline whitespace-nowrap text-[11px] uppercase tracking-[0.22em] text-foreground/60 hover:text-burgundy transition-colors"
            >
              {dict.login}
            </Link>

            {/* Plans — get started style with sweep */}
            <Link
              href={`/${lang}/plans`}
              className="btn-sweep bg-burgundy text-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] rounded whitespace-nowrap"
            >
              <span>{dict.plans}</span>
            </Link>

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
          <div className="flex items-center gap-4 text-sm font-bold text-foreground py-2">
            {allLocales.map((locale, i) => (
              <span key={locale} className="flex items-center gap-4">
                {i > 0 && <span className="text-foreground/20">|</span>}
                {locale === lang ? (
                  <span className="text-burgundy border-b-2 border-burgundy">
                    {locale.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    href={`/${locale}${pathWithoutLocale}`}
                    className="hover:text-burgundy transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {locale.toUpperCase()}
                  </Link>
                )}
              </span>
            ))}
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
