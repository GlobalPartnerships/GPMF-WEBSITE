import "server-only";

import { apiGet, apiPatch, apiDelete, apiUpload } from "./client";
import type {
  Report,
  ReportsPaginatedResponse,
  ReportsFilters,
  UpdateReportPayload,
} from "@/app/components/dashboard/admin/reports/types";

export async function getReports(
  headers: Record<string, string>,
  page = 1,
  perPage = 100,
  filters?: ReportsFilters
): Promise<ReportsPaginatedResponse> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (filters?.user_id) params.set("user_id", filters.user_id);
  if (filters?.user_email) params.set("user_email", filters.user_email);
  if (filters?.title) params.set("title", filters.title);
  if (filters?.file_name) params.set("file_name", filters.file_name);
  if (filters?.file_type) params.set("file_type", filters.file_type);

  return apiGet<ReportsPaginatedResponse>(
    `/reports/?${params.toString()}`,
    { headers, next: { revalidate: 0 } }
  );
}

export async function updateReport(
  reportId: string,
  body: UpdateReportPayload,
  headers: Record<string, string>
): Promise<Report> {
  return apiPatch<Report>(`/reports/${reportId}`, body, { headers });
}

export async function deleteReport(
  reportId: string,
  headers: Record<string, string>
): Promise<void> {
  return apiDelete(`/reports/${reportId}`, { headers });
}

export async function uploadReport(
  formData: FormData,
  headers: Record<string, string>
): Promise<Report> {
  return apiUpload<Report>("/reports/", formData, { headers });
}
