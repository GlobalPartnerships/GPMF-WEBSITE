import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

function GroupIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

interface MonthlyRegistrationsCardProps {
  total: number;
  monthLabel: string;
}

export function MonthlyRegistrationsCard({ total, monthLabel }: MonthlyRegistrationsCardProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
          Registered This Month
        </span>
        <span className="text-surface-variant/40"><GroupIcon /></span>
      </div>
      <div className="flex items-end gap-2.5">
        <span className="font-serif text-[40px] font-bold leading-tight tracking-[-0.02em]">
          {total}
        </span>
      </div>
      <p className="text-surface-variant text-[13px] mt-1.5">
        New users in {monthLabel}
      </p>
    </div>
  );
}
