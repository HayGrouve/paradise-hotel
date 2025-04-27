// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if the pathname has a file extension (e.g., .jpg, .png)
  if (/\.(.*)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Skip if the pathname is for API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Skip if the pathname is for _next (Next.js internal routes)
  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Only redirect if the pathname is exactly '/' or doesn't have a locale
  if (pathname === "/" || !pathnameHasLocale) {
    // Redirect to the default locale
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
