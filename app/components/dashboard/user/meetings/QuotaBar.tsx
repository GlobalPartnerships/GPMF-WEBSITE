import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";

interface QuotaBarProps {
  dict: Pick<DashboardDict, "availableMeetings" | "usedLabel" | "leftLabel" | "totalPlanMeetings" | "meetingsLeftLabel" | "meetingsUsedLabel">;
  totalMeetings: number;
  used: number;
  left: number;
  planMeetings: number;
  planUsed: number;
  planLeft: number;
}

export function QuotaBar({ dict, totalMeetings, used, left, planMeetings, planUsed, planLeft }: QuotaBarProps) {
  const pct = totalMeetings > 0 ? Math.round((used / totalMeetings) * 100) : 0;

  return (
    <div className="px-6 pb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold mb-2">
            {dict.availableMeetings}
          </h3>
          <span className="font-serif text-[32px] font-bold leading-none text-foreground">{totalMeetings}</span>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <span className="text-[11px] tracking-[0.08em] uppercase text-surface-variant font-medium block mb-1">
              {dict.usedLabel}
            </span>
            <span className="font-serif text-[22px] font-bold text-foreground">{used}</span>
          </div>
          <div>
            <span className="text-[11px] tracking-[0.08em] uppercase text-surface-variant font-medium block mb-1">
              {dict.leftLabel}
            </span>
            <span className="font-serif text-[22px] font-bold text-green-700">{left}</span>
          </div>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden mb-5">
        <div
          className="h-full rounded-full bg-burgundy transition-[width] duration-600 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <span className="text-[11px] tracking-[0.06em] uppercase text-surface-variant font-medium block mb-1">
            {dict.totalPlanMeetings}
          </span>
          <span className="text-[18px] font-semibold tabular-nums text-foreground">{planMeetings}</span>
        </div>
        <div>
          <span className="text-[11px] tracking-[0.06em] uppercase text-surface-variant font-medium block mb-1">
            {dict.meetingsLeftLabel}
          </span>
          <span className="text-[18px] font-semibold tabular-nums text-green-700">{planLeft}</span>
        </div>
        <div>
          <span className="text-[11px] tracking-[0.06em] uppercase text-surface-variant font-medium block mb-1">
            {dict.meetingsUsedLabel}
          </span>
          <span className="text-[18px] font-semibold tabular-nums text-foreground">{planUsed}</span>
        </div>
      </div>
    </div>
  );
}
