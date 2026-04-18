'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'

const THRESHOLD = 120

const links = [
  { href: '#how-it-works', label: 'How it works', tag: 'Process', color: '#e8f4ec', textColor: '#4a7c59' },
  { href: '#therapists', label: 'Therapists', tag: 'Team', color: '#f5f0e8', textColor: '#c46d3a' },
  { href: '#pricing', label: 'Pricing', tag: 'Plans', color: '#f0f4f8', textColor: '#4a6d8c' },
  { href: '#faq', label: 'FAQ', tag: 'Help', color: '#fef3e8', textColor: '#8a7a2a' },
  { href: '/auth', label: 'My Portal', tag: 'Login', color: '#e8f4ec', textColor: '#4a7c59' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const router = useRouter()

  // Raw scroll progress 0→1
  const raw = useMotionValue(0)
  // Spring-smoothed version for buttery animation
  const progress = useSpring(raw, { stiffness: 80, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      raw.set(Math.min(1, window.scrollY / THRESHOLD))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [raw])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Animated style values
  const navMaxWidth   = useTransform(progress, [0, 1], ['calc(100vw - 40px)', '660px'])
  const navPaddingY   = useTransform(progress, [0, 1], ['18px', '10px'])
  const navPaddingX   = useTransform(progress, [0, 1], ['40px', '20px'])
  const navRadius     = useTransform(progress, [0, 1], ['20px', '9999px'])
  const navBg         = useTransform(progress, [0, 1], ['rgba(250,247,242,0.0)', 'rgba(250,247,242,0.85)'])
  const navBorder     = useTransform(progress, [0, 1], ['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.5)'])
  const navShadow     = useTransform(progress, [0, 1], ['0 0px 0px rgba(0,0,0,0)', '0 8px 40px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.9)'])
  const navBlur       = useTransform(progress, [0, 1], ['blur(0px)', 'blur(20px)'])
  const logoScale     = useTransform(progress, [0, 1], [1, 0.88])
  const btnScale      = useTransform(progress, [0, 1], [1, 0.92])

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
      {/* ── Main bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-5">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: navMaxWidth,
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            paddingLeft: navPaddingX,
            paddingRight: navPaddingX,
            borderRadius: navRadius,
            background: navBg,
            boxShadow: navShadow,
            backdropFilter: navBlur,
            WebkitBackdropFilter: navBlur,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: navBorder,
          }}
          className="w-full flex items-center justify-between"
        >
          {/* Logo */}
          <motion.a
            href="/"
            style={{ scale: logoScale }}
            className="flex items-center gap-2.5 group origin-left"
          >
            <div className="flex gap-[3px] shrink-0">
              <div className="w-[5px] h-[22px] bg-[#4a7c59] rounded-full transition-transform duration-300 group-hover:scale-y-110" />
              <div className="w-[5px] h-[22px] bg-[#4a7c59] rounded-full transition-transform duration-300 group-hover:scale-y-125 delay-75" />
            </div>
            <span className="font-display text-[16px] text-[#1a1a1a] font-semibold tracking-tight whitespace-nowrap">
              The Pause
            </span>
          </motion.a>

          {/* Center CTA — sits in its own flex cell so it doesn't overlap */}
          <motion.a
            href="#book"
            style={{ scale: btnScale }}
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(74,124,89,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide hidden sm:flex items-center gap-1.5 shadow-[0_4px_16px_rgba(74,124,89,0.25)]"
          >
            Book Now
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="w-10 h-10 rounded-full bg-[#f0ebe3]/80 flex flex-col items-center justify-center gap-[5px] hover:bg-[#4a7c59]/10 transition-colors shrink-0"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-[15px] h-[1.5px] bg-[#1a1a1a] rounded-full"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-[15px] h-[1.5px] bg-[#1a1a1a] rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-[15px] h-[1.5px] bg-[#1a1a1a] rounded-full"
            />
          </button>
        </motion.nav>
      </div>

      {/* ── Full-screen menu overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#faf7f2] flex flex-col"
          >
            {/* Ambient glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a7c59]/6 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4843a]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
              />
            </div>

            <div className="relative z-10 h-full flex flex-col px-6 md:px-20 pt-28 pb-10 max-w-5xl mx-auto w-full">
              <nav className="flex-1 flex flex-col justify-center gap-1.5">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative overflow-hidden rounded-2xl cursor-pointer"
                    onClick={() => handleNav(link.href)}
                  >
                    <motion.div
                      animate={{ scaleX: hovered === i ? 1 : 0 }}
                      initial={{ scaleX: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ backgroundColor: link.color, originX: 0 }}
                      className="absolute inset-0 rounded-2xl"
                    />
                    <div className="relative flex items-center gap-4 px-5 py-4">
                      <motion.span
                        animate={{ color: hovered === i ? link.textColor : '#c4bfb8' }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px] font-mono w-4 shrink-0 tabular-nums"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>
                      <motion.span
                        animate={{ x: hovered === i ? 6 : 0, color: hovered === i ? link.textColor : '#1a1a1a' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-2xl md:text-[2rem] leading-none"
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -10, scale: hovered === i ? 1 : 0.8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{ color: link.textColor, backgroundColor: `${link.textColor}15` }}
                        className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                      >
                        {link.tag}
                      </motion.span>
                      <motion.span
                        animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -12 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: link.textColor }}
                        className="ml-auto text-lg"
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#e8e3da]"
              >
                <button
                  onClick={() => handleNav('#book')}
                  className="group relative inline-flex items-center gap-2 bg-[#4a7c59] text-white px-8 py-3.5 rounded-full text-sm font-bold overflow-hidden hover:-translate-y-0.5 transition-transform"
                >
                  <span className="relative z-10">Book a Session</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >→</motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleNav('/admin/login')}
                    className="text-xs text-[#9ca3af] hover:text-[#4a7c59] transition-colors"
                  >
                    Doctor Login →
                  </button>
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
