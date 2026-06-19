import "server-only";

import { apiGet } from "./client";
import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";

export async function fetchLatestActivePlan(
  userId: string,
  headers: Record<string, string>
): Promise<PurchasedPlan | null> {
  try {
    return await apiGet<PurchasedPlan>(
      `/purchased_plans/user/${userId}?latest_active=true`,
      { headers, next: { revalidate: 0 } }
    );
  } catch {
    return null;
  }
}

export async function getPurchasedPlansByUser(
  userId: string,
  headers: Record<string, string>
): Promise<PurchasedPlan[]> {
  return apiGet<PurchasedPlan[]>(
    `/purchased_plans/user/${userId}`,
    { headers, next: { revalidate: 0 } }
  );
}
