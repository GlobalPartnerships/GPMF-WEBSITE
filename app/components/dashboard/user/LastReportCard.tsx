import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { EmptyState } from "./EmptyState";
import type { UserReport } from "@/lib/api/reports";

interface LastReportCardDict {
  lastReportLabel: string;
  reportTitle: string;
  reportDescription: string;
  downloadPdf: string;
  viewReport: string;
  noReport: string;
}

interface LastReportCardProps {
  report: UserReport | null;
  dict: LastReportCardDict;
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function DocumentPreviewIcon() {
  return (
    <svg className="w-12 h-12 text-surface-variant/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

export function LastReportCard({ report, dict }: LastReportCardProps) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6 flex flex-col gap-4 relative overflow-hidden`}>
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-8 translate-y-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(122,15,50,0.07) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      <div className="flex items-center gap-2 text-burgundy">
        <ChartIcon />
        <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-surface-variant">
          {dict.lastReportLabel}
        </span>
      </div>

      {report ? (
        <div className="flex-1 flex flex-col sm:flex-row gap-5 relative z-10">
          <div className="flex flex-col gap-3 shrink-0">
            <div className="w-[240px] flex-1 min-h-[160px] rounded-sm border border-outline/20 bg-background flex items-center justify-center overflow-hidden">
              {report.file_type === "application/pdf" ? (
                <iframe
                  src={`${report.file_url}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full rounded-sm pointer-events-none"
                  style={{ overflow: "hidden" }}
                  scrolling="no"
                  title={report.file_name}
                  tabIndex={-1}
                />
              ) : (
                <DocumentPreviewIcon />
              )}
            </div>

            <div className="flex gap-2">
              <a
                href={`${report.file_url}?download=`}
                download={report.file_name}
                className="flex-1 text-center text-[11px] tracking-[0.14em] uppercase font-semibold px-3 py-2 rounded-sm border border-outline/20 text-foreground hover:border-burgundy hover:text-burgundy transition-colors"
              >
                {dict.downloadPdf}
              </a>
              <a
                href={report.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-[11px] tracking-[0.14em] uppercase font-semibold px-3 py-2 rounded-sm border border-outline/20 text-foreground hover:border-burgundy hover:text-burgundy transition-colors"
              >
                {dict.viewReport}
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 min-w-0">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-burgundy mb-1">
                {dict.reportTitle}:
              </p>
              <p className="font-serif text-[20px] text-foreground leading-tight">
                {report.title}
              </p>
            </div>

            {report.description && (
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-burgundy mb-1">
                  {dict.reportDescription}:
                </p>
                <p className="text-[13px] text-surface-variant leading-relaxed">
                  {report.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 relative z-10">
          <EmptyState message={dict.noReport} icon="document" />
        </div>
      )}
    </div>
  );
}
