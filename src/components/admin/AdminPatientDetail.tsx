'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Calendar, FileText, Upload, Loader2, Image, Plus } from 'lucide-react'
import DoctorAI from '@/components/admin/DoctorAI'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
}

interface Booking {
  id: string
  date: string
  time: string
  session_type: string
  concern: string
  status: string
  reference_id: string
  meet_link?: string
}

interface Note {
  id: string
  note_text: string
  image_url: string | null
  created_at: string
}

interface Report {
  id: string
  concerns: string
  report_html: string
  created_at: string
}

export default function AdminPatientDetail({ patientId, onBack }: { patientId: string; onBack: () => void }) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'bookings' | 'notes' | 'reports' | 'ai'>('bookings')
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadPatientData()
  }, [patientId])

  async function loadPatientData() {
    Promise.all([
      supabase.from('patients').select('*').eq('id', patientId).single(),
      supabase.from('bookings').select('*').eq('patient_id', patientId).order('date', { ascending: false }),
      supabase.from('session_notes').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }),
      supabase.from('ai_reports').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }),
    ]).then(([p, b, n, r]) => {
      setPatient(p.data)
      setBookings(b.data || [])
      setNotes(n.data || [])
      setReports(r.data || [])
      setLoading(false)
    })
  }

  async function updateBookingStatus(bookingId: string, newStatus: string) {
    // Get booking details to check if it's online
    const { data: booking } = await supabase
      .from('bookings')
      .select('session_type, meet_link, date, time')
      .eq('id', bookingId)
      .single()
    
    const updates: { status: string; meet_link?: string } = { status: newStatus }
    
    // If confirming an online session without a meet link, generate one
    if (newStatus === 'confirmed' && booking?.session_type === 'online' && !booking.meet_link) {
      const { generateMeetLink } = await import('@/lib/meet')
      updates.meet_link = generateMeetLink()
      
      // Send confirmation email with meet link
      sendConfirmationWithMeetLink(bookingId, updates.meet_link, booking.date, booking.time, patientId).catch(console.error)
    }
    
    const { error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
    
    if (!error) {
      loadPatientData() // Refresh data
    }
  }

  async function sendConfirmationWithMeetLink(bookingId: string, meetLink: string, date: string, time: string, patId: string) {
    const { data: pat } = await supabase
      .from('patients')
      .select('email, name')
      .eq('id', patId)
      .single()
    
    if (!pat?.email) return
    
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
        to: pat.email,
        subject: `Your session is confirmed — ${date} at ${time}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
            <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 8px;">Your session is confirmed, ${pat.name?.split(' ')[0]}!</h1>
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

  async function addNote() {
    if (!newNote.trim()) return
    setAddingNote(true)
    const { data } = await supabase.from('session_notes').insert({
      patient_id: patientId,
      note_text: newNote,
    }).select().single()
    if (data) setNotes(prev => [data, ...prev])
    setNewNote('')
    setAddingNote(false)
  }

  async function uploadNoteImage(file: File) {
    setUploading(true)
    const path = `doctor-notes/${patientId}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('session-files').upload(path, file)
    if (!error) {
      const { data: urlData } = supabase.storage.from('session-files').getPublicUrl(path)
      const { data } = await supabase.from('session_notes').insert({
        patient_id: patientId,
        note_text: 'Doctor uploaded note image',
        image_url: urlData.publicUrl,
      }).select().single()
      if (data) setNotes(prev => [data, ...prev])
    }
    setUploading(false)
  }

  if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center"><Loader2 size={24} className="animate-spin text-[#4a7c59]" /></div>

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="bg-[#242424] border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="w-px h-5 bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4a7c59]/20 flex items-center justify-center font-display text-[#4a7c59]">
            {patient?.name?.[0]}
          </div>
          <div>
            <p className="font-medium text-white text-sm">{patient?.name}</p>
            <p className="text-white/30 text-xs">{patient?.email || patient?.phone}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Patient info card */}
        <div className="bg-[#242424] rounded-[1.5rem] p-6 border border-white/5 mb-6 grid grid-cols-3 gap-4">
          <div><p className="text-white/30 text-xs uppercase tracking-widest mb-1">Patient since</p><p className="text-white text-sm">{new Date(patient?.created_at || '').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p></div>
          <div><p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total sessions</p><p className="text-white text-sm">{bookings.length}</p></div>
          <div><p className="text-white/30 text-xs uppercase tracking-widest mb-1">Reports</p><p className="text-white text-sm">{reports.length}</p></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['bookings', 'notes', 'reports', 'ai'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all ${tab === t ? 'bg-[#4a7c59] text-white' : 'bg-[#242424] border border-white/10 text-white/50 hover:text-white'}`}>
              {t === 'ai' ? '✨ AI Assistant' : t}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="bg-[#242424] rounded-[1.5rem] p-5 border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Calendar size={16} className="text-[#4a7c59]" />
                    <div>
                      <p className="text-white text-sm font-medium">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {b.time}</p>
                      <p className="text-white/40 text-xs">{b.concern} · {b.session_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
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
            ))}
          </div>
        )}

        {tab === 'notes' && (
          <div className="space-y-4">
            {/* Add note */}
            <div className="bg-[#242424] rounded-[1.5rem] p-5 border border-white/5 space-y-3">
              <textarea value={newNote} onChange={e => setNewNote(e.target.value)} rows={3}
                placeholder="Add session notes..."
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-3 px-4 text-white text-sm outline-none focus:border-[#4a7c59] resize-none transition-colors placeholder:text-white/20" />
              <div className="flex gap-3">
                <button onClick={addNote} disabled={addingNote || !newNote.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a7c59] text-white text-sm font-medium disabled:opacity-40 hover:bg-[#3d6649] transition-colors">
                  {addingNote ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Note
                </button>
                <button onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:text-white transition-colors">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload Image
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && uploadNoteImage(e.target.files[0])} />
              </div>
            </div>

            {notes.map((n) => (
              <div key={n.id} className="bg-[#242424] rounded-[1.5rem] p-5 border border-white/5">
                <p className="text-white/30 text-xs mb-2">{new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                {n.note_text && <p className="text-white/80 text-sm leading-relaxed">{n.note_text}</p>}
                {n.image_url && (
                  <a href={n.image_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 text-[#4a7c59] text-sm hover:underline">
                    <Image size={14} /> View uploaded image
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div className="space-y-4">
            {reports.map((r) => (
              <div key={r.id} className="bg-[#242424] rounded-[1.5rem] p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} className="text-[#4a7c59]" />
                  <p className="text-white/60 text-xs">{new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="prose prose-sm prose-invert max-w-none text-white/80"
                  dangerouslySetInnerHTML={{ __html: r.report_html }} />
              </div>
            ))}
            {reports.length === 0 && <div className="text-center py-12 text-white/20">No AI reports yet for this patient.</div>}
          </div>
        )}

        {tab === 'ai' && patient && (
          <DoctorAI patientId={patientId} patientName={patient.name} />
        )}
      </div>
    </div>
  )
}
