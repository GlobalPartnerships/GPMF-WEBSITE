import Image from "next/image";
import type { HomeDict } from "@/app/dictionaries";

interface MethodologySectionProps {
  dict: HomeDict["methodology"];
}

const cardImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgL9U0Or4x2Tca5z48E49FeJj44Uq9EoGJ83XgHyln2t_4qT5JzKjw0vwZ3HG8CFRof_zlWCXe4oUASFrALlREIj6ZRqnOMHp8L0VYs_soDEyCL5a--PtprXTYcze2o0YYK0RkzyS5Qn4aXD4T-K0vT6IhVBqSUskUZ0tynzllt-pgEGYD1wkygPhNQz9GNONzAyt1M3-3FBkSFUrIsQhY9WE8b0xgtE4XAOb8RlNUsfZUZEDrY0h1_SJjty1Rk2jLggH_LlLdKOU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBefVwhAFEmouIsyqSRVC4dve7b6kmXbZO7jjWWij4UcW5diB-7P7zS2yyEkrIjCcMcU3dMImKdoP3lh17FRWvjqkSlSvf482jRz9_HO_VHJcduGRcNu5hMjfKqusSfNMYmXi4FkkkG-TxIm3niRxC3LATSgmbf-l9ay3foigfnQwjBrwiX8VDdeCWuEalcLZbDsYPJlHLEnZ3n8tGsLfn3QhDrlxuxQYBJGTF1PABJsBf5828fficH5V4G4nE1ziysR2_1An_p0v4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOeUaUTrll0yaVhzRwvcFvooTozeu1ehgUlvUHWUh89xRdKPmjPJgGVrEDdlewYwyO0tInA6-lAcMUOhYbkf3qgfMxmzvgZRB5dvIVcMHH1YDdk5mIcz-vxLq5kbxb0FZQBPHZd4nAR9iIdmMP5d8r_RHL4SjgpiM-3rY1aXBnIusYmpqVZyqWWIqGCiY-keupNjYdG_ixdngSDRZqHLQZ5MVe4QCPpgEaOJ87wS7TRHZwXSB3rVglW8d3M6ZVR7wtAuIjisRmwJQ",
];

const translateYClasses = ["lg:translate-y-0", "lg:translate-y-12", "lg:translate-y-24", "lg:translate-y-36"];

export function MethodologySection({ dict }: MethodologySectionProps) {

  return (
    <section id="process" className="py-32 lg:py-40 px-8 bg-[#111111] text-white relative overflow-hidden">
      <div className="absolute inset-0 paper-noise opacity-40 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative">
        <div className="grid grid-cols-12 gap-8 mb-24 items-end">
          <div className="col-span-12 md:col-span-5">
            <span className="tick text-[11px] tracking-[0.28em] uppercase text-primary-fixed-dim font-semibold">
              {dict.eyebrow}
            </span>
            <h2 className="font-serif text-[44px] lg:text-[60px] leading-[1.05] mt-8">
              {dict.headline}
              <br />
              <span className="italic font-medium">{dict.headlineAccent}</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-[18px] text-on-tertiary-container leading-relaxed max-w-md">
              {dict.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {dict.steps.map((step, i) => (
            <div key={step.number} className={translateYClasses[i]}>
              <div className="flex items-baseline justify-between mb-5">
                <span className="font-serif text-[88px] leading-none text-white/15">
                  {String(step.number).padStart(2, "0")}
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">Stage</span>
              </div>
              <div className="process-card bg-white text-on-background whisper-shadow">
                {i < cardImages.length ? (
                  <div className="aspect-[4/5] overflow-hidden bg-paper">
                    <Image
                      alt={step.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src={cardImages[i]}
                      width={340}
                      height={425}
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/5] overflow-hidden bg-primary-container/10 flex items-center justify-center">
                    <svg className="w-20 h-20 text-primary-container/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3v18h18V3H3zm15 15H6V6h12v12z" />
                    </svg>
                  </div>
                )}
                <div className="p-7">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-burgundy">
                    Stage {String(step.number).padStart(2, "0")}
                  </span>
                  <h4 className="font-serif text-2xl mt-2 mb-3 text-foreground">{step.title}</h4>
                  <p className="text-[14px] text-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-44 lg:mt-56 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-2">
            <span className="font-serif italic text-6xl text-primary-fixed-dim">&ldquo;</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-white/90">
              {dict.quote.text}
            </p>
            <p className="mt-8 text-[11px] tracking-[0.22em] uppercase text-white/50">
              {dict.quote.author}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
