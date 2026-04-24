'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Target, Sparkles, LucideIcon } from 'lucide-react'

interface StepProps {
  number: string
  title: string
  desc: string
  icon: LucideIcon
  color: string
  index: number
  isLast: boolean
}

function StepCard({ number, title, desc, icon: Icon, color, index, isLast }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative"
    >
      {/* ── Mobile layout: horizontal row with number badge + vertical connector ── */}
      <div className="flex md:hidden items-start gap-5">

        {/* Left column: number + vertical line */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#4a7c59] flex items-center justify-center shadow-[0_4px_16px_rgba(74,124,89,0.25)] z-10">
            <span className="font-display text-white text-sm font-bold">{index + 1}</span>
          </div>
          {!isLast && (
            <div className="w-px flex-1 min-h-[64px] bg-gradient-to-b from-[#4a7c59]/30 to-transparent mt-2" />
          )}
        </div>

        {/* Right column: icon + text */}
        <div className="pb-10">
          <div
            className="w-14 h-14 rounded-2xl bg-white border border-[#f0ebe3] flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          >
            <div className="absolute inset-0 rounded-2xl opacity-20" style={{ backgroundColor: color }} />
            <Icon size={24} strokeWidth={1.4} className="text-[#4a7c59] relative z-10" />
          </div>
          <h3 className="font-display text-xl text-[#1a1a1a] mb-2 group-hover:text-[#4a7c59] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#6b7280] font-light leading-relaxed text-[15px] max-w-xs">
            {desc}
          </p>
        </div>
      </div>

      {/* ── Desktop layout: centered column (original) ── */}
      <div className="hidden md:flex flex-col items-center">
        {/* Watermark number */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-display text-[120px] text-[#4a7c59]/5 font-bold select-none pointer-events-none transition-colors duration-700 group-hover:text-[#4a7c59]/10 leading-none">
          {number}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
          className="w-28 h-28 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f0ebe3] flex items-center justify-center mb-10 relative z-10 transition-[box-shadow] duration-500 group-hover:shadow-[0_20px_50px_rgba(74,124,89,0.1)]"
        >
          <div className="absolute inset-2 rounded-[2rem] opacity-20" style={{ backgroundColor: color }} />
          <Icon size={36} strokeWidth={1.2} className="text-[#4a7c59] relative z-20 group-hover:scale-110 transition-transform duration-500" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="w-full h-full rounded-[2.6rem] border border-dashed border-[#4a7c59]/30" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="text-center relative z-10 px-4">
          <h3 className="font-display text-2xl text-[#1a1a1a] mb-4 group-hover:text-[#4a7c59] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#6b7280] font-light leading-relaxed text-[15px] max-w-xs mx-auto">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const pathLength = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  const steps = [
    {
      number: '01',
      title: 'Tell us what you need',
      desc: 'Share your thoughts in a private, gentle space. We listen without judgment.',
      icon: MessageCircle,
      color: '#e8f4ec',
    },
    {
      number: '02',
      title: 'Matched by heart',
      desc: 'We pair you with a specialist whose expertise aligns with your unique frequency.',
      icon: Target,
      color: '#f5f0e8',
    },
    {
      number: '03',
      title: 'Begin your healing',
      desc: 'Step into a rhythm of care that respects your pace and honors your growth.',
      icon: Sparkles,
      color: '#f0f4f8',
    },
  ]

  return (
    <section id="how-it-works" ref={containerRef} className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#4a7c59]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[#d4843a]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">The Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-6 tracking-tight leading-tight"
          >
            A path designed for <span className="italic text-[#4a7c59]">peace</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6b7280] font-light max-w-xl mx-auto leading-relaxed text-lg"
          >
            Transformation begins with a single, gentle step. We handle the complexity so you can focus on yourself.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line only */}
          <div className="hidden md:block absolute top-[56px] left-[15%] right-[15%] h-px z-0">
            <svg width="100%" height="2" fill="none">
              <motion.path
                d="M 0 1 H 1000"
                stroke="#4a7c59"
                strokeWidth="1"
                strokeDasharray="4 4"
                style={{ pathLength }}
                opacity="0.2"
              />
            </svg>
          </div>

          {/* Mobile: single column, no gap (spacing handled inside card via pb-10) */}
          {/* Desktop: 3-column grid */}
          <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <StepCard key={i} {...step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <a href="#book" className="text-sm text-[#6b7280] hover:text-[#4a7c59] transition-colors border-b border-[#6b7280]/20 pb-1">
            Questions? Speak with a coordinator →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
