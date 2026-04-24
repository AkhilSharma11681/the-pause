import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import ServicesPage from '@/components/services/ServicesPage'
import WhatsApp from '@/components/WhatsApp'
import CrisisBanner from '@/components/CrisisBanner'
import ScrollOnMount from '@/components/ScrollOnMount'

export const metadata = {
  title: 'Services — The Pause',
  description: 'Book a therapy session or explore workshops, community programs, and internship opportunities at The Pause.',
}

export default function Services() {
  return (
    <main className="pb-14 md:pb-0">
      <ScrollOnMount />
      <Navbar />
      <Suspense fallback={null}>
        <ServicesPage />
      </Suspense>
      <Footer />
      <WhatsApp />
      <CrisisBanner />
    </main>
  )
}
