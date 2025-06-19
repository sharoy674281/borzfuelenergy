import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only check admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get user info from cookies (Payload stores auth in cookies)
    const cookies = request.cookies
    const payloadToken = cookies.get('payload-token')
    
    // If no auth token, let Payload handle the redirect to login
    if (!payloadToken) {
      return NextResponse.next()
    }

    // For now, we'll let Payload handle the user role checking
    // This is a simple protection - the real security is in the collection access rules
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
