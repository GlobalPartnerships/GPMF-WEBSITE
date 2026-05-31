import type { FormState } from "./types";

export function validatePlanForm(form: FormState): string | null {
  const price = parseFloat(form.price);
  if (isNaN(price) || price < 0) return "Price must be a valid positive number";

  const meetings = parseInt(form.monthlyMeetings, 10);
  if (!Number.isInteger(meetings) || meetings <= 0)
    return "Monthly meetings must be a positive whole number";

  if (!form.iconUrl) return "Please select an icon for this plan";

  return null;
}
