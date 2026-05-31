import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface DiagnosisPanelProps {
  diagnosis: unknown[];
}

export function DiagnosisPanel({ diagnosis }: DiagnosisPanelProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        Diagnosis
      </span>

      {diagnosis.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-full bg-warmgray/60 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-surface-variant/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <p className="text-surface-variant text-[14px] font-medium">No diagnosis generated</p>
          <p className="text-surface-variant/70 text-[12px] mt-1">Diagnosis will appear here once available</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-surface-variant text-[13px]">{diagnosis.length} diagnosis record(s)</p>
        </div>
      )}
    </div>
  );
}
