'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, Smartphone, Zap } from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    { 
      icon: ShieldCheck, 
      title: '100% Confidential', 
      desc: 'Your privacy is sacred. We never share your data or session notes.',
      color: '#e8f4ec'
    },
    { 
      icon: UserCheck, 
      title: 'Certified Therapists', 
      desc: 'Every therapist at The Pause is trained, supervised, and carefully selected for their clinical expertise and genuine empathy.',
      color: '#f5f0e8'
    },
    { 
      icon: Smartphone, 
      title: 'Online & Flexible', 
      desc: 'Connect from anywhere. Schedule sessions that fit your daily rhythm.',
      color: '#f0f4f8'
    },
    { 
      icon: Zap, 
      title: 'Quick Matching', 
      desc: 'Tell us what you need. We\'ll match you with the right specialist at your pace.',
      color: '#fef3e8'
    },
  ]

  return (
    <section className="py-20 px-6 bg-white border-y border-[#f0ebe3]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row lg:flex-col items-start md:items-center lg:items-start gap-6 lg:gap-6"
              >
                {/* Icon Container */}
                <div 
                  className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                  style={{ backgroundColor: b.color }}
                >
                  <Icon size={28} strokeWidth={1.5} className="text-[#4a7c59]" />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="font-display text-xl text-[#1a1a1a] mb-2 group-hover:text-[#4a7c59] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-[#6b7280] text-sm font-light leading-relaxed max-w-xs transition-opacity duration-300">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}