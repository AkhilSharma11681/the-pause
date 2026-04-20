'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import TherapyPath from './TherapyPath'
import CommunityPath from './CommunityPath'

const COMMUNITY_IDS = new Set(['workshops', 'communities'])
const THERAPY_IDS   = new Set(['individual', 'counselling', 'teen', 'couples', 'assessment', 'pricing'])

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState<'therapy' | 'community'>('therapy')
  const [pendingHash, setPendingHash] = useState<string>('')

  // Step 1 — on mount, determine which tab to show and which hash to scroll to
  useEffect(() => {
    const stored = sessionStorage.getItem('scrollTo') || ''
    const hash = window.location.hash.slice(1) || stored
    if (stored) sessionStorage.removeItem('scrollTo')

    if (COMMUNITY_IDS.has(hash)) {
      setActive('community')
      setPendingHash(hash)
    } else if (THERAPY_IDS.has(hash)) {
      setActive('therapy')
      setPendingHash(hash)
    } else if (searchParams.get('path') === 'community') {
      setActive('community')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Listen for same-page nav events dispatched by Navbar when already on /services
  useEffect(() => {
    function onNavScrollTo(e: Event) {
      const hash = (e as CustomEvent<{ hash: string }>).detail.hash
      if (!hash) return
      if (COMMUNITY_IDS.has(hash)) {
        setActive('community')
        setPendingHash(hash)
      } else if (THERAPY_IDS.has(hash)) {
        setActive('therapy')
        setPendingHash(hash)
      } else {
        // Not a tab-specific hash — just scroll directly
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      }
    }
    window.addEventListener('nav:scrollto', onNavScrollTo)
    return () => window.removeEventListener('nav:scrollto', onNavScrollTo)
  }, [])

  // Step 2 — after tab renders, scroll to the pending hash
  // 200ms delay so user sees page top first, then smooth scroll
  useEffect(() => {
    if (!pendingHash) return
    const timer = setTimeout(() => {
      const el = document.getElementById(pendingHash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // Retry for late-rendered elements
        setTimeout(() => {
          document.getElementById(pendingHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
      setPendingHash('')
    }, 200)
    return () => clearTimeout(timer)
  }, [active, pendingHash])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* ── Hero / Path Selector ── */}
      <section className="relative bg-[#faf7f2] pt-36 pb-0 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(212,132,58,0.08) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(74,124,89,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#4a7c59]">Choose Your Path</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl text-[#1a1a1a] text-center leading-[1.05] mb-6 tracking-tight"
          >
            What brings<br />you <span className="italic text-[#4a7c59]">here?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#6b7280] text-lg font-light text-center max-w-xl mx-auto mb-14 leading-relaxed"
          >
            Whether you&apos;re ready to book a session or just starting to explore — there&apos;s a place for you here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {/* Path A */}
            <motion.button
              onClick={() => setActive('therapy')}
              whileTap={{ scale: 0.98 }}
              className={`group relative rounded-[2.5rem] p-8 text-left transition-all duration-500 border-2 overflow-hidden ${
                active === 'therapy'
                  ? 'border-[#4a7c59] bg-[#4a7c59] text-white shadow-[0_20px_60px_rgba(74,124,89,0.3)]'
                  : 'border-[#f0ebe3] bg-white hover:border-[#4a7c59]/40 hover:shadow-[0_12px_40px_rgba(74,124,89,0.08)]'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${active === 'therapy' ? 'bg-white/20' : 'bg-[#e8f4ec]'}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke={active === 'therapy' ? 'white' : '#4a7c59'}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${active === 'therapy' ? 'text-white/70' : 'text-[#4a7c59]/60'}`}>Path A</div>
              <h2 className={`font-display text-2xl mb-2 ${active === 'therapy' ? 'text-white' : 'text-[#1a1a1a]'}`}>Therapy</h2>
              <p className={`text-sm font-light leading-relaxed ${active === 'therapy' ? 'text-white/80' : 'text-[#6b7280]'}`}>
                Individual sessions with certified psychologists. Book online or in-person.
              </p>
              {active === 'therapy' && <motion.div layoutId="active-indicator" className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white" />}
            </motion.button>

            {/* Path B */}
            <motion.button
              onClick={() => setActive('community')}
              whileTap={{ scale: 0.98 }}
              className={`group relative rounded-[2.5rem] p-8 text-left transition-all duration-500 border-2 overflow-hidden ${
                active === 'community'
                  ? 'border-[#d4843a] bg-[#d4843a] text-white shadow-[0_20px_60px_rgba(212,132,58,0.3)]'
                  : 'border-[#f0ebe3] bg-white hover:border-[#d4843a]/40 hover:shadow-[0_12px_40px_rgba(212,132,58,0.08)]'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${active === 'community' ? 'bg-white/20' : 'bg-[#fdf0e4]'}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke={active === 'community' ? 'white' : '#d4843a'}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${active === 'community' ? 'text-white/70' : 'text-[#d4843a]/60'}`}>Path B</div>
              <h2 className={`font-display text-2xl mb-2 ${active === 'community' ? 'text-white' : 'text-[#1a1a1a]'}`}>Workshops & Community</h2>
              <p className={`text-sm font-light leading-relaxed ${active === 'community' ? 'text-white/80' : 'text-[#6b7280]'}`}>
                Explore, learn, and connect. Workshops, group programs, and training opportunities.
              </p>
              {active === 'community' && <motion.div layoutId="active-indicator" className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white" />}
            </motion.button>
          </motion.div>
        </div>

        {/* Tab indicator */}
        <div className="max-w-3xl mx-auto mt-6 flex gap-4 px-1">
          <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${active === 'therapy' ? 'bg-[#4a7c59]' : 'bg-[#f0ebe3]'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${active === 'community' ? 'bg-[#d4843a]' : 'bg-[#f0ebe3]'}`} />
        </div>
      </section>

      {/* ── Path Content ── */}
      <AnimatePresence mode="wait">
        {active === 'therapy' ? (
          <motion.div key="therapy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <TherapyPath />
          </motion.div>
        ) : (
          <motion.div key="community" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <CommunityPath />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
