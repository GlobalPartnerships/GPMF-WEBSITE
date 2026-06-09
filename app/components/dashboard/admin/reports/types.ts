export interface Report {
  id: string;
  user_id: string;
  purchased_plan_id: string | null;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  user_email: string | null;
}

export interface ReportsPaginatedResponse {
  data: Report[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ReportsFilters {
  user_id?: string;
  user_email?: string;
  title?: string;
  file_name?: string;
  file_type?: string;
}

export interface UpdateReportPayload {
  title?: string;
  description?: string;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
