import type { MostBoughtPlanData } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface MostBoughtPlanProps {
  plan: MostBoughtPlanData;
  dict: Pick<AdminDict, "mostBoughtPlan" | "details" | "stats" | "earnings" | "sold" | "conversionRate" | "inCartRightNow">;
}

function CrownIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

export function MostBoughtPlan({ plan, dict }: MostBoughtPlanProps) {
  return (
    <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6 flex flex-col lg:flex-row gap-8`}>
      {/* Left: Header Info */}
      <div className="flex-1 lg:max-w-xs flex flex-col justify-between">
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-variant mb-4">
            {dict.mostBoughtPlan}
          </h2>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-serif text-2xl text-burgundy">{plan.title}</h3>
            <span className="text-burgundy">
              <CrownIcon />
            </span>
          </div>
          <p className="text-[13px] text-surface-variant mb-6 leading-relaxed">
            {plan.subtitle}
          </p>
        </div>
        <div className="font-serif text-2xl font-bold text-foreground">{plan.price}</div>
      </div>

      {/* Middle: Details List */}
      <div className="flex-[1.5] border-t lg:border-t-0 lg:border-l border-outline/15 pt-6 lg:pt-0 lg:pl-8">
        <h4 className="text-[13px] font-bold text-foreground mb-4">{dict.details}</h4>
        <ul className="space-y-2.5 text-[13px] text-surface-variant">
          {plan.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-burgundy/60 mt-0.5">—</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Stats */}
      <div className="flex-1 border-t lg:border-t-0 lg:border-l border-outline/15 pt-6 lg:pt-0 lg:pl-8">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-variant mb-6">
          {dict.stats}
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
              {dict.earnings}
            </span>
            <span className="font-serif text-xl font-bold text-foreground">
              {plan.stats.earnings}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
              {dict.sold}
            </span>
            <span className="text-[13px] text-foreground font-medium">
              {plan.stats.sold}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
              {dict.conversionRate}
            </span>
            <span className="text-[13px] text-foreground font-medium">
              {plan.stats.conversionRate}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold">
              {dict.inCartRightNow}
            </span>
            <span className="text-[13px] text-foreground font-medium">
              {plan.stats.inCart}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
