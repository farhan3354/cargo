import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const trackingNumber = searchParams.get('trackingNumber')

  if (!trackingNumber) {
    return NextResponse.json(
      { error: 'Tracking number is required' },
      { status: 400 }
    )
  }

  // Simulate tracking data - replace with actual database query
  // This is a mock response for demonstration
  const mockTrackingData = {
    trackingNumber: trackingNumber,
    status: 'In Transit',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    estimatedDelivery: '2024-01-18',
    steps: [
      { status: 'Order Placed', date: '2024-01-15 09:30', completed: true },
      { status: 'Package Picked Up', date: '2024-01-15 14:20', completed: true },
      { status: 'In Transit', date: '2024-01-16 08:15', completed: true },
      { status: 'Out for Delivery', date: '2024-01-17 07:00', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false },
    ],
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json(mockTrackingData)
}
