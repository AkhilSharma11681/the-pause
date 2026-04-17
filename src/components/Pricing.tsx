'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Info, Sparkles, Zap, ShieldCheck } from 'lucide-react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    { 
      name: 'Single Session', 
      price: billingCycle === 'monthly' ? '₹499' : '₹399', 
      period: 'per session', 
      desc: 'A gentle start. No commitment, just a safe harbor for your first step.', 
      features: ['50-minute session', 'RCI Certified expert', 'Private summary', '24h rescheduling'], 
      cta: 'Book Session', 
      highlight: false,
      icon: ShieldCheck,
      color: '#e8f4ec'
    },
    { 
      name: 'Essential Care', 
      price: billingCycle === 'monthly' ? '₹1,599' : '₹1,299', 
      period: 'per month', 
      desc: 'Our gold standard for consistent healing and emotional growth.', 
      features: ['4 sessions / month', 'Dedicated therapist', 'WhatsApp support', 'Progress analytics', 'Priority booking'], 
      cta: 'Begin Journey', 
      highlight: true,
      icon: Zap,
      color: '#4a7c59'
    },
    { 
      name: 'Transformative', 
      price: billingCycle === 'monthly' ? '₹2,799' : '₹2,299', 
      period: 'per month', 
      desc: 'For deep-level work and rapid clinical transformation.', 
      features: ['8 sessions / month', 'Specialist matching', 'Daily check-ins', 'Full care protocol', 'Family integration'], 
      cta: 'Full Access', 
      highlight: false,
      icon: Sparkles,
      color: '#f4ede8'
    },
  ]

  return (
    <section id="pricing" className="py-32 px-6 bg-[#faf7f2] relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(74,124,89,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Pricing Plans</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-8 tracking-tight"
          >
            Accessible care for <span className="italic text-[#4a7c59]">all</span>
          </motion.h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[#1a1a1a]' : 'text-[#6b7280]'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-7 bg-[#e5e0d5] rounded-full p-1 relative transition-colors"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                className="w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-black' : 'text-[#6b7280]'}`}>Annually</span>
              <span className="bg-[#4a7c59]/10 text-[#4a7c59] text-[10px] font-bold px-2 py-0.5 rounded-full">SAVE 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-[3rem] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(74,124,89,0.15)] ${
                plan.highlight ? 'md:-translate-y-4' : ''
              }`}
            >
              <div className={`h-full rounded-[2.8rem] p-10 flex flex-col relative overflow-hidden transition-colors duration-500 ${
                plan.highlight ? 'bg-[#4a7c59] text-white' : 'bg-white text-[#1a1a1a]'
              }`}>
                {/* Header */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.highlight ? 'bg-white/10' : 'bg-[#faf7f2]'}`}>
                      <plan.icon size={24} className={plan.highlight ? 'text-white' : 'text-[#4a7c59]'} />
                    </div>
                    {plan.highlight && (
                      <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">Popular</span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm font-light ${plan.highlight ? 'text-white/60' : 'text-[#6b7280]'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm leading-relaxed font-light ${plan.highlight ? 'text-white/70' : 'text-[#6b7280]'}`}>
                    {plan.desc}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 mb-10">
                  <ul className="space-y-4">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex gap-3 text-sm font-light items-center">
                        <Check size={16} className={plan.highlight ? 'text-white/50' : 'text-[#4a7c59]'} />
                        <span className={plan.highlight ? 'text-white/90' : 'text-[#4a7c59]'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a 
                  href="#book" 
                  className={`w-full py-4 rounded-full text-center text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn ${
                    plan.highlight 
                    ? 'bg-white text-[#4a7c59] hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)]' 
                    : 'bg-[#4a7c59] text-white hover:bg-[#3d6649]'
                  }`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white border border-[#f0ebe3] shadow-sm">
            <Info size={16} className="text-[#4a7c59]" />
            <p className="text-sm text-[#6b7280]">Looking for corporate mental health plans? <a href="#" className="text-[#4a7c59] font-medium underline underline-offset-4">Get a Quote</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}