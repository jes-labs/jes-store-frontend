import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_PATHS = ['/login', '/register', '/forgot-password', '/reset-password']
const PROTECTED_PREFIXES = ['/dashboard', '/admin']

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('jesstore-token')?.value

  // Redirect authenticated users away from auth pages (except reset-password)
  // We allow reset-password to handle its own token validation
  if (AUTH_PATHS.some(p => pathname === p) && token && pathname !== '/reset-password') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Protect dashboard and admin routes
  if (PROTECTED_PREFIXES.some(p => pathname.startsWith(p)) && !token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)  // preserve intended URL
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register', '/forgot-password', '/reset-password'],
}
