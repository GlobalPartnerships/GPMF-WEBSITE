"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { CreateReportModal } from "./CreateReportModal";

const FILE_TYPE_OPTIONS = [
  { label: "All types", value: "" },
  { label: "PDF", value: "application/pdf" },
  { label: "JPEG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WEBP", value: "image/webp" },
  { label: "DOC", value: "application/msword" },
  { label: "DOCX", value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { label: "XLS", value: "application/vnd.ms-excel" },
  { label: "XLSX", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { label: "CSV", value: "text/csv" },
  { label: "TXT", value: "text/plain" },
];

const inputClass =
  "px-3 py-2 text-[14px] border border-outline/30 rounded-lg bg-background text-foreground focus:outline-none focus:border-burgundy transition-colors";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export function ReportsFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userId, setUserId] = useState(searchParams.get("user_id") ?? "");
  const [userEmail, setUserEmail] = useState(searchParams.get("user_email") ?? "");
  const [title, setTitle] = useState(searchParams.get("title") ?? "");
  const [fileName, setFileName] = useState(searchParams.get("file_name") ?? "");
  const [fileType, setFileType] = useState(searchParams.get("file_type") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (userId.trim()) params.set("user_id", userId.trim());
    if (userEmail.trim()) params.set("user_email", userEmail.trim());
    if (title.trim()) params.set("title", title.trim());
    if (fileName.trim()) params.set("file_name", fileName.trim());
    if (fileType) params.set("file_type", fileType);

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  function clearFilters() {
    setUserId("");
    setUserEmail("");
    setTitle("");
    setFileName("");
    setFileType("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") applyFilters();
  }

  const hasFilters = userId || userEmail || title || fileName || fileType;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">User ID</label>
        <div className="relative">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by user ID..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">User email</label>
        <div className="relative">
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by user email..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">Title</label>
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by title..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">File name</label>
        <div className="relative">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by file name..."
            className={`${inputClass} w-full pl-9`}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="min-w-[140px]">
        <label className="block text-[12px] font-medium text-surface-variant mb-1">File type</label>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className={`${inputClass} w-full`}
        >
          {FILE_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        disabled={isPending}
        className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
      >
        {isPending ? "Searching..." : "Search"}
      </button>

      {hasFilters && (
        <button
          onClick={clearFilters}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
        >
          Clear
        </button>
      )}

      <button
        onClick={() => setShowCreateModal(true)}
        className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors ml-auto"
      >
        + Create Report
      </button>

      {showCreateModal && (
        <CreateReportModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
