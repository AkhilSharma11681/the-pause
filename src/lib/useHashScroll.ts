'use client'
import { useEffect } from 'react'

/**
 * On page mount:
 * 1. Reads the hash from window.location.hash OR sessionStorage('scrollTo')
 * 2. Waits 200ms so the user sees the top of the page first
 * 3. Smoothly scrolls to the target section
 * 4. Clears sessionStorage so it doesn't fire again on refresh
 *
 * Use this in every page that has anchor sections.
 */
export function useHashScroll(delay = 200) {
  useEffect(() => {
    const stored = sessionStorage.getItem('scrollTo') || ''
    const hash = window.location.hash.slice(1) || stored

    if (!hash) return
    if (stored) sessionStorage.removeItem('scrollTo')

    const timer = setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // Retry once more for late-rendered elements (e.g. after AnimatePresence)
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])
}
