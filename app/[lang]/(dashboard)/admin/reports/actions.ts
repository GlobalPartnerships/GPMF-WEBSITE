"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateReport, deleteReport, uploadReport } from "@/lib/api/reports";
import { getPurchasedPlansByUser } from "@/lib/api/purchased-plans";
import type {
  Report,
  UpdateReportPayload,
  ActionResult,
} from "@/app/components/dashboard/admin/reports/types";
import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";

export async function updateReportAction(
  reportId: string,
  payload: UpdateReportPayload
): Promise<ActionResult> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const report = await updateReport(reportId, payload, headers);
    revalidatePath("/[lang]/(dashboard)/admin/reports", "page");
    return { success: true, data: report };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update report",
    };
  }
}

export async function deleteReportAction(
  reportId: string
): Promise<ActionResult<void>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    await deleteReport(reportId, headers);
    revalidatePath("/[lang]/(dashboard)/admin/reports", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete report",
    };
  }
}

export async function createReportAction(
  formData: FormData
): Promise<ActionResult<Report>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const report = await uploadReport(formData, headers);
    revalidatePath("/[lang]/(dashboard)/admin/reports", "page");
    return { success: true, data: report };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create report",
    };
  }
}

export async function fetchPurchasedPlansAction(
  userId: string
): Promise<ActionResult<PurchasedPlan[]>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const plans = await getPurchasedPlansByUser(userId, headers);
    return { success: true, data: plans };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch plans",
    };
  }
}

async function getAuthHeaders(): Promise<Record<string, string> | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;
  return { Authorization: `Bearer ${session.access_token}` };
}
