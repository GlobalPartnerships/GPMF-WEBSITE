"use client";

import { useState } from "react";
import type { Plan, MostBoughtPlanData, ModalState } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { PlansSection } from "./PlansSection";
import { MostBoughtPlan } from "./MostBoughtPlan";
import { PlanModal } from "./PlanModal";

interface PlansManagerClientProps {
  standardPlans: Plan[];
  customPlans: Plan[];
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

  return (
    <>
      <div className="mt-8 space-y-8">
        <PlansSection
          title={dict.standardPlans}
          plans={standardPlans}
          dict={dict}
          onNewPlan={() => setModalState({ mode: "create", planType: "standard" })}
          onEditPlan={(plan) => setModalState({ mode: "edit", planType: plan.type, plan })}
        />

        <PlansSection
          title={dict.customPlans}
          plans={customPlans}
          dict={dict}
          onNewPlan={() => setModalState({ mode: "create", planType: "custom" })}
          onEditPlan={(plan) => setModalState({ mode: "edit", planType: plan.type, plan })}
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
