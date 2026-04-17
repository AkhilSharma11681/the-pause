'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

interface Report {
  id: string
  concerns: string
  report_html: string
  created_at: string
}

export default function PatientReports({ patientId }: { patientId: string }) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('ai_reports')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReports(data || [])
        setLoading(false)
      })
  }, [patientId])

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#4a7c59]" /></div>

  if (reports.length === 0) return (
    <div className="text-center py-20">
      <FileText size={40} className="text-[#4a7c59]/30 mx-auto mb-4" />
      <p className="text-[#6b7280] font-light">No reports yet.</p>
      <p className="text-[#9ca3af] text-sm mt-1">Chat with the AI Assistant to generate your first wellness report.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {reports.map((r) => (
        <div key={r.id} className="bg-white rounded-[1.5rem] border border-[#f0ebe3] overflow-hidden">
          <button onClick={() => setOpen(open === r.id ? null : r.id)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#faf7f2] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8f4ec] flex items-center justify-center">
                <FileText size={14} className="text-[#4a7c59]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#1a1a1a]">Wellness Report</p>
                <p className="text-xs text-[#9ca3af]">
                  {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            {open === r.id ? <ChevronUp size={18} className="text-[#6b7280]" /> : <ChevronDown size={18} className="text-[#6b7280]" />}
          </button>
          {open === r.id && (
            <div className="px-6 pb-6 border-t border-[#f0ebe3]">
              <div
                className="prose prose-sm max-w-none pt-4 text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: r.report_html }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
