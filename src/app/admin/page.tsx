'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Users, Calendar, FileText, LogOut, Search, ChevronRight, Loader2, Sparkles } from 'lucide-react'
import AdminPatientDetail from '@/components/admin/AdminPatientDetail'
import DoctorAI from '@/components/admin/DoctorAI'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  bookings?: { count: number }[]
}

export default function AdminDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [todayBookings, setTodayBookings] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [tab, setTab] = useState<'patients' | 'today' | 'ai'>('today')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = '/admin/login'; return }
    })

    loadData()
  }, [])

  async function loadData() {
    const today = new Date().toISOString().split('T')[0]

    Promise.all([
      supabase.from('patients').select('*, bookings(count)').order('created_at', { ascending: false }),
      supabase.from('bookings').select('*, patients(name, phone)').eq('date', today).order('time'),
    ]).then(([pRes, bRes]) => {
      setPatients(pRes.data || [])
      setTodayBookings(bRes.data || [])
      setLoading(false)
    })
  }

  async function updateBookingStatus(bookingId: string, newStatus: string) {
    // Get booking details to check if it's online
    const { data: booking } = await supabase
      .from('bookings')
      .select('session_type, meet_link, patient_id, date, time')
      .eq('id', bookingId)
      .single()
    
    const updates: { status: string; meet_link?: string } = { status: newStatus }
    
    // If confirming an online session without a meet link, generate one
    if (newStatus === 'confirmed' && booking?.session_type === 'online' && !booking.meet_link) {
      const { generateMeetLink } = await import('@/lib/meet')
      updates.meet_link = generateMeetLink()
      
      // Send confirmation email with meet link
      if (booking.patient_id) {
        sendConfirmationWithMeetLink(bookingId, updates.meet_link, booking.date, booking.time).catch(console.error)
      }
    }
    
    const { error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
    
    if (!error) {
      loadData() // Refresh data
    }
  }

  async function sendConfirmationWithMeetLink(bookingId: string, meetLink: string, date: string, time: string) {
    // Get patient email
    const { data: booking } = await supabase
      .from('bookings')
      .select('patients(email, name)')
      .eq('id', bookingId)
      .single()
    
    const patientEmail = (booking as any)?.patients?.email
    const patientName = (booking as any)?.patients?.name
    
    if (!patientEmail) return
    
    const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY || process.env.RESEND_API_KEY
    if (!apiKey) return
    
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Pause <noreply@thepause.in>',
        to: patientEmail,
        subject: `Your session is confirmed — ${date} at ${time}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
            <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 8px;">Your session is confirmed, ${patientName?.split(' ')[0]}!</h1>
            <p style="color: #6b7280; font-size: 16px; margin-bottom: 32px;">We're looking forward to meeting you.</p>
            <div style="background: #e8f4ec; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <p style="font-weight: 600; margin-bottom: 12px;">📅 ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p style="font-weight: 600; margin-bottom: 12px;">🕐 ${time}</p>
              <p style="font-weight: 600; margin-bottom: 12px;">💻 Online Session</p>
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${meetLink}" style="display:inline-block; background:#4a7c59; color:white; padding:16px 32px; border-radius:50px; text-decoration:none; font-weight:600; font-size:16px;">
                Join Video Session →
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; text-align: center;">Click the button above 5 minutes before your session time.</p>
            <hr style="border: none; border-top: 1px solid #f0ebe3; margin: 32px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">© 2026 The Pause</p>
          </div>
        `,
      }),
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search)
  )

  if (selected) return <AdminPatientDetail patientId={selected} onBack={() => setSelected(null)} />

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#242424] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
            <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full" />
          </div>
          <span className="font-display text-lg">The Pause — Admin</span>
        </div>
        <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors">
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Patients', value: patients.length, icon: Users },
            { label: "Today's Sessions", value: todayBookings.length, icon: Calendar },
            { label: 'Total Bookings', value: patients.reduce((a, p) => a + (p.bookings?.[0]?.count || 0), 0), icon: FileText },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-[#242424] rounded-[1.5rem] p-6 border border-white/5">
              <s.icon size={20} className="text-[#4a7c59] mb-3" />
              <p className="text-3xl font-display font-bold text-white">{s.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['today', 'patients', 'ai'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === t ? 'bg-[#4a7c59] text-white' : 'bg-[#242424] border border-white/10 text-white/50 hover:text-white'}`}>
              {t === 'ai' && <Sparkles size={14} />}
              {t === 'today' ? "Today's Appointments" : t === 'patients' ? 'All Patients' : 'AI Assistant'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#4a7c59]" /></div>
        ) : tab === 'ai' ? (
          <DoctorAI />
        ) : tab === 'today' ? (
          <div className="space-y-3">
            {todayBookings.length === 0 ? (
              <div className="text-center py-16 text-white/30">No appointments today.</div>
            ) : (
              (todayBookings as Array<{ id: string; time: string; session_type: string; concern: string; status: string; payment_status?: string; meet_link?: string; patients?: { name: string; phone: string } }>).map((b) => (
                <div key={b.id} className="bg-[#242424] rounded-[1.5rem] p-5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#4a7c59]/20 flex items-center justify-center font-display text-[#4a7c59] text-lg">
                        {b.patients?.name?.[0] || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-white">{b.patients?.name}</p>
                        <p className="text-white/40 text-xs">{b.patients?.phone} · {b.concern}</p>
                        {b.payment_status === 'cash_pending' && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-medium">
                            💵 Cash Pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[#4a7c59] font-bold">{b.time}</p>
                        <p className="text-white/30 text-xs capitalize">{b.session_type}</p>
                      </div>
                      {b.session_type === 'online' && b.status === 'confirmed' && b.meet_link && (
                        <a
                          href={b.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          Join Meet
                        </a>
                      )}
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border outline-none transition-colors ${
                          b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                          b.status === 'confirmed' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          b.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                          'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or phone..."
                className="w-full bg-[#242424] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#4a7c59] transition-colors placeholder:text-white/20" />
            </div>
            {filtered.map((p) => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                className="w-full bg-[#242424] rounded-[1.5rem] p-5 border border-white/5 flex items-center justify-between hover:border-[#4a7c59]/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4a7c59]/20 flex items-center justify-center font-display text-[#4a7c59]">
                    {p.name?.[0] || '?'}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-white/40 text-xs">{p.email || p.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs">{p.bookings?.[0]?.count || 0} sessions</span>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-[#4a7c59] transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
