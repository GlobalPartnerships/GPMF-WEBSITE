"use client";

import { useState } from "react";
import type { PlansDict } from "@/app/dictionaries/plans/types";
import type { PlanResponse } from "@/app/components/dashboard/admin/plans/types";
import { PlanTypeSelector } from "./PlanTypeSelector";
import { PlanCard } from "./PlanCard";
import styles from "./PlansGrid.module.css";

interface PlansGridProps {
  dict: PlansDict;
  standardPlans: PlanResponse[];
  customPlans: PlanResponse[];
}

export function PlansGrid({ dict, standardPlans, customPlans }: PlansGridProps) {
  const [activeTab, setActiveTab] = useState("enterprise");
  const [fading, setFading] = useState(false);

  function handleTabChange(tab: string) {
    if (tab === activeTab) return;
    setFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setFading(false);
    }, 350);
  }

  const plans = activeTab === "enterprise" ? standardPlans : customPlans;
  const gridCols =
    activeTab === "enterprise"
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 max-w-[860px] mx-auto";

  const emptyMessage =
    activeTab === "enterprise"
      ? dict.emptyState.standard
      : dict.emptyState.custom;

  return (
    <>
      <PlanTypeSelector
        tabs={dict.tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {plans.length === 0 ? (
          <p className="text-center text-surface-variant italic py-16">
            {emptyMessage}
          </p>
        ) : (
          <div
            className={`${styles.grid} grid gap-8 ${gridCols} ${fading ? styles.fading : ""}`}
          >
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} cta={dict.cta} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
