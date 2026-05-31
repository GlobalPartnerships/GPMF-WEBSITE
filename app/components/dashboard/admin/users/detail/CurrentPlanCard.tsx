import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { PurchasedPlan } from "./types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

interface CurrentPlanCardProps {
  plan: PurchasedPlan | null;
}

export function CurrentPlanCard({ plan }: CurrentPlanCardProps) {
  if (!plan) {
    return (
      <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
        <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
          Current Plan
        </span>
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-full bg-warmgray/60 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-surface-variant/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <p className="text-surface-variant text-[14px] font-medium">No active plan</p>
          <p className="text-surface-variant/70 text-[12px] mt-1">This user has no current subscription</p>
        </div>
      </div>
    );
  }

  const planName = plan.plan?.name ?? plan.order?.plan?.name ?? "Unknown Plan";
  const price = plan.order?.total_price;
  const currency = plan.order?.currency ?? "USD";
  const meetingsProgress = plan.meetings_included > 0
    ? Math.round((plan.meetings_used / plan.meetings_included) * 100)
    : 0;

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
          Current Plan
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${dashStyles.badgeConfirmed}`}
        >
          {plan.status}
        </span>
      </div>

      <h3 className="font-serif text-[20px] font-semibold text-burgundy">{planName}</h3>
      {price != null && (
        <p className="text-[14px] text-surface-variant mt-1">
          {formatCurrency(price, currency)}
          <span className="text-[11px]"> / {plan.plan?.billing_type?.name ?? "month"}</span>
        </p>
      )}

      <div className="mt-5 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[22px] font-semibold text-foreground">{plan.meetings_included}</p>
          <p className="text-[11px] text-surface-variant uppercase tracking-wide">Included</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold text-burgundy">{plan.meetings_used}</p>
          <p className="text-[11px] text-surface-variant uppercase tracking-wide">Used</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold text-foreground">{plan.meetings_left}</p>
          <p className="text-[11px] text-surface-variant uppercase tracking-wide">Remaining</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-warmgray/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-burgundy transition-all"
            style={{ width: `${meetingsProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-between text-[12px] text-surface-variant">
        <span>Started {formatDate(plan.starts_at)}</span>
        <span>Updated {formatDate(plan.updated_at)}</span>
      </div>

      {plan.plan?.features && plan.plan.features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {plan.plan.features.map((feature) => (
            <li key={feature.id} className="flex items-start gap-2 text-[12px] text-surface-variant">
              <svg className="w-3.5 h-3.5 text-burgundy mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              {feature.item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
