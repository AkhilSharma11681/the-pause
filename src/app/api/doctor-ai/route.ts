import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'AI not configured. Add GEMINI_API_KEY to environment variables.' })
    }

    const { messages, patientId, patientName } = await req.json()
    const admin = getAdminClient()

    // Fetch all patient data
    const [bookingsRes, notesRes, reportsRes] = await Promise.all([
      admin.from('bookings').select('*').eq('patient_id', patientId).order('date', { ascending: false }),
      admin.from('session_notes').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }),
      admin.from('ai_reports').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }),
    ])

    const bookings = bookingsRes.data || []
    const notes = notesRes.data || []
    const reports = reportsRes.data || []

    // Build patient context for AI
    const patientContext = `
PATIENT: ${patientName}
TOTAL SESSIONS: ${bookings.length}

BOOKING HISTORY:
${bookings.map(b => `- ${b.date} at ${b.time} | ${b.session_type} | Concern: ${b.concern} | Status: ${b.status}`).join('\n') || 'No bookings yet'}

SESSION NOTES FROM DOCTOR:
${notes.map(n => `- [${new Date(n.created_at).toLocaleDateString()}] ${n.note_text || 'Image note uploaded'}`).join('\n') || 'No notes yet'}

AI WELLNESS REPORTS:
${reports.map(r => `- [${new Date(r.created_at).toLocaleDateString()}] Concerns: ${r.concerns}`).join('\n') || 'No reports yet'}
`

    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const systemPrompt = `You are a clinical AI assistant helping a doctor at The Pause psychological clinic.
You have access to the following patient data:

${patientContext}

Answer the doctor's questions about this patient based on their history.
Be clinical, concise, and helpful. Never make up information not in the patient data.
If asked to generate a report or summary, do so based only on available data.`

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. I have reviewed the patient data and am ready to assist.' }] },
        ...history,
      ],
    })

    const result = await chat.sendMessage(messages[messages.length - 1].content)
    return NextResponse.json({ reply: result.response.text() })
  } catch (e) {
    console.error('Doctor AI error:', e)
    return NextResponse.json({ reply: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
