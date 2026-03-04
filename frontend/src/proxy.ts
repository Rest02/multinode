import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add the routes that you want to protect here
const protectedRoutes = ['/', '/notas'];
// Add the routes that you want users to avoiding visiting if already logged in
const publicRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
    const token = request.cookies.get('multinode_token')?.value;
    const path = request.nextUrl.pathname;

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.includes(path) || path.startsWith('/notas');

    // Check if the current route is public (auth pages)
    const isPublicRoute = publicRoutes.includes(path);

    if (isProtectedRoute && !token) {
        // Redirect unauthenticated users to the login page
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isPublicRoute && token) {
        // Redirect authenticated users away from the login/register pages
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Continue the request if all checks pass
    return NextResponse.next();
}

// Ensure the middleware runs on relevant paths. 
// We exclude api paths, statically generated files, image optimization files and favicon.
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
