"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createInvitation, deleteInvitation } from "@/lib/api/invitations";
import type {
  CreateInvitationPayload,
  ActionResult,
} from "@/app/components/dashboard/admin/invitations/types";

export async function createInvitationAction(
  payload: CreateInvitationPayload
): Promise<ActionResult> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    const invitation = await createInvitation(payload, headers);
    revalidatePath("/[lang]/(dashboard)/admin/users", "page");
    return { success: true, data: invitation };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create invitation",
    };
  }
}

export async function deleteInvitationAction(
  id: string
): Promise<ActionResult<void>> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, error: "Unauthorized" };

    await deleteInvitation(id, headers);
    revalidatePath("/[lang]/(dashboard)/admin/users", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete invitation",
    };
  }
}

async function getAuthHeaders(): Promise<Record<string, string> | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;
  return { Authorization: `Bearer ${session.access_token}` };
}
