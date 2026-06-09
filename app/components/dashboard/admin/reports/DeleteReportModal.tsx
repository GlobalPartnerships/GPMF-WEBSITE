"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { deleteReportAction } from "@/app/[lang]/(dashboard)/admin/reports/actions";
import type { Report } from "./types";

interface DeleteReportModalProps {
  report: Report;
  onClose: () => void;
}

export function DeleteReportModal({ report, onClose }: DeleteReportModalProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteReportAction(report.id);
      if (result.success) {
        toast.success("Report deleted successfully");
        onClose();
      } else {
        toast.error(result.error ?? "Failed to delete report");
      }
    });
  }

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-semibold text-foreground mb-2">Delete Report</h2>
      <p className="text-[14px] text-surface-variant mb-6">
        Are you sure you want to delete <strong>{report.title}</strong> ({report.file_name})?
        This will also delete the associated file. This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </ModalOverlay>
  );
}
