'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-32">
      {/* Soft Ambient Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4a7c59]/5 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4843a]/5 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Iconic Pause Symbol - From Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center gap-3 mb-12"
        >
          <motion.div 
            animate={{ height: [60, 72, 60] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-16 bg-[#4a7c59] rounded-full shadow-[0_4px_20px_rgba(74,124,89,0.2)]"
          />
          <motion.div 
            animate={{ height: [72, 60, 72] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-4 h-16 bg-[#4a7c59] rounded-full shadow-[0_4px_20px_rgba(74,124,89,0.2)]"
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#4a7c59] text-[11px] tracking-[0.4em] uppercase font-bold mb-8 font-sans"
        >
          Psychological Care &nbsp;·&nbsp; Online & In-Person
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-8xl text-[#1a1a1a] leading-[1.1] mb-10 tracking-tight"
        >
          You don&apos;t need <br />
          to <span className="italic text-[#4a7c59] serif font-medium italic">be fixed.</span> <br />
          You need to <br />
          be heard.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#6b7280] text-lg md:text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          A calm, private space to work through anxiety, burnout, relationships and more — with certified psychologists.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center items-center mb-10"
        >
          <a href="#book" className="bg-[#4a7c59] text-white px-10 py-5 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Book Your First Session
          </a>
          <a href="#how" className="bg-transparent text-[#4a7c59] px-10 py-5 rounded-full text-base font-bold border-2 border-[#4a7c59]/20 hover:border-[#4a7c59] transition-all duration-300">
            See How It Works
          </a>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[#9ca3af] text-[11px] uppercase tracking-widest font-medium"
        >
          First session from ₹499 &nbsp;·&nbsp; No waitlists &nbsp;·&nbsp; 100% confidential
        </motion.p>
      </div>

      {/* Decorative Floating particles */}
      <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-[#4a7c59]/20 animate-pulse" />
      <div className="absolute bottom-[30%] left-[10%] w-3 h-3 rounded-full bg-[#d4843a]/10 animate-bounce" style={{ animationDuration: '4s' }} />
    </section>
  )
}