'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, MessageSquareQuote } from 'lucide-react'

const testimonials = [
  { 
    quote: "The Pause changed everything. My therapist actually understands the nuance of my culture.", 
    author: "Ananya", 
    age: "26", 
    tag: "Burnout",
    color: "#e8f4ec" 
  },
  { 
    quote: "Finally found a space where I didn't have to explain myself from scratch.", 
    author: "Rohan", 
    age: "31", 
    tag: "Depression",
    color: "#f5f0e8" 
  },
  { 
    quote: "Pricing is honest, therapists are real. No corporate feel at all. Just human-to-human care.", 
    author: "Meera", 
    age: "29", 
    tag: "Relationships",
    color: "#f4ede8" 
  },
  { 
    quote: "The environment is so calming. Even the booking feels like part of the healing.", 
    author: "Sid", 
    age: "34", 
    tag: "Work Stress",
    color: "#f0f4f8" 
  },
  { 
    quote: "I've tried many platforms, but the matching process here actually works. I felt at home.", 
    author: "Ishani", 
    age: "27", 
    tag: "Self-Esteem",
    color: "#e8f4ec" 
  },
  { 
    quote: "A transformative experience that centers the patient, not the profit.", 
    author: "Karan", 
    age: "38", 
    tag: "Identity",
    color: "#faf7f2" 
  },
]

export default function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Testimonials</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-6 tracking-tight leading-tight"
          >
            Voices of the <span className="italic text-[#4a7c59]">healed</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#6b7280] font-light max-w-xl mx-auto leading-relaxed text-lg"
          >
            Our community is built on trust and radical honesty. Read how The Pause has touched lives.
          </motion.p>
        </div>

        {/* Masonry-style Bento Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="break-inside-avoid"
            >
              <div 
                className="p-8 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border border-[#f0ebe3] group hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)]"
                style={{ backgroundColor: t.color }}
              >
                {/* Icons & Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <MessageSquareQuote size={20} className="text-[#4a7c59]" />
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className="text-[#d4843a] fill-[#d4843a]" />
                    ))}
                  </div>
                </div>

                <p className="text-[#1a1a1a] text-lg font-light leading-relaxed italic mb-10 relative z-10">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-display text-[#4a7c59] text-sm">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] font-semibold text-sm leading-none">{t.author}, {t.age}</p>
                      <p className="text-[#4a7c59] text-[10px] uppercase tracking-widest mt-1 opacity-60">{t.tag}</p>
                    </div>
                  </div>
                  
                  {/* Subtle checkmark/verified badge */}
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Star size={10} className="text-[#4a7c59]" />
                  </div>
                </div>

                {/* Decorative background shape */}
                <div 
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: '#4a7c59' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats overlay for attractiveness */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-[#f0ebe3] flex flex-wrap justify-center gap-12 md:gap-24"
        >
          <div className="text-center text-[#4a7c59]">
            <p className="text-3xl font-display font-bold">4.9/5</p>
            <p className="text-[10px] uppercase tracking-widest font-medium opacity-60">Avg. Rating</p>
          </div>
          <div className="text-center text-[#4a7c59]">
            <p className="text-3xl font-display font-bold">100%</p>
            <p className="text-[10px] uppercase tracking-widest font-medium opacity-60">Confidential</p>
          </div>
          <div className="text-center text-[#4a7c59]">
            <p className="text-3xl font-display font-bold">2k+</p>
            <p className="text-[10px] uppercase tracking-widest font-medium opacity-60">Lives Touched</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}