import { useState } from 'react'

/**
 * Brand lockup: the LCO crest (AI-generated logo image with a CSS fallback)
 * + the full "Legendary Club Owner" name. Pass `compact` for crest only.
 */
export default function Logo({ compact = false, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <span className={`group flex items-center gap-2.5 ${className}`}>
      {imgFailed ? (
        // Fallback: simple LCO box
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-neon to-emerald-500 font-display text-[13px] font-bold tracking-tight text-pitch-950 shadow-neon ring-1 ring-inset ring-white/30">
          LCO
        </span>
      ) : (
        <img
          src="/assets/logo-lco.png"
          alt="Legendary Club Owner crest"
          className="h-10 w-10 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(62,245,139,0.35)]"
          onError={() => setImgFailed(true)}
        />
      )}
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[15px] font-semibold tracking-tight text-white">
            Legendary Club Owner
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
            Football ownership
          </span>
        </span>
      )}
    </span>
  )
}
