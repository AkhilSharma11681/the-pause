'use client'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone } from 'lucide-react'

export default function ClinicMap() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Find Us</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-8 tracking-tight">
              Visit our <span className="italic text-[#4a7c59]">clinic</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#e8f4ec] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#4a7c59]" />
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a] mb-1">Address</p>
                  <p className="text-[#6b7280] font-light text-sm leading-relaxed">
                    Flat 26, REHAYASHI APARTMENT<br />Pocket 7, Sector 12 Dwarka<br />New Delhi — 110078
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#e8f4ec] flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#4a7c59]" />
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a] mb-1">Hours</p>
                  <p className="text-[#6b7280] font-light text-sm">Monday – Saturday</p>
                  <p className="text-[#6b7280] font-light text-sm">09:00 AM – 07:00 PM</p>
                  <p className="text-[#9ca3af] text-xs mt-1">Closed Sundays</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#e8f4ec] flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#4a7c59]" />
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a] mb-1">Contact</p>
                  <a href="https://wa.me/919152987821" className="text-[#4a7c59] text-sm font-medium hover:underline">
                    WhatsApp: +91 9152987821
                  </a>
                </div>
              </div>
            </div>

            <a href="#book" className="inline-flex items-center gap-2 mt-10 bg-[#4a7c59] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#3d6649] transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Book In-Person Session
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-[420px]"
          >
            {/* Replace src with your actual Google Maps embed URL from maps.google.com → Share → Embed */}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
