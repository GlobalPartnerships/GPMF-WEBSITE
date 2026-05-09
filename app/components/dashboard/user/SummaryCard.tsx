import Link from "next/link";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface SummaryCardProps {
  label: string;
  icon: "star" | "chart";
  children: React.ReactNode;
  action?: {
    label: string;
    href?: string;
  };
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

export function SummaryCard({ label, icon, children, action }: SummaryCardProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6 flex flex-col gap-4 relative overflow-hidden`}>
      {/* Decorative blurred circle for chart variant */}
      {icon === "chart" && (
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-8 translate-y-8 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(122,15,50,0.07) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      )}

      {/* Eyebrow */}
      <div className="flex items-center gap-2 text-burgundy">
        {icon === "star" ? <StarIcon /> : <ChartIcon />}
        <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-surface-variant">
          {label}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">{children}</div>

      {/* Action */}
      {action && (
        <div className="pt-2 border-t border-outline/10 relative z-10">
          {action.href ? (
            <Link
              href={action.href}
              className="text-[11px] tracking-[0.18em] uppercase font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              className="text-[11px] tracking-[0.18em] uppercase font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
