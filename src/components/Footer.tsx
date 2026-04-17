'use client'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Phone } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export default function Footer() {
  const socialIcons = [InstagramIcon, TwitterIcon, LinkedinIcon]

  return (
    <footer className="bg-[#1a1a1a] text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">

          {/* Brand Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#2d5a3d] to-[#1a1a1a] rounded-[3rem] p-12 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
            />
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
                  <div className="w-2 h-8 bg-[#4a7c59] rounded-full" />
                </div>
                <span className="font-display text-3xl font-bold tracking-tighter">The Pause</span>
              </div>
              <p className="text-xl text-white/60 font-light leading-relaxed max-w-sm">
                A sanctuary for psychological care. We don&apos;t just treat issues; we honor your journey.
              </p>
            </div>
            <div className="flex gap-4 mt-12">
              {socialIcons.map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all duration-500">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#242424] rounded-[3rem] p-10 flex flex-col border border-white/5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-8">Healing</h4>
            <ul className="space-y-4">
              {['Individual Therapy', 'Couples Space', 'Teen Care', 'Burnout Relief'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors font-light text-[15px]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Card */}
          <div className="bg-[#242424] rounded-[3rem] p-10 flex flex-col border border-white/5 justify-between">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-8">Connect</h4>
              <p className="text-white/80 font-display text-xl mb-2">Speak to a human</p>
              <p className="text-white/40 text-sm font-light mb-1">Sector 15, Sonipat, Haryana</p>
              <p className="text-white/40 text-sm font-light mb-6">Mon–Sat · 09:00–19:00</p>
              <a href="tel:9152987821" className="flex items-center gap-2 text-[#4a7c59] text-sm font-medium mb-6 hover:text-white transition-colors">
                <Phone size={14} />
                iCall: 9152987821
              </a>
            </div>
            <a
              href="https://wa.me/919152987821?text=Hi%2C%20I%20want%20to%20book%20a%20session%20at%20The%20Pause"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white text-black px-6 py-4 rounded-2xl hover:bg-[#4a7c59] hover:text-white transition-all duration-500 group"
            >
              <span className="font-medium text-sm">WhatsApp Chat</span>
              <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          <div className="flex items-center gap-2 text-white/30 text-xs font-light">
            <Heart size={12} className="text-[#4a7c59]" />
            <p>© 2026 The Pause. Care that breathes.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-light tracking-wide uppercase">Privacy</a>
            <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-light tracking-wide uppercase">Terms</a>
            <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-light tracking-wide uppercase">Cookies</a>
          </div>
          <div className="bg-[#4a7c59]/10 border border-[#4a7c59]/30 px-6 py-2 rounded-full">
            <p className="text-[#4a7c59] text-[10px] font-bold uppercase tracking-widest">
              Emergency: <a href="tel:9152987821" className="text-white/80 ml-2 hover:text-white transition-colors">iCall 9152987821</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
