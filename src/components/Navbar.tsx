'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────
type NavChild = { label: string; href: string }
type NavItem =
  | { kind: 'link';     label: string; href: string }
  | { kind: 'dropdown'; label: string; children: NavChild[] }

// ── Nav config — all hrefs are absolute paths ──────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    kind: 'dropdown',
    label: 'About Us',
    children: [
      { label: 'Idea Behind The Pause', href: '/about#idea' },
      { label: 'Our Space',             href: '/about#our-space' },
      { label: 'Meet the Team',         href: '/about#team' },
      { label: 'How It Works',          href: '/about#how-it-works' },
    ],
  },
  {
    kind: 'dropdown',
    label: 'Services',
    children: [
      { label: 'Individual Therapy', href: '/services#individual' },
      { label: 'Couples & Family',   href: '/services#couples' },
      { label: 'Teen & Child Care',  href: '/services#teen' },
      { label: 'Workshops',          href: '/services#workshops' },
      { label: 'Communities',        href: '/services#communities' },
    ],
  },
  { kind: 'link', label: 'Pricing',         href: '/#pricing' },
  { kind: 'link', label: 'Upcoming Events', href: '/#events' },
  { kind: 'link', label: 'FAQ',             href: '/#faq' },
  { kind: 'link', label: 'Client Stories',  href: '/#testimonials' },
]

// ── Helpers ────────────────────────────────────────────────────────────────
function getPathPart(href: string) {
  // '/about#idea' → '/about'   |  '/#pricing' → '/'  |  '/services' → '/services'
  return href.split('#')[0] || '/'
}
function getHashPart(href: string) {
  const idx = href.indexOf('#')
  return idx !== -1 ? href.slice(idx + 1) : ''
}
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Chevron ────────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      className="inline-block ml-1 opacity-60"
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

// ── Desktop dropdown panel ─────────────────────────────────────────────────
function DropdownPanel({
  items,
  onNavigate,
  currentPath,
}: {
  items: NavChild[]
  onNavigate: (href: string) => void
  currentPath: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-white rounded-2xl shadow-xl border border-[#e8e3da] py-2 z-50"
    >
      {items.map((child) => {
        const isActive = currentPath === getPathPart(child.href)
        return (
          <motion.button
            key={child.href}
            onClick={() => onNavigate(child.href)}
            whileTap={{ scale: 0.97, backgroundColor: '#4a7c59', color: '#ffffff' }}
            transition={{ duration: 0.15 }}
            className={`w-full text-left px-5 py-2.5 text-[13px] transition-colors duration-150 font-medium rounded-lg ${
              isActive
                ? 'text-[#4a7c59] bg-[#f5f2ed] border-l-[3px] border-[#4a7c59] pl-[17px]'
                : 'text-[#1a1a1a]/80 hover:text-[#4a7c59] hover:bg-[#f5f2ed]'
            }`}
          >
            {child.label}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Cleanup timer on unmount
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  // Core navigation handler — works from any page
  function handleNav(href: string) {
    setOpen(false)
    setActiveDropdown(null)
    setMobileOpenSection(null)

    const targetPath = getPathPart(href)
    const hash = getHashPart(href)
    const normalizedTarget = targetPath === '' ? '/' : targetPath
    const normalizedCurrent = pathname === '' ? '/' : pathname

    if (normalizedTarget === normalizedCurrent) {
      // Same page — scroll directly, no navigation needed
      if (hash) {
        setTimeout(() => scrollToId(hash), 50)
      }
    } else {
      // Different page — store hash, then navigate
      // The destination page reads sessionStorage on mount and scrolls
      if (hash) {
        sessionStorage.setItem('scrollTo', hash)
      }
      router.push(normalizedTarget + (hash ? `#${hash}` : ''))
    }
  }

  function handleDropdownEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  function handleDropdownLeave() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  function toggleMobileSection(label: string) {
    setMobileOpenSection((prev) => (prev === label ? null : label))
  }

  // Active state helpers
  function isTopLevelActive(item: NavItem) {
    if (item.kind === 'dropdown') {
      return item.children.some((c) => getPathPart(c.href) === pathname)
    }
    return getPathPart(item.href) === pathname
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-[400ms] ease-in-out ${
        scrolled ? 'top-3' : 'top-0'
      }`}>
        <motion.nav
          ref={navRef}
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
              <Link
                href="/"
                className="flex items-center gap-2.5 group z-50 shrink-0"
              >
                <motion.div
                  className="flex items-center gap-2.5"
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
                </motion.div>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isTopLevelActive(item)
                  return item.kind === 'dropdown' ? (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button className={`flex items-center px-3 py-2 text-[13px] transition-colors duration-200 font-medium rounded-lg hover:bg-[#f5f2ed] ${
                        active ? 'text-[#4a7c59]' : 'text-[#1a1a1a]/70 hover:text-[#4a7c59]'
                      }`}>
                        {item.label}
                        <Chevron open={activeDropdown === item.label} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <DropdownPanel
                            items={item.children}
                            onNavigate={handleNav}
                            currentPath={pathname}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.href)}
                      className={`px-3 py-2 text-[13px] transition-colors duration-200 font-medium rounded-lg hover:bg-[#f5f2ed] ${
                        active ? 'text-[#4a7c59]' : 'text-[#1a1a1a]/70 hover:text-[#4a7c59]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/auth"
                  className="hidden sm:block text-[13px] text-[#1a1a1a]/70 hover:text-[#4a7c59] transition-colors duration-200 font-medium"
                >
                  My Portal
                </Link>

                <motion.button
                  onClick={() => handleNav('/#book')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4a7c59] text-white px-5 py-2.5 rounded-full text-[13px] font-semibold shadow-lg shadow-[#4a7c59]/25 hover:shadow-xl hover:shadow-[#4a7c59]/35 transition-all duration-200"
                >
                  Book Now
                </motion.button>

                {/* Hamburger */}
                <button
                  onClick={() => setOpen(!open)}
                  aria-label="Menu"
                  className="lg:hidden w-10 h-10 rounded-full bg-[#f0ebe3] hover:bg-[#e8e3da] flex flex-col items-center justify-center gap-[5px] transition-colors"
                >
                  <motion.span animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full" />
                  <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full" />
                  <motion.span animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="block w-[16px] h-[2px] bg-[#1a1a1a] rounded-full" />
                </button>
              </div>

            </div>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile Menu ── */}
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

            <div className="relative h-full flex flex-col pt-28 pb-8 px-6 overflow-y-auto">
              <nav className="flex-1 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) =>
                  item.kind === 'dropdown' ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <button
                        onClick={() => toggleMobileSection(item.label)}
                        className={`w-full flex items-center justify-between text-3xl font-display py-4 border-b border-[#e8e3da] transition-colors ${
                          isTopLevelActive(item) ? 'text-[#4a7c59]' : 'text-[#1a1a1a] hover:text-[#4a7c59]'
                        }`}
                      >
                        {item.label}
                        <Chevron open={mobileOpenSection === item.label} />
                      </button>
                      <AnimatePresence>
                        {mobileOpenSection === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <motion.button
                                key={child.href}
                                onClick={() => handleNav(child.href)}
                                whileTap={{ scale: 0.97, backgroundColor: 'rgba(74,124,89,0.08)' }}
                                transition={{ duration: 0.15 }}
                                className={`w-full text-left pl-4 py-3 text-lg transition-colors border-b border-[#e8e3da]/50 ${
                                  pathname === getPathPart(child.href)
                                    ? 'text-[#4a7c59] font-medium border-l-[3px] border-l-[#4a7c59] pl-[13px]'
                                    : 'text-[#1a1a1a]/70 hover:text-[#4a7c59]'
                                }`}
                              >
                                {child.label}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => handleNav(item.href)}
                      className={`text-left text-3xl font-display py-4 border-b border-[#e8e3da] transition-colors ${
                        isTopLevelActive(item) ? 'text-[#4a7c59]' : 'text-[#1a1a1a] hover:text-[#4a7c59]'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )
                )}

                {/* My Portal */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: NAV_ITEMS.length * 0.04 }}
                >
                  <Link
                    href="/auth"
                    onClick={() => setOpen(false)}
                    className="block text-3xl font-display text-[#1a1a1a] py-4 border-b border-[#e8e3da] hover:text-[#4a7c59] transition-colors"
                  >
                    My Portal
                  </Link>
                </motion.div>
              </nav>

              {/* Book Now — bottom of mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25 }}
                className="pt-6 border-t border-[#e8e3da]"
              >
                <button
                  onClick={() => handleNav('/#book')}
                  className="w-full bg-[#4a7c59] text-white py-4 rounded-full text-lg font-semibold shadow-lg"
                >
                  Book Now
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
