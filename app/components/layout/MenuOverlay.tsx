"use client";

import type { Locale } from "@/app/dictionaries";
import type { LayoutDict } from "@/app/dictionaries/layout/types";
import type { AppUser } from "@/app/context/UserContext";
import { MenuUserInfo } from "./menu/MenuUserInfo";
import { MenuNavLinks } from "./menu/MenuNavLinks";
import { MenuLangSelector } from "./menu/MenuLangSelector";
import { MenuActions } from "./menu/MenuActions";

interface MenuOverlayProps {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  lang: Locale;
  dict: LayoutDict["nav"];
  navLinks: { label: string; href: string }[];
  pathWithoutLocale: string;
  user: AppUser | null;
}

export function MenuOverlay({
  mobileOpen,
  setMobileOpen,
  lang,
  dict,
  navLinks,
  pathWithoutLocale,
  user,
}: MenuOverlayProps) {
  if (!mobileOpen) return null;

  const onClose = () => setMobileOpen(false);

  return (
    <div
      className="fixed inset-0 z-50 min-[800px]:flex"
      onClick={onClose}
    >
      {/* Backdrop — 800px+ only */}
      <div className="hidden min-[800px]:block min-[800px]:flex-1 bg-black/50 backdrop-blur-sm h-full" />
      {/* Panel */}
      <div
        className="fixed inset-0 w-full bg-white/85 backdrop-blur-md overflow-y-auto
          min-[800px]:static min-[800px]:h-full min-[800px]:min-w-[420px] min-[800px]:w-auto
          min-[800px]:bg-[#faf8f6] min-[800px]:backdrop-blur-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col pt-24 px-8 gap-6 min-h-full min-[800px]:pt-28 min-[800px]:px-12">
          {user && <MenuUserInfo user={user} lang={lang} onClose={onClose} />}
          <MenuNavLinks navLinks={navLinks} onClose={onClose} />
          <MenuLangSelector lang={lang} pathWithoutLocale={pathWithoutLocale} onClose={onClose} />
          <MenuActions lang={lang} dict={dict} user={user} onClose={onClose} />
          {/* Close */}
          <button
            className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center text-xl text-foreground/60 border border-transparent rounded-full cursor-pointer transition-all duration-300 hover:border-outline hover:text-burgundy"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>

        </div>
      </div>
    </div>
  );
}
