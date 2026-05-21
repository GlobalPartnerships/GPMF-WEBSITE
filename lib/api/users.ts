import "server-only";

import { apiGet } from "./client";
import type {
  UsersPaginatedResponse,
  TopSpenderResponse,
  LatestUserResponse,
  UsersByPeriodResponse,
} from "@/app/components/dashboard/admin/users/types";

export async function getUsers(
  headers: Record<string, string>,
  page = 1,
  perPage = 20
): Promise<UsersPaginatedResponse> {
  return apiGet<UsersPaginatedResponse>(
    `/users/?page=${page}&per_page=${perPage}`,
    { headers, next: { revalidate: 0 } }
  );
}

export async function getTopSpender(
  headers: Record<string, string>
): Promise<TopSpenderResponse> {
  return apiGet<TopSpenderResponse>("/users/top-spender", { headers });
}

export async function getLatestUser(
  headers: Record<string, string>
): Promise<LatestUserResponse> {
  return apiGet<LatestUserResponse>("/users/latest", { headers });
}

export async function getUsersByPeriod(
  headers: Record<string, string>,
  params: { from: string; to: string } | { period: string }
): Promise<UsersByPeriodResponse> {
  const searchParams = new URLSearchParams(params);
  return apiGet<UsersByPeriodResponse>(
    `/users/by-period?${searchParams.toString()}`,
    { headers }
  );
}
