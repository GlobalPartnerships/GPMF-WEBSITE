interface DividerProps {
  label: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="relative flex items-center my-8">
      <div className="flex-grow h-px bg-foreground/10" />
      <span className="px-5 text-[10px] tracking-[0.22em] uppercase text-outline font-medium">
        {label}
      </span>
      <div className="flex-grow h-px bg-foreground/10" />
    </div>
  );
}
