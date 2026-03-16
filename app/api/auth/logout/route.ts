import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({
    status: 'success',
    message: 'Logged out successfully',
  })

  // Clear the session cookie
  response.cookies.set('jesstore-token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })

  return response
}
