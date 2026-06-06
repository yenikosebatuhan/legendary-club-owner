import { Repeat, Layers, ClipboardList } from 'lucide-react'

const POINTS = [
  { icon: Repeat, title: 'Transfers matter' },
  { icon: Layers, title: 'Facilities compound' },
  { icon: ClipboardList, title: 'Tactics decide matchday' },
]

export default function CredibilityStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
      <div className="glass-strong overflow-hidden p-6 sm:p-7">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <h2 className="font-display text-xl font-bold leading-snug text-white text-balance sm:text-2xl lg:max-w-xs">
            Built for football fans who <span className="gradient-text">think like managers.</span>
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neon/12 text-neon ring-1 ring-inset ring-neon/20">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="font-display text-sm font-semibold text-white">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
