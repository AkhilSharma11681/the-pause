'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Calendar, Clock, MessageSquare, Upload, FileText, LogOut, User } from 'lucide-react'
import PatientChat from '@/components/portal/PatientChat'
import PatientBookings from '@/components/portal/PatientBookings'
import PatientUpload from '@/components/portal/PatientUpload'
import PatientReports from '@/components/portal/PatientReports'

type Tab = 'bookings' | 'chat' | 'upload' | 'reports'

export default function PortalPage() {
  const [tab, setTab] = useState<Tab>('bookings')
  const [user, setUser] = useState<{ email?: string; phone?: string } | null>(null)
  const [patientId, setPatientId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { window.location.href = '/auth'; return }
      setUser({ email: data.user.email, phone: data.user.phone })

      // Get or create patient record
      const { data: existing } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', data.user.id)
        .single()

      if (existing) {
        setPatientId(existing.id)
      } else {
        const { data: created } = await supabase
          .from('patients')
          .insert({ user_id: data.user.id, name: data.user.email || data.user.phone || 'Patient', email: data.user.email || '', phone: data.user.phone || '' })
          .select('id')
          .single()
        if (created) setPatientId(created.id)
      }
    })
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const tabs = [
    { id: 'bookings' as Tab, label: 'My Sessions', icon: Calendar },
    { id: 'chat' as Tab, label: 'AI Assistant', icon: MessageSquare },
    { id: 'upload' as Tab, label: 'Upload Notes', icon: Upload },
    { id: 'reports' as Tab, label: 'My Reports', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
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
            <span>{user?.email || user?.phone}</span>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#4a7c59] transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl text-[#1a1a1a] mb-1">Your wellness space</h1>
          <p className="text-[#6b7280] font-light text-sm">Everything about your care, in one place.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? 'bg-[#4a7c59] text-white' : 'bg-white border border-[#f0ebe3] text-[#6b7280] hover:border-[#4a7c59]'}`}>
                <Icon size={15} />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {patientId && (
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {tab === 'bookings' && <PatientBookings patientId={patientId} />}
            {tab === 'chat' && <PatientChat patientId={patientId} />}
            {tab === 'upload' && <PatientUpload patientId={patientId} />}
            {tab === 'reports' && <PatientReports patientId={patientId} />}
          </motion.div>
        )}
      </div>
    </div>
  )
}
