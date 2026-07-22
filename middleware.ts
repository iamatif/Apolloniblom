import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server'; // Import types
import { localePrefix, locales } from './navigation';
export default function middleware(req:NextRequest) {
  // Handle the localization middleware
  const localeMiddleware = createMiddleware({
    localeDetection: false,
    defaultLocale: 'en',
    locales,
    localePrefix
  });

  // Run the locale middleware first
  const localeResponse = localeMiddleware(req);


  // Return the response (either the locale check or the next response after auth check)
  return localeResponse || NextResponse.next();
}

export const config = {
  // Skip paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
