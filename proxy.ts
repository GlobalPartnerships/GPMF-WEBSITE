import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocale, getLocaleFromPath, getPathAfterLocale } from "./proxy/locale";
import { createSupabaseClient, isProtectedPath } from "./proxy/auth-guard";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const detectedLocale = getLocale(request);
    request.nextUrl.pathname = `/${detectedLocale}/${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathAfterLocale = getPathAfterLocale(pathname, locale);

  if (pathAfterLocale.startsWith("/auth/callback")) {
    return NextResponse.next({ request });
  }

  const response = NextResponse.next({ request });
  const supabase = createSupabaseClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();

  console.log(`[proxy] path: ${pathAfterLocale}, user: ${user?.email ?? "none"}, cookies: ${request.cookies.getAll().map(c => c.name).join(", ")}`);

  if (isProtectedPath(pathAfterLocale) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (pathAfterLocale === "/login" && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = `/${locale}/user`;
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)).*)",
  ],
};
