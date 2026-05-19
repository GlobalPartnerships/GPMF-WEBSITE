import "server-only";

import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import type {
  PlanResponse,
  PlanFeature,
  BillingType,
  CreatePlanPayload,
  UpdatePlanPayload,
} from "@/app/components/dashboard/admin/plans/types";

export async function getPlans(): Promise<PlanResponse[]> {
  return apiGet<PlanResponse[]>("/plans/", {
    next: { revalidate: 0 },
  });
}

export async function getPlan(id: string): Promise<PlanResponse> {
  return apiGet<PlanResponse>(`/plans/${id}`);
}

export async function createPlan(
  data: CreatePlanPayload
): Promise<PlanResponse> {
  return apiPost<PlanResponse>("/plans/create", data);
}

export async function updatePlan(
  id: string,
  data: UpdatePlanPayload
): Promise<PlanResponse> {
  return apiPut<PlanResponse>(`/plans/${id}`, data);
}

export async function deletePlan(id: string): Promise<void> {
  return apiDelete(`/plans/${id}`);
}

export async function getFeaturesByPlan(
  planId: string
): Promise<PlanFeature[]> {
  return apiGet<PlanFeature[]>(`/plans/plan-feature/by-plan/${planId}`);
}

export async function createFeature(data: {
  item: string;
  plan_id: string;
}): Promise<PlanFeature> {
  return apiPost<PlanFeature>("/plans/plan-feature/create", data);
}

export async function deleteFeature(id: string): Promise<void> {
  return apiDelete(`/plans/plan-feature/${id}`);
}

export async function getBillingTypes(): Promise<BillingType[]> {
  return apiGet<BillingType[]>("/plans/billing-type/", {
    next: { revalidate: 0 },
  });
}

export async function createBillingType(
  data: { name: string; description: string },
  headers?: Record<string, string>
): Promise<BillingType> {
  return apiPost<BillingType>("/plans/billing-type/create", data, { headers });
}

export async function updateBillingType(
  id: string,
  data: { name?: string; description?: string },
  headers?: Record<string, string>
): Promise<BillingType> {
  return apiPut<BillingType>(`/plans/billing-type/${id}`, data, { headers });
}

export async function deleteBillingType(
  id: string,
  headers?: Record<string, string>
): Promise<void> {
  return apiDelete(`/plans/billing-type/${id}`, { headers });
}
