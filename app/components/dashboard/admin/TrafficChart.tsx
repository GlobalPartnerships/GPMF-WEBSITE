"use client";

import { useState } from "react";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

interface TrafficChartProps {
  dict: Pick<AdminDict, "trafficAnalytics" | "trafficAnalyticsSubtitle" | "daily" | "weekly" | "monthly">;
}

const barHeights = [38, 55, 42, 70, 50, 88, 65, 78, 95, 82, 58, 45];

type Tab = "daily" | "weekly" | "monthly";

export function TrafficChart({ dict }: TrafficChartProps) {
  const [activeTab, setActiveTab] = useState<Tab>("weekly");

  const tabs: { key: Tab; label: string }[] = [
    { key: "daily", label: dict.daily },
    { key: "weekly", label: dict.weekly },
    { key: "monthly", label: dict.monthly },
  ];

  return (
    <div className="dash-card whisper-shadow bg-white rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-[22px] font-semibold text-burgundy">
            {dict.trafficAnalytics}
          </h3>
          <p className="text-surface-variant text-[13px] mt-0.5">
            {dict.trafficAnalyticsSubtitle}
          </p>
        </div>
        <div className="flex gap-1.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`tab-btn px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] font-medium rounded-sm ${
                activeTab === key ? "active" : "text-surface-variant"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-foreground/5 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between gap-[3%] px-[2%]">
          {barHeights.map((height, i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div
                className="chart-bar w-full max-w-[28px] bg-burgundy/15 hover:bg-burgundy/25 rounded-t-sm transition-colors"
                style={{
                  height: `${height}%`,
                  "--delay": `${0.05 + i * 0.05}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>

        {/* Trend line */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          <path
            d="M20,195 C80,170 120,140 160,160 C200,180 240,130 300,100 C360,70 400,85 440,60 C480,35 520,55 580,80 C640,105 700,70 780,110"
            fill="none"
            stroke="#7a0f32"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="flex justify-between mt-5 text-[10px] tracking-[0.12em] uppercase text-surface-variant font-medium px-[2%]">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}
