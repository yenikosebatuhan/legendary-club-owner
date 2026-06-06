/**
 * Resolve a public (`/public`) asset path against Vite's BASE_URL so images
 * load correctly both in local dev ('/') and on GitHub Pages
 * ('/legendary-club-owner/'). External URLs are returned untouched.
 */
export function asset(path) {
  if (typeof path !== 'string' || /^(https?:)?\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/?$/, '/') + path.replace(/^\//, '')
}
