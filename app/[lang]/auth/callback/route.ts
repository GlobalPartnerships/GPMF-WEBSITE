import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

  const redirectTo = `${origin}/${lang}/user`;
  const response = NextResponse.redirect(redirectTo);

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
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  
  // console.log("[callback] exchange error:", error?.message ?? "none");
  // console.log("[callback] response cookies:", response.cookies.getAll().map(c => c.name));
  // console.log("[callback] redirecting to:", redirectTo);

  if (error) {
    return NextResponse.redirect(`${origin}/${lang}/login?error=auth_failed`);
  }

  return response;
}
