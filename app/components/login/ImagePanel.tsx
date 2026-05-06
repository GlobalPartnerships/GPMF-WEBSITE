import Image from "next/image";
import type { LoginDict } from "@/app/dictionaries";

interface ImagePanelProps {
  dict: Pick<LoginDict, "imageQuote" | "imageQuoteAuthor" | "verticalCaption" | "imageAlt">;
}

export function ImagePanel({ dict }: ImagePanelProps) {
  return (
    <div className="hidden lg:block lg:w-[46%] relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          alt={dict.imageAlt}
          className="w-full h-full object-cover login-clip"
          src="https://lh3.googleusercontent.com/aida/ADBb0uglV-j1-ujBGKBywH75vdfYGvWV-RJLnjHWENISpUjtrsHGYw4E1_ztvT3JdU88Fz1bfxRapuIZN-q44_0_V-JkClbEWG_pmwczJ0NhwtBYCvvEl-WM_aPvLNQQSAQZXkBDj31sARPwcx3TgBBmxlLgSOF81OLcg_5IZdi64HgQciaWpF-u_MEvl8kIw1I8Txudh_Ln7Yxlj_3PIN38d38V0frsqwyS1RpR5og7OmP-SMheVXk5pch70HHmhXDe9n1nBbMHuBD7"
          width={800}
          height={900}
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent login-clip" />

      <div className="absolute bottom-16 left-16 right-24 quote-animate">
        <p className="font-serif italic text-[28px] leading-[1.3] text-white/90 mb-6">
          &ldquo;{dict.imageQuote}&rdquo;
        </p>
        <div className="w-14 h-px bg-white/40" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-white/50 mt-4">
          — {dict.imageQuoteAuthor}
        </p>
      </div>

      <div className="absolute top-16 left-8 [writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.32em] uppercase text-white/40">
        {dict.verticalCaption}
      </div>
    </div>
  );
}
