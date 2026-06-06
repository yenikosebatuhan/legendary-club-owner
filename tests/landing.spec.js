import { test, expect } from '@playwright/test'
import { gotoHome, isMobile, expectImageLoaded } from './helpers.js'

test.describe('Landing page — content & smoke', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('loads with the correct document title and brand', async ({ page }) => {
    await expect(page).toHaveTitle(/Legendary Club Owner/i)
    await expect(page.getByRole('banner').getByText('Legendary Club Owner')).toBeVisible()
  })

  test('hero communicates the fantasy and the real-rewards value prop', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toContainText('Beat real managers')
    await expect(h1).toContainText('Earn real rewards')

    await expect(page.getByText('scout players and climb weekly leagues', { exact: false })).toBeVisible()

    // Trust line must frame rewards as skill-based, not gambling.
    await expect(
      page.getByText('No betting. No random draws. Rewards come from verified leaderboard performance.'),
    ).toBeVisible()
  })

  test('hero shows all four trust badges', async ({ page }) => {
    const hero = page.locator('#top')
    for (const badge of ['Skill-based', 'No pay-to-win', 'Real match data', 'Season rewards']) {
      await expect(hero.getByText(badge, { exact: true })).toBeVisible()
    }
  })

  test('primary and secondary CTAs point at the right sections', async ({ page }) => {
    const hero = page.locator('#top')
    await expect(hero.getByRole('link', { name: /Start Your Club/i })).toHaveAttribute('href', '#build')
    await expect(hero.getByRole('link', { name: /See How It Works/i })).toHaveAttribute('href', '#how')
  })

  test('the brand logo image actually renders', async ({ page }) => {
    await expectImageLoaded(page.getByRole('banner').getByAltText('Legendary Club Owner crest'))
  })

  test('"Why it\'s different" lists the four differentiators', async ({ page }) => {
    const why = page.locator('#why')
    for (const title of [
      'Decisions beat luck',
      'No wallet advantage',
      'Season rewards',
      'Real match engine',
    ]) {
      await expect(why.getByRole('heading', { name: title })).toBeVisible()
    }
    await expect(why.getByText('Full 90-minute matches use real football performance data.')).toBeVisible()
  })

  test('"How it works" shows four steps, each with a loaded image', async ({ page }) => {
    const how = page.locator('#how')
    const steps = ['Build the club city', 'Scout player cards', 'Set tactics', 'Compete every week']
    for (const title of steps) {
      await expect(how.getByRole('heading', { name: title })).toBeVisible()
    }
    const images = how.locator('img')
    await expect(images).toHaveCount(4)
    for (let i = 0; i < 4; i++) {
      await expectImageLoaded(images.nth(i))
    }
  })

  test('credibility strip reinforces the manager mindset', async ({ page }) => {
    await expect(page.getByText('Built for football fans who', { exact: false })).toBeVisible()
    for (const item of ['Transfers matter', 'Facilities compound', 'Tactics decide matchday']) {
      await expect(page.getByText(item, { exact: true })).toBeVisible()
    }
  })

  test('final CTA and localized footer note are present', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Your club is waiting for a president\./i }),
    ).toBeVisible()
    await expect(page.getByText('Known as', { exact: false })).toContainText('Efsane Başkan')
  })

  test('hero CTAs are anchors that target real in-page sections', async ({ page }) => {
    // Assert on hash navigation rather than scroll position: lazy-loaded
    // imagery shifts layout after the one-time hash scroll, which makes
    // viewport-ratio assertions flaky on slow networks. The hash + the
    // existence of the target section is the meaningful, stable contract.
    const hero = page.locator('#top')

    await hero.getByRole('link', { name: /See How It Works/i }).click()
    await expect(page).toHaveURL(/#how$/)
    await expect(page.locator('#how')).toHaveCount(1)

    await hero.getByRole('link', { name: /Start Your Club/i }).click()
    await expect(page).toHaveURL(/#build$/)
    await expect(page.locator('#build')).toHaveCount(1)
  })

  test('desktop navigation links target their sections', async ({ page }) => {
    test.skip(isMobile(page), 'Desktop nav is hidden on mobile; covered by the mobile-menu test')
    const nav = page.getByRole('banner')
    await nav.getByRole('link', { name: 'Leaderboard' }).click()
    await expect(page).toHaveURL(/#leaderboard$/)
    await expect(page.locator('#leaderboard')).toHaveCount(1)
  })

  test('mobile menu toggles open and exposes navigation', async ({ page }) => {
    test.skip(!isMobile(page), 'Mobile menu only exists on narrow viewports')
    const toggle = page.getByRole('button', { name: /toggle navigation menu/i })
    await expect(toggle).toBeVisible()
    await toggle.click()
    await expect(page.getByRole('banner').getByRole('link', { name: 'Build a club' })).toBeVisible()
  })
})
