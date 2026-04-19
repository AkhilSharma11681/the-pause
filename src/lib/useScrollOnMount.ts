'use client'
import { useEffect } from 'react'

/**
 * On mount, checks sessionStorage for a pending scroll target set by the
 * Navbar when navigating cross-page to an anchor. Scrolls to that element
 * and clears the stored value.
 */
export function useScrollOnMount() {
  useEffect(() => {
    const id = sessionStorage.getItem('scrollTo')
    if (!id) return
    sessionStorage.removeItem('scrollTo')

    // Give the page a moment to fully render before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)

    return () => clearTimeout(timer)
  }, [])
}
