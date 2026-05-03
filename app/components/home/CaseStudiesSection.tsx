"use client";

import { useRef } from "react";
import type { HomeDict } from "@/app/dictionaries";

interface CaseStudiesSectionProps {
  dict: HomeDict["caseStudies"];
}

const gradients = [
  "bg-gradient-to-br from-burgundy/40 via-transparent to-black/60",
  "bg-gradient-to-tr from-charcoal via-transparent to-burgundy/30",
  "bg-gradient-to-bl from-burgundy/40 via-transparent to-black",
];

export function CaseStudiesSection({ dict }: CaseStudiesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.6, 700);
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section id="work" className="pt-32 pb-32 bg-[#111111] border-t border-white/5 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-16 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <span className="tick text-[11px] tracking-[0.28em] uppercase text-rose-dim font-semibold">
            {dict.eyebrow}
          </span>
          <h2 className="font-serif text-[44px] lg:text-[60px] text-white mt-8 leading-[1.05]">
            {dict.headline}
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex md:justify-end gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="w-12 h-12 border border-white/15 text-white/80 hover:bg-white/10 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className="w-12 h-12 border border-white/15 text-white/80 hover:bg-white/10 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-8 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))] hide-scrollbar snap-x snap-mandatory"
      >
        {dict.cases.map((c, i) => (
          <article
            key={c.number}
            className="case-card min-w-[80vw] md:min-w-[58%] lg:min-w-[44%] snap-start group cursor-pointer"
          >
            <div className="bg-black border border-white/10 hover:border-rose-dim/40 h-full flex flex-col">
              <div className="aspect-[5/3] bg-[#1a1a1a] overflow-hidden relative">
                <div className={`absolute inset-0 ${gradients[i % gradients.length]}`} />
                <div className="absolute top-6 left-6 right-6 flex justify-between text-[10px] tracking-[0.22em] uppercase text-white/60">
                  <span>{c.number}</span>
                  <span>{c.category}</span>
                </div>
                <div className="absolute bottom-6 left-6 font-serif italic text-white/70 text-2xl">
                  {c.title}
                </div>
              </div>
              <div className="p-10 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-3xl lg:text-4xl text-white mb-5 leading-tight group-hover:text-rose-dim transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-gray-400 text-[15px] leading-relaxed max-w-md">
                    {c.description}
                  </p>
                </div>
                <div className="mt-12 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[1px] bg-white/30" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-white">
                      {c.cta}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-white/60 group-hover:text-rose-dim transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="min-w-[32px]" />
      </div>
    </section>
  );
}
