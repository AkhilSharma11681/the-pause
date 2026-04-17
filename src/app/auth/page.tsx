'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function sendMagicLink() {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

        <div className="flex gap-1 mb-8">
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
        </div>

        {!sent ? (
          <>
            <h1 className="font-display text-3xl text-[#1a1a1a] mb-2">Welcome</h1>
            <p className="text-[#6b7280] text-sm font-light mb-8">
              Enter your email and we&apos;ll send you a secure login link.
            </p>
            <div className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMagicLink()}
                  type="email"
                  placeholder="you@email.com"
                  className="w-full bg-[#faf7f2] border border-[#f0ebe3] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button onClick={sendMagicLink} disabled={loading || !email.trim()}
                className="w-full py-4 rounded-full bg-[#4a7c59] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3d6649] disabled:opacity-50 transition-all">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send login link <ArrowRight size={18} /></>}
              </button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#e8f4ec] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-[#4a7c59]" />
            </div>
            <h2 className="font-display text-2xl text-[#1a1a1a] mb-3">Check your email</h2>
            <p className="text-[#6b7280] text-sm font-light leading-relaxed mb-6">
              We sent a login link to <strong>{email}</strong>. Click it to access your portal.
            </p>
            <button onClick={() => setSent(false)} className="text-sm text-[#4a7c59] hover:underline">
              Use a different email
            </button>
          </motion.div>
        )}

        <p className="text-center text-xs text-[#9ca3af] mt-8">
          Doctor? <a href="/admin/login" className="text-[#4a7c59] font-medium">Sign in here</a>
        </p>
      </motion.div>
    </div>
  )
}
