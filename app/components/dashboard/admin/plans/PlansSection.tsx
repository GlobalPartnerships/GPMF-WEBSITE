import type { PlanResponse } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { PlanCard } from "./PlanCard";
import { EmptyState } from "@/app/components/EmptyState";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface PlansSectionProps {
  title: string;
  plans: PlanResponse[];
  dict: Pick<AdminDict, "newPlan" | "stats" | "edit">;
  emptyTitle: string;
  emptyMessage: string;
  isPending?: boolean;
  onNewPlan?: () => void;
  onEditPlan?: (plan: PlanResponse) => void;
  onDeletePlan?: (plan: PlanResponse) => void;
}

export function PlansSection({ title, plans, dict, emptyTitle, emptyMessage, isPending, onNewPlan, onEditPlan, onDeletePlan }: PlansSectionProps) {
  return (
    <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-variant">
          {title}
        </h2>
        <button
          onClick={onNewPlan}
          className="text-[12px] font-medium border border-outline/15 rounded-sm px-3 py-1.5 text-surface-variant hover:bg-warmgray hover:text-foreground transition-colors"
        >
          {dict.newPlan}
        </button>
      </div>

      {plans.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          message={emptyMessage}
          alignedTo="center"
          justifySide="center"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              dict={dict}
              isPending={isPending}
              onEdit={onEditPlan}
              onDelete={onDeletePlan}
            />
          ))}
        </div>
      )}
    </section>
  );
}
