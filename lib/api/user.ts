import "server-only";
import { apiGet } from "./client";
import type { Session } from "@supabase/supabase-js";
import type { AppUser } from "@/app/context/UserContext";

export async function fetchAppUser(session: Session): Promise<AppUser | null> {
  try {
    return await apiGet<AppUser>(`/users/${session.user.id}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  } catch {
    return null;
  }
}
