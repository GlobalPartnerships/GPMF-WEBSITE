interface PlansHeaderProps {
  eyebrow: string;
  headlinePart1: string;
  headlineAccent: string;
  subtitle: string;
}

export function PlansHeader({
  eyebrow,
  headlinePart1,
  headlineAccent,
  subtitle,
}: PlansHeaderProps) {
  return (
    <section className="text-center mb-16 px-8">
      <div className="reveal">
        <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
          {eyebrow}
        </span>
        <h1 className="font-serif text-[52px] lg:text-[72px] leading-[1.02] tracking-[-0.02em] mt-8 mb-6">
          {headlinePart1}{" "}
          <span className="italic font-medium text-burgundy">{headlineAccent}</span>
        </h1>
        <p className="text-[18px] text-surface-variant max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
