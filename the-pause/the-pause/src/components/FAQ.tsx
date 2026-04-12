'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'Is my information kept private?',
    a: 'Absolutely. Everything shared with your therapist is 100% confidential. We follow strict privacy standards — your data is never shared with anyone, including family members or employers.',
  },
  {
    q: 'How quickly will I be matched with a therapist?',
    a: 'Most clients are matched within 2 hours of submitting their intake form. You\'ll receive a WhatsApp message with your therapist\'s profile and available slots.',
  },
  {
    q: 'Are your therapists actually qualified?',
    a: 'Yes. Every therapist on The Pause holds an M.Phil or PhD in Clinical/Counselling Psychology and is registered with the Rehabilitation Council of India (RCI). We manually verify all credentials.',
  },
  {
    q: 'Can I switch therapists if it\'s not a good fit?',
    a: 'Of course. A good therapeutic relationship matters more than anything else. You can request a new match at any time at no extra charge.',
  },
  {
    q: 'What if I need to cancel or reschedule?',
    a: 'You can reschedule up to 6 hours before your session at no charge. Cancellations within 6 hours may incur a partial fee.',
  },
  {
    q: 'Do you offer sessions in Hindi or other Indian languages?',
    a: 'Yes! Many of our therapists offer sessions in Hindi, Tamil, Telugu, Kannada, Marathi, and Bengali. You can filter by language when booking.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-[#f5f2ec]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-widest text-[#5a7a5a] uppercase mb-3">Questions</p>
          <h2 className="text-4xl font-bold text-[#1a2e1a]" style={{ fontFamily: 'Lora, serif' }}>
            We&apos;ve heard your concerns
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl overflow-hidden border border-[#e8e4dc]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center text-[#1a2e1a] font-medium hover:bg-[#fafaf8] transition-colors"
              >
                <span>{faq.q}</span>
                <span className={`text-[#2d5a27] text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[#666] text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}