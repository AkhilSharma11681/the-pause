'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 bg-[#f5f2ec] relative overflow-hidden">

      {/* Subtle background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#2d5a27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5a7a5a]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Pause icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex gap-1 mb-6"
      >
        <div className="w-2 h-8 bg-[#2d5a27]/40 rounded-full" />
        <div className="w-2 h-8 bg-[#2d5a27]/40 rounded-full" />
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xs tracking-widest text-[#5a7a5a] uppercase mb-6"
      >
        Psychological Care · Online & In-Person
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-5xl md:text-7xl font-bold text-[#1a2e1a] leading-tight max-w-3xl"
        style={{ fontFamily: 'Lora, serif' }}
      >
        You don&apos;t need to{' '}
        <em className="text-[#2d5a27] not-italic italic">be fixed.</em>
        <br />
        You need to be heard.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 text-[#666] max-w-md text-lg leading-relaxed"
      >
        A calm, private space to work through anxiety, burnout,
        relationships and more — with certified psychologists.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
      >
        <a
          href="#book"
          className="bg-[#2d5a27] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1e3e1a] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2d5a27]/20"
        >
          Book Your First Session
        </a>
        <a
          href="#how-it-works"
          className="border border-[#2d5a27]/30 text-[#2d5a27] px-8 py-4 rounded-full text-sm font-medium hover:border-[#2d5a27] transition-colors"
        >
          See How It Works
        </a>
      </motion.div>

      {/* Trust micro-copy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-xs text-[#999]"
      >
        First session from ₹499 · No waitlists · 100% confidential
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#aaa] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#2d5a27]/40 to-transparent"
        />
      </motion.div>

    </section>
  );
}