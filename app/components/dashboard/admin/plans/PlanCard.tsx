import type { Plan } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface PlanCardProps {
  plan: Plan;
  dict: Pick<AdminDict, "stats" | "edit">;
  onEdit?: (plan: Plan) => void;
}

function PackageIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

export function PlanCard({ plan, dict, onEdit }: PlanCardProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-5 relative`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="text-[10px] uppercase tracking-wider border border-outline/15 rounded-sm px-2 py-0.5 text-surface-variant hover:bg-warmgray transition-colors font-medium">
          {dict.stats}
        </button>
        <button
          onClick={() => onEdit?.(plan)}
          className="text-[10px] uppercase tracking-wider border border-outline/15 rounded-sm px-2 py-0.5 text-surface-variant hover:bg-warmgray transition-colors font-medium"
        >
          {dict.edit}
        </button>
      </div>

      <div className="mt-6 mb-4 flex items-start justify-between">
        <h3 className="font-serif text-xl text-foreground pr-8">{plan.title}</h3>
        <span className="text-surface-variant/40 mt-1">
          <PackageIcon />
        </span>
      </div>

      <p className="text-[12px] text-surface-variant mb-6 min-h-[2.5rem] leading-relaxed">
        {plan.subtitle}
      </p>

      <div className="font-serif text-xl font-bold text-foreground">{plan.price}</div>
    </div>
  );
}
