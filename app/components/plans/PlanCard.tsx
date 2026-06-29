import Link from "next/link";
import type { PlanCardData } from "@/app/dictionaries/plans/types";
import { PlanIcon } from "./PlanIcon";
import styles from "./PlanCard.module.css";

interface PlanCardProps {
  plan: PlanCardData;
  cta: string;
  href: string;
}

export function PlanCard({ plan, cta, href }: PlanCardProps) {
  return (
    <div className={`${styles.card} bg-white rounded-[2px] p-10 flex flex-col relative`}>
      <PlanIcon />

      <h3 className="font-serif text-3xl mb-2">{plan.name}</h3>
      <p className="text-[14px] text-surface-variant mb-6">{plan.subtitle}</p>

      <div className="mb-2">
        <span className="font-serif text-4xl font-bold">{plan.price}</span>
      </div>
      <p className="text-[13px] text-surface-variant mb-8">{plan.priceNote}</p>

      <Link
        href={href}
        className="btn-sweep w-full bg-burgundy text-white py-4 text-[12px] uppercase tracking-[0.22em] rounded-[2px] mb-10 block text-center"
      >
        <span>{cta}</span>
      </Link>

      <div className="border-t border-foreground/8 pt-8 flex-1">
        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${styles.checkIcon} material-symbols-outlined`}>check</span>
              <span className="text-[14px] text-surface-variant leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
