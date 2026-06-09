import "server-only";

import { apiGet } from "./client";
import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";

export async function getPurchasedPlansByUser(
  userId: string,
  headers: Record<string, string>
): Promise<PurchasedPlan[]> {
  return apiGet<PurchasedPlan[]>(
    `/purchased_plans/user/${userId}`,
    { headers, next: { revalidate: 0 } }
  );
}
