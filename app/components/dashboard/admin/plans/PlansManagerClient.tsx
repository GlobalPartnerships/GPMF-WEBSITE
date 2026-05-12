"use client";

import { useState, useTransition } from "react";
import type { MostBoughtPlanData, ModalState, PlanResponse } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { PlansSection } from "./PlansSection";
import { MostBoughtPlan } from "./MostBoughtPlan";
import { PlanModal } from "./plan-modal/PlanModal";
import { EmptyState } from "@/app/components/EmptyState";
import { deletePlanAction } from "@/app/[lang]/(dashboard)/admin/plans/actions";

interface PlansManagerClientProps {
  standardPlans: PlanResponse[];
  customPlans: PlanResponse[];
  mostBoughtPlan: MostBoughtPlanData;
  dict: AdminDict;
}

export function PlansManagerClient({
  standardPlans,
  customPlans,
  mostBoughtPlan,
  dict,
}: PlansManagerClientProps) {
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(plan: PlanResponse) {
    if (!confirm(`Delete "${plan.name}"?`)) return;
    startTransition(async () => {
      const result = await deletePlanAction(plan.id);
      if (!result.success) {
        alert(result.error ?? "Failed to delete plan");
      }
    });
  }

  const hasNoPlans = standardPlans.length === 0 && customPlans.length === 0;

  if (hasNoPlans) {
    return (
      <>
        <EmptyState
          width={52}
          title="No plans found"
          message="There are no standard or custom plans yet. Create one to get started."
          alignedTo="center"
          justifySide="center"
          button
          buttonLabel={dict.newPlan}
          onButtonClick={() => setModalState({ mode: "create", planType: "standard", allowPlanTypeSelection: true })}
        />

        {modalState && (
          <PlanModal
            state={modalState}
            dict={dict}
            onClose={() => setModalState(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="mt-8 space-y-8">
        <PlansSection
          title={dict.standardPlans}
          plans={standardPlans}
          dict={dict}
          emptyTitle={dict.noPlansYet}
          emptyMessage={dict.noStandardPlansMessage}
          isPending={isPending}
          onNewPlan={() => setModalState({ mode: "create", planType: "standard" })}
          onEditPlan={(plan) => setModalState({ mode: "edit", planType: plan.category, plan })}
          onDeletePlan={handleDelete}
        />

        <PlansSection
          title={dict.customPlans}
          plans={customPlans}
          dict={dict}
          emptyTitle={dict.noPlansYet}
          emptyMessage={dict.noCustomPlansMessage}
          isPending={isPending}
          onNewPlan={() => setModalState({ mode: "create", planType: "custom" })}
          onEditPlan={(plan) => setModalState({ mode: "edit", planType: plan.category, plan })}
          onDeletePlan={handleDelete}
        />

        <MostBoughtPlan plan={mostBoughtPlan} dict={dict} />
      </div>

      {modalState && (
        <PlanModal
          state={modalState}
          dict={dict}
          onClose={() => setModalState(null)}
        />
      )}
    </>
  );
}
