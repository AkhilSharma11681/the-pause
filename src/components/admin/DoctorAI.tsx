'use client'
import { useState } from 'react'
import { Send, Loader2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  patientId: string
  patientName: string
}

export default function DoctorAI({ patientId, patientName }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `I have access to ${patientName}'s full history — bookings, session notes, uploaded files, and AI wellness reports. Ask me anything about this patient.`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/doctor-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, patientId, patientName }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1a1a1a] rounded-[1.5rem] border border-white/5 overflow-hidden flex flex-col h-[500px]">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#4a7c59]/20 flex items-center justify-center">
          <Sparkles size={14} className="text-[#4a7c59]" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">AI Clinical Assistant</p>
          <p className="text-white/30 text-[10px]">Knows {patientName}&apos;s full history</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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
            <div className="bg-[#242424] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm">
              <Loader2 size={14} className="animate-spin text-[#4a7c59]" />
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-white/5 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about this patient..."
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
