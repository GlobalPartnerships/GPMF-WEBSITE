"use client";

import Link from "next/link";

interface MenuNavLinksProps {
  navLinks: { label: string; href: string }[];
  onClose: () => void;
}

export function MenuNavLinks({ navLinks, onClose }: MenuNavLinksProps) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-2xl font-bold text-foreground/40 hover:text-foreground tracking-wide transition-all duration-200 hover:translate-x-2"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
