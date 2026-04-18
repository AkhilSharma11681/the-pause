import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'

// ONE-TIME USE: Seeds the doctor account in Supabase Auth + doctors table
// DELETE THIS FILE after running it once
export async function GET() {
  const admin = getAdminClient()

  const DOCTOR_EMAIL = 'doctor@thepause.in'
  const DOCTOR_PASSWORD = 'ThePause@123'

  try {
    // 1. Create auth user (auto-confirm email so no verification needed)
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email: DOCTOR_EMAIL,
      password: DOCTOR_PASSWORD,
      email_confirm: true,
    })

    if (authError && !authError.message.includes('already been registered')) {
      return NextResponse.json({ success: false, step: 'auth', error: authError.message }, { status: 500 })
    }

    const userId = authData?.user?.id

    // 2. Check if doctor record already exists in doctors table
    const { data: existing } = await admin
      .from('doctors')
      .select('id')
      .eq('email', DOCTOR_EMAIL)
      .single()

    if (!existing && userId) {
      // 3. Insert into doctors table
      const { error: doctorError } = await admin.from('doctors').insert({
        user_id: userId,
        name: 'Dr. Admin',
        email: DOCTOR_EMAIL,
        role: 'doctor',
        speciality: 'General Therapy',
      })

      if (doctorError) {
        return NextResponse.json({ success: false, step: 'doctors_table', error: doctorError.message }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Doctor account is ready. You can now log in.',
      email: DOCTOR_EMAIL,
      password: DOCTOR_PASSWORD,
      next: 'Go to /admin/login and sign in. Then DELETE this file.',
    })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
