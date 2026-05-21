import "server-only";

import { apiGet } from "./client";
import type { Order } from "@/app/components/dashboard/admin/sales/types";

export async function getOrders(
  headers: Record<string, string>
): Promise<Order[]> {
  return apiGet<Order[]>("/orders/", { headers, next: { revalidate: 0 } });
}
