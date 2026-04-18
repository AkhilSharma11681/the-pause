'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#how-it-works', label: 'How it works', desc: 'Our 3-step care process' },
  { href: '#therapists', label: 'Therapists', desc: 'Meet our specialists' },
  { href: '#pricing', label: 'Pricing', desc: 'Transparent, honest plans' },
  { href: '#faq', label: 'FAQ', desc: 'Common questions answered' },
  { href: '/auth', label: 'My Portal', desc: 'Your sessions & history' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4">
      <motion.div
        ref={ref}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl"
      >
        <nav className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl border border-[#e8e3da] shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
            : 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        }`}>
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
              <motion.span animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
              <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
              <motion.span animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-[14px] h-[1.5px] bg-[#1a1a1a] rounded-full" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#f0ebe3] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="p-2">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-[#f5f0e8] transition-all duration-150"
                  >
                    <div>
                      <p className="text-[13px] font-semibold text-[#1a1a1a] group-hover:text-[#4a7c59] transition-colors leading-none mb-0.5">{link.label}</p>
                      <p className="text-[11px] text-[#9ca3af] leading-none">{link.desc}</p>
                    </div>
                    <span className="text-[#4a7c59] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-sm">→</span>
                  </motion.a>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[#f0ebe3] flex items-center justify-between bg-[#faf7f2]/50">
                <a href="#book" onClick={() => setOpen(false)} className="text-[12px] font-bold text-white bg-[#4a7c59] px-4 py-2 rounded-full hover:bg-[#3d6649] transition-colors">
                  Book a Session
                </a>
                <a href="/admin/login" onClick={() => setOpen(false)} className="text-[11px] text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                  Doctor Login →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
