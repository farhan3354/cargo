import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Simulate saving to database or sending email
    // In production, you would:
    // 1. Save to database using Prisma
    // 2. Send email notification to admin
    // 3. Send confirmation email to user

    await new Promise(resolve => setTimeout(resolve, 500))

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
