import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Implement actual authentication
    // This should verify credentials against your database
    // For now, returning mock response
    
    const user = {
      id: '1',
      email,
      businessName: 'Demo Business',
      role: email === 'admin@jesstore.com' ? 'admin' : 'owner',
    }

    const response = NextResponse.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      },
    })

    // Set cookie for middleware
    response.cookies.set('jesstore-token', 'mock-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
