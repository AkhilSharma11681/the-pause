import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import Therapists from '@/components/Therapists'
import Conditions from '@/components/Conditions'
import MythBusters from '@/components/MythBusters'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import FAQ from '@/components/FAQ'
import ClinicMap from '@/components/ClinicMap'
import BookingSection from '@/components/BookingSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import CrisisBanner from '@/components/CrisisBanner'

export default function Home() {
  return (
    <main className="pb-14 md:pb-0">
      <Navbar />
      <Hero />
      <TrustBar />
      <TrustBadges />
      <HowItWorks />
      <Therapists />
      <Conditions />
      <MythBusters />
      <Pricing />
      <Testimonials />
      <Blog />
      <ClinicMap />
      <FAQ />
      <BookingSection />
      <CTA />
      <Footer />
      <WhatsApp />
      <CrisisBanner />
    </main>
  )
}
