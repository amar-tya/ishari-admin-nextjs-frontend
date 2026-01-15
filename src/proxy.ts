import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes yang tidak memerlukan authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Routes yang memerlukan authentication
const protectedRoutePatterns = ["/dashboard", "/settings", "/profile"];

/**
 * Check apakah path termasuk public route
 */
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Check apakah path termasuk protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutePatterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy untuk static files dan API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Cek access token dari cookies
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = !!accessToken;

  // Jika mengakses public route (login) tapi sudah authenticated
  if (isPublicRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika mengakses protected route tapi belum authenticated
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
