import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAdminClient } from '@/lib/supabase'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are a compassionate AI wellness assistant for The Pause, a psychological care clinic in India. 
Your role is to:
1. Listen empathetically to patients describing their mental health concerns
2. Ask gentle follow-up questions to understand their situation better
3. After 4-6 exchanges, generate a structured wellness report

When generating a report, format it as HTML with these sections:
- <h3>Summary of Concerns</h3>
- <h3>Emotional Patterns Observed</h3>  
- <h3>Recommended Focus Areas</h3>
- <h3>Suggested Next Steps</h3>

Keep responses warm, non-judgmental, and concise (2-3 sentences max unless generating a report).
Never diagnose. Always encourage professional consultation.
When you generate a report, start your response with [REPORT_GENERATED] followed by the HTML report.`

export async function POST(req: NextRequest) {
  try {
    const { messages, patientId } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation history for Gemini
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I will act as a compassionate wellness assistant.' }] },
        ...history,
      ],
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const reply = result.response.text()

    let reportGenerated = false

    // If Gemini generated a report, save it to database
    if (reply.includes('[REPORT_GENERATED]') && patientId) {
      const reportHtml = reply.replace('[REPORT_GENERATED]', '').trim()
      const concerns = messages
        .filter((m: { role: string }) => m.role === 'user')
        .map((m: { content: string }) => m.content)
        .join(' | ')

      const admin = getAdminClient()
      await admin.from('ai_reports').insert({
        patient_id: patientId,
        concerns,
        report_html: reportHtml,
      })

      reportGenerated = true
      return NextResponse.json({
        reply: "I've generated your wellness report based on our conversation. You can view it in the 'My Reports' tab. Please share this with your therapist at your next session.",
        reportGenerated,
      })
    }

    return NextResponse.json({ reply, reportGenerated })
  } catch (e) {
    console.error('Chat error:', e)
    return NextResponse.json({ reply: 'Something went wrong. Please try again.', reportGenerated: false }, { status: 500 })
  }
}
