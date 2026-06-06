import { test, expect } from '@playwright/test'
import { gotoHome, buildClub, CITIES, STYLES, COLORS } from './helpers.js'

test.describe('Build Your Club — interactive onboarding feature', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
    await page.locator('#build').scrollIntoViewIfNeeded()
  })

  test('Next is blocked until each step has a valid selection', async ({ page }) => {
    const next = page.getByTestId('next-step')

    // Step 1: empty name blocks progress.
    await expect(next).toBeDisabled()
    await page.getByTestId('club-name-input').fill('North London Royals')
    await expect(next).toBeEnabled()
    await next.click()

    // Step 2: no city selected yet.
    await expect(next).toBeDisabled()
    await page.getByTestId('city-option').first().click()
    await expect(next).toBeEnabled()
    await next.click()

    // Step 3: no style selected yet.
    await expect(next).toBeDisabled()
    await page.getByTestId('style-option').first().click()
    await expect(next).toBeEnabled()
    await next.click()

    // Step 4: no colors selected yet.
    await expect(next).toBeDisabled()
    await page.getByTestId('color-option').first().click()
    await expect(next).toBeEnabled()
  })

  test('the live Club Preview updates as choices are made', async ({ page }) => {
    const preview = page.getByTestId('club-preview')
    await expect(preview).toBeVisible()

    // Placeholder state before any input.
    await expect(preview.getByTestId('club-name-display')).toHaveText('Your Club')

    // Name → crest initials + name update live.
    await page.getByTestId('club-name-input').fill('North London Royals')
    await expect(preview.getByTestId('club-name-display')).toHaveText('North London Royals')
    await expect(preview.getByTestId('club-crest')).toHaveText('NR')
    await page.getByTestId('next-step').click()

    // City → reflected in the preview.
    await page.getByTestId('city-option').nth(1).click()
    await expect(preview).toContainText(CITIES[1])
    await page.getByTestId('next-step').click()

    // Style → reflected in the preview.
    await page.getByTestId('style-option').nth(2).click()
    await expect(preview).toContainText(STYLES[2])
    await page.getByTestId('next-step').click()

    // Colour → crest color attribute + label update live.
    await page.getByTestId('color-option').nth(1).click()
    await expect(preview.getByTestId('club-crest')).toHaveAttribute('data-color', 'royal-blue')
    await expect(preview).toContainText(COLORS[1])
  })

  test('Back preserves previous selections', async ({ page }) => {
    await page.getByTestId('club-name-input').fill('Harbor City')
    await page.getByTestId('next-step').click()
    await page.getByTestId('city-option').nth(2).click()
    await page.getByTestId('next-step').click()

    // On the style step, go back to the city step.
    await page.getByRole('button', { name: /Back/i }).click()

    // The previously chosen city is still selected, so Next is enabled again.
    await expect(page.getByTestId('city-option').nth(2)).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByTestId('next-step')).toBeEnabled()

    // Going back once more keeps the typed club name.
    await page.getByRole('button', { name: /Back/i }).click()
    await expect(page.getByTestId('club-name-input')).toHaveValue('Harbor City')
  })

  test('completing the flow issues a full in-game Club License', async ({ page }) => {
    const club = await buildClub(page, { name: 'North London Royals', cityIndex: 0, styleIndex: 0, colorIndex: 2 })

    const result = page.getByTestId('club-result')
    await expect(result).toContainText('Club License Approved')
    await expect(result.getByTestId('club-name-display')).toHaveText(club.name)
    await expect(result.getByTestId('club-crest')).toHaveAttribute('data-color', club.colorId)

    // Every license field the player chose or was granted.
    await expect(result).toContainText(club.city)
    await expect(result).toContainText(club.style)
    await expect(result).toContainText(club.color)
    await expect(result).toContainText('Amateur League')
    await expect(result).toContainText('vs Riverside Athletic')
    await expect(result).toContainText('Reach the Promotion Zone')
    await expect(result).toContainText('£2.5M')
    await expect(result).toContainText('Board confidence')
    await expect(result).toContainText('72%')

    // Primary action leads players toward the leaderboard.
    await expect(result.getByRole('link', { name: /Lead This Club/i })).toHaveAttribute(
      'href',
      '#leaderboard',
    )
  })

  test('"Edit Choices" returns to the flow with selections intact', async ({ page }) => {
    await buildClub(page, { name: 'Coastline Wanderers' })

    await page.getByRole('button', { name: /Edit Choices/i }).click()

    // Back at step 1 with the name preserved.
    await expect(page.getByTestId('club-name-input')).toHaveValue('Coastline Wanderers')
    await expect(page.getByTestId('club-result')).toHaveCount(0)
  })

  test('"Start a different club" resets the flow', async ({ page }) => {
    await buildClub(page, { name: 'Granite Rovers' })

    await page.getByRole('button', { name: /Start a different club/i }).click()

    await expect(page.getByTestId('club-name-input')).toHaveValue('')
    await expect(page.getByTestId('club-result')).toHaveCount(0)
  })

  test('club names with Turkish characters are accepted verbatim', async ({ page }) => {
    // The page copy is English-only, but user-generated club names must allow any input.
    const turkishName = 'Şişli Güçü'
    const input = page.getByTestId('club-name-input')
    await input.fill(turkishName)
    await expect(input).toHaveValue(turkishName)
    await expect(page.getByTestId('club-preview').getByTestId('club-name-display')).toHaveText(
      turkishName,
    )
  })
})
