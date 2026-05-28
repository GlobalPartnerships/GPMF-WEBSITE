import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { fetchAppUser } from "@/lib/api/user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("[callback] code:", code ? "present" : "missing");
  console.log("[callback] cookies received:", request.cookies.getAll().map(c => c.name));

  if (!code) {
    return NextResponse.redirect(`${origin}/${lang}/login?error=no_code`);
  }

  const cookieStore: { name: string; value: string; options: Record<string, unknown> }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          console.log("[callback] setting cookies:", cookiesToSet.map(c => c.name));
          cookieStore.length = 0;
          cookiesToSet.forEach((cookie) => cookieStore.push(cookie));
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/${lang}/login?error=auth_failed`);
  }

  let redirectPath = `/${lang}/user`;

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const user = await fetchAppUser(session);
    if (user && (user.role === "admin" || user.role === "moderator")) {
      redirectPath = `/${lang}/admin`;
    }
  }

  const response = NextResponse.redirect(`${origin}${redirectPath}`);
  cookieStore.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  return response;
}
