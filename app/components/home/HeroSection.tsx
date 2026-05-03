import Image from "next/image";
import type { HomeDict } from "@/app/dictionaries";

interface HeroSectionProps {
  dict: HomeDict["hero"];
  lang: string;
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="w-full grid grid-cols-12 items-stretch">
        <div className="col-span-12 lg:col-span-6 flex items-center px-8 lg:px-20 py-20 lg:py-32">
          <div className="max-w-xl reveal">
            <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
              {dict.eyebrow}
            </span>
            <h1 className="font-serif text-[56px] lg:text-[76px] leading-[1.02] tracking-[-0.02em] font-bold mt-8 mb-10">
              {dict.headlinePart1.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
              <br />
              <span className="italic font-medium text-burgundy">{dict.headlineAccent}</span>
              <br />
              {dict.headlinePart3}
            </h1>
            <p className="text-[19px] leading-[1.6] text-surface-variant mb-12 max-w-lg">
              {dict.description}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <a
                href={`/${lang}/schedule`}
                className="btn-sweep bg-burgundy text-white px-10 py-5 text-[12px] uppercase tracking-[0.22em] rounded-sm"
              >
                <span>{dict.ctaPrimary}</span>
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 py-5 text-[12px] uppercase tracking-[0.22em]"
              >
                <span className="border-b border-foreground/60 pb-1 group-hover:text-burgundy group-hover:border-burgundy transition-colors">
                  {dict.ctaSecondary}
                </span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-10 max-w-md">
              {dict.stats.map((stat) => (
                <div key={stat.value}>
                  <p className="font-serif text-3xl text-burgundy">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-surface-variant mt-2 whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-6 relative">
          <div className="absolute inset-0">
            <Image
              alt="GPMF strategic consulting"
              className="w-full h-full object-cover hero-split-image"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBefVwhAFEmouIsyqSRVC4dve7b6kmXbZO7jjWWij4UcW5diB-7P7zS2yyEkrIjCcMcU3dMImKdoP3lh17FRWvjqkSlSvf482jRz9_HO_VHJcduGRcNu5hMjfKqusSfNMYmXi4FkkkG-TxIm3niRxC3LATSgmbf-l9ay3foigfnQwjBrwiX8VDdeCWuEalcLZbDsYPJlHLEnZ3n8tGsLfn3QhDrlxuxQYBJGTF1PABJsBf5828fficH5V4G4nE1ziysR2_1An_p0v4"
              width={800}
              height={900}
              priority
            />
          </div>

          <div className="absolute bottom-12 right-12 bg-white/95 backdrop-blur-sm p-7 whisper-shadow w-[260px] reveal">
            <div className="flex items-baseline justify-between mb-4">
              <p className="font-serif text-3xl text-burgundy">
                4.9<span className="text-surface-variant text-base">/5</span>
              </p>
              <div className="flex gap-0.5 text-burgundy">
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <defs>
                    <clipPath id="half">
                      <rect x="0" y="0" width="12" height="24" />
                    </clipPath>
                  </defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" clipPath="url(#half)" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-surface-variant">
              {dict.ratingLabel}
            </p>
          </div>

          <div className="absolute top-12 left-12 [writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.32em] uppercase text-foreground/60">
            {dict.verticalCaption}
          </div>
        </div>
      </div>
    </section>
  );
}
