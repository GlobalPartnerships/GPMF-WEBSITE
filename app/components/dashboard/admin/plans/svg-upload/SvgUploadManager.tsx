"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  uploadPlanSvgAction,
  getPlanSvgsAction,
  deletePlanSvgAction,
} from "@/app/[lang]/(dashboard)/admin/plans/actions";
import { SvgGridItem } from "./SvgGridItem";
import type { CloudinaryImage, UploadStatus } from "./types";

interface SvgManagerDict {
  svgManager: {
    title: string;
    uploadButton: string;
    dragText: string;
    uploading: string;
    uploadSuccess: string;
    uploadError: string;
    deleteConfirm: string;
    emptyState: string;
    invalidFile: string;
  };
}

interface SvgUploadManagerProps {
  dict: SvgManagerDict;
}

export function SvgUploadManager({ dict }: SvgUploadManagerProps) {
  const m = dict.svgManager;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [svgList, setSvgList] = useState<CloudinaryImage[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    getPlanSvgsAction().then((result) => {
      if (result.success && result.data) {
        setSvgList(result.data);
      }
    });
  }, []);

  const handleUpload = useCallback(
    async (file: File) => {
      if (file.type !== "image/svg+xml") {
        setError(m.invalidFile);
        return;
      }

      setUploadStatus("uploading");
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPlanSvgAction(formData);

      if (result.success) {
        setUploadStatus("success");
        const refreshed = await getPlanSvgsAction();
        if (refreshed.success && refreshed.data) {
          setSvgList(refreshed.data);
        }
        setTimeout(() => setUploadStatus("idle"), 2000);
      } else {
        setUploadStatus("error");
        setError(result.error ?? m.uploadError);
      }
    },
    [m]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm(m.deleteConfirm)) return;
      const result = await deletePlanSvgAction(id);
      if (result.success) {
        setSvgList((prev) => prev.filter((img) => img.id !== id));
      }
    },
    [m]
  );

  return (
    <div className="relative z-0 rounded-xl border border-outline/10 bg-white p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant mb-4">
        {m.title}
      </h3>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-4 flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-burgundy/60 bg-burgundy/5"
            : "border-outline/20 hover:border-burgundy/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />

        {uploadStatus === "uploading" ? (
          <span className="text-[13px] text-burgundy animate-pulse">
            {m.uploading}
          </span>
        ) : uploadStatus === "success" ? (
          <span className="text-[13px] text-green-600">{m.uploadSuccess}</span>
        ) : (
          <>
            <svg
              className="w-6 h-6 text-surface-variant/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-[11px] text-surface-variant/60 text-center">
              {m.dragText}
            </span>
          </>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-500 mb-3">{error}</p>
      )}

      {svgList.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-visible hide-scrollbar">
          {svgList.map((image) => (
            <SvgGridItem
              key={image.id}
              image={image}
              onDelete={handleDelete}
              deleteLabel={m.deleteConfirm}
            />
          ))}
        </div>
      ) : (
        uploadStatus === "idle" && (
          <p className="text-[11px] text-surface-variant/40 text-center">
            {m.emptyState}
          </p>
        )
      )}
    </div>
  );
}
