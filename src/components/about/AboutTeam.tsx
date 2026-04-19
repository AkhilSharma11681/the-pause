'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Star, Quote, ArrowUpRight } from 'lucide-react'

const therapists = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Clinical Psychologist',
    speciality: 'Anxiety · Depression · Burnout',
    exp: '8 years',
    initial: 'P',
    color: '#4a7c59',
    languages: 'Hindi, English',
    bio: 'Priya uses heart-centered CBT and mindfulness to help clients navigate burnout with grace.',
    sessions: '300+',
    rating: '4.9',
    longBio: 'Dr. Priya Sharma completed her M.Phil in Clinical Psychology from NIMHANS, Bangalore. She has spent eight years working with individuals navigating anxiety, depression, and occupational burnout — particularly among young professionals in urban India. Her approach blends evidence-based CBT with somatic awareness, creating a practice that is both rigorous and deeply human.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Counselling Psychologist',
    speciality: 'Relationships · Grief · Self-esteem',
    exp: '6 years',
    initial: 'A',
    color: '#2d5a3d',
    languages: 'Hindi, English, Punjabi',
    bio: 'Arjun specializes in the complex dynamics of modern relationships and emotional resilience.',
    sessions: '200+',
    rating: '5.0',
    longBio: 'Arjun holds an MA in Counselling Psychology from Delhi University and trained under the iCall program at TISS. He works primarily with individuals and couples navigating relationship transitions, grief, and identity questions. His sessions are known for their warmth and the rare quality of making people feel genuinely understood.',
  },
  {
    name: 'Dr. Sneha Rao',
    role: 'Psychotherapist',
    speciality: 'Trauma · PTSD · Identity',
    exp: '10 years',
    initial: 'S',
    color: '#6a9e78',
    languages: 'Kannada, Telugu, English',
    bio: 'A trauma-informed specialist creating safe harbor for survivors of life-altering events.',
    sessions: '500+',
    rating: '4.8',
    longBio: 'Dr. Sneha Rao is a trauma-informed psychotherapist with a decade of experience working with survivors of abuse, accidents, and complex PTSD. She trained in EMDR and Narrative Therapy and brings a deeply intersectional lens to her work — particularly around gender, caste, and identity in the Indian context. Her practice is a space where nothing is too heavy to hold.',
  },
  {
    name: 'Rahul Bose',
    role: 'Behavioural Therapist',
    speciality: 'ADHD · OCD · Stress',
    exp: '5 years',
    initial: 'R',
    color: '#4a7c59',
    languages: 'Bengali, Hindi, English',
    bio: 'Rahul builds practical mental toolkits for high-performance individuals facing daily stress.',
    sessions: '150+',
    rating: '4.9',
    longBio: 'Rahul Bose specializes in behavioural interventions for ADHD, OCD, and chronic stress — particularly in students and working professionals. He completed his training in Cognitive Behavioural Therapy at the Beck Institute and brings a structured, practical approach to sessions. His clients describe him as someone who makes the abstract feel actionable.',
  },
]

export default function AboutTeam() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="therapists" className="py-32 px-6 bg-[#f5f0e8] relative overflow-hidden">

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4a7c59]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4843a]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
            <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">The Collective</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-6 tracking-tight"
          >
            Guided by <span className="italic text-[#4a7c59]">excellence</span>
          </motion.h2>
          <p className="text-[#6b7280] font-light max-w-lg mx-auto leading-relaxed text-lg">
            Every specialist at The Pause is hand-selected for their clinical mastery and deep empathetic capacity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="bg-white rounded-[2.5rem] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.03)] group"
            >
              <div className="bg-[#faf7f2] rounded-[2.3rem] p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 group-hover:bg-white">

                {/* Top badges */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#f0ebe3]">
                    <Star size={12} className="text-[#d4843a] fill-[#d4843a]" />
                    <span className="text-[11px] font-bold text-[#1a1a1a]">{t.rating}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#f0ebe3] group-hover:bg-[#4a7c59] group-hover:text-white transition-colors duration-500">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative mb-8 self-center">
                  <motion.div
                    animate={{ rotate: hovered === i ? 180 : 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-3 rounded-full border border-dashed border-[#4a7c59]/20"
                  />
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center relative z-10 shadow-inner group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: t.color }}
                  >
                    <span className="font-display text-4xl text-white">{t.initial}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-lg z-20">
                    <CheckCircle2 size={16} className="text-[#4a7c59]" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center flex-1">
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-1">{t.name}</h3>
                  <p className="text-[#4a7c59] text-[13px] font-medium tracking-wide mb-4 uppercase">{t.role}</p>
                  <p className="text-[11px] text-[#9ca3af] uppercase tracking-widest mb-5">{t.speciality}</p>

                  <div className="relative mb-6">
                    <Quote size={20} className="absolute -top-4 -left-2 text-[#4a7c59]/10" />
                    <p className="text-[#6b7280] text-[14px] font-light leading-relaxed italic">
                      &quot;{t.bio}&quot;
                    </p>
                  </div>

                  {/* Language tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {t.languages.split(', ').map((lang, li) => (
                      <span key={li} className="text-[10px] uppercase tracking-widest text-[#6b7280] px-3 py-1 bg-white rounded-full border border-[#f0ebe3]">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Expand bio */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="text-[11px] text-[#4a7c59] font-medium tracking-wide hover:underline mb-4"
                  >
                    {expanded === i ? 'Show less ↑' : 'Full profile ↓'}
                  </button>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#6b7280] text-[13px] font-light leading-relaxed text-left overflow-hidden mb-4"
                      >
                        {t.longBio}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA */}
                <a
                  href="#book"
                  onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 rounded-full text-center text-sm font-semibold transition-all duration-300 bg-white border border-[#4a7c59]/30 text-[#4a7c59] group-hover:bg-[#4a7c59] group-hover:text-white group-hover:border-[#4a7c59]"
                >
                  Schedule Session
                </a>

                {/* Background watermark */}
                <div className="absolute -bottom-4 -left-4 font-display text-[80px] text-[#4a7c59]/5 font-bold pointer-events-none group-hover:text-[#4a7c59]/10 transition-colors leading-none">
                  {t.exp}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
