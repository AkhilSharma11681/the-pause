'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function login() {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    if (!data.user) {
      setError('Login failed. Please try again.')
      setLoading(false)
      return
    }
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#242424] rounded-[2.5rem] p-10 border border-white/5">
        <div className="flex gap-1 mb-8">
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
          <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
        </div>
        <h1 className="font-display text-3xl text-white mb-2">Doctor Portal</h1>
        <p className="text-white/40 text-sm font-light mb-8">The Pause — Clinical Dashboard</p>

        <div className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="doctor@thepause.in"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#4a7c59] transition-colors placeholder:text-white/20" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#4a7c59] transition-colors placeholder:text-white/20" />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          <button onClick={login} disabled={loading}
            className="w-full py-4 rounded-full bg-[#4a7c59] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3d6649] disabled:opacity-50 transition-all">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </div>
        <p className="text-center text-xs text-white/20 mt-8">
          Patient? <a href="/auth" className="text-[#4a7c59]">Sign in here</a>
        </p>
      </motion.div>
    </div>
  )
}
