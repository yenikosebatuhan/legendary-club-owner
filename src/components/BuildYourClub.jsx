import { useState } from 'react'
import {
  Factory,
  Waves,
  Landmark,
  Mountain,
  Brain,
  Sprout,
  TrendingUp,
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  Trophy,
  Target,
  Swords,
  Wallet,
  Users,
  Shield,
  Palette,
  CheckCircle2,
} from 'lucide-react'
import SafeImage from './SafeImage.jsx'

const CITY_OPTIONS = [
  { id: 'industrial', label: 'Industrial City', desc: 'Grit, grind and a roaring crowd.', icon: Factory },
  { id: 'coastal', label: 'Coastal City', desc: 'Flair with a seaside swagger.', icon: Waves },
  { id: 'capital', label: 'Capital Club', desc: 'Big-city pressure and ambition.', icon: Landmark },
  { id: 'underdog', label: 'Underdog Town', desc: 'Small budget, giant-killing dreams.', icon: Mountain },
]

const STYLE_OPTIONS = [
  { id: 'tactical', label: 'Tactical Mastermind', desc: 'Win the chess match.', icon: Brain },
  { id: 'academy', label: 'Youth Academy Builder', desc: 'Grow legends from scratch.', icon: Sprout },
  { id: 'market', label: 'Transfer Market Shark', desc: 'Rule deadline day.', icon: TrendingUp },
  { id: 'stadium', label: 'Stadium Empire', desc: 'Fill every seat.', icon: Building2 },
]

const COLOR_OPTIONS = [
  { id: 'emerald-black', label: 'Emerald Black', from: '#3ef58b', to: '#0a0f17' },
  { id: 'royal-blue', label: 'Royal Blue', from: '#3b82f6', to: '#0b1e3f' },
  { id: 'crimson-gold', label: 'Crimson Gold', from: '#ef4444', to: '#f59e0b' },
  { id: 'white-silver', label: 'White Silver', from: '#f8fafc', to: '#94a3b8' },
]

const STEPS = ['Name', 'City', 'Style', 'Colors']

const STEP_COPY = [
  { title: 'Choose a name for your club.' },
  { title: 'Pick the identity your club grows from.' },
  { title: 'Choose how you want to win.' },
  { title: 'Choose your club look.' },
]

// Build crest initials from the club name (max 2 letters).
function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return 'LCO'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function BuildYourClub({ onClubCreated }) {
  const [step, setStep] = useState(0) // 0..3 steps, 4 = result
  const [name, setName] = useState('')
  const [city, setCity] = useState(null)
  const [style, setStyle] = useState(null)
  const [color, setColor] = useState(null)

  const trimmedName = name.trim()

  const canAdvance =
    (step === 0 && trimmedName.length > 0) ||
    (step === 1 && city) ||
    (step === 2 && style) ||
    (step === 3 && color)

  const handleNext = () => {
    if (!canAdvance) return
    if (step < 3) {
      setStep(step + 1)
    } else {
      onClubCreated?.({
        name: trimmedName,
        city: city.label,
        style: style.label,
        color,
        league: 'Amateur League',
        objective: 'Reach the Promotion Zone',
      })
      setStep(4)
    }
  }

  const handleReset = () => {
    setStep(0)
    setName('')
    setCity(null)
    setStyle(null)
    setColor(null)
    onClubCreated?.(null)
  }

  // Edit choices: go back into the flow keeping selections.
  const handleEdit = () => setStep(0)

  const club = { name: trimmedName, city, style, color }

  return (
    <section id="build" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="section-eyebrow">Try it now · 30 seconds</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Create your first club.
          </h2>
          <p className="mt-4 text-slate-400">Four choices. One season begins.</p>
        </div>

        {step < 4 ? (
          <div className="glass-strong mt-9 overflow-hidden p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left: question + options */}
              <div className="flex flex-col">
                <Stepper current={step} />

                <p className="mt-6 font-display text-lg font-semibold text-white">
                  {STEP_COPY[step].title}
                </p>

                <div className="mt-4 flex-1">
                  {step === 0 && <StepName name={name} setName={setName} onEnter={handleNext} />}
                  {step === 1 && (
                    <OptionGrid
                      testid="city-option"
                      options={CITY_OPTIONS}
                      selected={city?.id}
                      onSelect={setCity}
                    />
                  )}
                  {step === 2 && (
                    <OptionGrid
                      testid="style-option"
                      options={STYLE_OPTIONS}
                      selected={style?.id}
                      onSelect={setStyle}
                    />
                  )}
                  {step === 3 && <ColorGrid selected={color?.id} onSelect={setColor} />}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="btn-ghost !py-2.5 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    data-testid="next-step"
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className="btn-neon !py-2.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    {step === 3 ? 'Create my club' : 'Next'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right on desktop, stacks below the step on mobile */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon">
                  <Shield className="h-3.5 w-3.5" /> Club Preview
                </p>
                <ClubLicenseCard club={club} variant="preview" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-9">
            <ClubResult club={club} onReset={handleReset} onEdit={handleEdit} />
          </div>
        )}
      </div>
    </section>
  )
}

function Stepper({ current }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Onboarding progress">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-neon text-pitch-950'
                    : active
                      ? 'bg-neon/20 text-neon ring-2 ring-neon'
                      : 'bg-white/5 text-slate-500'
                }`}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  active ? 'text-white' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px flex-1 ${done ? 'bg-neon/60' : 'bg-white/10'}`}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function StepName({ name, setName, onEnter }) {
  return (
    <div className="animate-fade-up">
      <label htmlFor="club-name" className="sr-only">
        Club name
      </label>
      <input
        id="club-name"
        data-testid="club-name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
        placeholder="North London Royals"
        maxLength={28}
        autoComplete="off"
        aria-label="Club name"
        className="w-full rounded-xl border border-white/12 bg-pitch-950/60 px-4 py-3.5 text-base text-white placeholder-slate-500 outline-none transition-all focus:border-neon focus:ring-2 focus:ring-neon/40"
      />
      <p className="mt-2 text-xs text-slate-500">Pick something your rivals will learn to fear.</p>
    </div>
  )
}

function OptionGrid({ testid, options, selected, onSelect }) {
  return (
    <fieldset className="animate-fade-up">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {options.map((opt) => {
          const isSel = selected === opt.id
          const Icon = opt.icon
          return (
            <button
              key={opt.id}
              type="button"
              data-testid={testid}
              data-option-id={opt.id}
              aria-pressed={isSel}
              onClick={() => onSelect(opt)}
              className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                isSel
                  ? 'border-neon bg-neon/10 shadow-neon'
                  : 'border-white/10 bg-white/[0.03] hover:border-neon/40 hover:bg-white/[0.06]'
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 ring-inset ring-white/10 ${
                  isSel ? 'bg-neon/20 text-neon' : 'bg-white/[0.05] text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-semibold text-white">
                  {opt.label}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-400">{opt.desc}</span>
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function ColorGrid({ selected, onSelect }) {
  return (
    <fieldset className="animate-fade-up">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {COLOR_OPTIONS.map((opt) => {
          const isSel = selected === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              data-testid="color-option"
              data-option-id={opt.id}
              aria-pressed={isSel}
              aria-label={opt.label}
              onClick={() => onSelect(opt)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
                isSel
                  ? 'border-neon bg-neon/10 shadow-neon'
                  : 'border-white/10 bg-white/[0.03] hover:border-neon/40'
              }`}
            >
              {/* Mini club identity card: diagonal two-tone shirt + crest */}
              <span
                className="relative grid h-14 w-full place-items-center overflow-hidden rounded-lg ring-1 ring-inset ring-white/20"
                style={{
                  background: `linear-gradient(120deg, ${opt.from} 0%, ${opt.from} 48%, ${opt.to} 52%, ${opt.to} 100%)`,
                }}
                aria-hidden="true"
              >
                <Shield className="h-6 w-6 text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
              </span>
              <span className="text-center text-xs font-medium text-slate-200">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * The in-game club license card. `variant="preview"` is the live panel during
 * onboarding (partial data + placeholders); `variant="result"` is the full
 * approved screen with objective, budget and a confidence meter.
 */
function ClubLicenseCard({ club, variant = 'preview' }) {
  const isResult = variant === 'result'
  const swatch = club.color
  const displayName = club.name || 'Your Club'
  const initials = getInitials(club.name)
  const crestStyle = swatch
    ? { background: `linear-gradient(135deg, ${swatch.from}, ${swatch.to})` }
    : { background: 'linear-gradient(135deg, #3ef58b, #0a0f17)' }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neon/20 bg-pitch-950/60 shadow-neon">
      {/* Subtle pitch texture background; text stays HTML on top */}
      <SafeImage
        src="/assets/club-license-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-pitch-950/75" />
      {/* Emerald glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 h-32 w-44 -translate-x-1/2 rounded-full bg-neon/15 blur-3xl"
      />

      {/* Header: crest + name */}
      <div
        className="relative z-10 flex items-center gap-4 p-5"
        style={{
          background: swatch ? `linear-gradient(120deg, ${swatch.from}22, ${swatch.to}55)` : undefined,
        }}
      >
        <span
          className="grid h-16 w-16 shrink-0 place-items-center rounded-xl font-display text-2xl font-bold text-pitch-950 shadow-neon ring-2 ring-white/30"
          style={crestStyle}
          aria-label={`${displayName} crest`}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <h3
            className={`truncate font-display text-xl font-bold ${club.name ? 'text-white' : 'text-slate-500'}`}
          >
            {displayName}
          </h3>
          <p className="truncate text-sm text-slate-300">
            {club.city?.label || 'City —'} · {club.color?.label || 'Colors —'}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-0.5 text-[11px] font-semibold text-neon">
            <Trophy className="h-3 w-3" /> Amateur League
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <dl className="relative z-10 grid grid-cols-2 gap-px bg-white/5">
        <Stat icon={Building2} label="City identity" value={club.city?.label} />
        <Stat icon={Brain} label="Management style" value={club.style?.label} />
        {isResult && <Stat icon={Palette} label="Club colors" value={club.color?.label} />}
        <Stat icon={Swords} label="Opening fixture" value="vs Riverside Athletic" />
        <Stat icon={Target} label="Season objective" value="Reach the Promotion Zone" />
        {isResult && <Stat icon={Wallet} label="Starting budget" value="£2.5M" />}
      </dl>

      {/* Board confidence meter */}
      <div className="relative z-10 border-t border-white/5 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-slate-400">
            <Users className="h-3.5 w-3.5 text-neon" /> Board confidence
          </span>
          <span className="font-display font-bold text-white">72%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-neon to-emerald-300" />
        </div>
      </div>
    </div>
  )
}

function ClubResult({ club, onReset, onEdit }) {
  return (
    <div data-testid="club-result" className="animate-fade-up">
      <div className="mb-5 flex items-center justify-center gap-2 text-neon">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-display text-sm font-bold uppercase tracking-widest">
          Club License Approved
        </span>
      </div>

      <div className="mx-auto max-w-md">
        <ClubLicenseCard club={club} variant="result" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#leaderboard" className="btn-neon w-full sm:flex-1">
            Lead This Club <ArrowRight className="h-4 w-4" />
          </a>
          <button type="button" onClick={onEdit} className="btn-ghost w-full sm:w-auto">
            Edit Choices
          </button>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 w-full text-center text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
        >
          Start a different club
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Your club now appears highlighted in the season leaderboard below.
        </p>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="bg-pitch-950/70 p-4">
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-1 font-display text-sm font-semibold text-white">{value || '—'}</dd>
    </div>
  )
}
