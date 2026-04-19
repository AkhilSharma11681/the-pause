'use client'
import { useHashScroll } from '@/lib/useHashScroll'

/**
 * Drop into any server-rendered page that needs hash-based scroll-on-load.
 * Waits 200ms so user sees the top of the page first, then scrolls to the anchor.
 */
export default function ScrollOnMount() {
  useHashScroll(200)
  return null
}
