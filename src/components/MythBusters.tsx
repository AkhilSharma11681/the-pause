'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Sparkles, RefreshCw, ArrowRight } from 'lucide-react'

const myths = [
  {
    myth: "Therapy is only for people with 'serious' clinical issues.",
    fact: "Therapy is for everyone. It's mental fitness—building resilience before a crisis happens.",
    color: "#e8f4ec",
    tag: "Misconception #1"
  },
  {
    myth: "I can just talk to my friends instead of a therapist.",
    fact: "Friends are support; therapists are clinical experts providing unbiased, evidence-based tools.",
    color: "#f5f0e8",
    tag: "Misconception #2"
  },
  {
    myth: "Modern therapy will last for years and years.",
    fact: "Our goal is tool-building. Many see significant shifts in just 8 to 12 targeted sessions.",
    color: "#f0f4f8",
    tag: "Misconception #3"
  },
  {
    myth: "I have to talk about my childhood in session.",
    fact: "We focus on what you need now. Modern therapy is heavily focused on your present life.",
    color: "#fef3e8",
    tag: "Misconception #4"
  }
]

export default function MythBusters() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      {/* Background Ambient Beam */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4a7c59]/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-[#f0ebe3] mb-8"
          >
            <HelpCircle size={14} className="text-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[11px] tracking-[0.3em] uppercase font-black">Perspective</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-8xl text-[#1a1a1a] mb-10 tracking-tight leading-[0.95]"
          >
            Unmasking the <br /><span className="italic text-[#4a7c59] serif">silent truth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#6b7280] font-light max-w-2xl mx-auto leading-relaxed text-2xl"
          >
            Breaking the stigma starts with clarity. We&apos;re here to peel back the labels and reveal the reality of care.
          </motion.p>
        </div>

        {/* The "Masterpiece" Myth Slide Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Myths Menu */}
          <div className="space-y-4">
            {myths.map((m, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full p-8 rounded-[2rem] text-left transition-all duration-500 relative overflow-hidden group border ${
                  active === i ? 'bg-[#4a7c59] border-[#4a7c59] shadow-2xl' : 'bg-white border-[#f0ebe3] hover:border-[#4a7c59]/30'
                }`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <span 
                      className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block ${
                        active === i ? 'text-white/60' : 'text-[#4a7c59]'
                      }`}
                    >
                      {m.tag}
                    </span>
                    <h3 
                      className={`font-display text-2xl leading-none transition-colors ${
                        active === i ? 'text-white' : 'text-[#1a1a1a]'
                      }`}
                    >
                      {m.myth}
                    </h3>
                  </div>
                  {active !== i && (
                    <ArrowRight 
                      size={20} 
                      className="text-[#4a7c59] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" 
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: The Fact Reveal (Oracle Reveal) */}
          <div className="relative h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="absolute inset-0 rounded-[4rem] p-16 flex flex-col justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white relative overflow-hidden group bg-white"
              >
                {/* Internal Card Mesh */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-125"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${myths[active].color} 0%, white 100%)` }}
                />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-[#4a7c59] flex items-center justify-center text-white mb-12 shadow-xl shadow-[#4a7c59]/20">
                    <Sparkles size={36} fill="white" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.4em] text-[#4a7c59] font-black mb-6 block">The Reality</span>
                  <p className="font-display text-4xl md:text-5xl text-[#1a1a1a] leading-tight tracking-tight mb-8">
                    &quot;{myths[active].fact}&quot;
                  </p>
                  <p className="text-[#6b7280] font-light text-lg italic opacity-60">
                    Our evidence-based approach centers on long-term resilience, not just temporary fixes.
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#4a7c59]/20" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#4a7c59]/5 rounded-full blur-3xl" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        {/* Global Stats bar for attractiveness */}
        <div className="mt-32 pt-16 border-t border-[#f0ebe3] grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-display text-[#1a1a1a]">120+</p>
            <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] font-bold mt-2">Clinical Methods</p>
          </div>
          <div>
            <p className="text-4xl font-display text-[#1a1a1a]">4.9/5</p>
            <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] font-bold mt-2">Patient Trust</p>
          </div>
          <div>
            <p className="text-4xl font-display text-[#1a1a1a]">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] font-bold mt-2">Confidentiality</p>
          </div>
          <div>
            <p className="text-4xl font-display text-[#1a1a1a]">24/7</p>
            <p className="text-[10px] uppercase tracking-widest text-[#4a7c59] font-bold mt-2">Specialist Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}
