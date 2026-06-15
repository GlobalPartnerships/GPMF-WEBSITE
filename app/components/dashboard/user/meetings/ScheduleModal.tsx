"use client";

import { useState, useEffect } from "react";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import type { ScheduleFormState } from "./types";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { ModalHeader } from "@/app/components/dashboard/admin/plans/plan-modal/ModalHeader";
import { useScheduleForm } from "./useScheduleForm";
import { validateScheduleForm } from "./validation";

interface ScheduleModalProps {
  open: boolean;
  dict: Pick<DashboardDict, "scheduleModalTitle" | "topicLabel" | "dateLabel" | "timeLabel" | "topicPlaceholder" | "submitSchedule" | "cancelSchedule">;
  onClose: () => void;
  onSubmit: (form: ScheduleFormState) => void;
}

export function ScheduleModal({ open, dict, onClose, onSubmit }: ScheduleModalProps) {
  const { form, setField, reset } = useScheduleForm();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      reset();
      setError(null);
    }
  }, [open, reset]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateScheduleForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(form);
    onClose();
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div className="space-y-6">
        <ModalHeader title={dict.scheduleModalTitle} onClose={onClose} />

        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              {dict.topicLabel}
            </label>
            <input
              type="text"
              className="w-full border border-outline/15 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy/40 transition-colors placeholder:text-surface-variant/40"
              placeholder={dict.topicPlaceholder}
              value={form.topic}
              onChange={(e) => setField("topic", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {dict.dateLabel}
              </label>
              <input
                type="date"
                className="w-full border border-outline/15 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {dict.timeLabel}
              </label>
              <input
                type="time"
                className="w-full border border-outline/15 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                value={form.time}
                onChange={(e) => setField("time", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-outline/15 rounded-sm text-[11px] uppercase tracking-[0.16em] font-medium text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-all"
            >
              {dict.cancelSchedule}
            </button>
            <button
              type="submit"
              className="bg-burgundy text-white px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] rounded-sm font-medium hover:bg-burgundy-dark transition-colors"
            >
              {dict.submitSchedule}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
