# End-to-end tests (Playwright)

These tests open the landing page and verify that the **interactive element**
("Build Your Club") and the rest of the page actually work — not just that the
markup renders. They run on **Desktop Chrome** and **mobile Safari (iPhone 13)**.

## How to run

From the project root:

```bash
npm install
npx playwright install        # one-time: download browser binaries
npm run test:e2e              # headless run
npm run test:e2e:ui           # interactive UI mode
```

By default Playwright starts the local Vite dev server automatically.

### Run against the live site

The same suite can point at any deployed URL (no local server is started):

```bash
PW_BASE_URL=https://yenikosebatuhan.github.io/legendary-club-owner/ npm run test:e2e
```

## What it tests

| File | Verifies |
| --- | --- |
| `build-your-club.spec.js` | The interactive element end to end: enters a club name; selects a city, management style and club colours; clicks through every step; confirms the final **Club License** result appears and contains the club name (plus league, opening fixture, season objective, budget, board confidence). Also checks per-step validation, the **live preview** updating in real time, `Back`/`Edit`/reset, and that Turkish characters are accepted in the club name. |
| `landing.spec.js` | Page loads with the right title; hero headline + value prop + trust line; all four trust badges; CTA links; the logo and all four "How it works" images actually decode; "Why it's different" + credibility content; anchor and mobile-menu navigation. |
| `leaderboard.spec.js` | Five ranked clubs + reward-zone divider before onboarding; after creating a club it is inserted at **#6**, highlighted as "Your Club" with the chosen style and "Promotion hunt"; resetting removes it. |

## Shared helpers (`helpers.js`)

`buildClub(page, opts)` drives the whole onboarding flow and returns the chosen
options, so individual specs stay short and readable. Option labels mirror the
real component data so assertions check the actual feature.

Stable selectors used throughout: `club-name-input`, `city-option`,
`style-option`, `color-option`, `next-step`, `club-result`, `club-preview`,
`club-name-display`, `club-crest`, `leaderboard-row`, `user-leaderboard-row`,
`reward-zone-divider`, `leaderboard-placeholder`.
