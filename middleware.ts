import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  if (req) return NextResponse.next()
}
export const config = {
  matcher: ['/home', '/api/:path*'],
}
