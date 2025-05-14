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
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Get the locale from URL path
    const locale = pathname.split('/')[1];
    
    // Clone the response to add our headers
    const response = NextResponse.next();
    
    // Set HTML language attribute via x-middleware-request-header
    response.headers.set('x-language', locale);
    
    return response;
  }

  // Redirect if there is no locale prefix
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // When redirecting, also set the language header
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set('x-language', locale);
  
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 