import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: Implement password reset flow
    // This should:
    // 1. Check if user exists
    // 2. Generate reset token with expiry (15 mins)
    // 3. Store token in database or cache
    // 4. Send email with reset link
    // For now, returning mock response

    return NextResponse.json({
      status: 'success',
      message: 'Password reset email sent',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
