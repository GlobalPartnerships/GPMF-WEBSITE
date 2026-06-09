import "server-only";

import { apiGet } from "./client";
import type { Order, OrdersFilters, OrdersPaginatedResponse } from "@/app/components/dashboard/admin/sales/types";

export async function getOrders(
  headers: Record<string, string>,
  filters?: OrdersFilters
): Promise<Order[]> {
  const params = new URLSearchParams();
  if (filters?.order_id) params.set("order_id", filters.order_id);
  if (filters?.user_name) params.set("user_name", filters.user_name);
  if (filters?.user_email) params.set("user_email", filters.user_email);
  if (filters?.date_from) params.set("date_from", `${filters.date_from}T00:00:00`);
  if (filters?.date_to) params.set("date_to", `${filters.date_to}T23:59:59`);
  if (filters?.amount_min) params.set("amount_min", filters.amount_min);
  if (filters?.amount_max) params.set("amount_max", filters.amount_max);

  const qs = params.toString();
  const res = await apiGet<OrdersPaginatedResponse>(
    qs ? `/orders/?${qs}` : "/orders/",
    { headers, next: { revalidate: 0 } }
  );
  return res.data;
}
