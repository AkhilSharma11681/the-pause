import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Pause — Psychological Care Online & In-Person | Sonipat',
  description: 'Book a session with certified psychologists at The Pause. Online therapy and in-person sessions in Sonipat. Anxiety, depression, burnout, relationships and more.',
  openGraph: {
    title: 'The Pause — Psychological Care',
    description: 'A calm, private space to work through anxiety, burnout, relationships and more — with certified psychologists.',
    url: 'https://thepause.in',
    siteName: 'The Pause',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'The Pause — Psychological Care' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pause — Psychological Care',
    description: 'Book a session with certified psychologists. Online & in-person therapy.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-[#faf7f2] antialiased">
        {children}
      </body>
    </html>
  )
}
