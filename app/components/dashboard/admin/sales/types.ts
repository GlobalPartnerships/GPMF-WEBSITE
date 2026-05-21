export interface OrderPlan {
  id: string;
  name: string;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  profile_image_url: string | null;
}

export type OrderStatus = "pending" | "completed" | "failed";

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
}
