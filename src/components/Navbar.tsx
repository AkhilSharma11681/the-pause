'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#therapists', label: 'Therapists' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleNav(href: string) {
    setOpen(false)
    if (href.startsWith('#')) {
      setTimeout(() => {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      setTimeout(() => router.push(href), 300)
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <div className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-[400ms] ease-in-out ${
        scrolled ? 'top-3' : 'top-0'
      }`}>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`navbar w-full transition-all duration-[400ms] ease-in-out ${
            scrolled 
              ? 'max-w-[85%] rounded-[50px] bg-[rgba(200,230,210,0.2)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
              : 'max-w-full rounded-none bg-transparent border-transparent shadow-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group z-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-[3px]">
                <div className="w-[5px] h-[24px] bg-[#4a7c59] rounded-full transition-all duration-300 group-hover:h-[28px]" />
                <div className="w-[5px] h-[24px] bg-[#4a7c59] rounded-full transition-all duration-300 group-hover:h-[28px] delay-75" />
              </div>
              <span className="font-display text-[18px] text-[#1a1a1a] font-semibold tracking-tight">
                The Pause
              </span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-[#1a1a1a]/70 hover:text-[#4a7c59] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <a
                href="/auth"
                className="hidden sm:block text-[14px] text-[#1a1a1a]/70 hover:text-[#4a7c59] transition-colors duration-200 font-medium"
              >
                My Portal
              </a>
              
              <motion.a
                href="#book"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-full text-[14px] font-semibold shadow-lg shadow-[#4a7c59]/25 hover:shadow-xl hover:shadow-[#4a7c59]/35 transition-all duration-200"
              >
                Book Now
              </motion.a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="lg:hidden w-10 h-10 rounded-full bg-[#f0ebe3] hover:bg-[#e8e3da] flex flex-col items-center justify-center gap-[5px] transition-colors"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#faf7f2]" />
            
            <div className="relative h-full flex flex-col pt-28 pb-8 px-6">
              <nav className="flex-1 flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNav(link.href)}
                    className="text-3xl font-display text-[#1a1a1a] py-4 border-b border-[#e8e3da] hover:text-[#4a7c59] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/auth"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: links.length * 0.05 }}
                  onClick={() => handleNav('/auth')}
                  className="text-3xl font-display text-[#1a1a1a] py-4 border-b border-[#e8e3da] hover:text-[#4a7c59] transition-colors"
                >
                  My Portal
                </motion.a>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="pt-6 border-t border-[#e8e3da]"
              >
                <button
                  onClick={() => handleNav('#book')}
                  className="w-full bg-[#4a7c59] text-white py-4 rounded-full text-lg font-semibold shadow-lg"
                >
                  Book a Session
                </button>
                <p className="text-center text-xs text-[#9ca3af] mt-6">© 2026 The Pause</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
