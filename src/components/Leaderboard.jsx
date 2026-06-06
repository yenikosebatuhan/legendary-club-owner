import { Medal, Trophy, Sparkles, Crown } from 'lucide-react'
import SafeImage from './SafeImage.jsx'

const BASE_ROWS = [
  { rank: 1, club: 'Riverside Athletic', style: 'Tactical Mastermind', points: 84, reward: 'paid' },
  { rank: 2, club: 'Harbor City FC', style: 'Stadium Empire', points: 79, reward: 'paid' },
  { rank: 3, club: 'Ironworks United', style: 'Transfer Market Shark', points: 75, reward: 'paid' },
  { rank: 4, club: 'Granite Rovers', style: 'Youth Academy Builder', points: 71, reward: 'eligible' },
  { rank: 5, club: 'Coastline Wanderers', style: 'Tactical Mastermind', points: 68, reward: 'eligible' },
]

function RewardBadge({ status }) {
  const map = {
    paid: { label: 'Cash reward', cls: 'border-neon/40 bg-neon/10 text-neon' },
    eligible: { label: 'Reward zone', cls: 'border-amber-400/40 bg-amber-400/10 text-amber-300' },
    hunt: { label: 'Promotion hunt', cls: 'border-neon/30 bg-neon/10 text-neon' },
  }
  const m = map[status] || map.eligible
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${m.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  )
}

function RankBadge({ rank, isYou }) {
  if (rank === 1)
    return (
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-neon/15 text-neon">
        <Crown className="h-4 w-4" />
      </span>
    )
  if (rank <= 3)
    return (
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-neon/15 text-neon">
        <Medal className="h-4 w-4" />
      </span>
    )
  return (
    <span
      className={`grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-bold ${
        isYou ? 'bg-neon/20 text-neon' : 'bg-white/5 text-slate-300'
      }`}
    >
      {rank}
    </span>
  )
}

function LeaderRow({ r }) {
  return (
    <li
      data-testid={r.isYou ? 'user-leaderboard-row' : 'leaderboard-row'}
      className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 transition-colors sm:grid-cols-[3rem_1fr_1fr_5rem_8rem] sm:px-4 ${
        r.isYou
          ? 'border border-neon/40 bg-neon/[0.08] shadow-neon'
          : 'border border-transparent bg-white/[0.02] hover:bg-white/[0.05]'
      }`}
    >
      <RankBadge rank={r.rank} isYou={r.isYou} />

      <span className="min-w-0">
        <span className="flex items-center gap-2 truncate font-display text-sm font-semibold text-white">
          {r.club}
          {r.isYou && (
            <span className="inline-flex items-center gap-1 rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[10px] font-semibold text-neon">
              <Sparkles className="h-3 w-3" /> Your Club
            </span>
          )}
        </span>
        <span className="block truncate text-xs text-slate-400 sm:hidden">{r.style}</span>
      </span>

      <span className="hidden truncate text-sm text-slate-300 sm:block">{r.style}</span>
      <span className="hidden text-right font-display text-sm font-semibold text-white sm:block">
        {r.points}
      </span>
      <span className="flex justify-end sm:block sm:text-right">
        <RewardBadge status={r.reward} />
      </span>
    </li>
  )
}

export default function Leaderboard({ club }) {
  const userRow = club
    ? { rank: 6, club: club.name, style: club.style, points: 62, reward: 'hunt', isYou: true }
    : null

  return (
    <section
      id="leaderboard"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/5 bg-pitch-900/40 py-16 sm:py-20"
    >
      {/* Atmospheric AI-generated league dashboard backdrop. The readable
          leaderboard below is real HTML — we never rely on the image's text. */}
      <SafeImage
        src="/assets/weekly-league.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pitch-950 via-pitch-950/85 to-pitch-950"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Season leaderboard</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Climb the table. Reach the reward zone.
          </h2>
          <p className="mt-4 text-slate-400">
            Season rewards are based on verified leaderboard performance — not betting, luck or
            spending.
          </p>
        </div>

        <div className="glass-strong mt-10 overflow-hidden p-2 sm:p-3">
          {/* Season meta bar */}
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
            <span className="inline-flex items-center gap-2 rounded-lg border border-neon/20 bg-neon/5 px-3 py-1.5 text-xs font-semibold text-neon">
              <Trophy className="h-3.5 w-3.5" />
              Season 05 · Week 12
            </span>
            <span className="text-xs text-slate-500">Updated live · 20 clubs</span>
          </div>

          {/* Header row (desktop) */}
          <div className="hidden grid-cols-[3rem_1fr_1fr_5rem_8rem] gap-3 border-t border-white/5 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:grid">
            <span>Rank</span>
            <span>Club</span>
            <span>Manager style</span>
            <span className="text-right">Points</span>
            <span className="text-right">Reward</span>
          </div>

          <ul className="space-y-1.5 pt-1.5">
            {BASE_ROWS.map((r) => (
              <LeaderRow key={r.rank} r={r} />
            ))}

            {/* Reward zone divider after rank 5 */}
            <li data-testid="reward-zone-divider" className="flex items-center gap-3 px-2 py-1.5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/40" />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                Reward Zone · Top 5 earn rewards
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/40" />
            </li>

            {userRow ? (
              <LeaderRow r={userRow} />
            ) : (
              <li
                data-testid="leaderboard-placeholder"
                className="rounded-xl border border-dashed border-white/10 px-4 py-4 text-center text-sm text-slate-500"
              >
                Build your club above to drop into the board at #6 — then climb into the reward zone.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
