export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role_id: string;
  role: string | null;
  profile_image_url: string | null;
  created_at: string | null;
}

export interface TopSpenderResponse {
  user: User;
  total_spent: number;
  order_count: number;
  currency: string;
  last_purchase: string;
}

export type LatestUserResponse = User;

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface UsersPaginatedResponse {
  data: User[];
  meta: PaginationMeta;
}

export interface UsersByPeriodResponse {
  data: User[];
  meta: PaginationMeta & { from: string; to: string };
}
