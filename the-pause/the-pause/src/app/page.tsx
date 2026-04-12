import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import WhyUs from '@/components/WhyUs'
import Therapists from '@/components/Therapists'
import Conditions from '@/components/Conditions'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Testimonials from '@/components/Testimonials'
import BookingSection from '@/components/BookingSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <TrustBadges />
      <HowItWorks />
      <WhyUs />
      <Therapists />
      <Conditions />
      <Pricing />
      <FAQ />
      <Testimonials />
      <BookingSection />
      <CTA />
      <Footer />
    </main>
  )
}