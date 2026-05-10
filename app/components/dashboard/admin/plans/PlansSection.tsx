import type { Plan } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { PlanCard } from "./PlanCard";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface PlansSectionProps {
  title: string;
  plans: Plan[];
  dict: Pick<AdminDict, "newPlan" | "stats" | "edit">;
}

export function PlansSection({ title, plans, dict }: PlansSectionProps) {
  return (
    <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-variant">
          {title}
        </h2>
        <button className="text-[12px] font-medium border border-outline/15 rounded-sm px-3 py-1.5 text-surface-variant hover:bg-warmgray hover:text-foreground transition-colors">
          {dict.newPlan}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} dict={dict} />
        ))}
      </div>
    </section>
  );
}
