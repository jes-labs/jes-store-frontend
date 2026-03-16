import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { businessName, email, password } = await request.json()

    // Validate input
    if (!businessName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // TODO: Implement actual registration
    // This should:
    // 1. Check if user exists
    // 2. Hash password with bcrypt
    // 3. Create user in database
    // 4. Create store record
    // For now, returning mock response

    const user = {
      id: '1',
      email,
      businessName,
    }

    const response = NextResponse.json({
      status: 'success',
      message: 'Account created successfully',
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
