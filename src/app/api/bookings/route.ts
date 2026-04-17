import { NextRequest, NextResponse } from 'next/server'
import { validateEmail, validatePhone, generateReferenceId, BookingPayload } from '@/lib/booking'

const REQUIRED_FIELDS: (keyof BookingPayload)[] = [
  'name', 'email', 'phone', 'sessionType', 'date', 'time', 'concern'
]

// Send confirmation email via Resend
// To enable: add RESEND_API_KEY to your .env.local
async function sendConfirmationEmail(booking: BookingPayload, referenceId: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return // silently skip if not configured

  const sessionLabel = booking.sessionType === 'online' ? 'Online (Video/Chat)' : 'In-Person (Sonipat Clinic)'

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
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            Need to reschedule? WhatsApp us at <a href="https://wa.me/919152987821" style="color: #4a7c59;">+91 9152987821</a> at least 6 hours before your session.
          </p>
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

    const referenceId = generateReferenceId()
    const booking = body as BookingPayload

    console.log(`[${new Date().toISOString()}] New booking — Ref: ${referenceId}`, {
      name: booking.name,
      sessionType: booking.sessionType,
      date: booking.date,
      time: booking.time,
    })

    // Fire and forget — don't block the response
    sendConfirmationEmail(booking, referenceId).catch(console.error)
    saveToSheets(booking, referenceId).catch(console.error)

    return NextResponse.json({ success: true, referenceId }, { status: 200 })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }
}
