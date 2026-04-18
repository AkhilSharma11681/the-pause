'use client'
import { useState } from 'react'
import { Send, Loader2, Sparkles, Calendar, Users, DollarSign, Clock } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  patientId?: string
  patientName?: string
}

const QUICK_QUESTIONS = [
  { icon: Calendar, text: 'How many bookings are there today?', query: 'bookings_today' },
  { icon: Calendar, text: 'How many sessions are completed this month?', query: 'sessions_completed_month' },
  { icon: Users, text: "Show me this month's patient count summary", query: 'patient_count_month' },
  { icon: DollarSign, text: 'Show all cash pending payments', query: 'cash_pending' },
  { icon: Clock, text: 'Which time slot is most booked?', query: 'popular_time_slot' },
  { icon: Sparkles, text: 'Generate monthly report', query: 'monthly_report' },
]

export default function DoctorAI({ patientId, patientName }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: patientId 
        ? `I can help you with ${patientName}'s case. Ask me about their booking history, session notes, or generate a case summary.`
        : 'I can help you with practice analytics, booking summaries, and patient insights. Click a quick question below or type your own.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleQuickQuestion(query: string, displayText: string) {
    setMessages(prev => [...prev, { role: 'user', content: displayText }])
    setLoading(true)

    try {
      const res = await fetch('/api/doctor-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          patientId, 
          patientName 
        }),
      })
      const data = await res.json()
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Something went wrong.' }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/doctor-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: 'custom',
          customQuestion: userMsg,
          patientId, 
          patientName 
        }),
      })
      const data = await res.json()
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Something went wrong.' }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  // Filter questions based on context
  const availableQuestions = patientId 
    ? [] // No quick questions for patient-specific view
    : QUICK_QUESTIONS

  return (
    <div className="bg-[#1a1a1a] rounded-[1.5rem] border border-white/5 overflow-hidden flex flex-col h-[600px]">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#4a7c59]/20 flex items-center justify-center">
          <Sparkles size={14} className="text-[#4a7c59]" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">Doctor AI Assistant</p>
          <p className="text-white/30 text-[10px]">
            {patientId ? `Analyzing ${patientName}'s data` : 'Practice analytics & insights'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
              m.role === 'user'
                ? 'bg-[#4a7c59] text-white rounded-br-sm'
                : 'bg-[#242424] text-white/80 rounded-bl-sm border border-white/5'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#242424] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[#4a7c59]" />
              <span className="text-white/40 text-xs">Analyzing data...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {availableQuestions.length > 0 && messages.length <= 2 && (
        <div className="px-5 pb-3 border-t border-white/5">
          <p className="text-white/40 text-xs mb-3 mt-3">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {availableQuestions.map((q, i) => {
              const Icon = q.icon
              return (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.query, q.text)}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#242424] border border-white/10 text-white/60 text-xs hover:border-[#4a7c59] hover:text-white transition-colors disabled:opacity-40 text-left"
                >
                  <Icon size={12} className="shrink-0" />
                  <span className="line-clamp-2">{q.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="px-4 py-3 border-t border-white/5 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder={patientId ? `Ask about ${patientName}...` : "Ask anything about your practice..."}
          className="flex-1 bg-[#242424] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-[#4a7c59] transition-colors placeholder:text-white/20"
        />
        <button onClick={send} disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-full bg-[#4a7c59] flex items-center justify-center disabled:opacity-40 hover:bg-[#3d6649] transition-colors">
          <Send size={14} className="text-white" />
        </button>
      </div>
    </div>
  )
}
