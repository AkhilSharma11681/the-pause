'use client'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Wifi, ArrowRight, Users } from 'lucide-react'

const EVENTS = [
  {
    name: 'Understanding Anxiety',
    subtitle: 'A practical workshop on recognising and managing anxiety in daily life',
    date: 'Sat, 10 May 2026',
    time: '10:00 AM – 1:00 PM',
    format: 'In-Person',
    location: 'Sector 12 Dwarka, New Delhi',
    category: 'Workshop',
    seats: 8,
    totalSeats: 20,
    color: '#4a7c59',
    cta: 'Register',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Understanding%20Anxiety%20workshop',
  },
  {
    name: 'Mindful Relationships',
    subtitle: 'Communication tools and emotional intelligence for healthier connections',
    date: 'Sat, 17 May 2026',
    time: '11:00 AM – 2:00 PM',
    format: 'Online',
    location: 'Zoom · Link sent on registration',
    category: 'Workshop',
    seats: 14,
    totalSeats: 30,
    color: '#d4843a',
    cta: 'Register',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Mindful%20Relationships%20workshop',
  },
  {
    name: 'Burnout Recovery',
    subtitle: 'Identifying burnout patterns and building sustainable recovery habits',
    date: 'Sat, 24 May 2026',
    time: '10:00 AM – 12:00 PM',
    format: 'Online',
    location: 'Zoom · Link sent on registration',
    category: 'Workshop',
    seats: 22,
    totalSeats: 40,
    color: '#4a7c59',
    cta: 'Register',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Burnout%20Recovery%20workshop',
  },
  {
    name: 'Parenting with Presence',
    subtitle: 'Mindful parenting strategies for raising emotionally resilient children',
    date: 'Sun, 7 Jun 2026',
    time: '3:00 PM – 6:00 PM',
    format: 'In-Person',
    location: 'Sector 12 Dwarka, New Delhi',
    category: 'Workshop',
    seats: 5,
    totalSeats: 15,
    color: '#2d5a3d',
    cta: 'Register',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Parenting%20with%20Presence%20workshop',
  },
  {
    name: 'Mental Health First Aid',
    subtitle: 'Learn how to support someone in a mental health crisis — for families, teachers, and colleagues',
    date: 'Sat, 21 Jun 2026',
    time: '10:00 AM – 4:00 PM',
    format: 'In-Person',
    location: 'Sector 12 Dwarka, New Delhi',
    category: 'Training',
    seats: 12,
    totalSeats: 25,
    color: '#4a7c59',
    cta: 'Learn More',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Mental%20Health%20First%20Aid%20training',
  },
  {
    name: 'Open House — The Pause Clinic',
    subtitle: 'Visit our space, meet the team, and ask anything. No booking required.',
    date: 'Sun, 29 Jun 2026',
    time: '11:00 AM – 1:00 PM',
    format: 'In-Person',
    location: 'Sector 12 Dwarka, New Delhi',
    category: 'Community',
    seats: 30,
    totalSeats: 50,
    color: '#d4843a',
    cta: 'Learn More',
    ctaHref: 'https://wa.me/919560333537?text=Hi%2C%20I%20want%20to%20attend%20the%20Open%20House%20at%20The%20Pause',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Workshop: '#4a7c59',
  Training: '#2d5a3d',
  Community: '#d4843a',
}

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-32 px-6 bg-[#f5f0e8] relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a7c59]/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4843a]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
            >
              <Calendar size={12} className="text-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Upcoming Events</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl text-[#1a1a1a] tracking-tight leading-tight"
            >
              Learn, connect,<br />
              <span className="italic text-[#4a7c59]">grow together.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <a
              href="https://wa.me/919560333537?text=Hi%2C%20please%20notify%20me%20about%20upcoming%20events%20at%20The%20Pause"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4a7c59] text-sm font-medium border-b border-[#4a7c59]/30 pb-0.5 hover:border-[#4a7c59] transition-colors"
            >
              Get notified of new events <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Event cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event, i) => {
            const seatsLeft = event.totalSeats - event.seats
            const pct = Math.round((event.seats / event.totalSeats) * 100)
            const urgent = seatsLeft <= 6
            const catColor = CATEGORY_COLORS[event.category] ?? '#4a7c59'

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-[2.5rem] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
              >
                <div className="bg-[#faf7f2] rounded-[2.3rem] p-8 h-full flex flex-col gap-5 transition-all duration-500 group-hover:bg-white">

                  {/* Top row: category badge + format pill */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: `${catColor}12`, color: catColor }}
                    >
                      {event.category}
                    </span>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold ${
                      event.format === 'Online'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-[#e8f4ec] text-[#4a7c59]'
                    }`}>
                      {event.format === 'Online'
                        ? <Wifi size={10} />
                        : <MapPin size={10} />}
                      {event.format}
                    </div>
                  </div>

                  {/* Date + time */}
                  <div className="flex items-center gap-3">
                    {/* Calendar block */}
                    <div
                      className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0"
                      style={{ backgroundColor: `${event.color}15` }}
                    >
                      <span className="text-[9px] font-bold uppercase leading-none" style={{ color: event.color }}>
                        {event.date.split(' ')[1]}
                      </span>
                      <span className="text-lg font-bold leading-none" style={{ color: event.color }}>
                        {event.date.split(' ')[2]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#1a1a1a]">{event.date}</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#6b7280]">
                        <Clock size={10} />
                        {event.time}
                      </div>
                    </div>
                  </div>

                  {/* Name + description */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-[#1a1a1a] mb-2 group-hover:text-[#4a7c59] transition-colors duration-300">
                      {event.name}
                    </h3>
                    <p className="text-sm text-[#6b7280] font-light leading-relaxed">
                      {event.subtitle}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-[11px] text-[#9ca3af]">
                    {event.format === 'Online' ? <Wifi size={11} /> : <MapPin size={11} />}
                    <span>{event.location}</span>
                  </div>

                  {/* Seats progress */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className={`font-semibold flex items-center gap-1 ${urgent ? 'text-red-500' : 'text-[#6b7280]'}`}>
                        <Users size={10} />
                        {urgent ? `Only ${seatsLeft} seats left` : `${seatsLeft} seats available`}
                      </span>
                      <span className="text-[#9ca3af]">{pct}% filled</span>
                    </div>
                    <div className="h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.07 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: urgent ? '#ef4444' : event.color }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={event.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-full text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn bg-white border border-[#4a7c59]/30 text-[#4a7c59] group-hover:bg-[#4a7c59] group-hover:text-white group-hover:border-[#4a7c59]"
                  >
                    {event.cta}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#9ca3af] font-light mt-12"
        >
          All events are facilitated by licensed psychologists · Spaces are limited
        </motion.p>
      </div>
    </section>
  )
}
