import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";

export const locales = ["es", "en", "fr", "de"] as const;
export const defaultLocale = "es";

export function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, locales as unknown as string[], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function getLocaleFromPath(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

export function getPathAfterLocale(pathname: string, locale: string): string {
  return pathname.slice(`/${locale}`.length) || "/";
}
