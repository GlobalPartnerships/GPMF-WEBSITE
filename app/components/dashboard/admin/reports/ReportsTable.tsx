"use client";

import { toast } from "sonner";
import { DataTable } from "@/app/components/shared/DataTable";
import { EmptyState } from "@/app/components/EmptyState";
import { ActionsCell } from "./ActionsCell";
import type { ColumnDef } from "@/app/components/shared/types";
import type { Report } from "./types";

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62184 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253338 7.60288 0.0760002 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5523 3.44772 13 4 13H11C11.5523 13 12 12.5523 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1046 12.1046 14 11 14H4C2.89543 14 2 13.1046 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function CopyableCell({ value, label, children }: { value: string; label: string; children: React.ReactNode }) {
  function handleCopy() {
    navigator.clipboard.writeText(value);
    toast(`${label} copied`);
  }

  return (
    <div className="group/copy flex items-center gap-2">
      {children}
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover/copy:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity cursor-pointer"
        aria-label={`Copy ${label}`}
      >
        <CopyIcon />
      </button>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileTypeLabel(mimeType: string): string {
  const map: Record<string, string> = {
    "application/pdf": "PDF",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/webp": "WEBP",
    "image/gif": "GIF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
    "text/plain": "TXT",
    "text/csv": "CSV",
  };
  return map[mimeType] ?? mimeType.split("/").pop()?.toUpperCase() ?? "FILE";
}

interface ReportsTableProps {
  reports: Report[];
  lang: string;
  hasFilters?: boolean;
}

export function ReportsTable({ reports, lang, hasFilters }: ReportsTableProps) {
  if (reports.length === 0) {
    return (
      <EmptyState
        title={hasFilters ? "No results found" : "No reports yet"}
        message={
          hasFilters
            ? "No reports match your search criteria. Try adjusting the filters."
            : "Reports will appear here once they are uploaded."
        }
      />
    );
  }

  const columns: ColumnDef<Report>[] = [
    {
      key: "id",
      label: "ID",
      className: "text-[13px] text-surface-variant font-mono",
      render: (row) => (
        <CopyableCell value={row.id} label="ID">
          <span>...{row.id.slice(-4)}</span>
        </CopyableCell>
      ),
    },
    {
      key: "title",
      label: "Title",
      className: "text-[14px]",
      render: (row) => (
        <CopyableCell value={row.title} label="Title">
          <span className="font-medium text-foreground">{row.title}</span>
        </CopyableCell>
      ),
    },
    {
      key: "file_name",
      label: "File",
      className: "text-[14px]",
      render: (row) => (
        <div className="group/file flex items-center gap-2">
          <span className="text-foreground truncate max-w-[180px]">{row.file_name}</span>
          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-burgundy/10 text-burgundy">
            {fileTypeLabel(row.file_type)}
          </span>
          <a
            href={row.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover/file:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            aria-label="View file"
          >
            <EyeIcon />
          </a>
          <a
            href={row.file_url}
            download={row.file_name}
            className="opacity-0 group-hover/file:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            aria-label="Download file"
          >
            <DownloadIcon />
          </a>
        </div>
      ),
    },
    {
      key: "file_size",
      label: "Size",
      className: "text-[13px] text-surface-variant",
      render: (row) => <span>{formatFileSize(row.file_size)}</span>,
    },
    {
      key: "user_id",
      label: "User ID",
      className: "text-[13px] text-surface-variant font-mono",
      render: (row) => (
        <CopyableCell value={row.user_id} label="User ID">
          <span>...{row.user_id.slice(-4)}</span>
        </CopyableCell>
      ),
    },
    {
      key: "user_email",
      label: "User Email",
      className: "text-[14px]",
      render: (row) =>
        row.user_email ? (
          <CopyableCell value={row.user_email} label="User Email">
            <span className="text-foreground">{row.user_email}</span>
          </CopyableCell>
        ) : (
          <span className="text-foreground">—</span>
        ),
    },
    {
      key: "created_at",
      label: "Created",
      className: "text-[13px] text-surface-variant",
      render: (row) => {
        const formatted = row.created_at
          ? new Date(row.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—";
        return <span>{formatted}</span>;
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => <ActionsCell report={row} lang={lang} />,
    },
  ];

  return (
    <DataTable<Report>
      title="Reports"
      subtitle="All uploaded reports"
      columns={columns}
      data={reports}
      keyExtractor={(row) => row.id}
    />
  );
}
