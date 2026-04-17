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
    <section className="bg-[#2d5a3d] py-16 relative overflow-hidden">
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
      />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <p className="font-display text-4xl md:text-5xl text-white mb-2 font-bold tracking-tight">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[#a8d5b5] text-[10px] md:text-xs font-light uppercase tracking-[0.25em]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}