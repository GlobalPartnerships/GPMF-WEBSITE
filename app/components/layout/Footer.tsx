import Image from "next/image";
import type { LayoutDict } from "@/app/dictionaries";

interface FooterProps {
  dict: LayoutDict["footer"];
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="w-full pt-24 pb-12 bg-white border-t border-foreground/10">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/images/gpmf-logo-white.png"
              alt="GPMF Logo"
              width={120}
              height={40}
              className="h-10 w-auto invert"
            />
          </div>
          <p className="text-surface-variant text-[15px] leading-relaxed mb-8 max-w-sm">
            {dict.tagline}
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Web"
              className="w-10 h-10 border border-foreground/15 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Journal"
              className="w-10 h-10 border border-foreground/15 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Newsletter"
              className="w-10 h-10 border border-foreground/15 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
          <div>
            <h5 className="text-[10px] tracking-[0.22em] uppercase mb-6 text-foreground">
              {dict.explore}
            </h5>
            <ul className="space-y-3 text-[14px] text-surface-variant">
              <li><a className="hover:text-burgundy transition" href="#home">{dict.links.home}</a></li>
              <li><a className="hover:text-burgundy transition" href="#principles">{dict.links.principles}</a></li>
              <li><a className="hover:text-burgundy transition" href="#process">{dict.links.methodology}</a></li>
              <li><a className="hover:text-burgundy transition" href="#work">{dict.links.work}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] tracking-[0.22em] uppercase mb-6 text-foreground">
              {dict.studio}
            </h5>
            <ul className="space-y-3 text-[14px] text-surface-variant">
              <li><a className="hover:text-burgundy transition" href="#team">{dict.links.team}</a></li>
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.manifesto}</a></li>
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.press}</a></li>
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.careers}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] tracking-[0.22em] uppercase mb-6 text-foreground">
              {dict.legal}
            </h5>
            <ul className="space-y-3 text-[14px] text-surface-variant">
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.privacy}</a></li>
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.terms}</a></li>
              <li><a className="hover:text-burgundy transition" href="#">{dict.links.imprint}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-foreground/10 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-surface-variant/80 text-[11px] tracking-[0.22em] uppercase">
          © 2019 - {new Date().getFullYear()} {dict.companyName} · {dict.rights}
        </p>
        <p className="text-surface-variant/80 text-[11px] tracking-[0.22em] uppercase">
          {dict.typeset}
        </p>
      </div>
    </footer>
  );
}
