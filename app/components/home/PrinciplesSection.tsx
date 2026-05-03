import type { HomeDict } from "@/app/dictionaries";

interface PrinciplesSectionProps {
  dict: HomeDict["principles"];
}

export function PrinciplesSection({ dict }: PrinciplesSectionProps) {
  return (
    <section id="principles" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-12 gap-8 pt-32 pb-16">
          <div className="col-span-12 md:col-span-4">
            <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
              {dict.eyebrow}
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-serif text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.01em]">
              {dict.headline}{" "}
              <span className="italic font-medium text-surface-variant">
                {dict.headlineAccent}
              </span>
            </h2>
          </div>
        </div>

        <div className="reveal">
          {dict.items.map((item, idx) => (
            <div
              key={item.number}
              className={`py-16 grid grid-cols-12 gap-8 items-start group border-t border-foreground/10 ${
                idx === dict.items.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-serif text-surface-variant/60 text-2xl">
                  {item.number}
                </span>
              </div>
              <div className="col-span-10 md:col-span-7">
                <h3 className="font-serif text-3xl md:text-4xl mb-5 group-hover:text-burgundy transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[18px] text-surface-variant leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 hidden md:flex items-start justify-end pt-2">
                <ul className="text-[11px] tracking-[0.22em] uppercase text-surface-variant space-y-2">
                  {item.deliverables.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
