"use client";

import type { PlanResponse } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { formatPrice } from "@/lib/utils/format";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { InlineSvg } from "./svg-upload/InlineSvg";

interface PlanCardProps {
  plan: PlanResponse;
  dict: Pick<AdminDict, "stats" | "edit">;
  onEdit?: (plan: PlanResponse) => void;
  onDelete?: (plan: PlanResponse) => void;
  isPending?: boolean;
}

function PackageIcon() {
  return (
    <svg className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

export function PlanCard({ plan, dict, onEdit, onDelete, isPending }: PlanCardProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-5 relative ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
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
        {onDelete && (
          <button
            onClick={() => onDelete(plan)}
            className="text-[10px] uppercase tracking-wider border border-red-200 rounded-sm px-2 py-0.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-6 mb-4 flex items-center justify-between gap-3">
        <div className="w-[70%]">
          <h3 className="font-serif text-xl text-foreground">{plan.name}</h3>
          <p className="text-[12px] text-surface-variant mt-2 min-h-[2.5rem] leading-relaxed">
            {plan.subtitle}
          </p>
        </div>
        <div className="relative w-[64px] h-[64px] shrink-0 rounded-full border border-outline/20 p-3 flex items-center justify-center transition-all duration-200 hover:border-burgundy/40 hover:text-burgundy text-surface-variant/50 group bg-white">
          {plan.icon_url ? (
            <InlineSvg url={plan.icon_url} className="w-6 h-6" />
          ) : (
            <PackageIcon />
          )}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="font-serif text-xl font-bold text-foreground">
          {formatPrice(plan.base_price, plan.currency)}
        </div>
        <div className="text-[11px] text-surface-variant/60 font-medium uppercase tracking-wide">
          {plan.billing_type.name}
        </div>
      </div>
    </div>
  );
}
