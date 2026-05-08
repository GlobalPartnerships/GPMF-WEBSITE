import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

interface TrafficBreakdownProps {
  dict: Pick<AdminDict, "trafficBreakdown" | "dailyUnique" | "weeklyAverage" | "monthlyTotal" | "viewSources">;
  data: {
    dailyUnique: string;
    weeklyAverage: string;
    monthlyTotal: string;
  };
}

function ArrowIcon() {
  return (
    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function TrafficBreakdown({ dict, data }: TrafficBreakdownProps) {
  const metrics = [
    { label: dict.dailyUnique, value: data.dailyUnique, color: "bg-[#2e7d52]" },
    { label: dict.weeklyAverage, value: data.weeklyAverage, color: "bg-burgundy" },
    { label: dict.monthlyTotal, value: data.monthlyTotal, color: "bg-outline" },
  ];

  return (
    <div className="dash-card whisper-shadow bg-white rounded-sm p-6 flex-1">
      <h3 className="font-serif text-[20px] font-semibold text-burgundy mb-5">
        {dict.trafficBreakdown}
      </h3>
      <div className="space-y-4">
        {metrics.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-[14px]">{label}</span>
            </div>
            <span className="text-[14px] font-medium tabular-nums">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-outline/8 flex justify-center">
        <button className="text-burgundy text-[11px] tracking-[0.14em] uppercase font-semibold flex items-center gap-1 hover:underline transition-all">
          {dict.viewSources} <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
