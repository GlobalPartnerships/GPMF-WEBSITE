import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
