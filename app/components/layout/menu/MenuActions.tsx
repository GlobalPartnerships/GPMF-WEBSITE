"use client";

import Link from "next/link";
import type { LayoutDict } from "@/app/dictionaries/layout/types";

interface MenuActionsProps {
  lang: string;
  dict: LayoutDict["nav"];
  onClose: () => void;
}

export function MenuActions({ lang, dict, onClose }: MenuActionsProps) {
  return (
    <Link
      href={`/${lang}/plans`}
      className="btn-sweep bg-burgundy text-white w-full px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-center"
      onClick={onClose}
    >
      <span>{dict.plans}</span>
    </Link>
  );
}
