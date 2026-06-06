import { test, expect } from '@playwright/test'

const CLUB_NAME = 'North London Royals'

test.describe('Build Your Club onboarding flow', () => {
  test('completes the flow and shows the club result', async ({ page }) => {
    await page.goto('/')

    // Jump to the interactive section.
    await page.locator('#build').scrollIntoViewIfNeeded()

    // Step 1 — name the club.
    const nameInput = page.getByTestId('club-name-input')
    await expect(nameInput).toBeVisible()
    await nameInput.fill(CLUB_NAME)
    await page.getByTestId('next-step').click()

    // Step 2 — choose a city identity.
    await expect(page.getByTestId('city-option').first()).toBeVisible()
    await page.getByTestId('city-option').first().click()
    await page.getByTestId('next-step').click()

    // Step 3 — choose a manager style.
    await expect(page.getByTestId('style-option').first()).toBeVisible()
    await page.getByTestId('style-option').first().click()
    await page.getByTestId('next-step').click()

    // Step 4 — choose club colors.
    await expect(page.getByTestId('color-option').first()).toBeVisible()
    await page.getByTestId('color-option').first().click()
    await page.getByTestId('next-step').click()

    // Final result screen — the "Club License".
    const result = page.getByTestId('club-result')
    await expect(result).toBeVisible()
    await expect(result).toContainText(CLUB_NAME)
    await expect(result).toContainText('Amateur League')
    await expect(result).toContainText('Reach the Promotion Zone')
    await expect(result).toContainText('vs Riverside Athletic')
    await expect(result).toContainText('£2.5M')

    // The club should now appear as the highlighted user row in the leaderboard.
    const userRow = page.getByTestId('user-leaderboard-row')
    await userRow.scrollIntoViewIfNeeded()
    await expect(userRow).toBeVisible()
    await expect(userRow).toContainText(CLUB_NAME)
  })

  test('the Next button is disabled until each step is valid', async ({ page }) => {
    await page.goto('/')
    await page.locator('#build').scrollIntoViewIfNeeded()

    // With an empty name, advancing is blocked.
    await expect(page.getByTestId('next-step')).toBeDisabled()

    await page.getByTestId('club-name-input').fill(CLUB_NAME)
    await expect(page.getByTestId('next-step')).toBeEnabled()
  })
})
