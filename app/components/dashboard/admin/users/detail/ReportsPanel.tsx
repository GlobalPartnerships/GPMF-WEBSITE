import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface ReportsPanelProps {
  reports: unknown[];
}

export function ReportsPanel({ reports }: ReportsPanelProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        Reports
      </span>

      {reports.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-full bg-warmgray/60 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-surface-variant/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <p className="text-surface-variant text-[14px] font-medium">No reports generated</p>
          <p className="text-surface-variant/70 text-[12px] mt-1">Reports will appear here once available</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-surface-variant text-[13px]">{reports.length} report(s)</p>
        </div>
      )}
    </div>
  );
}
