"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { updateReportAction } from "@/app/[lang]/(dashboard)/admin/reports/actions";
import type { Report } from "./types";

interface EditReportModalProps {
  report: Report;
  onClose: () => void;
}

export function EditReportModal({ report, onClose }: EditReportModalProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(report.title);
  const [description, setDescription] = useState(report.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateReportAction(report.id, {
        title,
        description: description || undefined,
      });
      if (result.success) {
        toast.success("Report updated successfully");
        onClose();
      } else {
        toast.error(result.error ?? "Failed to update report");
      }
    });
  }

  const inputClass =
    "w-full px-3 py-2 text-[14px] border border-outline/30 rounded-lg bg-background text-foreground focus:outline-none focus:border-burgundy transition-colors";
  const labelClass = "block text-[13px] font-medium text-foreground mb-1";

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-semibold text-foreground mb-6">Edit Report</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} min-h-[100px] resize-y`}
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}
