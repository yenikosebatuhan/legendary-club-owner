import { test, expect } from '@playwright/test'
import { gotoHome, buildClub } from './helpers.js'

test.describe('Season leaderboard', () => {
  test('frames rewards as verified, skill-based performance', async ({ page }) => {
    await gotoHome(page)
    const board = page.locator('#leaderboard')
    await board.scrollIntoViewIfNeeded()

    await expect(
      board.getByRole('heading', { name: /Climb the table\. Reach the reward zone\./i }),
    ).toBeVisible()
    await expect(
      board.getByText(
        'Season rewards are based on verified leaderboard performance — not betting, luck or spending.',
      ),
    ).toBeVisible()
    await expect(board.getByText('Season 05', { exact: false })).toBeVisible()
    await expect(page.getByTestId('reward-zone-divider')).toBeVisible()
  })

  test('shows five ranked clubs and a prompt before a club is created', async ({ page }) => {
    await gotoHome(page)
    await page.locator('#leaderboard').scrollIntoViewIfNeeded()

    await expect(page.getByTestId('leaderboard-row')).toHaveCount(5)
    await expect(page.getByTestId('leaderboard-placeholder')).toBeVisible()
    await expect(page.getByTestId('user-leaderboard-row')).toHaveCount(0)
  })

  test('inserts the created club at #6 and highlights it after onboarding', async ({ page }) => {
    const club = await buildClub(page, { name: 'North London Royals', styleIndex: 0 })

    const userRow = page.getByTestId('user-leaderboard-row')
    await userRow.scrollIntoViewIfNeeded()

    await expect(userRow).toBeVisible()
    await expect(userRow).toContainText('6')
    await expect(userRow).toContainText(club.name)
    await expect(userRow).toContainText(club.style) // selected management style carries over
    await expect(userRow).toContainText('Your Club')
    await expect(userRow).toContainText('Promotion hunt')

    // The original five clubs are still present (now six rows total) and the
    // "build your club" prompt is gone.
    await expect(page.getByTestId('leaderboard-row')).toHaveCount(5)
    await expect(page.getByTestId('leaderboard-placeholder')).toHaveCount(0)
  })

  test('the highlighted club is removed when the flow is reset', async ({ page }) => {
    await buildClub(page, { name: 'Ironworks United' })
    await expect(page.getByTestId('user-leaderboard-row')).toBeVisible()

    await page.getByRole('button', { name: /Start a different club/i }).click()

    await page.locator('#leaderboard').scrollIntoViewIfNeeded()
    await expect(page.getByTestId('user-leaderboard-row')).toHaveCount(0)
    await expect(page.getByTestId('leaderboard-placeholder')).toBeVisible()
  })
})
