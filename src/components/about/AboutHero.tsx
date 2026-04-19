'use client'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative min-h-screen bg-[#faf7f2] flex flex-col justify-center overflow-hidden">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,132,58,0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-24">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(74,124,89,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#4a7c59]">
              Our Story
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-[82px] text-[#1a1a1a] leading-[1.04] mb-10 tracking-tight"
        >
          Why we paused<br />
          <span className="italic text-[#4a7c59]">everything</span> to<br />
          build this.
        </motion.h1>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="border-l-2 border-[#4a7c59]/40 pl-6 mb-12 max-w-2xl"
        >
          <p className="font-display text-xl md:text-2xl text-[#1a1a1a]/70 italic leading-relaxed">
            &ldquo;We kept meeting people who were struggling quietly — not because help didn&apos;t exist, but because the way it was offered felt cold, clinical, or out of reach.&rdquo;
          </p>
        </motion.div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl space-y-5 text-[#6b7280] text-lg font-light leading-relaxed"
        >
          <p>
            The Pause started with a simple, uncomfortable observation: India has one of the highest rates of untreated mental health conditions in the world — not because people don&apos;t want help, but because the system makes it hard to ask for it.
          </p>
          <p>
            Therapy felt like something you did only when things were catastrophically wrong. Clinics felt sterile. Costs felt prohibitive. And the stigma? Enormous.
          </p>
          <p>
            So we stopped. We paused. And we asked: what would a mental health space look like if it was designed around the person, not the diagnosis?
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-3 text-[#9ca3af] text-[11px] uppercase tracking-widest"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-[#4a7c59]/40 to-transparent"
          />
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-[30%] right-[10%] w-2 h-2 rounded-full bg-[#4a7c59]/20 animate-pulse" />
      <div className="absolute bottom-[20%] left-[6%] w-3 h-3 rounded-full bg-[#d4843a]/15 animate-bounce" style={{ animationDuration: '4s' }} />
    </section>
  )
}
