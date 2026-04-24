'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, Loader2 } from 'lucide-react'

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

export default function PatientBookings({ patientId }: { patientId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('bookings')
      .select('*')
      .eq('patient_id', patientId)
      .order('date', { ascending: false })
      .then(({ data }) => {
        setBookings(data || [])
        setLoading(false)
      })
  }, [patientId])

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-[#e8f4ec] text-[#4a7c59] border-[#4a7c59]/20',
    completed: 'bg-gray-50 text-gray-500 border-gray-200',
    cancelled: 'bg-red-50 text-red-500 border-red-200',
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#4a7c59]" /></div>

  if (bookings.length === 0) return (
    <div className="text-center py-20">
      <Calendar size={40} className="text-[#4a7c59]/30 mx-auto mb-4" />
      <p className="text-[#6b7280] font-light">No sessions yet.</p>
      <a href="/#book" className="inline-block mt-4 bg-[#4a7c59] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-colors">
        Book your first session
      </a>
    </div>
  )

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="bg-white rounded-[1.5rem] p-6 border border-[#f0ebe3] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${statusColor[b.status] || statusColor.pending}`}>
                {b.status}
              </span>
            </div>
            <span className="text-[10px] text-[#9ca3af] font-mono">{b.reference_id}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              <Calendar size={14} className="text-[#4a7c59]" />
              {new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              <Clock size={14} className="text-[#4a7c59]" />
              {b.time}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              {b.session_type === 'online' ? <Video size={14} className="text-[#4a7c59]" /> : <MapPin size={14} className="text-[#4a7c59]" />}
              {b.session_type === 'online' ? 'Online' : 'In-Person'}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              {b.status === 'completed' ? <CheckCircle2 size={14} className="text-[#4a7c59]" /> : <XCircle size={14} className="text-[#9ca3af]" />}
              {b.concern}
            </div>
          </div>
          {b.session_type === 'online' && b.status === 'confirmed' && b.meet_link && (
            <div className="pt-4 border-t border-[#f0ebe3]">
              <a
                href={b.meet_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4a7c59] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Video size={16} />
                Join Video Session
              </a>
              <p className="text-xs text-[#9ca3af] mt-2">Join 5 minutes before your session time</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
