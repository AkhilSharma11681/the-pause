import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (code || token_hash) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(`${origin}/portal`)
  }

  return NextResponse.redirect(`${origin}/auth?error=invalid_link`)
}
