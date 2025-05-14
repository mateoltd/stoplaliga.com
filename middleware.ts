import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Define supported locales (Spanish as primary, English as secondary)
export const locales = ['es', 'en'];
export const defaultLocale = 'es';

// This function gets the preferred locale from the request headers
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the preferred locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next(); // Prepare a response object early

  // 1. Check if pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const currentLocale = pathname.split('/')[1] || defaultLocale;
    response.headers.set('x-language', currentLocale);
    return response; // Continue without redirect
  }

  // 2. Handle the root path explicitly for SEO and default content
  const preferredLocale = getLocale(request);
  response.headers.set('x-language', preferredLocale);

  if (pathname === '/') {
    if (preferredLocale === defaultLocale) {
      // Serve default locale content directly at root, no redirect needed
      // The `x-language` header is set for RootLayout
      return response;
    } else {
      // Redirect to preferred non-default locale path
      request.nextUrl.pathname = `/${preferredLocale}`;
      return NextResponse.redirect(request.nextUrl);
    }
  }
  
  // 3. Redirect other paths that are missing a locale prefix
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static, public files like favicon.ico)
    '/((?!_next|api|static|.*\\..*|favicon.ico).*)',
    // Include the root path explicitly if not covered by the above
    '/',
  ],
}; 