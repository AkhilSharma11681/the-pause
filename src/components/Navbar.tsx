'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#how-it-works', label: 'How it works', num: '01' },
  { href: '#therapists', label: 'Therapists', num: '02' },
  { href: '#pricing', label: 'Pricing', num: '03' },
  { href: '#faq', label: 'FAQ', num: '04' },
  { href: '/auth', label: 'My Portal', num: '05' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-[#faf7f2]"
          >
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a7c59]/8 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4843a]/6 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col px-8 md:px-20 pt-28 pb-10 max-w-6xl mx-auto">

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-6 py-4 md:py-5 border-b border-[#e8e3da] hover:border-[#4a7c59]/40 transition-colors duration-300"
                    >
                      <span className="text-[11px] text-[#c4bfb8] font-mono tabular-nums w-5 shrink-0 group-hover:text-[#4a7c59] transition-colors duration-300">
                        {link.num}
                      </span>
                      <motion.span
                        className="font-display text-3xl md:text-5xl text-[#1a1a1a] group-hover:text-[#4a7c59] transition-colors duration-300 leading-none"
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-auto text-[#4a7c59] text-xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </motion.span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
              >
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-[#3d6649] transition-all hover:shadow-xl hover:shadow-[#4a7c59]/25 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Book a Session →
                </a>
                <div className="flex items-center gap-6">
                  <a href="/admin/login" onClick={() => setOpen(false)} className="text-xs text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                    Doctor Login
                  </a>
                  <span className="text-[10px] text-[#d1cdc7] hidden md:block">© 2026 The Pause · Care that breathes.</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
