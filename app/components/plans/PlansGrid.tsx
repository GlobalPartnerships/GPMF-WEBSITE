"use client";

import { useState } from "react";
import type { PlansDict } from "@/app/dictionaries/plans/types";
import { PlanTypeSelector } from "./PlanTypeSelector";
import { PlanCard } from "./PlanCard";
import styles from "./PlansGrid.module.css";

interface PlansGridProps {
  dict: PlansDict;
}

export function PlansGrid({ dict }: PlansGridProps) {
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

  const plans = activeTab === "enterprise" ? dict.enterprise : dict.custom;
  const gridCols =
    activeTab === "enterprise"
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 max-w-[860px] mx-auto";

  return (
    <>
      <PlanTypeSelector
        tabs={dict.tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div
          className={`${styles.grid} grid gap-8 ${gridCols} ${fading ? styles.fading : ""}`}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </>
  );
}
