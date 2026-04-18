'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#therapists', label: 'Therapists' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              : 'w-full max-w-7xl bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex gap-1">
              <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full group-hover:scale-y-110 transition-transform duration-300" />
              <div className="w-1.5 h-6 bg-[#4a7c59] rounded-full group-hover:scale-y-125 transition-transform duration-300 delay-75" />
            </div>
            <span className="font-display text-lg text-[#1a1a1a] font-semibold tracking-tight">The Pause</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-[#6b7280] hover:text-[#4a7c59] transition-colors">
                {link.label}
              </a>
            ))}
            <a href="/auth" className="text-sm font-medium text-[#6b7280] hover:text-[#4a7c59] transition-colors border border-[#4a7c59]/20 px-4 py-2 rounded-full hover:border-[#4a7c59]">
              My Portal
            </a>
            <a href="#book" className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-all hover:shadow-lg hover:-translate-y-0.5">
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-[#1a1a1a] hover:bg-[#4a7c59]/5 rounded-full transition-colors">
            <Menu size={24} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#faf7f2] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display text-xl">The Pause</span>
              <button onClick={() => setMenuOpen(false)} className="p-2"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-[#1a1a1a]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/auth"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-[#6b7280]"
              >
                My Portal
              </motion.a>
              <motion.a
                href="#book"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-[#4a7c59] italic underline decoration-1 underline-offset-8"
              >
                Book a Session
              </motion.a>
            </div>
            <div className="mt-auto text-[#6b7280] text-sm">
              <p>© 2026 The Pause. Care that breathes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
