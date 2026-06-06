import { expect } from '@playwright/test'

// Option labels/ids mirrored from src/components/BuildYourClub.jsx so tests
// assert against the real, user-visible feature data.
export const CITIES = ['Industrial City', 'Coastal City', 'Capital Club', 'Underdog Town']
export const STYLES = [
  'Tactical Mastermind',
  'Youth Academy Builder',
  'Transfer Market Shark',
  'Stadium Empire',
]
export const COLORS = ['Emerald Black', 'Royal Blue', 'Crimson Gold', 'White Silver']
export const COLOR_IDS = ['emerald-black', 'royal-blue', 'crimson-gold', 'white-silver']

export const DEFAULT_CLUB = {
  name: 'North London Royals',
  cityIndex: 0,
  styleIndex: 0,
  colorIndex: 2,
}

/** Navigate to the app root, resolving correctly under any deploy base path. */
export async function gotoHome(page) {
  // './' resolves to the configured baseURL directory (works for both
  // http://localhost:5173/ and https://.../legendary-club-owner/).
  await page.goto('./', { waitUntil: 'domcontentloaded' })
}

/** True when running on a narrow (mobile) viewport where the desktop nav is hidden. */
export function isMobile(page) {
  const vp = page.viewportSize()
  return !!vp && vp.width < 768
}

/** Assert that an <img> has actually decoded (not just present in the DOM). */
export async function expectImageLoaded(locator) {
  await locator.scrollIntoViewIfNeeded()
  await expect(locator).toBeVisible()
  await expect
    .poll(async () => locator.evaluate((img) => img.complete && img.naturalWidth > 0), {
      timeout: 15_000,
    })
    .toBe(true)
}

/**
 * Drive the full Build Your Club onboarding flow and land on the result screen.
 * Returns the human-readable selections so callers can assert on them.
 */
export async function buildClub(page, opts = {}) {
  const { name, cityIndex, styleIndex, colorIndex } = { ...DEFAULT_CLUB, ...opts }

  await gotoHome(page)
  await page.locator('#build').scrollIntoViewIfNeeded()

  // Step 1 — name
  await page.getByTestId('club-name-input').fill(name)
  await page.getByTestId('next-step').click()

  // Step 2 — city
  await page.getByTestId('city-option').nth(cityIndex).click()
  await page.getByTestId('next-step').click()

  // Step 3 — style
  await page.getByTestId('style-option').nth(styleIndex).click()
  await page.getByTestId('next-step').click()

  // Step 4 — colors
  await page.getByTestId('color-option').nth(colorIndex).click()
  await page.getByTestId('next-step').click()

  await expect(page.getByTestId('club-result')).toBeVisible()

  return {
    name,
    city: CITIES[cityIndex],
    style: STYLES[styleIndex],
    color: COLORS[colorIndex],
    colorId: COLOR_IDS[colorIndex],
  }
}
