import type { ModalState } from "../types";
import type { FormState } from "./types";
import {
  createPlanAction,
  updatePlanAction,
} from "@/app/[lang]/(dashboard)/admin/plans/actions";

export async function submitPlan(
  form: FormState,
  selectedPlanType: "standard" | "custom",
  state: ModalState,
) {
  const payload = {
    name: form.name,
    subtitle: form.subtitle,
    description: form.description,
    base_price: parseFloat(form.price),
    meetings_per_month: parseInt(form.monthlyMeetings, 10),
    category: selectedPlanType,
    billing_type_id: form.billingTypeId,
    icon_url: form.iconUrl!,
  } as const;

  if (state.mode === "edit" && state.plan) {
    return updatePlanAction(state.plan.id, payload, form.features);
  }
  return createPlanAction(payload, form.features);
}
