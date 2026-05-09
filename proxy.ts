import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const locales = ["es", "en", "fr", "de"] as const;
const defaultLocale = "es";

const protectedPaths = ["/user"];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, locales as unknown as string[], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

function getLocaleFromPath(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

function getPathAfterLocale(pathname: string, locale: string): string {
  return pathname.slice(`/${locale}`.length) || "/";
}

function createSupabaseClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}

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

  const isProtected = protectedPaths.some(
    (p) => pathAfterLocale.startsWith(p + "/") || pathAfterLocale === p
  );

  if (isProtected && !user) {
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
