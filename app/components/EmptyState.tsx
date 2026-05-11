"use client";

type AlignedTo = "left" | "center" | "right";
type JustifySide = "start" | "center" | "end";

interface EmptyStateProps {
  width?: number;
  title: string;
  message: string;
  alignedTo?: AlignedTo;
  justifySide?: JustifySide;
  button?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const alignClass: Record<AlignedTo, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const justifyClass: Record<JustifySide, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

export function EmptyState({
  width = 48,
  title,
  message,
  alignedTo = "center",
  justifySide = "center",
  button = false,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-4 py-12 ${justifyClass[justifySide]}`}>
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-outline/50"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 9.05001V8.95001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 9.05001V8.95001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className={`${alignClass[alignedTo]}`}>
        <p className="text-[13px] font-semibold text-surface-variant uppercase tracking-[0.1em] mb-1">
          {title}
        </p>
        <p className="text-[12px] text-outline leading-relaxed max-w-[280px]">
          {message}
        </p>
      </div>

      {button && buttonLabel && (
        <button
          onClick={onButtonClick}
          className="mt-2 text-[12px] font-medium border border-outline/15 rounded-sm px-4 py-2 text-surface-variant hover:bg-warmgray hover:text-foreground transition-colors"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
