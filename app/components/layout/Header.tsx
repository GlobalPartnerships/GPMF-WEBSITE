"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/app/dictionaries";
import type { LayoutDict } from "@/app/dictionaries/layout/types";
import { useUser } from "@/app/context/UserContext";

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

function LogoutButton({ lang, label }: { lang: string; label: string }) {
  return (
    <form method="POST" action={`/${lang}/auth/logout`} className="w-full">
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-between gap-4 border border-outline px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition-all duration-300 hover:text-burgundy hover:border-burgundy cursor-pointer"
      >
        <span>{label}</span>
        <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
      </button>
    </form>
  );
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export function Header({ lang, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

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
                <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
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

            {/* Hamburger — styled border button when authenticated, plain icon otherwise */}
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

      {/* Menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 min-[800px]:flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop — 800px+ only, covers the area outside the panel */}
          <div className="hidden min-[800px]:block min-[800px]:flex-1 bg-black/50 backdrop-blur-sm h-full" />

          {/* Panel */}
          <div
            className="fixed inset-0 w-full bg-white/85 backdrop-blur-md overflow-y-auto
              min-[800px]:static min-[800px]:h-full min-[800px]:min-w-[420px] min-[800px]:w-auto
              min-[800px]:bg-[#faf8f6] min-[800px]:backdrop-blur-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner wrapper — relative context for close button */}
            <div className="relative flex flex-col pt-24 px-8 gap-6 min-h-full min-[800px]:pt-28 min-[800px]:px-12">

            {/* Profile block — logged-in only */}
            {user && (
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200/60">
                {user.profile_image_url ? (
                  <Image
                    src={user.profile_image_url}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy text-lg font-semibold shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-base">{user.name}</span>
                  <span className="text-xs text-foreground/50">{user.email}</span>
                </div>
              </div>
            )}

            {/* Nav links */}
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

            {/* Flat language selector */}
            <div className="flex items-center gap-3 py-2">
              {localeConfig.map(({ locale, flag }) => (
                <Link
                  key={locale}
                  href={`/${locale}${pathWithoutLocale}`}
                  onClick={() => setMobileOpen(false)}
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

            {/* Login / Logout */}
            {user ? (
              <LogoutButton lang={lang} label={dict.logout} />
            ) : (
              <Link
                href={`/${lang}/login`}
                onClick={() => setMobileOpen(false)}
                className="group inline-flex w-full items-center justify-between gap-4 border border-outline px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition-all duration-300 hover:text-burgundy hover:border-burgundy"
              >
                <span>{dict.login}</span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            )}

            {/* Plans */}
            <Link
              href={`/${lang}/plans`}
              className="btn-sweep bg-burgundy text-white w-full px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-center"
              onClick={() => setMobileOpen(false)}
            >
              <span>{dict.plans}</span>
            </Link>

            {/* Close */}
            <button
              className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center text-xl text-foreground/60 border border-transparent rounded-full cursor-pointer transition-all duration-300 hover:border-outline hover:text-burgundy"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>

            </div>{/* end inner wrapper */}
          </div>
        </div>
      )}
    </>
  );
}
