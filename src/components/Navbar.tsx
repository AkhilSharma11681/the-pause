'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Calendar, Users, Tag, HelpCircle, User, Stethoscope } from 'lucide-react'

const links = [
  { href: '#how-it-works', label: 'How it works', icon: Calendar, desc: 'Our 3-step care process' },
  { href: '#therapists', label: 'Therapists', icon: Users, desc: 'Meet our specialists' },
  { href: '#pricing', label: 'Pricing', icon: Tag, desc: 'Transparent, honest plans' },
  { href: '#faq', label: 'FAQ', icon: HelpCircle, desc: 'Common questions answered' },
  { href: '/auth', label: 'My Portal', icon: User, desc: 'View your sessions & history', highlight: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-2xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/85 backdrop-blur-2xl border border-[#e8e3da] shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
              : 'bg-white/50 backdrop-blur-xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
          }`}
        >
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex gap-[3px]">
              <motion.div whileHover={{ scaleY: 1.2 }} className="w-[5px] h-5 bg-[#4a7c59] rounded-full" />
              <motion.div whileHover={{ scaleY: 1.3 }} className="w-[5px] h-5 bg-[#4a7c59] rounded-full" />
            </div>
            <span className="font-display text-[15px] text-[#1a1a1a] font-semibold tracking-tight">The Pause</span>
          </a>

          <div className="flex items-center gap-2">
            <a href="#book"
              className="hidden sm:flex items-center gap-1.5 bg-[#4a7c59] text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-[#3d6649] transition-all hover:shadow-lg hover:-translate-y-px">
              Book Now
            </a>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setOpen(true)}
              className="w-9 h-9 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-[#4a7c59]/10 transition-colors"
            >
              <Menu size={17} className="text-[#1a1a1a]" strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-[6px]"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[300px] flex flex-col overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #ffffff 0%, #faf7f2 100%)' }}
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#4a7c59]/8 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4a7c59]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#f0ebe3]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-[3px]">
                    <div className="w-[5px] h-5 bg-[#4a7c59] rounded-full" />
                    <div className="w-[5px] h-5 bg-[#4a7c59] rounded-full" />
                  </div>
                  <span className="font-display text-[15px] text-[#1a1a1a] font-semibold">The Pause</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-[#4a7c59]/10 transition-colors"
                >
                  <X size={15} strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
                {links.map((link, i) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 300, damping: 24 }}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                        link.highlight
                          ? 'bg-[#e8f4ec] hover:bg-[#4a7c59] text-[#4a7c59] hover:text-white'
                          : 'hover:bg-[#f5f0e8] text-[#1a1a1a]'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        link.highlight
                          ? 'bg-[#4a7c59]/15 group-hover:bg-white/20'
                          : 'bg-[#f0ebe3] group-hover:bg-[#4a7c59]/10'
                      }`}>
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold leading-none mb-0.5">{link.label}</p>
                        <p className={`text-[11px] leading-none truncate transition-colors ${
                          link.highlight ? 'text-[#4a7c59]/70 group-hover:text-white/70' : 'text-[#9ca3af]'
                        }`}>{link.desc}</p>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                    </motion.a>
                  )
                })}
              </nav>

              {/* CTA */}
              <div className="px-4 pb-4">
                <motion.a
                  href="#book"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#4a7c59] text-white text-[13px] font-bold hover:bg-[#3d6649] transition-all hover:shadow-lg hover:shadow-[#4a7c59]/20 active:scale-[0.98]"
                >
                  Book a Session
                  <ArrowRight size={14} />
                </motion.a>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#f0ebe3] flex items-center justify-between">
                <a href="/admin/login" onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 text-[11px] text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                  <Stethoscope size={12} />
                  Doctor Login
                </a>
                <p className="text-[10px] text-[#d1cdc7]">© 2026 The Pause</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
