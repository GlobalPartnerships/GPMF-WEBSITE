interface EmptySlotProps {
  label: string;
}

export function EmptySlot({ label }: EmptySlotProps) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border-2 border-dashed p-6 min-h-[180px] w-full"
      style={{ borderColor: "var(--color-burgundy)" }}
    >
      <span
        className="text-sm font-medium opacity-60"
        style={{ color: "var(--color-burgundy)" }}
      >
        {label}
      </span>
    </div>
  );
}
