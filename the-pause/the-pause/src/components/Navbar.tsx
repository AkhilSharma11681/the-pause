'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              <div className="w-[5px] h-5 bg-[#2d5a27] rounded-full" />
              <div className="w-[5px] h-5 bg-[#2d5a27] rounded-full" />
            </div>
            <span
              className="font-semibold text-[#1a2e1a] text-lg"
              style={{ fontFamily: 'Lora, serif' }}
            >
              The Pause
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[#444]">
            <a href="#how-it-works" className="hover:text-[#2d5a27] transition-colors">
              How it works
            </a>
            <a href="#therapists" className="hover:text-[#2d5a27] transition-colors">
              Therapists
            </a>
            <a href="#pricing" className="hover:text-[#2d5a27] transition-colors">
              Pricing
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            
            {/* Book Button (Desktop) */}
            <a
              href="#book"
              className="hidden md:block bg-[#2d5a27] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#1e3e1a] transition-colors"
            >
              Book a Session
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Menu"
            >
              <span
                className={`block w-6 h-0.5 bg-[#1a2e1a] transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#1a2e1a] transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#1a2e1a] transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 bg-white border-b border-[#e8e4dc] shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5 text-[#333]">
              
              <a href="#how-it-works" onClick={() => setMobileOpen(false)}>
                How it works
              </a>
              <a href="#therapists" onClick={() => setMobileOpen(false)}>
                Therapists
              </a>
              <a href="#pricing" onClick={() => setMobileOpen(false)}>
                Pricing
              </a>

              {/* Book Button (Mobile) */}
              <a
                href="#book"
                onClick={() => setMobileOpen(false)}
                className="bg-[#2d5a27] text-white text-center py-3 rounded-full"
              >
                Book a Session
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}