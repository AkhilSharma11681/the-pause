'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center overflow-hidden">

      {/* Rich layered background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large green glow top-right */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.18) 0%, transparent 70%)' }}
        />
        {/* Warm amber glow bottom-left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: 'easeInOut'}}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,132,58,0.12) 0%, transparent 70%)' }}
        />
        {/* Center soft glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(74,124,89,0.07) 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">

        {/* Glassmorphism badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(74,124,89,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#4a7c59]">
              Psychological Care · Online & In-Person
            </span>
          </div>
        </motion.div>

        {/* Pause symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1]}}
          className="flex justify-center gap-3 mb-10"
        >
          <motion.div
            animate={{ scaleY: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: 'easeInOut' }}
            className="w-3.5 rounded-full shadow-[0_4px_20px_rgba(74,124,89,0.3)]"
            style={{
              background: 'linear-gradient(180deg, #4a7c59 0%, #2d5a3d 100%)',
              height: 60,
              transformOrigin: 'center',
            }}
          />
          <motion.div
            animate={{ scaleY: [1, 0.8, 1] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: 'easeInOut' }}
            className="w-3.5 rounded-full shadow-[0_4px_20px_rgba(74,124,89,0.3)]"
            style={{
              background: 'linear-gradient(180deg, #4a7c59 0%, #2d5a3d 100%)',
              height: 60,
              transformOrigin: 'center',
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-[1.05] mb-8 tracking-tight"
        >
          You don&apos;t need<br />
          to <span className="italic text-[#4a7c59]">be fixed.</span><br />
          You need to<br />
          be heard.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8}}
          className="text-[#6b7280] text-lg md:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed"
        >
          A calm, private space to work through anxiety, burnout, relationships and more — with certified psychologists.
        </motion.p>

        {/* CTA buttons — glassmorphism style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8}}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <a href="#book"
            className="relative group inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-4 rounded-full text-[15px] font-bold shadow-[0_8px_32px_rgba(74,124,89,0.35)] hover:shadow-[0_12px_40px_rgba(74,124,89,0.5)] hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
          >
            <span className="relative z-10">Book Your First Session</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-[#4a7c59] border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white/60 hover:-translate-y-1 transition-transform duration-300"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3 text-[#9ca3af] text-[11px] uppercase tracking-widest font-medium"
        >
          <span>Sessions from ₹1,500</span>
          <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
          <span>No waitlists</span>
          <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
          <span>100% confidential</span>
        </motion.div>

        {/* Floating glass card — social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Social proof card */}
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex -space-x-2">
              {['#4a7c59', '#2d5a3d', '#6a9e78', '#4a7c59'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                  {['P', 'A', 'S', 'R'][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-[#1a1a1a] leading-none mb-0.5">2,400+ sessions completed</p>
              <p className="text-[11px] text-[#6b7280] leading-none">Trusted by patients across India</p>
            </div>
            <div className="flex items-center gap-0.5 ml-2">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#d4843a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
          </div>

          {/* Location pill */}
          <a
            href="https://maps.google.com/?q=Flat+26+REHAYASHI+APARTMENT+Pocket+7+Sector+12+Dwarka+New+Delhi+110078"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-4 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/70 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#e8f4ec] flex items-center justify-center shrink-0 group-hover:bg-[#4a7c59] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[12px] font-semibold text-[#1a1a1a] leading-none mb-0.5">Sector 12 Dwarka, New Delhi</p>
              <p className="text-[10px] text-[#6b7280] leading-none">Flat 26, REHAYASHI APARTMENT · 110078</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute top-[25%] right-[12%] w-2 h-2 rounded-full bg-[#4a7c59]/20"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute bottom-[25%] left-[8%] w-3 h-3 rounded-full bg-[#d4843a]/15"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute top-[60%] right-[8%] w-1.5 h-1.5 rounded-full bg-[#4a7c59]/15"
      />
    </section>
  )
}
