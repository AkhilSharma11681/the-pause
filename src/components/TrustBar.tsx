'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  const target = parseInt(value.replace(/,/g, '').replace(/[^\d]/g, ''))

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const startTime = performance.now()
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const ease = 1 - Math.pow(2, -10 * progress)
        setDisplayValue(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, target])

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>
}

export default function TrustBar() {
  const stats = [
    { value: '2400', suffix: '+', label: 'Sessions Completed' },
    { value: '98', suffix: '%', label: 'Client Satisfaction' },
    { value: '120', suffix: 'm', label: 'Avg. Response' },
    { value: '50', suffix: '+', label: 'Verified Experts' },
  ]

  return (
    <section className="bg-[#2d5a3d] py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#4a7c59]/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#5a8c69]/15 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative bg-white/[0.07] backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center overflow-hidden transition-colors duration-300 hover:bg-white/[0.1] hover:border-white/20">
                {/* Subtle glow behind number */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                
                {/* Number */}
                <p className="relative font-serif text-5xl md:text-6xl text-white mb-3 font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                
                {/* Label */}
                <p className="relative text-white/60 text-xs font-medium uppercase tracking-[0.15em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {stat.label}
                </p>
              </div>

              {/* Divider (hidden on last item and mobile) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-[1px] h-24 bg-white/15" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@500&display=swap" rel="stylesheet" />
    </section>
  )
}
