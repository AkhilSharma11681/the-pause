'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Target, Sparkles } from 'lucide-react'

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

export default function AboutHowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const pathLength = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  return (
    <section id="how-it-works" ref={containerRef} className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden" style={{ scrollMarginTop: '96px' }}>

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
          {/* Animated connector line */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col items-center"
              >
                {/* Large number watermark */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-display text-[120px] text-[#4a7c59]/5 font-bold select-none pointer-events-none group-hover:text-[#4a7c59]/10 transition-colors duration-700">
                  {step.number}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  className="w-28 h-28 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f0ebe3] flex items-center justify-center mb-10 relative z-10 transition-[box-shadow] duration-500 group-hover:shadow-[0_20px_50px_rgba(74,124,89,0.1)]"
                >
                  <div className="absolute inset-2 rounded-[2rem] opacity-20" style={{ backgroundColor: step.color }} />
                  <step.icon size={36} strokeWidth={1.2} className="text-[#4a7c59] relative z-20 group-hover:scale-110 transition-transform duration-500" />
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
                    {step.title}
                  </h3>
                  <p className="text-[#6b7280] font-light leading-relaxed text-sm md:text-[15px] max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>

                <div className="hidden md:block absolute top-14 -right-6 w-12 h-px bg-gradient-to-r from-[#4a7c59]/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/#book"
            className="inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-4 rounded-full text-[15px] font-bold shadow-[0_8px_32px_rgba(74,124,89,0.35)] hover:shadow-[0_12px_40px_rgba(74,124,89,0.5)] hover:-translate-y-1 transition-transform duration-300"
          >
            Book Your First Session
          </a>
          <a
            href="/#faq"
            className="text-sm text-[#6b7280] hover:text-[#4a7c59] transition-colors border-b border-[#6b7280]/20 pb-1"
          >
            Questions? Read our FAQ →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
