import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Top — brand + tagline */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex gap-1">
              <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full" />
              <div className="w-1.5 h-5 bg-[#4a7c59] rounded-full" />
            </div>
            <span className="font-display text-xl text-white">The Pause</span>
          </div>
          <p className="text-[#6b7280] font-light text-sm leading-relaxed max-w-sm">
            A calm, private space for psychological care. Licensed therapists, honest pricing, real results.
          </p>
        </div>

        {/* Middle — links in a single row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <p className="text-[10px] text-[#4b5563] uppercase tracking-[0.2em] font-medium mb-5">Services</p>
            <ul className="space-y-3">
              {['Individual Therapy', 'Couples Therapy', 'Teen Counselling', 'Psychiatric Care'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-[#9ca3af] text-sm font-light hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-[#4b5563] uppercase tracking-[0.2em] font-medium mb-5">Company</p>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Therapists', href: '/about#team' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Contact', href: '/#book' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#9ca3af] text-sm font-light hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-[#4b5563] uppercase tracking-[0.2em] font-medium mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:thepause@gmail.com" className="text-[#9ca3af] text-sm font-light hover:text-white transition-colors">
                  thepause@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919152987821" className="text-[#9ca3af] text-sm font-light hover:text-white transition-colors">
                  +91 91529 87821
                </a>
              </li>
              <li className="text-[#9ca3af] text-sm font-light">Sector 12 Dwarka, New Delhi</li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-[#4b5563] uppercase tracking-[0.2em] font-medium mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { label: 'Book a Session', href: '/#book' },
                { label: 'Upcoming Events', href: '/#events' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'My Portal', href: '/auth' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#9ca3af] text-sm font-light hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2d2d2d] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#4b5563] text-xs font-light">© 2026 The Pause. All rights reserved.</p>
          <p className="text-[#4b5563] text-xs font-light">
            Crisis helpline:{' '}
            <a href="tel:9152987821" className="text-[#4a7c59] hover:text-[#6a9e78] transition-colors">
              iCall 9152987821
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
