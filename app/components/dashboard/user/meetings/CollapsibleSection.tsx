"use client";

import { useState, type ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-[18px] h-[18px] text-surface-variant/50 transition-transform duration-300 ${open ? "" : "-rotate-90"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function CollapsibleSection({ title, icon, count, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-outline/8 rounded-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-warmgray/30 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-burgundy/70">{icon}</span>
          <h4 className="text-[15px] font-semibold text-foreground">{title}</h4>
          <span className="text-[12px] text-surface-variant/60 font-medium ml-1">({count})</span>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && children}
    </div>
  );
}
