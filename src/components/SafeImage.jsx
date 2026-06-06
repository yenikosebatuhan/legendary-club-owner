import { useState } from 'react'
import { asset } from '../lib/asset.js'

/**
 * An <img> that removes itself (and optionally renders a fallback) if the
 * source fails to load — so a missing asset never breaks the layout.
 * Resolves public paths against the deploy base. Any container styling/overlays
 * live in the parent, which always renders.
 */
export default function SafeImage({ src, alt, className = '', fallback = null, ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) return fallback

  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
