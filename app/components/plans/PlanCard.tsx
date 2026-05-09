import type { Plan } from "@/app/dictionaries/plans/types";
import { PlanIcon } from "./PlanIcon";
import styles from "./PlanCard.module.css";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={`${styles.card} bg-white rounded-[2px] p-10 flex flex-col relative`}>
      {plan.featured && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-burgundy rounded-t-[2px]" />
      )}

      <PlanIcon icon={plan.icon} />

      <h3 className="font-serif text-3xl mb-2">{plan.name}</h3>
      <p className="text-[14px] text-surface-variant mb-6">{plan.description}</p>

      <div className="mb-2">
        <span className="font-serif text-4xl font-bold">{plan.price}</span>
      </div>
      <p className="text-[13px] text-surface-variant mb-8">{plan.priceSuffix}</p>

      <button className="btn-sweep w-full bg-burgundy text-white py-4 text-[12px] uppercase tracking-[0.22em] rounded-[2px] mb-10">
        <span>{plan.cta}</span>
      </button>

      <div className="border-t border-foreground/8 pt-8 flex-1">
        {plan.inheritLabel && (
          <p className="text-[13px] font-semibold text-foreground mb-5">
            {plan.inheritLabel}
          </p>
        )}
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-3">
              <span className={`${styles.checkIcon} material-symbols-outlined`}>check</span>
              <span className="text-[14px] text-surface-variant leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
