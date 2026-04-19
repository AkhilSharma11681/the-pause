'use client'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, ExternalLink, Leaf, Shield, Wind } from 'lucide-react'

const spaceFeatures = [
  {
    icon: Leaf,
    title: 'Biophilic design',
    desc: 'Natural materials, plants, and soft lighting — because the nervous system responds to nature.',
  },
  {
    icon: Shield,
    title: 'Complete privacy',
    desc: 'Soundproofed rooms, private entry, and no shared waiting areas. Your presence here is yours alone.',
  },
  {
    icon: Wind,
    title: 'Unhurried pace',
    desc: 'Sessions are never back-to-back. You arrive, settle, and leave without rushing.',
  },
]

// Placeholder photo grid — warm editorial style using CSS gradients
const photos = [
  { label: 'Reception', gradient: 'from-[#e8f4ec] to-[#d4e8dc]', aspect: 'aspect-[4/3]' },
  { label: 'Therapy Room', gradient: 'from-[#f5f0e8] to-[#ede5d8]', aspect: 'aspect-square' },
  { label: 'Waiting Nook', gradient: 'from-[#faf7f2] to-[#f0ebe3]', aspect: 'aspect-square' },
  { label: 'Garden View', gradient: 'from-[#d4e8dc] to-[#c8ddd0]', aspect: 'aspect-[4/3]' },
]

export default function OurSpace() {
  return (
    <section id="our-space" className="py-32 px-6 bg-white relative overflow-hidden" style={{ scrollMarginTop: '80px' }}>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #4a7c59 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">The Space</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl text-[#1a1a1a] tracking-tight leading-tight"
            >
              A room that<br />
              <span className="italic text-[#4a7c59]">breathes</span> with you.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-[#6b7280] text-lg font-light leading-relaxed">
              We spent months designing a space that doesn&apos;t feel like a clinic. No fluorescent lights. No clipboards. No sterile white walls.
            </p>
            <p className="text-[#6b7280] text-lg font-light leading-relaxed">
              Our clinic in Sector 12 Dwarka is a quiet apartment — warm, private, and intentionally unhurried. The kind of place where you can exhale before you even sit down.
            </p>
          </motion.div>
        </div>

        {/* Photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`${photo.aspect} rounded-3xl bg-gradient-to-br ${photo.gradient} relative overflow-hidden group cursor-pointer`}
            >
              {/* Placeholder interior illustration */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <Leaf size={20} className="text-[#4a7c59]" />
                </div>
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#4a7c59]/70 text-center">
                  {photo.label}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#4a7c59]/0 group-hover:bg-[#4a7c59]/5 transition-colors duration-300 rounded-3xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Features + Address */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Space features */}
          <div className="space-y-5">
            {spaceFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-[#faf7f2] border border-[#f0ebe3] hover:border-[#4a7c59]/20 hover:shadow-[0_8px_24px_rgba(74,124,89,0.06)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#4a7c59]/10 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-[#4a7c59]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a] mb-1">{f.title}</h4>
                  <p className="text-[#6b7280] text-sm font-light leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Address + map link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(74,124,89,0.06)] border border-[rgba(74,124,89,0.1)]">
              <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-1">Address</p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  Flat 26, REHAYASHI APARTMENT<br />
                  Pocket 7, Sector 12 Dwarka<br />
                  New Delhi — 110078
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(74,124,89,0.06)] border border-[rgba(74,124,89,0.1)]">
              <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-1">Hours</p>
                <p className="text-[#6b7280] text-sm">Monday – Sunday · 09:00 AM – 07:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(74,124,89,0.06)] border border-[rgba(74,124,89,0.1)]">
              <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-1">Contact</p>
                <a href="https://wa.me/919560333537" className="text-[#4a7c59] text-sm font-medium hover:underline">
                  WhatsApp: +91 9560333537
                </a>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/Rehayashi+Apartment+Sector+12+Dwarka+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#4a7c59] text-white px-6 py-4 rounded-2xl hover:bg-[#3d6649] transition-colors group"
            >
              <span className="font-semibold text-sm">Open in Google Maps</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
