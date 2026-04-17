'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Send, Loader2, FileText, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function PatientChat({ patientId }: { patientId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm here to help you understand your concerns better. Tell me what's been on your mind lately — how have you been feeling? You can share as much or as little as you're comfortable with."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [reportSaved, setReportSaved] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, patientId }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      if (data.reportGenerated) setReportSaved(true)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-[2rem] border border-[#f0ebe3] overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#f0ebe3] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#e8f4ec] flex items-center justify-center">
          <Sparkles size={16} className="text-[#4a7c59]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#1a1a1a]">AI Wellness Assistant</p>
          <p className="text-[10px] text-[#9ca3af]">Powered by Gemini · Your conversation is private</p>
        </div>
        {reportSaved && (
          <div className="ml-auto flex items-center gap-1.5 text-[#4a7c59] text-xs font-medium">
            <FileText size={14} />
            Report saved
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#4a7c59] text-white rounded-br-md'
                : 'bg-[#faf7f2] text-[#1a1a1a] rounded-bl-md border border-[#f0ebe3]'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#faf7f2] border border-[#f0ebe3] px-5 py-3 rounded-[1.5rem] rounded-bl-md">
              <Loader2 size={16} className="animate-spin text-[#4a7c59]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-[#f0ebe3] flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Share what's on your mind..."
          className="flex-1 bg-[#faf7f2] border border-[#f0ebe3] rounded-full px-5 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          className="w-11 h-11 rounded-full bg-[#4a7c59] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#3d6649] transition-colors">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
