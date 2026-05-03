import type { HomeDict } from "@/app/dictionaries";

interface LegacyCtaSectionProps {
  dict: HomeDict["legacy"];
}

export function LegacyCtaSection({ dict }: LegacyCtaSectionProps) {
  return (
    <section id="cta-legacy" className="py-32 lg:py-40 bg-background overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="col-span-12 lg:col-span-7 relative min-h-[500px] flex items-center justify-center">
            <div className="triptych relative w-full max-w-[520px] aspect-square">
              <div className="past absolute top-0 right-0 w-1/2 h-1/2 bg-burgundy p-7 flex flex-col justify-between whisper-shadow z-20">
                <span className="text-white/50 text-[10px] tracking-[0.22em] uppercase">
                  {dict.triptych[0].label}
                </span>
                <div>
                  <h3 className="font-serif text-white text-3xl uppercase">
                    {dict.triptych[0].title}
                  </h3>
                  <p className="text-white/70 text-[11px] tracking-[0.18em] uppercase mt-2">
                    {dict.triptych[0].subtitle}
                  </p>
                </div>
              </div>
              <div className="present absolute bottom-0 left-0 w-1/2 h-1/2 bg-charcoal p-7 flex flex-col justify-between whisper-shadow z-10">
                <span className="text-white/50 text-[10px] tracking-[0.22em] uppercase">
                  {dict.triptych[1].label}
                </span>
                <div>
                  <h3 className="font-serif text-white text-3xl uppercase">
                    {dict.triptych[1].title}
                  </h3>
                  <p className="text-white/70 text-[11px] tracking-[0.18em] uppercase mt-2">
                    {dict.triptych[1].subtitle}
                  </p>
                </div>
              </div>
              <div className="future absolute bottom-0 right-0 w-1/2 h-1/2 bg-warmgray p-7 flex flex-col justify-between z-0 border border-foreground/5">
                <span className="text-surface-variant/60 text-[10px] tracking-[0.22em] uppercase">
                  {dict.triptych[2].label}
                </span>
                <div>
                  <h3 className="font-serif text-foreground text-3xl uppercase">
                    {dict.triptych[2].title}
                  </h3>
                  <p className="text-surface-variant text-[11px] tracking-[0.18em] uppercase mt-2">
                    {dict.triptych[2].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="max-w-md">
              <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
                {dict.eyebrow}
              </span>
              <h2 className="font-serif text-[44px] lg:text-[64px] text-foreground mt-8 mb-8 leading-[1.05]">
                {dict.headline}{" "}
                <span className="italic font-medium text-burgundy">{dict.headlineAccent}</span>
              </h2>
              <p className="text-[17px] text-surface-variant mb-12 leading-relaxed">
                {dict.description}
              </p>
              <form className="flex flex-col sm:flex-row gap-3 mb-6 max-w-md">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={dict.ctaPlaceholder}
                  className="flex-1 bg-white border border-foreground/15 px-4 py-4 text-[14px] focus:outline-none focus:border-burgundy rounded-sm"
                />
                <button className="btn-sweep bg-burgundy text-white px-8 py-4 text-[12px] uppercase tracking-[0.22em] rounded-sm">
                  <span>{dict.ctaButton}</span>
                </button>
              </form>
              <p className="text-[11px] tracking-[0.18em] uppercase text-surface-variant">
                {dict.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
