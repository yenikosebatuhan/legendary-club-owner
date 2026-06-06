import Logo from './Logo.jsx'

const LINKS = [
  { label: 'Why different', href: '#why' },
  { label: 'How it works', href: '#how' },
  { label: 'Build a club', href: '#build' },
  { label: 'Leaderboard', href: '#leaderboard' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-pitch-950">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Logo />
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              Not just football. Football ownership. Build a club, outsmart real managers, win real
              rewards.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              Known as <span className="text-slate-400">Efsane Başkan</span> in Turkey.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-neon">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} No Surrender Studio. Case study concept.</p>
          <p>Free-to-play · Skill-based · No pay-to-win</p>
        </div>
      </div>
    </footer>
  )
}
