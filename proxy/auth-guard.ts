import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/user", "/admin"];

export function createSupabaseClient(request: NextRequest, response: NextResponse) {
  // console.log all the cookies

  console.log("Request cookies:");
  request.cookies.getAll().forEach((cookie) => {
    console.log(`- ${cookie.name}: ${cookie.value}`);
  });

  console.log("Response cookies:");
  response.cookies.getAll().forEach((cookie) => {
    console.log(`- ${cookie.name}: ${cookie.value}`);
  });

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

export function isProtectedPath(pathAfterLocale: string): boolean {
  return protectedPaths.some(
    (p) => pathAfterLocale.startsWith(p + "/") || pathAfterLocale === p
  );
}
