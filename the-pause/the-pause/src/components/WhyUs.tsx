'use client';
import { motion } from 'framer-motion';

const rows = [
  { feature: 'Certified RCI Psychologists', us: true, others: false },
  { feature: 'No waitlists', us: true, others: false },
  { feature: 'Same therapist every session', us: true, others: false },
  { feature: 'Sessions from ₹499', us: true, others: false },
  { feature: 'WhatsApp check-ins', us: true, others: false },
  { feature: 'Matched within 2 hours', us: true, others: false },
  { feature: '100% confidential', us: true, others: true },
];

export default function WhyUs() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-widest text-[#5a7a5a] uppercase mb-3">Why The Pause</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a2e1a]" style={{ fontFamily: 'Lora, serif' }}>
            Not just another app
          </h2>
          <p className="mt-4 text-[#555] max-w-xl mx-auto">
            We built The Pause because we were tired of impersonal, expensive, or inaccessible mental healthcare.
          </p>
        </motion.div>

        <div className="border border-[#e0ddd6] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#f5f2ec] px-6 py-4 text-sm font-semibold text-[#1a2e1a]">
            <span></span>
            <span className="text-center text-[#2d5a27]">The Pause ✓</span>
            <span className="text-center text-[#999]">Others</span>
          </div>
          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`grid grid-cols-3 px-6 py-4 text-sm border-t border-[#e0ddd6] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
            >
              <span className="text-[#333] font-medium">{row.feature}</span>
              <span className="text-center text-[#2d5a27] font-bold text-lg">{row.us ? '✓' : '✗'}</span>
              <span className={`text-center font-bold text-lg ${row.others ? 'text-[#2d5a27]' : 'text-[#ccc]'}`}>
                {row.others ? '✓' : '✗'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}