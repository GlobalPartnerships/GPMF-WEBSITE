interface SideTextProps {
  line1: string;
  line2: string;
}

export function SideText({ line1, line2 }: SideTextProps) {
  return (
    <div
      className="hidden lg:block absolute left-6 top-1/2 z-40"
      style={{
        writingMode: "vertical-rl",
        transform: "rotate(180deg) translateY(50%)",
      }}
    >
      <span className="text-[10px] tracking-[0.32em] uppercase text-foreground/40 font-medium leading-relaxed">
        {line1}
        <br />
        {line2}
      </span>
    </div>
  );
}
