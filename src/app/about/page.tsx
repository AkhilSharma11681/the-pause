import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutHero from '@/components/about/AboutHero'
import TheIdea from '@/components/about/TheIdea'
import OurSpace from '@/components/about/OurSpace'
import AboutTeam from '@/components/about/AboutTeam'
import AboutHowItWorks from '@/components/about/AboutHowItWorks'
import WhatsApp from '@/components/WhatsApp'
import CrisisBanner from '@/components/CrisisBanner'

export const metadata = {
  title: 'About Us — The Pause',
  description: 'The story behind The Pause — why we built a different kind of therapy space in India, our philosophy, our clinic in Sector 12 Dwarka, and the team that makes it possible.',
}

export default function AboutPage() {
  return (
    <main className="pb-14 md:pb-0">
      <Navbar />
      <AboutHero />
      <TheIdea />
      <OurSpace />
      <AboutTeam />
      <AboutHowItWorks />
      <Footer />
      <WhatsApp />
      <CrisisBanner />
    </main>
  )
}
