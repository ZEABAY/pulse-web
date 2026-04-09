import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('pulse.access_token')?.value;

    const localeMatch = pathname.match(/^\/(en|tr)(\/.*)?$/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    
    // Exact path ignoring the locale
    const pathAfterLocale = localeMatch && localeMatch[2] ? localeMatch[2] : pathname;

    // Define Route Behaviors
    const isAuthPage = ['/login', '/register', '/verify'].includes(pathAfterLocale) || pathname === '/';
    const isProtectedRoute = pathAfterLocale.startsWith('/test');

    let response: NextResponse;

    // Rule 1: If user HAS token, but visits an auth page, kick them to dashboard/test.
    if (isAuthPage && token) {
        response = NextResponse.redirect(new URL(`/${locale}/test`, req.url));
    }
    // Rule 2: If user DOES NOT have token and visits protected page, kick them to login.
    else if (isProtectedRoute && !token) {
        response = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
    // Rule 3: Allow everything else to go through next-intl translation interceptor
    else {
        response = intlMiddleware(req);
    }

    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
  matcher: [
    '/',
    '/(tr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)' 
  ]
};
