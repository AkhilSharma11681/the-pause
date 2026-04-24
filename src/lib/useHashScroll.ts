'use client'
import { useEffect } from 'react'

const NAV_OFFSET = 96 // matches scroll-padding-top in globals.css

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * On page mount:
 * 1. Reads the hash from window.location.hash OR sessionStorage('scrollTo')
 * 2. Waits `delay` ms so the user sees the top of the page first
 * 3. Smoothly scrolls to the target section with navbar offset applied
 * 4. Clears sessionStorage so it doesn't fire again on refresh
 */
export function useHashScroll(delay = 200) {
  useEffect(() => {
    const stored = sessionStorage.getItem('scrollTo') || ''
    const hash = window.location.hash.slice(1) || stored

    if (!hash) return
    if (stored) sessionStorage.removeItem('scrollTo')

    const timer = setTimeout(() => {
      if (document.getElementById(hash)) {
        scrollToId(hash)
      } else {
        // Retry once for late-rendered elements (e.g. after AnimatePresence)
        setTimeout(() => scrollToId(hash), 300)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])
}
