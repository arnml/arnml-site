import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

const API_RATE_LIMIT = 10
const API_RATE_WINDOW_MS = 60_000

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const forwardedFor = request.headers.get('x-forwarded-for') || ''
  const ip =
    forwardedFor.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  // Rate limit all API routes (all methods) to reduce abuse/cost spikes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rate = rateLimit(`api:${ip}`, API_RATE_LIMIT, API_RATE_WINDOW_MS)

    if (!rate.ok) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((rate.resetAt - Date.now()) / 1000)
      )
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(API_RATE_LIMIT),
            'X-RateLimit-Remaining': String(rate.remaining),
            'X-RateLimit-Reset': String(rate.resetAt),
          },
        }
      )
    }
  }

  // Get session from cookies
  const sessionCookie = request.cookies.get('arnml_admin_session')?.value

  // For proxy, we'll do a simple check - actual validation happens in getSession()
  const isAuthenticated = !!sessionCookie

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /api/admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
