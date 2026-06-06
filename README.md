# Legendary Club Owner — Landing Page

> **Not just football. Football ownership.**
> Build a club from scratch. Outsmart real managers. Win real rewards.

A polished, mobile-first marketing landing page for **Legendary Club Owner** — a mobile football club management simulation game by No Surrender Studio (known as **Efsane Başkan** in Turkey). The page introduces the game to an English-speaking audience and drives sign-ups through an interactive "Build Your Club" onboarding demo.

Built as a job-application case study with **React + Vite + Tailwind CSS** and **lucide-react** icons.

---

## ✨ Highlights

- **Dark premium sports-tech design** — deep navy/near-black with neon "pitch light" green accents, glassmorphism cards, stadium lighting and dashboard UI.
- **Mobile-first & fully responsive** — designed for the 5-second feed-scroll moment.
- **Interactive Build-Your-Club flow** — a 4-step onboarding (name → city → style → colors) that issues a personalized "Club License" (generated crest, starting budget, opening fixture, board confidence) and drops your club into the season leaderboard at #6.
- **lucide-react icons** throughout (no emoji) — premium, game-like, consistent.
- **No paid dependencies**, no heavy animation libraries — just Tailwind + a little local React state.
- **Accessible** — semantic HTML, labeled inputs, `aria` states, keyboard support and reduced-motion handling.
- **Playwright E2E tests** with stable `data-testid` hooks.

---

## 🗂 Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── playwright.config.js
├── PROCESS_NOTE.md
├── README.md
├── public/
│   ├── favicon.svg
│   ├── assets/                 # AI-generated (Gemini) visual assets
│   │   ├── logo-lco.png        # LCO crest used in navbar + footer
│   │   ├── hero-lco.png
│   │   ├── empty-president-chair.png
│   │   ├── club-license-bg.png
│   │   ├── weekly-league.png
│   │   ├── tactics-board.png
│   │   ├── scout-player-cards.png
│   │   ├── build-club-city.png
│   │   └── raw/                # original unrenamed Gemini exports
│   └── images/
│       └── hero.svg            # legacy SVG placeholder
├── src/
│   ├── main.jsx
│   ├── App.jsx                 # holds the created-club state (lifted)
│   ├── index.css               # Tailwind layers + design system utilities
│   └── components/
│       ├── Logo.jsx            # LCO crest (image + CSS fallback) + brand lockup
│       ├── SafeImage.jsx       # <img> with graceful fallback on load error
│       ├── Navbar.jsx
│       ├── Hero.jsx            # hero image + overlay chips (CSS fallback)
│       ├── WhyDifferent.jsx
│       ├── HowItWorks.jsx
│       ├── CredibilityStrip.jsx
│       ├── BuildYourClub.jsx   # interactive flow + live Club License preview
│       ├── Leaderboard.jsx     # highlights your club after onboarding
│       ├── FinalCTA.jsx
│       └── Footer.jsx
└── tests/
    └── onboarding.spec.js      # Playwright E2E
```

---

## 🚀 Run locally

Requires **Node 18+**.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default **http://localhost:5173**).

---

## 🏗 Build for production

```bash
npm run build      # outputs static files to /dist
npm run preview    # preview the production build locally
```

---

## ☁️ Deployment notes

The build is a fully static site in `dist/`. `vite.config.js` sets `base: './'` so relative asset paths work on subpaths (e.g. GitHub Pages project sites).

| Platform | Setup |
| --- | --- |
| **Vercel** | Import the repo → framework preset **Vite** → build `npm run build`, output `dist`. Zero config. |
| **Netlify** | Build command `npm run build`, publish directory `dist`. |
| **GitHub Pages** | Run `npm run build`, then publish `dist/` (e.g. via the `gh-pages` package or an Actions workflow). `base: './'` keeps assets resolving correctly. |

### AI-generated visual assets
The premium visuals live in `public/assets/` and were generated with **Google Gemini** (originals kept in `public/assets/raw/`). See [`AI_PROMPTS.md`](AI_PROMPTS.md) for which image is used where. All important text on the page is real HTML — the images are atmosphere only, never the source of truth (AI-baked text can be imperfect).

Every image is rendered through [`src/components/SafeImage.jsx`](src/components/SafeImage.jsx), which removes the broken `<img>` and reveals the styled container/fallback if an asset is missing — so the UI never breaks. The hero additionally falls back to a pure-CSS stadium mockup.

---

## 🧪 Playwright E2E tests (bonus)

First-time setup installs the browser binaries:

```bash
npx playwright install
```

Run the suite (Playwright auto-starts the dev server):

```bash
npm run test:e2e        # headless
npm run test:e2e:ui     # interactive UI mode
```

The test in [`tests/onboarding.spec.js`](tests/onboarding.spec.js):

1. Opens the landing page
2. Enters a club name
3. Selects a city, manager style and club color
4. Clicks through every onboarding step
5. Verifies the final club result screen appears and contains the club name (plus the starting league, season objective, and the club appearing in the leaderboard)

Stable selectors used: `club-name-input`, `city-option`, `style-option`, `color-option`, `next-step`, `club-result`.

---

## 📝 About

See [`PROCESS_NOTE.md`](PROCESS_NOTE.md) for tooling, the AI visual prompt, design rationale, and next steps.

_Concept case study. Not an official No Surrender Studio product page._
