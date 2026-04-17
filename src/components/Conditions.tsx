'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, CloudRain, Flame, Heart, Leaf, Shield, Zap, RefreshCw, Sparkles, Flower2, Moon, Brain, LucideIcon, ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface CardProps {
  name: string
  icon: LucideIcon
  color: string
  iconColor: string
  desc: string
  span: string
}

const BentoCard = ({ name, icon: Icon, color, iconColor, desc, span }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-[3rem] p-8 flex flex-col justify-between transition-all duration-500 border border-white/40 shadow-sm ${span}`}
      style={{
        backgroundColor: color
      }}
    >
      {/* Texture & Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
      
      {/* Animated Gradient Spotlight */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`
        }}
      />

      {/* Top Section: Icon & Verified Badge */}
      <div className="flex justify-between items-start relative z-10">
        <motion.div 
          animate={{ rotate: isHovered ? 12 : 0, scale: isHovered ? 1.1 : 1 }}
          className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center"
        >
          <Icon size={28} color={iconColor} strokeWidth={1.2} />
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40"
            >
              <CheckCircle2 size={12} color={iconColor} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#1a1a1a]">Verified</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Text Content */}
      <div className="relative z-10">
        <h3 className="font-display text-2xl text-[#1a1a1a] mb-2 leading-none transition-colors duration-300 group-hover:text-[#4a7c59]">
          {name}
        </h3>
        <p className="text-[#6b7280] text-sm font-light leading-relaxed max-w-[200px] transition-all duration-300 group-hover:text-[#1a1a1a]">
          {desc}
        </p>
      </div>

      {/* Magnetic Arrow Indicator */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20 
        }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4a7c59]">
          <ArrowUpRight size={20} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Conditions() {
  const conditions = [
    { name: 'Anxiety', icon: Wind, color: '#e8f4ec', iconColor: '#4a7c59', desc: 'Step into calm waters.', span: 'col-span-2 row-span-2' },
    { name: 'Depression', icon: CloudRain, color: '#e8f0f4', iconColor: '#4a6d8c', desc: 'Journey back to light.', span: 'col-span-1 row-span-1' },
    { name: 'Burnout', icon: Flame, color: '#f4ede8', iconColor: '#c46d3a', desc: 'Restore your inner fire.', span: 'col-span-1 row-span-2' },
    { name: 'Grief', icon: Leaf, color: '#f4f0e8', iconColor: '#8a7a4a', desc: 'Patient honoring of loss.', span: 'col-span-1 row-span-1' },
    { name: 'Relationships', icon: Heart, color: '#f4e8f0', iconColor: '#b85c8a', desc: 'Healing human threads.', span: 'col-span-1 row-span-1' },
    { name: 'Trauma', icon: Shield, color: '#e8f4ec', iconColor: '#2d5a3d', desc: 'Clinical mending care.', span: 'col-span-2 row-span-1' },
    { name: 'Focus', icon: Zap, color: '#f4f4e8', iconColor: '#8a8a2a', desc: 'Mastering mental flow.', span: 'col-span-1 row-span-1' },
    { name: 'Habit', icon: RefreshCw, color: '#e8ecf4', iconColor: '#4a5a8c', desc: 'Unlocking life cycles.', span: 'col-span-1 row-span-1' },
    { name: 'Worth', icon: Sparkles, color: '#e8f4ec', iconColor: '#4a7c59', desc: 'Rediscover your gold.', span: 'col-span-1 row-span-1' },
  ]

  return (
    <section className="py-32 px-6 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#f0ebe3] mb-6 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-bold">Expertise</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl text-[#1a1a1a] mb-8 tracking-tight"
          >
            Clinical care for <br /><span className="italic text-[#4a7c59]">real</span> lives
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6b7280] font-light max-w-xl mx-auto leading-relaxed text-lg"
          >
            Whatever yours is, you don&apos;t have to face it alone. We specialize in the daily challenges of the human mind.
          </motion.p>
        </div>

        {/* Re-balanced Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[160px]">
          {conditions.map((c, i) => (
            <BentoCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}