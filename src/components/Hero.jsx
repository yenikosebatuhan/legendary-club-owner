import {
  Target,
  ShieldCheck,
  BarChart3,
  Trophy,
  ArrowRight,
  Brain,
  Search,
  Building2,
  Swords,
  TrendingUp,
  ShieldOff,
} from 'lucide-react'
import SafeImage from './SafeImage.jsx'

const BADGES = [
  { icon: Target, label: 'Skill-based' },
  { icon: ShieldCheck, label: 'No pay-to-win' },
  { icon: BarChart3, label: 'Real match data' },
  { icon: Trophy, label: 'Season rewards' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      {/* Stadium lighting glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-neon/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy column */}
        <div className="animate-fade-up text-center lg:text-left">
          <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            <span className="chip border-neon/30 bg-neon/5 text-neon">
              <Swords className="h-3.5 w-3.5" />
              Not just football. Football ownership.
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.5rem]">
            Run the club. Beat real managers.{' '}
            <span className="gradient-text">Earn real rewards.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
            Build your club, scout players and climb weekly leagues — where decisions matter more
            than luck or spending.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#build" className="btn-neon w-full sm:w-auto">
              Start Your Club <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how" className="btn-ghost w-full sm:w-auto">
              See How It Works
            </a>
          </div>

          {/* Trust / value badges */}
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {BADGES.map((b) => (
              <li key={b.label} className="chip">
                <b.icon className="h-3.5 w-3.5 text-neon" />
                {b.label}
              </li>
            ))}
          </ul>

          {/* Trust line near the rewards badge */}
          <p className="mx-auto mt-5 flex max-w-xl items-start gap-2 text-xs leading-relaxed text-slate-500 lg:mx-0">
            <ShieldOff className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon/70" />
            No betting. No random draws. Rewards come from verified leaderboard performance.
          </p>
        </div>

        {/* Visual column */}
        <HeroVisual />
      </div>
    </section>
  )
}

// Clean HTML overlay chips rendered on top of the hero image — the text is
// real HTML, never relying on (possibly imperfect) text baked into the asset.
const OVERLAY_CHIPS = [
  { icon: Brain, label: 'Tactics', value: '4-3-3' },
  { icon: Search, label: 'Scout', value: 'OVR 89' },
  { icon: TrendingUp, label: 'League Rank', value: '#6' },
]

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-fade-up [animation-delay:120ms]">
      {/* Emerald glow behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-neon/10 blur-3xl"
      />

      {/* Main scene card / premium frame */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-1.5 ring-1 ring-neon/20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-gradient-to-b from-pitch-800 to-pitch-950">
          {/* AI-generated hero (Gemini). Falls back to the CSS stadium mockup. */}
          <SafeImage
            src="/assets/hero-lco.png"
            alt="A fictional football club president standing in a modern executive box overlooking a floodlit stadium at night, with holographic football-management dashboard panels floating around him"
            className="absolute inset-0 z-10 h-full w-full object-cover [object-position:62%_center]"
          />

          {/* CSS stadium mockup (fallback / backdrop, hidden behind image when present) */}
          <StadiumMockup />

          {/* Dark gradient overlays for text legibility + cinematic depth.
              The left-edge gradient also masks any imperfect AI UI text. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-gradient-to-t from-pitch-950 via-pitch-950/15 to-pitch-950/40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-r from-pitch-950/70 to-transparent"
          />

          {/* Overlay chips (top) */}
          <div className="absolute inset-x-0 top-0 z-30 flex flex-wrap gap-2 p-4">
            {OVERLAY_CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-pitch-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
              >
                <c.icon className="h-3.5 w-3.5 text-neon" />
                {c.label} <span className="text-neon">· {c.value}</span>
              </span>
            ))}
          </div>

          {/* Matchday strip (bottom) — real HTML scoreboard */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-5">
            <div className="glass rounded-xl px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-neon">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
                  Matchday — Live
                </p>
                <span className="text-[10px] font-medium text-slate-400">73&apos;</span>
              </div>
              <p className="mt-1 text-sm font-medium text-white">
                North London Royals <span className="text-neon">2</span> — 1 Riverside Athletic
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-neon to-emerald-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One floating card outside the frame for extra depth (desktop only) */}
      <FloatCard
        icon={Building2}
        title="Facility Upgrade"
        value="Stadium Lv. 3"
        className="-right-3 bottom-24 animate-floaty sm:-right-7"
      />
    </div>
  )
}

function StadiumMockup() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/* Floodlight glow */}
      <div className="absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-neon/30 blur-3xl" />
      <div className="absolute left-8 top-6 h-2.5 w-2.5 rounded-full bg-neon shadow-neon" />
      <div className="absolute right-8 top-6 h-2.5 w-2.5 rounded-full bg-neon shadow-neon" />

      {/* Pitch */}
      <div className="absolute inset-x-10 top-1/4 bottom-1/3 rounded-[50%] bg-gradient-to-b from-emerald-900/60 to-emerald-950/80 ring-1 ring-emerald-600/30">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neon/30" />
        <div className="absolute left-1/2 top-1/2 h-10 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-neon/30" />
      </div>

      {/* Owner silhouette */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative h-44 w-40">
          <div className="absolute bottom-0 left-1/2 h-36 w-36 -translate-x-1/2 rounded-t-[45%] bg-gradient-to-t from-pitch-950 to-pitch-800" />
          <div className="absolute bottom-28 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-t from-pitch-900 to-pitch-700 ring-1 ring-neon/20" />
        </div>
      </div>

      {/* Bottom fade for the matchday strip */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pitch-950 via-pitch-950/60 to-transparent" />
    </div>
  )
}

function FloatCard({ icon: Icon, title, value, className = '' }) {
  return (
    <div
      className={`glass-strong absolute z-30 hidden w-40 rounded-xl p-3 sm:block ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neon/15 text-neon">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-neon">{title}</p>
          <p className="truncate text-xs font-medium text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}
