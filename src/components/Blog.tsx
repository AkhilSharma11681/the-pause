'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const posts = [
  {
    tag: 'Anxiety',
    title: '5 signs your anxiety needs professional attention',
    excerpt: 'Occasional worry is normal. But when anxiety starts affecting your sleep, relationships, or work — it\'s time to pause.',
    readTime: '4 min read',
    color: '#e8f4ec',
  },
  {
    tag: 'Burnout',
    title: 'The difference between being tired and being burnt out',
    excerpt: 'Burnout isn\'t just exhaustion. It\'s a clinical state that requires more than a weekend off to recover from.',
    readTime: '5 min read',
    color: '#f5f0e8',
  },
  {
    tag: 'Relationships',
    title: 'Why couples therapy works even when things seem fine',
    excerpt: 'The best time to see a couples therapist isn\'t when things are broken — it\'s before they get there.',
    readTime: '3 min read',
    color: '#f4ede8',
  },
]

export default function Blog() {
  return (
    <section className="py-24 px-6 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a7c59]/5 border border-[#4a7c59]/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]" />
              <span className="text-[#4a7c59] text-[10px] tracking-[0.2em] uppercase font-medium">Resources</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight">
              From the <span className="italic text-[#4a7c59]">journal</span>
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-[#4a7c59] text-sm font-medium shrink-0">
            Read all articles
            <span className="block w-6 h-px bg-[#4a7c59] group-hover:w-10 transition-all" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-[2.5rem] overflow-hidden border border-[#f0ebe3] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer"
              style={{ backgroundColor: post.color }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#4a7c59] font-bold px-3 py-1 bg-white/60 rounded-full">
                    {post.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#4a7c59] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a] mb-4 leading-snug group-hover:text-[#4a7c59] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#6b7280] text-sm font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <p className="text-[#9ca3af] text-xs uppercase tracking-widest">{post.readTime}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
