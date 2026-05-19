import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiPost } from "@/lib/api/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.refresh_token) {
    await apiPost("/auth/logout", { refresh_token: session.refresh_token }).catch(() => {});
  }

  await supabase.auth.signOut();

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/${lang}/login`, { status: 302 });
}
