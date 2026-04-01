import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Auth is fully client-side (Zustand + localStorage). The server has no access
// to the token, so all route protection is handled by AuthGuard on the client.
export function proxy(_req: NextRequest) {
  return NextResponse.next()
}
