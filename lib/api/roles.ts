import "server-only";

import { apiGet } from "./client";
import type { Role } from "@/app/components/dashboard/admin/invitations/types";

export function getRoles(
  headers: Record<string, string>
): Promise<Role[]> {
  return apiGet<Role[]>("/users/roles", {
    headers,
    next: { revalidate: 0 },
  });
}
