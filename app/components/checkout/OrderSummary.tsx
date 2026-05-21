import type { PlanResponse } from "@/app/components/dashboard/admin/plans/types";
import type { CheckoutDict } from "@/app/dictionaries/checkout/types";
import { formatPrice } from "@/lib/utils/format";
import { PlanIcon } from "@/app/components/plans/PlanIcon";
import { PurchaseButton } from "./PurchaseButton";
import styles from "@/app/components/plans/PlanCard.module.css";

interface OrderSummaryProps {
  plan: PlanResponse;
  dict: CheckoutDict;
}

export function OrderSummary({ plan, dict }: OrderSummaryProps) {
  const formattedPrice = formatPrice(plan.base_price);

  return (
    <div className="bg-white rounded-[2px] p-8 border border-foreground/8 shadow-sm sticky top-28">
      <PlanIcon iconUrl={plan.icon_url} />

      <h2 className="font-serif text-2xl mb-1">{plan.name}</h2>
      <p className="text-[13px] text-surface-variant mb-2">{plan.subtitle}</p>
      <p className="text-[13px] text-surface-variant leading-relaxed mb-8">{plan.description}</p>

      <p className="text-[10px] uppercase tracking-[0.22em] text-burgundy font-semibold mb-4">
        {dict.topFeatures}
      </p>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature.id} className="flex items-start gap-3">
            <span className={`${styles.checkIcon} material-symbols-outlined`}>check</span>
            <span className="text-[14px] text-surface-variant leading-relaxed">
              {feature.item}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-[11px] uppercase tracking-[0.18em] text-surface-variant font-medium mt-4">
        {plan.billing_type.name}
      </p>
      <p className="flex items-center gap-2 text-[13px] text-surface-variant mt-2">
        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
        {plan.meetings_per_month} meetings / month
      </p>

      <div className="border-t border-foreground/8 pt-6 mt-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-surface-variant">{dict.pricing.subscriptionPrice}</span>
          <span className="text-[13px]">{formattedPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-surface-variant">{dict.pricing.estimatedTax}</span>
          <span className="text-[13px] text-surface-variant">$0.00</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-foreground/8">
          <span className="text-[14px] font-semibold">{dict.pricing.dueToday}</span>
          <span className="text-[15px] font-semibold">{formattedPrice}</span>
        </div>
      </div>

      <div className="mt-6">
        <PurchaseButton label={dict.completePurchase} />
      </div>

      <p className="text-[11px] text-surface-variant text-center mt-4 leading-relaxed">
        {dict.legal}
      </p>
    </div>
  );
}
