'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Laptop, Hospital, User, Mail, Phone, MessageSquare,
  ArrowRight, ShieldCheck, MapPin, CheckCircle2, Loader2, RefreshCw
} from 'lucide-react'
import {
  validateEmail, validatePhone, generateDateRange, generateSlots,
  formatDate, toISODate, BookingPayload, BookingResponse
} from '@/lib/booking'

const THERAPISTS = [
  { id: 'priya', name: 'Dr. Priya Sharma', role: 'Clinical Psychologist', speciality: 'Anxiety · Depression · Burnout', initial: 'P', color: '#4a7c59' },
  { id: 'arjun', name: 'Arjun Mehta', role: 'Counselling Psychologist', speciality: 'Relationships · Grief · Self-esteem', initial: 'A', color: '#2d5a3d' },
  { id: 'sneha', name: 'Dr. Sneha Rao', role: 'Psychotherapist', speciality: 'Trauma · PTSD · Identity', initial: 'S', color: '#6a9e78' },
  { id: 'rahul', name: 'Rahul Bose', role: 'Behavioural Therapist', speciality: 'ADHD · OCD · Stress', initial: 'R', color: '#4a7c59' },
]

const CONCERNS = ['Anxiety & Panic', 'Depression', 'Burnout & Work Stress', 'Relationships', 'Identity & Trauma', 'Grief & Loss', 'ADHD / OCD', 'Other']

const cv = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

interface Props {
  preSelectedTherapist?: string
}

export default function BookingSection({ preSelectedTherapist }: Props) {
  const [step, setStep] = useState(1)
  const [sessionType, setSessionType] = useState<'online' | 'offline' | ''>('')
  const [therapistId, setTherapistId] = useState<string>(preSelectedTherapist || 'auto')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [concern, setConcern] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<BookingResponse | null>(null)

  const dates = generateDateRange(new Date(), 14)
  const slots = selectedDate && sessionType ? generateSlots(sessionType as 'online' | 'offline', selectedDate) : []

  useEffect(() => {
    if (preSelectedTherapist) setTherapistId(preSelectedTherapist)
  }, [preSelectedTherapist])

  function validateStep4() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!validateEmail(email)) e.email = 'Enter a valid email address'
    if (!validatePhone(phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (!concern) e.concern = 'Please select a concern'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validateStep4()) return
    setSubmitting(true)
    try {
      const payload: BookingPayload = {
        name, email, phone,
        sessionType: sessionType as 'online' | 'offline',
        therapistId,
        date: toISODate(selectedDate!),
        time: selectedTime,
        concern,
        message,
      }
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data: BookingResponse = await res.json()
      setResult(data)
    } catch {
      setResult({ success: false, error: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  // Confirmation state
  if (result?.success) {
    return (
      <section id="book" className="py-32 px-6 bg-[#faf7f2]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
            <div className="w-24 h-24 rounded-full bg-[#e8f4ec] flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} className="text-[#4a7c59]" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-display text-4xl text-[#1a1a1a] mb-4">You&apos;re booked, {name.split(' ')[0]}.</h2>
            <p className="text-[#6b7280] font-light text-lg mb-6 leading-relaxed">
              We&apos;ll match you with your therapist and confirm your {sessionType === 'online' ? 'online' : 'in-person'} session on <strong>{selectedDate ? formatDate(selectedDate) : ''}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59]/10 border border-[#4a7c59]/20 mb-8">
              <span className="text-[#4a7c59] text-xs font-bold uppercase tracking-widest">Ref: {result.referenceId}</span>
            </div>
            <p className="text-[#9ca3af] text-sm">A confirmation will be sent to <strong>{email}</strong>. Check WhatsApp too.</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6">
            <ShieldCheck size={14} className="text-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Safe Space</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-6 tracking-tight">
            Take your <span className="italic text-[#4a7c59]">first step</span>
          </h2>
          <p className="text-[#6b7280] font-light max-w-lg mx-auto leading-relaxed text-lg">
            We match you with a specialist within 2 hours. Your journey is handled with absolute privacy.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] p-1 shadow-[0_10px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="bg-[#faf7f2] rounded-[2.8rem] p-8 md:p-12 relative z-10">

            {/* Progress */}
            <div className="flex justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-700 ${s <= step ? 'w-12 bg-[#4a7c59]' : 'w-4 bg-[#e5e0d5]'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* STEP 1 — Session Type */}
              {step === 1 && (
                <motion.div key="s1" variants={cv} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">How would you like to meet?</h3>
                    <p className="text-[#6b7280] text-sm font-light">Select a format that feels most comfortable.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['online', 'offline'] as const).map((type) => (
                      <button key={type} onClick={() => setSessionType(type)}
                        className={`p-8 rounded-[2rem] border-2 transition-all duration-500 text-left ${sessionType === type ? 'border-[#4a7c59] bg-[#e8f4ec]' : 'border-white bg-white hover:border-[#f0ebe3]'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all ${sessionType === type ? 'bg-[#4a7c59] text-white' : 'bg-[#faf7f2] text-[#4a7c59]'}`}>
                          {type === 'online' ? <Laptop size={24} /> : <Hospital size={24} />}
                        </div>
                        <h4 className="font-display text-xl mb-1 text-[#1a1a1a]">{type === 'online' ? 'Online Session' : 'In-Person'}</h4>
                        <p className="text-sm text-[#6b7280] font-light">{type === 'online' ? 'Secure video or chat from anywhere.' : 'Visit our serene clinic in Sonipat.'}</p>
                      </button>
                    ))}
                  </div>
                  {sessionType === 'offline' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/50 rounded-2xl border border-[#f0ebe3] flex items-center gap-4">
                      <MapPin size={18} className="text-[#4a7c59] shrink-0" />
                      <p className="text-xs text-[#6b7280] font-light">Sector 15, Sonipat · Mon–Sat · 09:00–19:00</p>
                    </motion.div>
                  )}
                  <button disabled={!sessionType} onClick={() => setStep(2)}
                    className="w-full py-5 rounded-full bg-[#4a7c59] text-white font-medium disabled:opacity-30 transition-all hover:bg-[#3d6649] flex items-center justify-center gap-2 group">
                    Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Therapist */}
              {step === 2 && (
                <motion.div key="s2" variants={cv} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">Choose your therapist</h3>
                    <p className="text-[#6b7280] text-sm font-light">Or let us find the best match for you.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button onClick={() => setTherapistId('auto')}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${therapistId === 'auto' ? 'border-[#4a7c59] bg-[#e8f4ec]' : 'border-white bg-white hover:border-[#f0ebe3]'}`}>
                      <p className="font-medium text-[#1a1a1a] text-sm">✨ Best match for me</p>
                      <p className="text-xs text-[#6b7280] font-light mt-1">We&apos;ll pair you based on your concern</p>
                    </button>
                    {THERAPISTS.map((t) => (
                      <button key={t.id} onClick={() => setTherapistId(t.id)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${therapistId === t.id ? 'border-[#4a7c59] bg-[#e8f4ec]' : 'border-white bg-white hover:border-[#f0ebe3]'}`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: t.color }}>
                          {t.initial}
                        </div>
                        <div>
                          <p className="font-medium text-[#1a1a1a] text-sm">{t.name}</p>
                          <p className="text-[10px] text-[#6b7280] font-light">{t.speciality}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(1)} className="px-8 py-5 rounded-full border border-[#f0ebe3] text-[#6b7280] hover:bg-white transition-colors">Back</button>
                    <button onClick={() => setStep(3)} className="flex-1 py-5 rounded-full bg-[#4a7c59] text-white hover:bg-[#3d6649] transition-colors flex items-center justify-center gap-2 group">
                      Pick a time <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Date & Time */}
              {step === 3 && (
                <motion.div key="s3" variants={cv} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">Pick a date & time</h3>
                    <p className="text-[#6b7280] text-sm font-light">
                      {sessionType === 'offline' ? 'In-person · Mon–Sat · 09:00–19:00' : 'Online · Any day · 08:00–21:00'}
                    </p>
                  </div>

                  {/* Date grid */}
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {dates.map((d, i) => {
                      const isSunOffline = sessionType === 'offline' && d.getDay() === 0
                      const isSelected = selectedDate?.toDateString() === d.toDateString()
                      return (
                        <button key={i} disabled={isSunOffline} onClick={() => { setSelectedDate(d); setSelectedTime('') }}
                          title={isSunOffline ? 'Clinic closed Sundays' : ''}
                          className={`p-2 rounded-xl text-center transition-all text-xs ${isSelected ? 'bg-[#4a7c59] text-white' : isSunOffline ? 'opacity-30 cursor-not-allowed bg-white' : 'bg-white hover:border-[#4a7c59] border border-[#f0ebe3]'}`}>
                          <div className="font-medium">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                          <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-[#1a1a1a]'}`}>{d.getDate()}</div>
                          <div className={isSelected ? 'text-white/70' : 'text-[#9ca3af]'}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      {slots.length === 0 ? (
                        <p className="text-center text-[#6b7280] text-sm py-4">No slots available on this day.</p>
                      ) : (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {slots.map((slot) => (
                            <button key={slot.time} disabled={!slot.available} onClick={() => setSelectedTime(slot.time)}
                              className={`py-2.5 rounded-xl text-xs font-medium transition-all ${selectedTime === slot.time ? 'bg-[#4a7c59] text-white' : slot.available ? 'bg-white border border-[#f0ebe3] hover:border-[#4a7c59] text-[#1a1a1a]' : 'bg-[#f0ebe3] text-[#9ca3af] cursor-not-allowed'}`}>
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(2)} className="px-8 py-5 rounded-full border border-[#f0ebe3] text-[#6b7280] hover:bg-white transition-colors">Back</button>
                    <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)}
                      className="flex-1 py-5 rounded-full bg-[#4a7c59] text-white hover:bg-[#3d6649] disabled:opacity-30 transition-colors flex items-center justify-center gap-2 group">
                      Your details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Personal Details */}
              {step === 4 && (
                <motion.div key="s4" variants={cv} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">Almost there</h3>
                    <p className="text-[#6b7280] text-sm font-light">Your details are kept 100% confidential.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7c59]/60">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                        <input value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                          type="text" placeholder="Akhil Sharma"
                          className={`w-full bg-white border rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-[#f0ebe3] focus:border-[#4a7c59]'}`} />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7c59]/60">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                        <input value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                          type="email" placeholder="you@care.com"
                          className={`w-full bg-white border rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-[#f0ebe3] focus:border-[#4a7c59]'}`} />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7c59]/60">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a7c59]" />
                      <input value={phone} onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                        type="tel" placeholder="+91 10-digit number"
                        className={`w-full bg-white border rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors ${errors.phone ? 'border-red-400' : 'border-[#f0ebe3] focus:border-[#4a7c59]'}`} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7c59]/60">Main Concern</label>
                    <select value={concern} onChange={e => { setConcern(e.target.value); setErrors(p => ({ ...p, concern: '' })) }}
                      className={`w-full bg-white border rounded-2xl py-4 px-6 outline-none transition-colors appearance-none ${errors.concern ? 'border-red-400' : 'border-[#f0ebe3] focus:border-[#4a7c59]'}`}>
                      <option value="">Select a concern...</option>
                      {CONCERNS.map(c => <option key={c}>{c}</option>)}
                    </select>
                    {errors.concern && <p className="text-red-500 text-xs">{errors.concern}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a7c59]/60">Anything else? <span className="normal-case font-normal text-[#9ca3af]">(optional)</span></label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-4 top-4 text-[#4a7c59]" />
                      <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us a little about your journey..."
                        className="w-full bg-white border border-[#f0ebe3] rounded-[2rem] py-4 pl-12 pr-6 outline-none focus:border-[#4a7c59] transition-colors resize-none" />
                    </div>
                  </div>

                  {result?.error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <RefreshCw size={16} className="text-red-500 shrink-0" />
                      <p className="text-red-600 text-sm">{result.error}</p>
                      <button onClick={() => setResult(null)} className="ml-auto text-red-400 hover:text-red-600 text-xs underline">Retry</button>
                    </div>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setStep(3)} className="px-8 py-5 rounded-full border border-[#f0ebe3] text-[#6b7280] hover:bg-white transition-colors">Back</button>
                    <button onClick={handleSubmit} disabled={submitting}
                      className="flex-1 py-5 rounded-full bg-[#4a7c59] text-white shadow-[0_15px_40px_rgba(74,124,89,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-60 transition-all flex items-center justify-center gap-2">
                      {submitting ? <><Loader2 size={18} className="animate-spin" /> Booking...</> : 'Complete Booking'}
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-[#6b7280] font-light">
                    By clicking complete, you agree to our 100% confidential patient charter.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4a7c59]/5 rounded-bl-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
