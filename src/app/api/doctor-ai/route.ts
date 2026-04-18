import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { query, customQuestion, patientId, patientName } = await req.json()
    const admin = getAdminClient()

    let context = ''
    let prompt = ''

    // Handle different query types
    switch (query) {
      case 'bookings_today': {
        const today = new Date().toISOString().split('T')[0]
        const { data: bookings } = await admin
          .from('bookings')
          .select('*, patients(name)')
          .eq('date', today)
        
        if (!bookings || bookings.length === 0) {
          return NextResponse.json({
            success: true,
            reply: '📅 No bookings scheduled for today.'
          })
        }

        const pending = bookings.filter(b => b.status === 'pending').length
        const confirmed = bookings.filter(b => b.status === 'confirmed').length
        const completed = bookings.filter(b => b.status === 'completed').length

        return NextResponse.json({
          success: true,
          reply: `📅 Today's Bookings Summary:\n\nTotal: ${bookings.length} bookings\n• Pending: ${pending}\n• Confirmed: ${confirmed}\n• Completed: ${completed}\n\nPatients: ${bookings.map((b: any) => b.patients?.name || 'Unknown').join(', ')}`
        })
      }

      case 'sessions_completed_month': {
        const now = new Date()
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
        
        const { data: bookings } = await admin
          .from('bookings')
          .select('*')
          .eq('status', 'completed')
          .gte('date', firstDay)
          .lte('date', lastDay)
        
        if (!bookings || bookings.length === 0) {
          return NextResponse.json({
            success: true,
            reply: '📊 No completed sessions this month yet.'
          })
        }

        const online = bookings.filter(b => b.session_type === 'online').length
        const offline = bookings.filter(b => b.session_type === 'offline').length

        return NextResponse.json({
          success: true,
          reply: `📊 Completed Sessions This Month:\n\nTotal: ${bookings.length} sessions\n• Online: ${online}\n• In-person: ${offline}\n\nMonth: ${now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`
        })
      }

      case 'patient_count_month': {
        const now = new Date()
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        
        const { data: patients } = await admin
          .from('patients')
          .select('*, bookings(count)')
          .gte('created_at', firstDay)
        
        const { data: allPatients } = await admin
          .from('patients')
          .select('id')
        
        if (!patients || !allPatients) {
          return NextResponse.json({
            success: true,
            reply: '👥 No patient data available.'
          })
        }

        return NextResponse.json({
          success: true,
          reply: `👥 Patient Summary:\n\nTotal Patients: ${allPatients.length}\nNew This Month: ${patients.length}\n\nMonth: ${now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`
        })
      }

      case 'cash_pending': {
        const { data: bookings } = await admin
          .from('bookings')
          .select('*, patients(name, phone)')
          .eq('payment_status', 'cash_pending')
          .order('date', { ascending: true })
        
        if (!bookings || bookings.length === 0) {
          return NextResponse.json({
            success: true,
            reply: '💵 No cash pending payments. All clear!'
          })
        }

        const total = bookings.length * 1500 // ₹1500 per session
        const list = bookings.map((b: any) => 
          `• ${b.patients?.name || 'Unknown'} - ${new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at ${b.time} (₹1500)`
        ).join('\n')

        return NextResponse.json({
          success: true,
          reply: `💵 Cash Pending Payments:\n\nTotal Amount: ₹${total}\nBookings: ${bookings.length}\n\n${list}`
        })
      }

      case 'popular_time_slot': {
        const { data: bookings } = await admin
          .from('bookings')
          .select('time')
        
        if (!bookings || bookings.length === 0) {
          return NextResponse.json({
            success: true,
            reply: '⏰ No booking data available yet.'
          })
        }

        // Count bookings by time slot
        const timeCounts: Record<string, number> = {}
        bookings.forEach((b: any) => {
          timeCounts[b.time] = (timeCounts[b.time] || 0) + 1
        })

        const sorted = Object.entries(timeCounts).sort((a, b) => b[1] - a[1])
        const top3 = sorted.slice(0, 3)

        return NextResponse.json({
          success: true,
          reply: `⏰ Most Popular Time Slots:\n\n${top3.map(([time, count], i) => 
            `${i + 1}. ${time} - ${count} bookings`
          ).join('\n')}`
        })
      }

      case 'monthly_report': {
        const now = new Date()
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
        
        const [bookingsRes, patientsRes, notesRes] = await Promise.all([
          admin.from('bookings').select('*').gte('date', firstDay).lte('date', lastDay),
          admin.from('patients').select('id').gte('created_at', firstDay),
          admin.from('session_notes').select('id').gte('created_at', firstDay)
        ])

        const bookings = bookingsRes.data || []
        const completed = bookings.filter(b => b.status === 'completed').length
        const pending = bookings.filter(b => b.status === 'pending').length
        const cashPending = bookings.filter(b => b.payment_status === 'cash_pending').length
        const revenue = completed * 1500

        return NextResponse.json({
          success: true,
          reply: `📈 Monthly Report - ${now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}\n\n` +
            `📅 Bookings:\n• Total: ${bookings.length}\n• Completed: ${completed}\n• Pending: ${pending}\n\n` +
            `👥 New Patients: ${patientsRes.data?.length || 0}\n\n` +
            `📝 Session Notes: ${notesRes.data?.length || 0}\n\n` +
            `💰 Revenue:\n• Collected: ₹${revenue}\n• Cash Pending: ${cashPending} bookings (₹${cashPending * 1500})`
        })
      }

      case 'custom': {
        // For custom questions, use Gemini AI with context
        const [bookingsRes, patientsRes] = await Promise.all([
          admin.from('bookings').select('*, patients(name)').limit(100),
          admin.from('patients').select('id, name').limit(50)
        ])

        context = `You are a medical practice AI assistant. Here's the current data:\n\n` +
          `Total Patients: ${patientsRes.data?.length || 0}\n` +
          `Total Bookings: ${bookingsRes.data?.length || 0}\n\n` +
          `Answer the doctor's question concisely and professionally. If you need specific data that's not provided, say so.`

        prompt = customQuestion

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
        const result = await model.generateContent(`${context}\n\nQuestion: ${prompt}`)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({
          success: true,
          reply: text
        })
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown query type'
        })
    }
  } catch (error) {
    console.error('Doctor AI error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process request. Please try again.'
    })
  }
}
