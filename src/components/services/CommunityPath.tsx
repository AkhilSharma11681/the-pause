'use client'
import { motion } from 'framer-motion'
import { Calendar, Users, BookOpen, ArrowRight, MessageCircle, Clock, MapPin, Wifi } from 'lucide-react'

const WORKSHOPS = [
  {
    date: 'May 10, 2026',
    day: 'Saturday',
    time: '10:00 AM – 1:00 PM',
    topic: 'Understanding Anxiety',
    subtitle: 'A practical workshop on recognising and managing anxiety in daily life',
    mode: 'In-Person',
    seats: 8,
    totalSeats: 20,
    price: '₹799',
    tag: 'Beginner-friendly',
    color: '#4a7c59',
  },
  {
    date: 'May 17, 2026',
    day: 'Saturday',
    time: '11:00 AM – 2:00 PM',
    topic: 'Mindful Relationships',
    subtitle: 'Communication tools and emotional intelligence for healthier connections',
    mode: 'Online',
    seats: 14,
    totalSeats: 30,
    price: '₹599',
    tag: 'Couples welcome',
    color: '#d4843a',
  },
  {
    date: 'May 24, 2026',
    day: 'Saturday',
    time: '10:00 AM – 12:00 PM',
    topic: 'Burnout Recovery',
    subtitle: 'Identifying burnout patterns and building sustainable recovery habits',
    mode: 'Online',
    seats: 22,
    totalSeats: 40,
    price: '₹499',
    tag: 'For professionals',
    color: '#4a7c59',
  },
  {
    date: 'June 7, 2026',
    day: 'Sunday',
    time: '3:00 PM – 6:00 PM',
    topic: 'Parenting with Presence',
    subtitle: 'Mindful parenting strategies for raising emotionally resilient children',
    mode: 'In-Person',
    seats: 5,
    totalSeats: 15,
    price: '₹999',
    tag: 'Parents only',
    color: '#2d5a3d',
  },
]

const GROUPS = [
  {
    icon: Users,
    name: 'Anxiety Support Circle',
    freq: 'Every Tuesday · 7:00 PM',
    mode: 'Online',
    desc: 'A facilitated peer group for people navigating anxiety. Share, listen, and grow — in a safe, moderated space.',
    spots: 'Open · 6 spots left',
    price: '₹299 / session',
  },
  {
    icon: BookOpen,
    name: 'Grief & Loss Group',
    freq: 'Every Thursday · 6:30 PM',
    mode: 'In-Person',
    desc: 'A gentle, therapist-led group for those processing loss — of a person, a relationship, or a version of themselves.',
    spots: 'Open · 4 spots left',
    price: '₹399 / session',
  },
  {
    icon: Users,
    name: 'Young Adults (18–25)',
    freq: 'Every Saturday · 11:00 AM',
    mode: 'Online',
    desc: 'Identity, career pressure, relationships, and the chaos of early adulthood — explored together.',
    spots: 'Waitlist open',
    price: '₹249 / session',
  },
]

const INTERNSHIPS = [
  {
    role: 'Clinical Internship',
    duration: '3–6 months',
    eligibility: 'MA / M.Phil Psychology students',
    desc: 'Supervised clinical hours with real clients under licensed psychologists. Structured feedback and case discussions weekly.',
    perks: ['Supervised client hours', 'Weekly case supervision', 'Certificate of completion', 'Letter of recommendation'],
    open: true,
  },
  {
    role: 'Research & Content Fellow',
    duration: '2–3 months',
    eligibility: 'Psychology / Social Work graduates',
    desc: 'Work on mental health content, community outreach, and research projects that shape how The Pause communicates.',
    perks: ['Flexible remote work', 'Published bylines', 'Mentorship from senior clinicians', 'Stipend available'],
    open: true,
  },
  {
    role: 'Workshop Facilitator Training',
    duration: '6 weeks',
    eligibility: 'Counsellors & coaches',
    desc: 'Learn to design and facilitate psychoeducation workshops. Includes co-facilitation opportunities with our team.',
    perks: ['Facilitation certification', 'Co-host live workshops', 'Access to curriculum library', 'Ongoing collaboration'],
    open: false,
  },
]

export default function CommunityPath() {
  return (
    <section className="py-20 px-6 bg-[#faf7f2] relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(212,132,58,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">

        {/* ── Upcoming Workshops ── */}
        <div id="workshops" style={{ scrollMarginTop: '80px' }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4843a]/5 border border-[#d4843a]/15 mb-4"
              >
                <Calendar size={12} className="text-[#d4843a]" />
                <span className="text-[#d4843a] text-[10px] tracking-[0.2em] uppercase font-medium">Upcoming Workshops</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight"
              >
                Learn. <span className="italic text-[#d4843a]">Explore.</span> Grow.
              </motion.h2>
            </div>
            <a
              href="https://wa.me/919560333537"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 text-[#d4843a] text-sm font-medium border-b border-[#d4843a]/30 pb-0.5 hover:border-[#d4843a] transition-colors"
            >
              Get notified of new workshops <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKSHOPS.map((w, i) => {
              const seatsLeft = w.totalSeats - w.seats
              const pct = (w.seats / w.totalSeats) * 100
              const urgent = seatsLeft <= 6
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-[2.5rem] p-8 border border-[#f0ebe3] hover:border-[#d4843a]/30 hover:shadow-[0_20px_50px_rgba(212,132,58,0.08)] transition-shadow duration-500 flex flex-col gap-5"
                >
                  {/* Date + mode */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0"
                        style={{ backgroundColor: `${w.color}15` }}>
                        <span className="text-[10px] font-bold uppercase" style={{ color: w.color }}>
                          {w.date.split(' ')[0]}
                        </span>
                        <span className="text-lg font-bold leading-none" style={{ color: w.color }}>
                          {w.date.split(' ')[1].replace(',', '')}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#9ca3af] font-medium">{w.day}</p>
                        <div className="flex items-center gap-1 text-[11px] text-[#6b7280]">
                          <Clock size={10} />
                          {w.time}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold ${
                      w.mode === 'Online'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-[#e8f4ec] text-[#4a7c59]'
                    }`}>
                      {w.mode === 'Online' ? <Wifi size={10} /> : <MapPin size={10} />}
                      {w.mode}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${w.color}12`, color: w.color }}>
                      {w.tag}
                    </span>
                    <h3 className="font-display text-2xl text-[#1a1a1a] mt-3 mb-1">{w.topic}</h3>
                    <p className="text-sm text-[#6b7280] font-light leading-relaxed">{w.subtitle}</p>
                  </div>

                  {/* Seats progress */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1.5">
                      <span className={`font-semibold ${urgent ? 'text-red-500' : 'text-[#6b7280]'}`}>
                        {urgent ? `⚡ Only ${seatsLeft} seats left` : `${seatsLeft} seats available`}
                      </span>
                      <span className="text-[#9ca3af]">{w.seats}/{w.totalSeats} filled</span>
                    </div>
                    <div className="h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: urgent ? '#ef4444' : w.color }}
                      />
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-2xl font-bold text-[#1a1a1a]">{w.price}</span>
                      <span className="text-sm text-[#9ca3af] font-light"> / person</span>
                    </div>
                    <a
                      href="https://wa.me/919560333537"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors group/btn"
                      style={{ backgroundColor: w.color }}
                    >
                      Register <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Community / Group Programs ── */}
        <div id="communities" style={{ scrollMarginTop: '80px' }}>
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-4"
            >
              <Users size={12} className="text-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Community Programs</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight"
            >
              Heal in <span className="italic text-[#4a7c59]">community.</span>
            </motion.h2>
            <p className="text-[#6b7280] font-light mt-3 text-lg max-w-xl">
              Therapist-facilitated group programs. Smaller than a workshop, more structured than a support group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GROUPS.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2.5rem] p-8 border border-[#f0ebe3] hover:border-[#4a7c59]/30 hover:shadow-[0_20px_50px_rgba(74,124,89,0.08)] transition-shadow duration-500 flex flex-col gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#e8f4ec] flex items-center justify-center">
                  <g.icon size={22} className="text-[#4a7c59]" />
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl text-[#1a1a1a] mb-1">{g.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-[#6b7280] font-medium">{g.freq}</span>
                    <span className="w-1 h-1 rounded-full bg-[#d4d0c8]" />
                    <span className={`text-[10px] font-semibold ${g.mode === 'Online' ? 'text-blue-500' : 'text-[#4a7c59]'}`}>
                      {g.mode}
                    </span>
                  </div>
                  <p className="text-sm text-[#6b7280] font-light leading-relaxed">{g.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0ebe3]">
                  <div>
                    <p className="text-[11px] text-[#9ca3af] mb-0.5">{g.spots}</p>
                    <p className="text-sm font-semibold text-[#4a7c59]">{g.price}</p>
                  </div>
                  <a
                    href="https://wa.me/919560333537"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-[#4a7c59] hover:underline"
                  >
                    <MessageCircle size={14} /> Join
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Internship / Training ── */}
        <div>
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4843a]/5 border border-[#d4843a]/15 mb-4"
            >
              <BookOpen size={12} className="text-[#d4843a]" />
              <span className="text-[#d4843a] text-[10px] tracking-[0.2em] uppercase font-medium">Internship & Training</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight"
            >
              Work <span className="italic text-[#d4843a]">with us.</span>
            </motion.h2>
            <p className="text-[#6b7280] font-light mt-3 text-lg max-w-xl">
              For psychology students, counsellors, and mental health professionals looking to grow their practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTERNSHIPS.map((intern, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-white rounded-[2.5rem] p-8 border transition-shadow duration-500 flex flex-col gap-5 ${
                  intern.open
                    ? 'border-[#f0ebe3] hover:border-[#d4843a]/30 hover:shadow-[0_20px_50px_rgba(212,132,58,0.08)]'
                    : 'border-[#f0ebe3] opacity-70'
                }`}
              >
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${
                    intern.open
                      ? 'bg-[#e8f4ec] text-[#4a7c59]'
                      : 'bg-[#f0ebe3] text-[#9ca3af]'
                  }`}>
                    {intern.open ? 'Applications Open' : 'Coming Soon'}
                  </span>
                  <span className="text-[11px] text-[#9ca3af]">{intern.duration}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl text-[#1a1a1a] mb-1">{intern.role}</h3>
                  <p className="text-[11px] text-[#d4843a] font-medium mb-3 uppercase tracking-wide">{intern.eligibility}</p>
                  <p className="text-sm text-[#6b7280] font-light leading-relaxed mb-4">{intern.desc}</p>
                  <ul className="space-y-1.5">
                    {intern.perks.map((perk, pi) => (
                      <li key={pi} className="flex items-center gap-2 text-[12px] text-[#6b7280]">
                        <span className="w-1 h-1 rounded-full bg-[#d4843a] shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                {intern.open ? (
                  <a
                    href="https://wa.me/919560333537"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full bg-[#d4843a] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#c07530] transition-colors group/btn"
                  >
                    Apply via WhatsApp <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <button disabled className="w-full py-3.5 rounded-full bg-[#f0ebe3] text-[#9ca3af] text-sm font-semibold cursor-not-allowed">
                    Notify Me When Open
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
