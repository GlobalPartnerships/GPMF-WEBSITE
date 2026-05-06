"use client";

interface PlanTypeSelectorProps {
  tabs: { enterprise: string; custom: string };
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PlanTypeSelector({
  tabs,
  activeTab,
  onTabChange,
}: PlanTypeSelectorProps) {
  return (
    <div className="flex justify-center mb-16 reveal">
      <div className="inline-flex items-center bg-warmgray rounded-[2px] p-1 gap-1">
        {(["enterprise", "custom"] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-btn px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium rounded-[2px] ${
              activeTab === tab ? "active" : "text-surface-variant"
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tabs[tab]}
          </button>
        ))}
      </div>
    </div>
  );
}
