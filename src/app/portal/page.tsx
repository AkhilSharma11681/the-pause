'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Calendar, PlusCircle, FileText, LogOut, User, ArrowLeft } from 'lucide-react'
import PatientBookings from '@/components/portal/PatientBookings'
import SessionSummaries from '@/components/portal/SessionSummaries'

type Tab = 'sessions' | 'book' | 'summaries'

export default function PortalPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('sessions')
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
    { id: 'sessions' as Tab, label: 'My Sessions', icon: Calendar },
    { id: 'summaries' as Tab, label: 'Session Summaries', icon: FileText },
    { id: 'book' as Tab, label: 'Book New Session', icon: PlusCircle },
  ]

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <div className="bg-white border-b border-[#f0ebe3] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#4a7c59] transition-colors mr-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
              <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
            </div>
            <span className="font-display text-lg text-[#1a1a1a]">The Pause</span>
          </div>
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
          <p className="text-[#6b7280] font-light text-sm">Manage your sessions and stay connected with your therapist.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id ? 'bg-[#4a7c59] text-white' : 'bg-white border border-[#f0ebe3] text-[#6b7280] hover:border-[#4a7c59]'
                }`}>
                <Icon size={15} />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        {patientId ? (
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {tab === 'sessions' && <PatientBookings patientId={patientId} />}
            {tab === 'summaries' && <SessionSummaries patientId={patientId} />}
            {tab === 'book' && (
              <div className="bg-white rounded-[2rem] border border-[#f0ebe3] p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e8f4ec] flex items-center justify-center mx-auto mb-6">
                  <PlusCircle size={28} className="text-[#4a7c59]" />
                </div>
                <h2 className="font-display text-2xl text-[#1a1a1a] mb-3">Book a new session</h2>
                <p className="text-[#6b7280] font-light text-sm mb-8 max-w-sm mx-auto">
                  Choose your therapist, pick a date and time, and we&apos;ll confirm within 2 hours.
                </p>
                <a href="/#book"
                  className="inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                  <PlusCircle size={16} />
                  Book Now
                </a>
              </div>
            )}
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
