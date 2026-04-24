'use client'
import { motion } from 'framer-motion'
import { Brain, Heart, Baby, Users, ClipboardList, ArrowRight, MessageCircle, ShieldCheck, Zap } from 'lucide-react'

// ── Plan data with explicit section ids ────────────────────────────────────
const PLANS = [
  {
    id: 'individual',
    icon: Brain,
    tag: 'Individual Session',
    name: 'Clinical Psychologist',
    price: '₹1,800',
    duration: '50 min',
    desc: 'Evidence-based therapy for complex mental health conditions — anxiety disorders, depression, OCD, and more.',
    highlights: ['CBT & DBT approaches', 'Diagnosis-informed care', 'Structured treatment plans'],
    whatsapp: false,
    popular: false,
  },
  {
    id: 'counselling',
    icon: Heart,
    tag: 'Individual Session',
    name: 'Counselling Psychologist',
    price: '₹1,500',
    duration: '50 min',
    desc: 'Supportive counselling for stress, anxiety, relationships, and life transitions.',
    highlights: ['Talk therapy', 'Mindfulness-based', 'Goal-oriented sessions'],
    whatsapp: false,
    popular: true,
  },
  {
    id: 'teen',
    icon: Baby,
    tag: 'Teen & Child Care',
    name: 'Child & Adolescent Psychologist',
    price: '₹1,500',
    duration: '50 min',
    desc: 'Specialised care for children and teens navigating school stress, identity, and emotional growth.',
    highlights: ['Play therapy', 'Parent guidance included', 'School coordination'],
    whatsapp: false,
    popular: false,
  },
  {
    id: 'couples',
    icon: Users,
    tag: 'Couples & Family',
    name: 'Couples & Family Therapy',
    price: '₹3,500',
    duration: '75 min',
    desc: 'Rebuild connection, resolve conflict, and strengthen bonds — together.',
    highlights: ['Gottman-informed', 'Communication tools', 'Joint & individual sessions'],
    whatsapp: false,
    popular: false,
  },
  {
    id: 'assessment',
    icon: ClipboardList,
    tag: 'Assessment',
    name: 'Psychological Assessment',
    price: null,
    duration: 'Varies',
    desc: 'Comprehensive evaluations for ADHD, learning disabilities, cognitive function, and more.',
    highlights: ['Detailed written report', 'Specialist referral if needed', 'School / workplace ready'],
    whatsapp: true,
    popular: false,
  },
]

const TRUST = [
  { icon: ShieldCheck, label: '100% confidential' },
  { icon: Zap, label: 'No waitlists' },
  { icon: ArrowRight, label: 'Matched at your pace' },
]

export default function TherapyPath() {
  return (
    <div>
      <section className="py-20 px-6 bg-[#faf7f2] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(74,124,89,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Book CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#4a7c59] rounded-[2.5rem] px-10 py-8 mb-16 shadow-[0_20px_60px_rgba(74,124,89,0.25)]"
          >
            <div>
              <p className="text-white/70 text-[11px] uppercase tracking-[0.25em] font-bold mb-1">Ready to start?</p>
              <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                Book your first session today.
              </h3>
              <p className="text-white/70 text-sm font-light mt-1">Sessions from ₹1,500 · No commitment required</p>
            </div>
            <a
              href="/#book"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-[#4a7c59] px-8 py-4 rounded-full text-[15px] font-bold hover:bg-[#f0ebe3] transition-colors shadow-lg group"
            >
              Book a Session
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-[#6b7280] text-sm">
                <t.icon size={15} className="text-[#4a7c59]" />
                <span>{t.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Section heading — anchor ids sit here so scroll lands at the cards */}
          <div
            id="individual"
            style={{ scrollMarginTop: '80px' }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Session Types & Pricing</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight"
            >
              Transparent, <span className="italic text-[#4a7c59]">honest</span> pricing
            </motion.h2>
            <p className="text-[#6b7280] font-light mt-3 text-lg">Pay per session. No subscriptions, no hidden fees.</p>
          </div>

          {/* Cards — each with its own id for direct anchor targeting */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.slice(0, 3).map((plan, i) => (
                <div key={plan.id} id={plan.id} style={{ scrollMarginTop: '80px' }}>
                  <PlanCard plan={plan} index={i} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[66%] mx-auto">
              {PLANS.slice(3).map((plan, i) => (
                <div key={plan.id} id={plan.id} style={{ scrollMarginTop: '80px' }}>
                  <PlanCard plan={plan} index={i + 3} />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-[#9ca3af] font-light mt-12">
            All sessions are conducted by verified, licensed professionals · 100% confidential
          </p>
        </div>
      </section>
    </div>
  )
}

function PlanCard({ plan, index }: { plan: typeof PLANS[0]; index: number }) {
  const Icon = plan.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`group relative bg-white rounded-[2.5rem] p-8 flex flex-col gap-5 border transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(74,124,89,0.08)] h-full ${
        plan.popular
          ? 'border-[#4a7c59]/40 shadow-[0_8px_30px_rgba(74,124,89,0.1)]'
          : 'border-[#f0ebe3] hover:border-[#4a7c59]/30'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4a7c59] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
          Most Popular
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-[#e8f4ec] flex items-center justify-center shrink-0">
          <Icon size={22} className="text-[#4a7c59]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#9ca3af] bg-[#faf7f2] px-3 py-1 rounded-full">
          {plan.duration}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#4a7c59]/70 mb-1">{plan.tag}</p>
        <h3 className="font-display text-xl text-[#1a1a1a] leading-snug mb-2">{plan.name}</h3>
        <p className="text-sm text-[#6b7280] font-light leading-relaxed mb-4">{plan.desc}</p>
        <ul className="space-y-1.5">
          {plan.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-[12px] text-[#6b7280]">
              <span className="w-1 h-1 rounded-full bg-[#4a7c59] shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {plan.price ? (
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-[#4a7c59] tracking-tight">{plan.price}</span>
            <span className="text-sm text-[#9ca3af] font-light">/ session</span>
          </div>
        ) : (
          <p className="text-lg font-semibold text-[#4a7c59] mb-4">Custom Pricing</p>
        )}
        {plan.whatsapp ? (
          <a
            href="https://wa.me/919560333537"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        ) : (
          <a
            href="/#book"
            className="w-full py-3.5 rounded-full bg-[#4a7c59] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#3d6649] transition-colors group/btn"
          >
            Book Session <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
