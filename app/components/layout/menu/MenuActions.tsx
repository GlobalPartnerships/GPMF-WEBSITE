"use client";

import Link from "next/link";
import type { AppUser } from "@/app/context/UserContext";
import type { LayoutDict } from "@/app/dictionaries/layout/types";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

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

interface MenuActionsProps {
  lang: string;
  dict: LayoutDict["nav"];
  user: AppUser | null;
  onClose: () => void;
}

export function MenuActions({ lang, dict, user, onClose }: MenuActionsProps) {
  return (
    <>
      {user ? (
        <LogoutButton lang={lang} label={dict.logout} />
      ) : (
        <Link
          href={`/${lang}/login`}
          onClick={onClose}
          className="group inline-flex w-full items-center justify-between gap-4 border border-outline px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition-all duration-300 hover:text-burgundy hover:border-burgundy"
        >
          <span>{dict.login}</span>
          <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      )}

      <Link
        href={`/${lang}/plans`}
        className="btn-sweep bg-burgundy text-white w-full px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-center"
        onClick={onClose}
      >
        <span>{dict.plans}</span>
      </Link>
    </>
  );
}
