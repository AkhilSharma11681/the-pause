'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Calendar, Upload, LogOut, User } from 'lucide-react'
import PatientBookings from '@/components/portal/PatientBookings'
import PatientUpload from '@/components/portal/PatientUpload'

type Tab = 'bookings' | 'upload'

export default function PortalPage() {
  const [tab, setTab] = useState<Tab>('bookings')
  const [user, setUser] = useState<{ email?: string; phone?: string } | null>(null)
  const [patientId, setPatientId] = useState<string | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email, phone: session.user.phone })
        await initPatient(session.user.id, session.user.email, session.user.phone)
      } else if (event === 'SIGNED_OUT') {
        window.location.href = '/auth'
      }
    })

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { window.location.href = '/auth'; return }
      setUser({ email: session.user.email, phone: session.user.phone })
      await initPatient(session.user.id, session.user.email, session.user.phone)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function initPatient(userId: string, email?: string, phone?: string) {
    const { data: existing } = await supabase.from('patients').select('id').eq('user_id', userId).single()
    if (existing) {
      setPatientId(existing.id)
    } else {
      const { data: created } = await supabase.from('patients').insert({
        user_id: userId,
        name: email || phone || 'Patient',
        email: email || '',
        phone: phone || ''
      }).select('id').single()
      if (created) setPatientId(created.id)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const tabs = [
    { id: 'bookings' as Tab, label: 'My Sessions', icon: Calendar },
    { id: 'upload' as Tab, label: 'Upload Notes', icon: Upload },
  ]

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <div className="bg-white border-b border-[#f0ebe3] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
            <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
          </div>
          <span className="font-display text-lg text-[#1a1a1a]">The Pause</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <User size={16} />
            <span className="hidden md:block">{user?.email || user?.phone}</span>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#4a7c59] transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl text-[#1a1a1a] mb-1">Your wellness space</h1>
          <p className="text-[#6b7280] font-light text-sm">View your sessions and share notes with your therapist.</p>
        </motion.div>

        <div className="flex gap-2 mb-8">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === t.id ? 'bg-[#4a7c59] text-white' : 'bg-white border border-[#f0ebe3] text-[#6b7280] hover:border-[#4a7c59]'}`}>
                <Icon size={15} />
                {t.label}
              </button>
            )
          })}
        </div>

        {patientId ? (
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {tab === 'bookings' && <PatientBookings patientId={patientId} />}
            {tab === 'upload' && <PatientUpload patientId={patientId} />}
          </motion.div>
        ) : (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
