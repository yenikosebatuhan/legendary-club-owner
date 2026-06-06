import { Target, ShieldCheck, Trophy, BarChart3 } from 'lucide-react'

const FEATURES = [
  {
    icon: Target,
    title: 'Decisions beat luck',
    copy: 'No pack luck. No random draws. Your football decisions shape every result.',
    badge: 'Decisions > luck',
  },
  {
    icon: ShieldCheck,
    title: 'No wallet advantage',
    copy: 'Payments never buy unfair power. The best manager wins.',
    badge: 'Fair play',
  },
  {
    icon: Trophy,
    title: 'Season rewards',
    copy: 'Verified players compete for leaderboard-based rewards.',
    badge: 'Verified payouts',
  },
  {
    icon: BarChart3,
    title: 'Real match engine',
    copy: 'Full 90-minute matches use real football performance data.',
    badge: '90-min sim',
  },
]

export default function WhyDifferent() {
  return (
    <section id="why" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Why it&apos;s different</span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
          Football ownership, made mobile.
        </h2>
        <p className="mt-4 text-slate-400">
          Build, scout, set tactics and climb the table — without pay-to-win shortcuts.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="glass group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-neon"
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neon/0 blur-2xl transition-all duration-300 group-hover:bg-neon/20"
            />
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-neon/12 text-neon ring-1 ring-inset ring-neon/20">
                <f.icon className="h-6 w-6" />
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {f.badge}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
