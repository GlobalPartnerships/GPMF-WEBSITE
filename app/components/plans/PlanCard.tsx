import Link from "next/link";
import type { PlanResponse } from "@/app/components/dashboard/admin/plans/types";
import { formatPrice } from "@/lib/utils/format";
import { PlanIcon } from "./PlanIcon";
import styles from "./PlanCard.module.css";

interface PlanCardProps {
  plan: PlanResponse;
  cta: string;
  checkoutUrl: string;
}

export function PlanCard({ plan, cta, checkoutUrl }: PlanCardProps) {
  return (
    <div className={`${styles.card} bg-white rounded-[2px] p-10 flex flex-col relative`}>
      <PlanIcon iconUrl={plan.icon_url} />

      <h3 className="font-serif text-3xl mb-2">{plan.name}</h3>
      <p className="text-[14px] text-surface-variant mb-6">{plan.subtitle}</p>

      <div className="mb-2">
        <span className="font-serif text-4xl font-bold">
          {formatPrice(plan.base_price)}
        </span>
      </div>
      <p className="text-[13px] text-surface-variant mb-8">{plan.billing_type.name}</p>

      <Link
        href={checkoutUrl}
        className="btn-sweep w-full bg-burgundy text-white py-4 text-[12px] uppercase tracking-[0.22em] rounded-[2px] mb-10 block text-center"
      >
        <span>{cta}</span>
      </Link>

      <div className="border-t border-foreground/8 pt-8 flex-1">
        <p className="flex items-center gap-2 text-[13px] text-surface-variant mb-6">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          {plan.meetings_per_month} meetings / month
        </p>
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature.id} className="flex items-start gap-3">
              <span className={`${styles.checkIcon} material-symbols-outlined`}>check</span>
              <span className="text-[14px] text-surface-variant leading-relaxed">
                {feature.item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
