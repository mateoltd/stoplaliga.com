import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

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

  // 1. Check if pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Path already has locale prefix, continue normally
    const currentLocale = pathname.split('/')[1] || defaultLocale;
    const response = NextResponse.next();
    response.headers.set('x-language', currentLocale);
    return response;
  }

  // 2. Handle paths without locale prefix
  const preferredLocale = getLocale(request);
  
  const rewriteUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set('x-language', preferredLocale);
  
  response.headers.set('Vary', 'Accept-Language');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|api|static|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)',
    '/',
  ],
}; 