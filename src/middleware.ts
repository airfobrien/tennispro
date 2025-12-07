import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/i18n/config';
import { authConfig } from '@/lib/auth/config';

// Create i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only add locale prefix for non-default locales
});

// Create auth middleware
const { auth } = NextAuth(authConfig);

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/auth/login',
  '/auth/signup',
  '/auth/error',
  '/studio',
];

// Check if path is public
function isPublicPath(pathname: string): boolean {
  // Remove locale prefix for checking
  const pathWithoutLocale = locales.reduce(
    (path, locale) => path.replace(`/${locale}`, ''),
    pathname
  );

  return publicPaths.some(
    (publicPath) =>
      pathWithoutLocale === publicPath ||
      pathWithoutLocale.startsWith(`${publicPath}/`)
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // For protected routes, check auth
  if (!isPublicPath(pathname)) {
    const session = await auth();
    if (!session) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return Response.redirect(loginUrl);
    }
  }

  // Only apply i18n middleware for coach profile routes (which have [locale])
  if (pathname.match(/^\/(en|es|fr|pt)\/coach\//)) {
    return intlMiddleware(request);
  }

  // For all other routes, continue without i18n processing
  return;
}

export const config = {
  // Match all routes except static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|screenshots/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
