'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Loader2, ChevronDown, ChevronUp, Image } from 'lucide-react'

interface Note {
  id: string
  note_text: string
  image_url: string | null
  created_at: string
}

export default function SessionSummaries({ patientId }: { patientId: string }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('session_notes')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotes(data || [])
        setLoading(false)
      })
  }, [patientId])

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#4a7c59]" /></div>

  if (notes.length === 0) return (
    <div className="text-center py-20">
      <FileText size={40} className="text-[#4a7c59]/30 mx-auto mb-4" />
      <p className="text-[#6b7280] font-light">No session summaries yet.</p>
      <p className="text-[#9ca3af] text-sm mt-1">Your therapist will add notes after each session.</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div key={n.id} className="bg-white rounded-[1.5rem] border border-[#f0ebe3] overflow-hidden">
          <button onClick={() => setOpen(open === n.id ? null : n.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#faf7f2] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8f4ec] flex items-center justify-center">
                <FileText size={14} className="text-[#4a7c59]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#1a1a1a]">Session Summary</p>
                <p className="text-xs text-[#9ca3af]">
                  {new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            {open === n.id ? <ChevronUp size={16} className="text-[#6b7280]" /> : <ChevronDown size={16} className="text-[#6b7280]" />}
          </button>
          {open === n.id && (
            <div className="px-6 pb-5 border-t border-[#f0ebe3] pt-4 space-y-3">
              {n.note_text && <p className="text-[#1a1a1a] text-sm leading-relaxed">{n.note_text}</p>}
              {n.image_url && (
                <a href={n.image_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#4a7c59] text-sm hover:underline">
                  <Image size={14} /> View attached document
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
