'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Mail, Phone, ArrowRight, Loader2 } from 'lucide-react'

export default function AuthPage() {
  const [mode, setMode] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function sendOTP() {
    setLoading(true)
    setError('')
    try {
      if (mode === 'email') {
        const { error } = await supabase.auth.signInWithOtp({ email })
        if (error) throw error
      } else {
        const formatted = phone.startsWith('+') ? phone : `+91${phone}`
        const { error } = await supabase.auth.signInWithOtp({ phone: formatted })
        if (error) throw error
      }
      setStep('otp')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function verifyOTP() {
    setLoading(true)
    setError('')
    try {
      const formatted = phone.startsWith('+') ? phone : `+91${phone}`
      const { error } = mode === 'email'
        ? await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
        : await supabase.auth.verifyOtp({ phone: formatted, token: otp, type: 'sms' })
      if (error) throw error
      window.location.href = '/portal'
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <div className="flex gap-1 mb-8">
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
        </div>
        <h1 className="font-display text-3xl text-[#1a1a1a] mb-2">Welcome back</h1>
        <p className="text-[#6b7280] text-sm font-light mb-8">Sign in to your patient portal</p>

        {step === 'input' && (
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-[#faf7f2] rounded-2xl">
              {(['email', 'phone'] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? 'bg-white shadow-sm text-[#1a1a1a]' : 'text-[#6b7280]'}`}>
                  {m === 'email' ? '✉️ Email' : '📱 Phone'}
                </button>
              ))}
            </div>
            {mode === 'email' ? (
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com"
                  className="w-full bg-[#faf7f2] border border-[#f0ebe3] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#4a7c59] transition-colors" />
              </div>
            ) : (
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="10-digit mobile number"
                  className="w-full bg-[#faf7f2] border border-[#f0ebe3] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#4a7c59] transition-colors" />
              </div>
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button onClick={sendOTP} disabled={loading}
              className="w-full py-4 rounded-full bg-[#4a7c59] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3d6649] disabled:opacity-50 transition-all">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send code <ArrowRight size={18} /></>}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <p className="text-[#6b7280] text-sm">Enter the 6-digit code sent to <strong>{mode === 'email' ? email : phone}</strong></p>
            <input value={otp} onChange={e => setOtp(e.target.value)} type="text" placeholder="000000" maxLength={6}
              className="w-full bg-[#faf7f2] border border-[#f0ebe3] rounded-2xl py-4 px-6 outline-none focus:border-[#4a7c59] text-center text-2xl tracking-widest transition-colors" />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button onClick={verifyOTP} disabled={loading || otp.length < 6}
              className="w-full py-4 rounded-full bg-[#4a7c59] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3d6649] disabled:opacity-50 transition-all">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Enter'}
            </button>
            <button onClick={() => setStep('input')} className="w-full text-center text-sm text-[#6b7280] hover:text-[#4a7c59]">Back</button>
          </div>
        )}

        <p className="text-center text-xs text-[#9ca3af] mt-8">
          Doctor? <a href="/admin/login" className="text-[#4a7c59] font-medium">Sign in here</a>
        </p>
      </motion.div>
    </div>
  )
}
