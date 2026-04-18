// Booking types and utility functions for The Pause

export interface BookingPayload {
  name: string
  email: string
  phone: string
  sessionType: 'online' | 'offline'
  therapistId: string // therapist name or 'auto'
  date: string        // YYYY-MM-DD
  time: string        // HH:MM
  concern: string
  message?: string
  payment_status?: string // 'pending', 'cash_pending', 'paid'
  // Optional Razorpay payment fields
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
}

export interface BookingResponse {
  success: boolean
  referenceId?: string
  error?: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface TherapistOption {
  id: string
  name: string
  role: string
  speciality: string
  initial: string
  color: string
}

// Validate email format
export function validateEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim())
}

// Validate phone: exactly 10 digits, optional +91 prefix
export function validatePhone(str: string): boolean {
  const cleaned = str.trim().replace(/^\+91/, '').replace(/\s/g, '')
  return /^\d{10}$/.test(cleaned)
}

// Generate a unique booking reference ID
export function generateReferenceId(): string {
  const ts = Date.now()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const rand = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `PAUSE-${ts}-${rand}`
}

// Generate next `days` dates starting from tomorrow
export function generateDateRange(today: Date, days: number): Date[] {
  const result: Date[] = []
  for (let i = 1; i <= days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    d.setHours(0, 0, 0, 0)
    result.push(d)
  }
  return result
}

// Generate time slots for a given session type and date
// In-person: 09:00–19:00, closed Sundays
// Online: 08:00–21:00, open every day
export function generateSlots(sessionType: 'online' | 'offline', date: Date): TimeSlot[] {
  // Sundays (0) are closed for in-person
  if (sessionType === 'offline' && date.getDay() === 0) {
    return []
  }

  const [startHour, endHour] = sessionType === 'online' ? [8, 21] : [9, 19]
  const slots: TimeSlot[] = []

  for (let h = startHour; h < endHour; h++) {
    for (const m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      slots.push({ time, available: true })
    }
  }

  return slots
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

// Format date to YYYY-MM-DD
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}
