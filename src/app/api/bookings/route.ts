import { NextRequest, NextResponse } from 'next/server'
import { validateEmail, validatePhone, generateReferenceId, BookingPayload } from '@/lib/booking'
import { getAdminClient } from '@/lib/supabase'
import { verifyPaymentSignature } from '@/lib/razorpay'

const REQUIRED_FIELDS: (keyof BookingPayload)[] = [
  'name', 'email', 'phone', 'sessionType', 'date', 'time', 'concern'
]

// Rate limiting: in-memory store
// Structure: { ip: { count: number, resetAt: number } }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3 // max requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetAt) {
    // No record or expired - create new
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false // Rate limit exceeded
  }
  
  // Increment count
  record.count++
  return true
}

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) {
      rateLimitStore.delete(ip)
    }
  }
}, 10 * 60 * 1000)

// Send confirmation email via Resend
// To enable: add RESEND_API_KEY to your .env.local
async function sendConfirmationEmail(booking: BookingPayload, referenceId: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return // silently skip if not configured

  const sessionLabel = booking.sessionType === 'online' ? 'Online (Video/Chat)' : 'In-Person (Sonipat Clinic)'
  const isCashPayment = booking.payment_status === 'cash_pending'
  const sessionPrice = 1500

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'The Pause <noreply@thepause.in>',
      to: booking.email,
      subject: `Your session is booked — Ref: ${referenceId}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <div style="display: flex; gap: 6px; margin-bottom: 32px;">
            <div style="width: 8px; height: 32px; background: #4a7c59; border-radius: 4px;"></div>
            <div style="width: 8px; height: 32px; background: #4a7c59; border-radius: 4px;"></div>
          </div>
          <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 8px;">You&apos;re booked, ${booking.name.split(' ')[0]}.</h1>
          <p style="color: #6b7280; font-size: 16px; margin-bottom: 32px; line-height: 1.6;">
            We&apos;ve received your request and will confirm your session shortly via WhatsApp.
          </p>
          <div style="background: #f5f0e8; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Reference</td><td style="padding: 8px 0; font-weight: 600; color: #4a7c59;">${referenceId}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Session Type</td><td style="padding: 8px 0;">${sessionLabel}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Date</td><td style="padding: 8px 0;">${booking.date}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Time</td><td style="padding: 8px 0;">${booking.time}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Concern</td><td style="padding: 8px 0;">${booking.concern}</td></tr>
            </table>
          </div>
          ${isCashPayment ? `
          <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: center;">
            <p style="font-size: 18px; font-weight: 600; color: #856404; margin-bottom: 8px;">💵 Payment Due at Clinic</p>
            <p style="font-size: 24px; font-weight: bold; color: #1a1a1a; margin-bottom: 8px;">₹${sessionPrice}</p>
            <p style="font-size: 14px; color: #856404;">Please bring cash payment to your session</p>
          </div>
          ` : ''}
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            Need to reschedule? WhatsApp us at <a href="https://wa.me/919152987821" style="color: #4a7c59;">+91 9152987821</a> at least 6 hours before your session.
          </p>
          <div style="margin-top: 24px; padding: 20px; background: #f5f0e8; border-radius: 16px; text-align: center;">
            <p style="color: #1a1a1a; font-family: sans-serif; font-size: 14px; margin-bottom: 12px;">View your bookings and session history anytime</p>
            <a href="https://thepause.in/auth" style="display:inline-block; background:#4a7c59; color:white; padding:10px 24px; border-radius:50px; text-decoration:none; font-family:sans-serif; font-weight:600; font-size:14px;">
              My Patient Portal →
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #f0ebe3; margin: 32px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">© 2026 The Pause · Sector 15, Sonipat · Care that breathes.</p>
        </div>
      `,
    }),
  })
}

// Save booking to Google Sheets via webhook
// To enable: add SHEETS_WEBHOOK_URL to your .env.local
// Use Google Apps Script or Make.com to create the webhook
async function saveToSheets(booking: BookingPayload, referenceId: string) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referenceId,
      timestamp: new Date().toISOString(),
      ...booking,
    }),
  }).catch(() => {}) // don't fail the booking if sheets is down
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json() as Partial<BookingPayload>

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    if (!validateEmail(body.email!)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
    }

    if (!validatePhone(body.phone!)) {
      return NextResponse.json({ success: false, error: 'Phone must be a 10-digit number' }, { status: 400 })
    }

    if (!['online', 'offline'].includes(body.sessionType!)) {
      return NextResponse.json({ success: false, error: 'sessionType must be online or offline' }, { status: 400 })
    }

    // Payment signature verification (if payment data is provided)
    // This is optional for now - when Razorpay is integrated, make it required
    if (body.razorpay_order_id && body.razorpay_payment_id && body.razorpay_signature) {
      const secret = process.env.RAZORPAY_KEY_SECRET
      
      if (!secret) {
        return NextResponse.json(
          { success: false, error: 'Payment verification not configured' },
          { status: 500 }
        )
      }

      const isValid = verifyPaymentSignature(
        body.razorpay_order_id,
        body.razorpay_payment_id,
        body.razorpay_signature,
        secret
      )

      if (!isValid) {
        console.error('Invalid payment signature detected', {
          orderId: body.razorpay_order_id,
          paymentId: body.razorpay_payment_id,
        })
        return NextResponse.json(
          { success: false, error: 'Payment verification failed. Please contact support.' },
          { status: 400 }
        )
      }
    }

    const referenceId = generateReferenceId()
    const booking = body as BookingPayload

    console.log(`[${new Date().toISOString()}] New booking — Ref: ${referenceId}`, {
      name: booking.name,
      sessionType: booking.sessionType,
      date: booking.date,
      time: booking.time,
    })

    // === SAVE TO SUPABASE DATABASE ===
    const admin = getAdminClient()

    // 1. Check if patient exists, if not create one
    let patientId: string
    const { data: existingPatient } = await admin
      .from('patients')
      .select('id')
      .eq('email', booking.email)
      .single()

    if (existingPatient) {
      patientId = existingPatient.id
    } else {
      // Create new patient
      const { data: newPatient, error: patientError } = await admin
        .from('patients')
        .insert({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
        })
        .select('id')
        .single()

      if (patientError || !newPatient) {
        console.error('Failed to create patient:', patientError)
        return NextResponse.json(
          { success: false, error: 'Failed to create patient record' },
          { status: 500 }
        )
      }
      patientId = newPatient.id
    }

    // 2. Get doctor ID (if "auto", pick first available doctor)
    let doctorId: string | null = null
    if (booking.therapistId && booking.therapistId !== 'auto') {
      // Try to find doctor by the therapist ID from the form
      const { data: doctor } = await admin
        .from('doctors')
        .select('id')
        .eq('id', booking.therapistId)
        .single()
      
      if (doctor) {
        doctorId = doctor.id
      }
    }

    // If still no doctor (auto or not found), pick first available
    if (!doctorId) {
      const { data: firstDoctor } = await admin
        .from('doctors')
        .select('id')
        .limit(1)
        .single()
      
      if (firstDoctor) {
        doctorId = firstDoctor.id
      }
      // If no doctors exist, leave as null (will be assigned later)
    }

    // 3. Check if slot is already taken (duplicate booking prevention)
    if (doctorId) {
      const { data: existingBooking } = await admin
        .from('bookings')
        .select('id')
        .eq('doctor_id', doctorId)
        .eq('date', booking.date)
        .eq('time', booking.time)
        .neq('status', 'cancelled')
        .single()
      
      if (existingBooking) {
        return NextResponse.json(
          { success: false, error: 'This slot is already booked. Please choose another time.' },
          { status: 400 }
        )
      }
    }

    // 4. Insert booking into database
    const { data: savedBooking, error: bookingError } = await admin
      .from('bookings')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        session_type: booking.sessionType,
        date: booking.date,
        time: booking.time,
        concern: booking.concern,
        message: booking.message || null,
        status: 'pending',
        reference_id: referenceId,
        payment_status: booking.payment_status || 'pending',
      })
      .select('id')
      .single()

    if (bookingError || !savedBooking) {
      console.error('Failed to save booking:', bookingError)
      return NextResponse.json(
        { success: false, error: 'Failed to save booking' },
        { status: 500 }
      )
    }

    console.log(`✅ Booking saved to database — ID: ${savedBooking.id}, Patient: ${patientId}`)

    // Fire and forget — don't block the response
    sendConfirmationEmail(booking, referenceId).catch(console.error)
    saveToSheets(booking, referenceId).catch(console.error)

    return NextResponse.json({ 
      success: true, 
      referenceId,
      bookingId: savedBooking.id 
    }, { status: 200 })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }
}
