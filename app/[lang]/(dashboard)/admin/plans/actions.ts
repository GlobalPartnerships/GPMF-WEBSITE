"use server";

import { revalidatePath } from "next/cache";
import {
  createPlan,
  updatePlan,
  deletePlan,
  createFeature,
  deleteFeature,
  getFeaturesByPlan,
  getBillingTypes,
} from "@/lib/api/plans";
import type {
  CreatePlanPayload,
  UpdatePlanPayload,
  ActionResult,
  BillingType,
} from "@/app/components/dashboard/admin/plans/types";

export async function createPlanAction(
  payload: CreatePlanPayload,
  features: string[]
): Promise<ActionResult> {
  try {
    const plan = await createPlan(payload);

    for (const item of features) {
      await createFeature({ item, plan_id: plan.id });
    }

    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: plan };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create plan",
    };
  }
}

export async function updatePlanAction(
  id: string,
  payload: UpdatePlanPayload,
  features: string[]
): Promise<ActionResult> {
  try {
    const plan = await updatePlan(id, payload);

    const existingFeatures = await getFeaturesByPlan(id);
    for (const feature of existingFeatures) {
      await deleteFeature(feature.id);
    }
    for (const item of features) {
      await createFeature({ item, plan_id: id });
    }

    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: plan };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update plan",
    };
  }
}

export async function getBillingTypesAction(): Promise<ActionResult<BillingType[]>> {
  try {
    const data = await getBillingTypes();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch billing types",
    };
  }
}

export async function deletePlanAction(
  id: string
): Promise<ActionResult<void>> {
  try {
    await deletePlan(id);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete plan",
    };
  }
}
