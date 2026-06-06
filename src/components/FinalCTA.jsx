import { ArrowRight, Check } from 'lucide-react'
import SafeImage from './SafeImage.jsx'

const TRUST = ['Free to play', 'No pay-to-win', 'Real match data', 'Verified season rewards']

export default function FinalCTA() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-24">
      <div className="relative mx-auto flex min-h-[24rem] max-w-5xl items-center overflow-hidden rounded-3xl border border-white/10 bg-pitch-950">
        {/* Cinematic AI-generated backdrop: an empty president's chair overlooking the stadium */}
        <SafeImage
          src="/assets/empty-president-chair.png"
          alt="An empty executive president's chair in a private box overlooking a floodlit football stadium at night"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark gradient overlays so the chair sits in shadow and text stays crisp */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-pitch-950 via-pitch-950/85 to-pitch-950/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-transparent to-pitch-950/40"
        />
        {/* Emerald glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-neon/15 blur-[100px]"
        />

        <div className="relative z-10 max-w-xl p-10 sm:p-14 lg:p-16">
          <span className="section-eyebrow">The chair is empty</span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-5xl">
            Your club is waiting for a <span className="gradient-text">president.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-slate-300 sm:text-lg">
            Build smarter. Scout sharper. Win the season.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#build" className="btn-neon w-full animate-pulse-glow sm:w-auto">
              Start Your Club <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#why" className="btn-ghost w-full sm:w-auto">
              Why it&apos;s different
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-neon" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
