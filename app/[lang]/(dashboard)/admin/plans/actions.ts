"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createPlan,
  updatePlan,
  deletePlan,
  createFeature,
  deleteFeature,
  getFeaturesByPlan,
  getBillingTypes,
  createBillingType,
  updateBillingType,
  deleteBillingType,
} from "@/lib/api/plans";
import { apiGet, apiPost, apiUpload, apiDelete } from "@/lib/api/client";
import type {
  CreatePlanPayload,
  UpdatePlanPayload,
  ActionResult,
  BillingType,
} from "@/app/components/dashboard/admin/plans/types";
import type {
  CloudinaryImage,
  UploadResponse,
  SvgListResponse,
  SyncResponse,
} from "@/app/components/dashboard/admin/plans/svg-upload/types";

export async function createPlanAction(
  payload: CreatePlanPayload,
  features: string[]
): Promise<ActionResult> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const plan = await createPlan(payload, headers);

    for (const item of features) {
      await createFeature({ item, plan_id: plan.id }, headers);
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
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const plan = await updatePlan(id, payload, headers);

    const existingFeatures = await getFeaturesByPlan(id);
    for (const feature of existingFeatures) {
      await deleteFeature(feature.id, headers);
    }
    for (const item of features) {
      await createFeature({ item, plan_id: id }, headers);
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
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };
    await deletePlan(id, headers);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete plan",
    };
  }
}

export async function uploadPlanSvgAction(
  formData: FormData
): Promise<ActionResult<UploadResponse["data"]>> {
  try {
    const result = await apiUpload<UploadResponse>(
      "/assets/upload/plan-svg",
      formData
    );
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload SVG",
    };
  }
}

export async function getPlanSvgsAction(): Promise<
  ActionResult<CloudinaryImage[]>
> {
  try {
    const result = await apiGet<SvgListResponse>("/assets/plan-svgs");
    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch SVGs",
    };
  }
}

async function getAuthHeaders(): Promise<Record<string, string> | null> {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  return { Authorization: `Bearer ${session.access_token}` };
}

export async function createBillingTypeAction(data: {
  name: string;
  description: string;
}): Promise<ActionResult<BillingType>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };
    const result = await createBillingType(data, headers);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create billing type",
    };
  }
}

export async function updateBillingTypeAction(
  id: string,
  data: { name?: string; description?: string }
): Promise<ActionResult<BillingType>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };
    const result = await updateBillingType(id, data, headers);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update billing type",
    };
  }
}

export async function deleteBillingTypeAction(
  id: string
): Promise<ActionResult<void>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };
    await deleteBillingType(id, headers);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete billing type",
    };
  }
}

export async function syncPlanSvgsAction(): Promise<
  ActionResult<SyncResponse["data"]>
> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };
    const result = await apiPost<SyncResponse>("/assets/sync", {}, { headers });
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sync SVGs",
    };
  }
}

export async function deletePlanSvgAction(
  imageId: string
): Promise<ActionResult<void>> {
  try {
    await apiDelete(`/assets/${imageId}`);
    revalidatePath("/[lang]/(dashboard)/admin/plans", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete SVG",
    };
  }
}
