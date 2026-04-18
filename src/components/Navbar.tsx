'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#therapists', label: 'Therapists' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
    { href: '/auth', label: 'My Portal', highlight: true },
    { href: '/admin/login', label: 'Doctor Login', subtle: true },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`pointer-events-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 w-full max-w-2xl ${
            scrolled
              ? 'bg-white/80 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              : 'bg-white/60 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex gap-1">
              <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full group-hover:scale-y-110 transition-transform duration-300" />
              <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full group-hover:scale-y-125 transition-transform duration-300 delay-75" />
            </div>
            <span className="font-display text-base text-[#1a1a1a] font-semibold tracking-tight">The Pause</span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="#book" className="bg-[#4a7c59] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-all hover:shadow-md">
              Book Now
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 rounded-full bg-[#f5f0e8] flex items-center justify-center hover:bg-[#4a7c59]/10 transition-colors"
            >
              <Menu size={18} className="text-[#1a1a1a]" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-72 bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0ebe3]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full" />
                    <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full" />
                  </div>
                  <span className="font-display text-base text-[#1a1a1a] font-semibold">The Pause</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center hover:bg-[#4a7c59]/10 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-4 py-6 space-y-1">
                {links.filter(l => !l.subtle).map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all group ${
                      link.highlight
                        ? 'bg-[#e8f4ec] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white'
                        : 'text-[#1a1a1a] hover:bg-[#faf7f2]'
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}

                <div className="pt-4">
                  <a href="#book" onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3.5 rounded-2xl bg-[#4a7c59] text-white text-sm font-semibold hover:bg-[#3d6649] transition-colors">
                    Book a Session
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[#f0ebe3]">
                <a href="/admin/login" onClick={() => setMenuOpen(false)}
                  className="text-xs text-[#9ca3af] hover:text-[#4a7c59] transition-colors">
                  Doctor / Admin Login →
                </a>
                <p className="text-[10px] text-[#d1cdc7] mt-2">© 2026 The Pause. Care that breathes.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
