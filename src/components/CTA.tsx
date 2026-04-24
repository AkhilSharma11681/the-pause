'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-[#2d5a3d] relative overflow-hidden">
      {/* Moving Background Orbs */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-radial-gradient from-white/5 to-transparent rounded-full pointer-events-none" 
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-10"
        >
          <div className="w-2.5 h-12 bg-white/30 rounded-full" />
          <div className="w-2.5 h-12 bg-white/30 rounded-full" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-white leading-[1.1] mb-8 font-semibold tracking-tight"
        >
          Ready to take your pause?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
        >
          Your first step is just a click away. No long forms, no waiting — just care that breathes with you.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <a 
            href="#book" 
            className="group relative inline-flex items-center gap-3 bg-white text-[#2d5a3d] px-12 py-5 rounded-full text-base font-medium transition-transform duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Book a Session Today</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2d5a3d]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </a>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-white/40 text-sm mt-8 font-light tracking-wide uppercase"
        >
          From ₹499 · No subscription required · 100% Confidential
        </motion.p>
      </div>

      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </section>
  )
}