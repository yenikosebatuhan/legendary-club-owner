import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WhyDifferent from './components/WhyDifferent.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import CredibilityStrip from './components/CredibilityStrip.jsx'
import BuildYourClub from './components/BuildYourClub.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // The club created in the "Build Your Club" flow is lifted here so the
  // leaderboard section can highlight the player's club after onboarding.
  const [club, setClub] = useState(null)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Faint tactical grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint opacity-[0.5]"
        style={{ backgroundSize: '48px 48px' }}
      />
      <Navbar />
      <main>
        <Hero />
        <WhyDifferent />
        <HowItWorks />
        <CredibilityStrip />
        <BuildYourClub onClubCreated={setClub} />
        <Leaderboard club={club} />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
