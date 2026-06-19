import Link from "next/link";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";
import { EmptyState } from "./EmptyState";

interface CurrentPlanCardDict {
  currentPlanLabel: string;
  managePlan: string;
  noPlan: string;
  nextBilling: string;
  meetingsLeft: string;
  featuresLabel: string;
}

interface CurrentPlanCardProps {
  purchasedPlan: PurchasedPlan | null;
  dict: CurrentPlanCardDict;
  lang: string;
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-burgundy shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function formatBillingDate(startsAt: string, billingType: string): string {
  const start = new Date(startsAt);
  if (billingType.toLowerCase().includes("month")) {
    start.setMonth(start.getMonth() + 1);
  } else if (billingType.toLowerCase().includes("year")) {
    start.setFullYear(start.getFullYear() + 1);
  } else {
    start.setMonth(start.getMonth() + 1);
  }
  return start.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CurrentPlanCard({ purchasedPlan, dict, lang }: CurrentPlanCardProps) {
  const plan = purchasedPlan?.plan;

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6 flex flex-col gap-4 relative overflow-hidden`}>
      <div className="flex items-center gap-2 text-burgundy">
        <StarIcon />
        <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-surface-variant">
          {dict.currentPlanLabel}
        </span>
      </div>

      <div className="flex-1 relative z-10">
        {purchasedPlan && plan ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {plan.icon_url && (
                <img
                  src={plan.icon_url}
                  alt=""
                  className="w-8 h-8 shrink-0"
                />
              )}
              <div>
                <p className="font-serif text-[22px] text-foreground leading-tight">
                  {plan.name}
                </p>
                {plan.subtitle && (
                  <p className="text-[12px] text-surface-variant">
                    {plan.subtitle}
                  </p>
                )}
              </div>
            </div>

            {plan.description && (
              <p className="text-[12px] text-surface-variant leading-relaxed">
                {plan.description}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-surface-variant">
                  {dict.meetingsLeft}
                </p>
                <p className="text-[13px] font-medium text-foreground">
                  {purchasedPlan.meetings_left}/{purchasedPlan.meetings_included}
                </p>
              </div>
              <div className="w-full h-1.5 bg-outline/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-burgundy rounded-full transition-all"
                  style={{
                    width: `${purchasedPlan.meetings_included > 0
                      ? (purchasedPlan.meetings_left / purchasedPlan.meetings_included) * 100
                      : 0}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-[12px] text-surface-variant">
              {dict.nextBilling}{" "}
              <span className="text-foreground font-medium">
                {formatBillingDate(purchasedPlan.starts_at, plan.billing_type?.name ?? "")}
              </span>
            </p>

            {plan.features.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-surface-variant">
                  {dict.featuresLabel}
                </p>
                <ul className="flex flex-col gap-1">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-[12px] text-foreground leading-snug">
                        {feature.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <EmptyState message={dict.noPlan} icon="plan" />
        )}
      </div>

      <div className="pt-2 border-t border-outline/10 relative z-10">
        <Link
          href={`/${lang}/plans`}
          className="text-[11px] tracking-[0.18em] uppercase font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
        >
          {dict.managePlan}
        </Link>
      </div>
    </div>
  );
}
