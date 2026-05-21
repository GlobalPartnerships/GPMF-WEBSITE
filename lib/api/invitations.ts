import "server-only";

import { apiGet, apiPost, apiDelete } from "./client";
import type { Invitation, CreateInvitationPayload } from "@/app/components/dashboard/admin/invitations/types";

export function getInvitations(
  headers: Record<string, string>
): Promise<Invitation[]> {
  return apiGet<Invitation[]>("/invitations/", {
    headers,
    next: { revalidate: 0 },
  });
}

export function createInvitation(
  payload: CreateInvitationPayload,
  headers: Record<string, string>
): Promise<Invitation> {
  return apiPost<Invitation>("/invitations/", payload, { headers });
}

export function deleteInvitation(
  id: string,
  headers: Record<string, string>
): Promise<void> {
  return apiDelete(`/invitations/${id}`, { headers });
}
