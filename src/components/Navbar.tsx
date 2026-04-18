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
              : 'bg-white/50 backdrop-blur-xl border border-white/40'
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
            <button
              onClick={() => setOpen(o => !o)}
              className="relative w-9 h-9 rounded-full bg-[#f0ebe3] flex flex-col items-center justify-center gap-[5px] hover:bg-[#4a7c59]/10 transition-colors"
              aria-label="Menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-4 h-[1.5px] bg-[#1a1a1a] rounded-full origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-[1.5px] bg-[#1a1a1a] rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-4 h-[1.5px] bg-[#1a1a1a] rounded-full origin-center"
              />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Full screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 52px) 52px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#faf7f2] flex flex-col"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4a7c59]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#d4843a]/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full px-8 md:px-16 pt-28 pb-10">

              {/* Main nav links */}
              <nav className="flex-1 flex flex-col justify-center gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-3 border-b border-[#e8e3da] hover:border-[#4a7c59] transition-all duration-300"
                    >
                      <span className="text-[11px] text-[#9ca3af] font-mono w-6 group-hover:text-[#4a7c59] transition-colors">
                        {link.num}
                      </span>
                      <span className="font-display text-4xl md:text-6xl text-[#1a1a1a] group-hover:text-[#4a7c59] transition-colors duration-300 leading-none">
                        {link.label}
                      </span>
                      <span className="ml-auto text-[#4a7c59] opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300 text-2xl">
                        →
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center justify-between pt-6"
              >
                <a href="#book" onClick={() => setOpen(false)}
                  className="bg-[#4a7c59] text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-[#3d6649] transition-all hover:shadow-xl hover:shadow-[#4a7c59]/20 hover:-translate-y-0.5">
                  Book a Session
                </a>
                <div className="flex items-center gap-6">
                  <a href="/admin/login" onClick={() => setOpen(false)}
                    className="text-xs text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                    Doctor Login
                  </a>
                  <p className="text-xs text-[#d1cdc7] hidden md:block">© 2026 The Pause</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
