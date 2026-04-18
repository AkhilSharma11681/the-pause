'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#how-it-works', label: 'How it works', tag: 'Process', color: '#e8f4ec' },
  { href: '#therapists', label: 'Therapists', tag: 'Team', color: '#f5f0e8' },
  { href: '#pricing', label: 'Pricing', tag: 'Plans', color: '#f0f4f8' },
  { href: '#faq', label: 'FAQ', tag: 'Help', color: '#fef3e8' },
  { href: '/auth', label: 'My Portal', tag: 'Login', color: '#e8f4ec' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-2xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-2xl border border-[#e8e3da] shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
              : 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          }`}
        >
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex gap-[3px]">
              <div className="w-[5px] h-5 bg-[#4a7c59] rounded-full transition-transform duration-300 group-hover:scale-y-110" />
              <div className="w-[5px] h-5 bg-[#4a7c59] rounded-full transition-transform duration-300 group-hover:scale-y-125 delay-75" />
            </div>
            <span className="font-display text-[15px] text-[#1a1a1a] font-semibold tracking-tight">The Pause</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="#book" className="hidden sm:flex bg-[#4a7c59] text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-[#3d6649] transition-all hover:shadow-lg">
              Book Now
            </a>
            <button onClick={() => setOpen(o => !o)} className="w-9 h-9 rounded-full bg-[#f0ebe3] flex flex-col items-center justify-center gap-[5px] hover:bg-[#4a7c59]/10 transition-colors">
              <motion.span animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
              <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
              <motion.span animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] bg-[#faf7f2] flex flex-col"
          >
            {/* Ambient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/6 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4843a]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
              />
            </div>

            <div className="relative z-10 h-full flex flex-col px-6 md:px-20 pt-24 pb-10 max-w-5xl mx-auto w-full">

              {/* Top label */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] uppercase tracking-[0.3em] text-[#4a7c59] font-bold mb-8"
              >
                Navigation
              </motion.p>

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center gap-0">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative overflow-hidden"
                  >
                    {/* Hover background */}
                    <motion.div
                      animate={{ scaleX: hovered === i ? 1 : 0 }}
                      initial={{ scaleX: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ backgroundColor: link.color, originX: 0 }}
                      className="absolute inset-0 rounded-2xl"
                    />

                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="relative flex items-center gap-5 px-5 py-4 md:py-5 rounded-2xl group"
                    >
                      {/* Number */}
                      <motion.span
                        animate={{ color: hovered === i ? '#4a7c59' : '#c4bfb8' }}
                        className="text-[11px] font-mono w-5 shrink-0 tabular-nums"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>

                      {/* Label */}
                      <motion.span
                        animate={{ x: hovered === i ? 6 : 0, color: hovered === i ? '#4a7c59' : '#1a1a1a' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-3xl md:text-4xl lg:text-5xl leading-none"
                      >
                        {link.label}
                      </motion.span>

                      {/* Tag pill */}
                      <motion.span
                        animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -8 }}
                        transition={{ duration: 0.25 }}
                        className="ml-2 text-[10px] uppercase tracking-widest font-bold text-[#4a7c59] bg-[#4a7c59]/10 px-3 py-1 rounded-full"
                      >
                        {link.tag}
                      </motion.span>

                      {/* Arrow */}
                      <motion.span
                        animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -12 }}
                        transition={{ duration: 0.3 }}
                        className="ml-auto text-[#4a7c59] text-2xl font-light"
                      >
                        →
                      </motion.span>
                    </a>

                    {/* Divider */}
                    <motion.div
                      animate={{ scaleX: hovered === i ? 0 : 1, opacity: hovered === i ? 0 : 1 }}
                      className="h-px bg-[#e8e3da] mx-5"
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#e8e3da]"
              >
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="group relative inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-3.5 rounded-full text-sm font-bold overflow-hidden hover:-translate-y-0.5 transition-transform"
                >
                  <span className="relative z-10">Book a Session</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 text-base"
                  >
                    →
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
                <div className="flex items-center gap-6">
                  <a href="/admin/login" onClick={() => setOpen(false)} className="text-xs text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                    Doctor Login
                  </a>
                  <span className="text-[10px] text-[#d1cdc7] hidden md:block">© 2026 The Pause</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
