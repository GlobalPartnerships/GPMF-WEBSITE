import Link from "next/link";
import type { PlanResponse } from "@/app/components/dashboard/admin/plans/types";
import type { CheckoutDict } from "@/app/dictionaries/checkout/types";
import { PaymentPanel } from "./PaymentPanel";
import { OrderSummary } from "./OrderSummary";

interface CheckoutLayoutProps {
  lang: string;
  dict: CheckoutDict;
  plan: PlanResponse;
  userId: string;
  clientId: string;
}

export function CheckoutLayout({ lang, dict, plan, userId, clientId }: CheckoutLayoutProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-8">
      <Link
        href={`/${lang}/plans`}
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-surface-variant hover:text-burgundy transition-colors mb-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        <span>{dict.backToPlans}</span>
      </Link>

      <h1 className="font-serif text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.01em] mb-12">
        {dict.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_40fr] gap-12 items-start">
        <div>
          <PaymentPanel dict={dict} plan_id={plan.id} user_id={userId} clientId={clientId} />
        </div>
        <OrderSummary plan={plan} dict={dict} />
      </div>
    </div>
  );
}
