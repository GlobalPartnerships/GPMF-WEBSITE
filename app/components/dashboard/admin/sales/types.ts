export interface BillingType {
  id: string;
  name: string;
  description: string;
}

export interface PlanFeature {
  id: string;
  item: string;
  plan_id: string;
}

export interface OrderPlan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  base_price: number;
  billing_type: BillingType;
  billing_type_id: string;
  created_at: string;
  features: PlanFeature[];
  icon_url: string | null;
  is_active: boolean;
  meetings_per_month: number;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  role_id: string;
  created_at: string;
  profile_image_url: string | null;
}

export type OrderStatus = "pending" | "completed" | "failed";

export interface OrdersPaginatedResponse {
  data: Order[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface OrdersFilters {
  order_id?: string;
  user_name?: string;
  user_email?: string;
  date_from?: string;
  date_to?: string;
  amount_min?: string;
  amount_max?: string;
}

export interface Order {
  id: string;
  user_id: string;
  plan_id: string;
  status: OrderStatus;
  total_price: number | null;
  currency: string;
  created_at: string | null;
  plan: OrderPlan | null;
  user: OrderUser | null;
  payment_provider_name: string | null;
  provider_order_id: string | null;
  provider_capture_id: string | null;
  receipt_url: string | null;
}
