'use client'
import { useScrollOnMount } from '@/lib/useScrollOnMount'

/**
 * Drop this into any server-rendered page that needs cross-page anchor scrolling.
 * It renders nothing — just runs the scroll hook on mount.
 */
export default function ScrollOnMount() {
  useScrollOnMount()
  return null
}
