import type { HomeDict } from "@/app/dictionaries";

interface TrustedByMarqueeProps {
  dict: HomeDict["trustedBy"];
}

export function TrustedByMarquee({ dict }: TrustedByMarqueeProps) {
  const items = [...dict.brands, ...dict.brands];

  return (
    <section className="py-12 border-y border-foreground/5 bg-paper/40 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-6">
        <p className="text-[10px] tracking-[0.32em] uppercase text-surface-variant">
          {dict.label}
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-20 whitespace-nowrap font-serif italic text-2xl text-foreground/40">
          {items.map((brand, i) => (
            <span key={`${brand}-${i}`}>
              {brand}
              {i < items.length - 1 && <span className="mx-10">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
