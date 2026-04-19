'use client'
import { motion } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'Therapy is not a last resort.',
    body: 'In India, most people seek help only after years of suffering in silence. We believe therapy is maintenance — like exercise for the mind. You don\'t wait until you can\'t walk to start moving.',
  },
  {
    number: '02',
    title: 'The room matters.',
    body: 'A cold, fluorescent-lit office with a clipboard between you and your therapist is not a healing environment. We designed our space to feel like a living room — warm, private, unhurried.',
  },
  {
    number: '03',
    title: 'Affordability is not optional.',
    body: 'Mental health care in India is either inaccessible or unaffordable. We structured our pricing so that a first session costs less than a dinner out — because the barrier to starting should be as low as possible.',
  },
  {
    number: '04',
    title: 'Language is care.',
    body: 'Healing happens in your mother tongue. Our therapists speak Hindi, English, Punjabi, Bengali, Kannada, and Telugu — because nuance gets lost in translation, and nuance is everything in therapy.',
  },
]

export default function TheIdea() {
  return (
    <section id="idea" className="py-32 px-6 bg-[#f5f0e8] relative overflow-hidden">

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a7c59]/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4843a]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">The Philosophy</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl text-[#1a1a1a] tracking-tight leading-tight"
            >
              Reframing therapy<br />
              for <span className="italic text-[#4a7c59]">India.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6b7280] text-lg font-light leading-relaxed"
          >
            Mental health in India carries a weight it shouldn&apos;t. The stigma, the silence, the sense that struggling is weakness — these are cultural inheritances we&apos;re actively working to undo. The Pause is built on four beliefs that shape everything we do.
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2.5rem] p-10 relative overflow-hidden hover:shadow-[0_20px_60px_rgba(74,124,89,0.08)] transition-shadow duration-500"
            >
              {/* Large number watermark */}
              <div className="absolute -top-4 -right-2 font-display text-[120px] text-[#4a7c59]/5 font-bold select-none pointer-events-none group-hover:text-[#4a7c59]/10 transition-colors duration-500 leading-none">
                {p.number}
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#4a7c59]/60 mb-4 block">{p.number}</span>
                <h3 className="font-display text-2xl md:text-3xl text-[#1a1a1a] mb-5 leading-tight group-hover:text-[#4a7c59] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-[#6b7280] font-light leading-relaxed text-[15px]">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <p className="font-display text-2xl md:text-3xl text-[#1a1a1a]/70 italic leading-relaxed">
            &ldquo;The Pause is not a clinic. It&apos;s a permission slip — to slow down, to feel, and to begin.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
