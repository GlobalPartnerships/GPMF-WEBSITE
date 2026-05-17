"use client";

interface PurchaseButtonProps {
  label: string;
}

export function PurchaseButton({ label }: PurchaseButtonProps) {
  return (
    <button
      type="button"
      disabled
      className="btn-sweep w-full bg-burgundy text-white py-4 text-[12px] uppercase tracking-[0.22em] rounded-[2px] opacity-60 cursor-not-allowed"
    >
      <span>{label}</span>
    </button>
  );
}
