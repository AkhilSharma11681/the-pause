import crypto from 'crypto'

/**
 * Verify Razorpay payment signature
 * This ensures the payment callback is authentic and not tampered with
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  try {
    const text = `${orderId}|${paymentId}`
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex')
    
    return generatedSignature === signature
  } catch (error) {
    console.error('Payment signature verification error:', error)
    return false
  }
}

/**
 * Create Razorpay order
 * This should be called before showing the payment UI
 */
export async function createRazorpayOrder(amount: number, currency = 'INR') {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured')
  }

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create Razorpay order')
  }

  return await response.json()
}
