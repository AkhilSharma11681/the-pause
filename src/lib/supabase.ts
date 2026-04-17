import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client (uses service role — never expose to browser)
export function getAdminClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

export type Database = {
  patients: {
    id: string
    name: string
    email: string
    phone: string
    created_at: string
  }
  bookings: {
    id: string
    patient_id: string
    therapist_id: string
    session_type: 'online' | 'offline'
    date: string
    time: string
    concern: string
    message: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    reference_id: string
    created_at: string
  }
  session_notes: {
    id: string
    booking_id: string
    patient_id: string
    doctor_id: string
    note_text: string
    image_url: string | null
    created_at: string
  }
  ai_reports: {
    id: string
    patient_id: string
    booking_id: string | null
    concerns: string
    report_html: string
    created_at: string
  }
}
