import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json()

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const order = await createRazorpayOrder(amount)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Failed to create Razorpay order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
