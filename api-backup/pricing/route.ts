import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const weight = parseFloat(searchParams.get('weight') || '1')
  const type = searchParams.get('type') || 'domestic'

  if (!weight || weight <= 0) {
    return NextResponse.json(
      { error: 'Valid weight is required' },
      { status: 400 }
    )
  }

  // Calculate price based on weight and type
  let baseRate = 0
  let weightRate = 0

  if (type === 'domestic') {
    baseRate = 8 // base rate for domestic
    weightRate = 4 // per kg
  } else {
    baseRate = 25 // base rate for international
    weightRate = 35 // per kg
  }

  const totalPrice = baseRate + (weight * weightRate)

  // Return pricing details
  return NextResponse.json({
    weight: weight,
    type: type,
    baseRate: baseRate,
    weightRate: weightRate,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    currency: 'USD',
  })
}
