import { Building2, Search, ClipboardList, Swords } from 'lucide-react'
import SafeImage from './SafeImage.jsx'

const STEPS = [
  {
    n: '01',
    icon: Building2,
    title: 'Build the club city',
    copy: 'Upgrade the stadium, academy and facilities.',
    chip: { label: 'Facilities', value: 'Lv. 3' },
    img: '/assets/build-club-city.png',
    alt: 'Isometric football club city with a stadium, training ground, academy buildings and roads',
  },
  {
    n: '02',
    icon: Search,
    title: 'Scout player cards',
    copy: 'Find hidden gems and build chemistry.',
    chip: { label: 'New scout', value: 'OVR 87' },
    img: '/assets/scout-player-cards.png',
    alt: 'Scouting report dashboard showing player cards and silhouettes',
  },
  {
    n: '03',
    icon: ClipboardList,
    title: 'Set tactics',
    copy: 'Pick your formation, press and match plan.',
    chip: { label: 'Formation', value: '4-3-3' },
    img: '/assets/tactics-board.png',
    alt: 'Football tactics board with arrows, player numbers and formation lines',
  },
  {
    n: '04',
    icon: Swords,
    title: 'Compete every week',
    copy: 'Face real managers in weekly leagues.',
    chip: { label: 'Week 6', value: '#2 of 20' },
    img: '/assets/weekly-league.png',
    alt: 'Weekly league dashboard with matchday results and standings',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative scroll-mt-24 border-y border-white/5 bg-pitch-900/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">How it works</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Four moves to matchday.
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n}>
              <article className="glass group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-neon">
                {/* Image area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-pitch-800 to-pitch-950">
                  <SafeImage
                    src={s.img}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark gradient + emerald glow for integration */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/20 to-transparent"
                  />
                  <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-pitch-950/70 text-neon ring-1 ring-inset ring-neon/30 backdrop-blur-sm">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="absolute right-3 top-3 font-display text-2xl font-bold text-white/30">
                    {s.n}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.copy}</p>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-neon/20 bg-neon/5 px-3 py-1.5 text-xs font-medium">
                      <span className="text-slate-400">{s.chip.label}</span>
                      <span className="font-semibold text-neon">{s.chip.value}</span>
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
