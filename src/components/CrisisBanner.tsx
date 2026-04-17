'use client'
import { Phone } from 'lucide-react'

// Fixed bottom bar on mobile only — desktop version is in Footer
export default function CrisisBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-[#1a1a1a] border-t border-white/10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-white/60 text-[11px] uppercase tracking-widest font-medium">Crisis Support</span>
      </div>
      <a href="tel:9152987821" className="flex items-center gap-2 bg-[#4a7c59] text-white px-4 py-2 rounded-full text-xs font-bold">
        <Phone size={12} />
        iCall: 9152987821
      </a>
    </div>
  )
}
