'use client'
import { motion } from 'framer-motion'
import { Brain, Heart, Baby, Users, ClipboardList, ArrowRight, MessageCircle } from 'lucide-react'

const PLANS = [
  {
    icon: Brain,
    session: 'Individual Session',
    name: 'Clinical Psychologist',
    price: '₹1,800',
    desc: 'Evidence-based therapy for complex mental health conditions.',
    whatsapp: false,
  },
  {
    icon: Heart,
    session: 'Individual Session',
    name: 'Counselling Psychologist',
    price: '₹1,500',
    desc: 'Supportive counselling for stress, anxiety, and life challenges.',
    whatsapp: false,
  },
  {
    icon: Baby,
    session: 'Individual Session',
    name: 'Child & Adolescent Psychologist',
    price: '₹1,500',
    desc: 'Specialised care for children and teens navigating growth.',
    whatsapp: false,
  },
  {
    icon: Users,
    session: 'Couple & Family',
    name: 'Couple Counselling & Family Therapy',
    price: '₹3,500',
    desc: 'Rebuild connection and resolve conflict together.',
    whatsapp: false,
  },
  {
    icon: ClipboardList,
    session: 'Assessment',
    name: 'Psychological Assessment',
    price: null,
    desc: 'Comprehensive evaluations tailored to your specific needs.',
    whatsapp: true,
  },
]

function scrollToBook(e: React.MouseEvent) {
  e.preventDefault()
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(74,124,89,0.05)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Session Pricing</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-4 tracking-tight"
          >
            Transparent, <span className="italic text-[#4a7c59]">honest</span> pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#6b7280] font-light text-lg max-w-md mx-auto"
          >
            Pay per session. No subscriptions, no hidden fees.
          </motion.p>
        </div>

        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {PLANS.slice(0, 3).map((plan, i) => (
            <Card key={i} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[66%] mx-auto">
          {PLANS.slice(3).map((plan, i) => (
            <Card key={i + 3} plan={plan} index={i + 3} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#9ca3af] font-light mt-12"
        >
          All sessions are 50 minutes · 100% confidential · Conducted by verified professionals
        </motion.p>
      </div>
    </section>
  )
}

function Card({ plan, index }: { plan: typeof PLANS[0]; index: number }) {
  const Icon = plan.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group bg-white rounded-[2.5rem] p-8 flex flex-col gap-5 border border-[#f0ebe3] hover:border-[#4a7c59]/30 hover:shadow-[0_20px_50px_rgba(74,124,89,0.08)] transition-all duration-500"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-[#e8f4ec] flex items-center justify-center shrink-0">
        <Icon size={22} className="text-[#4a7c59]" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#4a7c59]/70 mb-1">
          {plan.session}
        </p>
        <h3 className="font-display text-xl text-[#1a1a1a] leading-snug mb-2">
          {plan.name}
        </h3>
        <p className="text-sm text-[#6b7280] font-light leading-relaxed">
          {plan.desc}
        </p>
      </div>

      {/* Price */}
      <div>
        {plan.price ? (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#4a7c59] tracking-tight">{plan.price}</span>
            <span className="text-sm text-[#9ca3af] font-light">/ session</span>
          </div>
        ) : (
          <p className="text-lg font-semibold text-[#4a7c59]">Custom Pricing</p>
        )}
      </div>

      {/* CTA */}
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
          href="#book"
          onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="w-full py-3.5 rounded-full bg-[#4a7c59] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#3d6649] transition-colors group/btn"
        >
          Book Session <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      )}
    </motion.div>
  )
}
