'use client'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react'

export default function ClinicMap() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #225532 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Find Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl text-[#1a1a1a] mb-10 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Visit our <span className="italic text-[#4a7c59]">clinic</span>
            </h2>

            <div className="space-y-4">
              {/* Address Card */}
              <motion.div 
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(34, 85, 50, 0.12)' }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(34,85,50,0.06)] border border-[rgba(34,85,50,0.1)] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-2">Address</p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">
                    Flat 26, REHAYASHI APARTMENT<br />Pocket 7, Sector 12 Dwarka<br />New Delhi — 110078
                  </p>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div 
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(34, 85, 50, 0.12)' }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(34,85,50,0.06)] border border-[rgba(34,85,50,0.1)] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-2">Hours</p>
                  <p className="text-[#6b7280] text-sm">Monday – Sunday</p>
                  <p className="text-[#6b7280] text-sm">09:00 AM – 07:00 PM</p>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div 
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(34, 85, 50, 0.12)' }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[rgba(34,85,50,0.06)] border border-[rgba(34,85,50,0.1)] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-2">Contact</p>
                  <a href="https://wa.me/919560333537" className="text-[#4a7c59] text-sm font-medium hover:underline inline-flex items-center gap-1">
                    WhatsApp: +91 9560333537
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.a 
              href="#book" 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 mt-8 w-full bg-[#4a7c59] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#3d6649] transition-colors shadow-lg shadow-[#4a7c59]/25"
            >
              Book In-Person Session
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Map container with premium styling */}
            <div className="rounded-3xl overflow-hidden border-2 border-[rgba(34,85,50,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-white">
              {/* Browser-style header bar */}
              <div className="bg-gradient-to-r from-[#e8f4ec] to-[#d4e8dc] px-6 py-4 flex items-center justify-between border-b border-[rgba(34,85,50,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
                  <span className="text-sm font-medium text-[#1a1a1a]">The Pause Clinic</span>
                </div>
                <a 
                  href="https://www.google.com/maps/place/Rehayashi+Apartment+Sector+12+Dwarka+New+Delhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[rgba(34,85,50,0.15)] text-xs font-medium text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white transition-colors"
                >
                  Open in Maps
                  <ExternalLink size={12} />
                </a>
              </div>
              
              {/* Map iframe */}
              <div className="h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789!2d77.0589!3d28.5921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRehayashi+Apartment+Sector+12+Dwarka+New+Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Pause Clinic Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />
    </section>
  )
}
