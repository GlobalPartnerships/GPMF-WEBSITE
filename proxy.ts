import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocale, getLocaleFromPath } from "./proxy/locale";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const detectedLocale = getLocale(request);
    request.nextUrl.pathname = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)).*)",
  ],
};
