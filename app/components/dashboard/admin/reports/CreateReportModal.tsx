"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import {
  createReportAction,
  fetchPurchasedPlansAction,
} from "@/app/[lang]/(dashboard)/admin/reports/actions";
import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";

interface CreateReportModalProps {
  onClose: () => void;
}

export function CreateReportModal({ onClose }: CreateReportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState("");
  const [plans, setPlans] = useState<PurchasedPlan[] | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [loadingPlans, setLoadingPlans] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  async function handleLoadPlans() {
    if (!userId.trim()) return;
    setLoadingPlans(true);
    setPlans(null);
    setSelectedPlanId("");

    const result = await fetchPurchasedPlansAction(userId.trim());
    if (result.success && result.data) {
      setPlans(result.data);
    } else {
      toast.error(result.error ?? "Failed to load plans");
      setPlans([]);
    }
    setLoadingPlans(false);
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > 0) {
      setFiles((prev) => [...prev, ...selected]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0 || !userId.trim() || !title.trim()) return;

    setUploading(true);
    setProgress({ current: 0, total: files.length });

    let succeeded = 0;
    let failed = 0;

    for (let i = 0; i < files.length; i++) {
      setProgress({ current: i + 1, total: files.length });

      const fileTitle =
        files.length > 1
          ? `${title.trim()} (${i + 1} of ${files.length})`
          : title.trim();

      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("user_id", userId.trim());
      formData.append("title", fileTitle);
      if (description.trim()) formData.append("description", description.trim());
      if (selectedPlanId) formData.append("purchased_plan_id", selectedPlanId);

      const result = await createReportAction(formData);
      if (result.success) {
        succeeded++;
      } else {
        failed++;
      }
    }

    setUploading(false);

    if (failed === 0) {
      toast.success(
        succeeded === 1
          ? "Report created successfully"
          : `${succeeded} reports created successfully`
      );
      onClose();
    } else if (succeeded > 0) {
      toast.warning(`${succeeded} of ${files.length} reports created, ${failed} failed`);
    } else {
      toast.error("Failed to create reports");
    }
  }

  const canSubmit =
    userId.trim() && title.trim() && files.length > 0 && !uploading;

  const inputClass =
    "w-full px-3 py-2 text-[14px] border border-outline/30 rounded-lg bg-background text-foreground focus:outline-none focus:border-burgundy transition-colors";
  const labelClass = "block text-[13px] font-medium text-foreground mb-1";

  return (
    <ModalOverlay onClose={uploading ? () => {} : onClose}>
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Create Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>User ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user UUID..."
              className={`${inputClass} flex-1`}
              disabled={uploading}
              required
            />
            <button
              type="button"
              onClick={handleLoadPlans}
              disabled={!userId.trim() || loadingPlans || uploading}
              className="px-3 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loadingPlans ? "Loading..." : "Load Plans"}
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass}>Purchased Plan</label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            disabled={plans === null || uploading}
            className={`${inputClass} disabled:opacity-50`}
          >
            <option value="">
              {plans === null ? "Load plans first..." : "No plan selected"}
            </option>
            {plans?.map((pp) => (
              <option key={pp.id} value={pp.id}>
                {pp.plan?.name ?? "Unknown plan"} — {pp.status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Report title..."
            className={inputClass}
            disabled={uploading}
            required
          />
          {files.length > 1 && (
            <p className="text-[12px] text-surface-variant mt-1">
              Each file will get a suffix: &quot;{title || "Title"} (1 of{" "}
              {files.length})&quot;
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            className={`${inputClass} min-h-[80px] resize-y`}
            rows={3}
            disabled={uploading}
          />
        </div>

        <div>
          <label className={labelClass}>Files</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full py-6 border-2 border-dashed border-outline/30 rounded-lg text-[13px] text-surface-variant hover:border-burgundy hover:text-burgundy transition-colors disabled:opacity-50"
          >
            Click to select files
          </button>

          {files.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex items-center justify-between px-3 py-1.5 text-[13px] bg-surface rounded-lg"
                >
                  <span className="truncate mr-2">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    disabled={uploading}
                    className="text-surface-variant hover:text-red-500 transition-colors text-[12px] shrink-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {uploading && (
          <div>
            <div className="flex justify-between text-[12px] text-surface-variant mb-1">
              <span>
                Uploading {progress.current} of {progress.total}...
              </span>
              <span>
                {Math.round((progress.current / progress.total) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-outline/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-burgundy transition-all duration-300 rounded-full"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
          >
            {uploading
              ? `Uploading ${progress.current}/${progress.total}...`
              : files.length > 1
                ? `Create ${files.length} Reports`
                : "Create Report"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}
