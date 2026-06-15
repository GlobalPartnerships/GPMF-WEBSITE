import type { ScheduleFormState } from "./types";

export function validateScheduleForm(form: ScheduleFormState): string | null {
  if (!form.topic.trim()) return "Topic is required";
  if (!form.date) return "Date is required";

  const selected = new Date(form.date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) return "Date must be in the future";

  return null;
}
