# Legendary Club Owner — Landing Page

> **Not just football. Football ownership.**
> Build a club from scratch. Outsmart real managers. Win real rewards.

🔗 **Live demo:** https://yenikosebatuhan.github.io/legendary-club-owner/

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

The build is a fully static site in `dist/`. For production, `vite.config.js` sets the base path to `/legendary-club-owner/` (the GitHub Pages project subpath); dev, preview and Playwright run on `/`. Public assets are referenced through `BASE_URL` (see [`src/lib/asset.js`](src/lib/asset.js)) so images resolve correctly on the subpath. Override the base for another host with the `VITE_BASE` env var.

### GitHub Pages (current deploy)

The site is live at **https://yenikosebatuhan.github.io/legendary-club-owner/**, served from the `gh-pages` branch. To redeploy after changes:

```bash
npm run deploy
```

This runs `predeploy` (build + write `dist/.nojekyll`) and publishes `dist/` to the `gh-pages` branch via the `gh-pages` package. Pages is configured to serve that branch at `/`.

### Other hosts

| Platform | Setup |
| --- | --- |
| **Vercel** | Import the repo → framework preset **Vite**. Set env `VITE_BASE=/` (root domain), build `npm run build`, output `dist`. |
| **Netlify** | Env `VITE_BASE=/`, build command `npm run build`, publish directory `dist`. |

### AI-generated visual assets
The premium visuals live in `public/assets/` and were generated with **Google Gemini** (originals kept in `public/assets/raw/`). See [`AI_PROMPTS.md`](AI_PROMPTS.md) for which image is used where. All important text on the page is real HTML — the images are atmosphere only, never the source of truth (AI-baked text can be imperfect).

Every image is rendered through [`src/components/SafeImage.jsx`](src/components/SafeImage.jsx), which removes the broken `<img>` and reveals the styled container/fallback if an asset is missing — so the UI never breaks. The hero additionally falls back to a pure-CSS stadium mockup.

---

## 🧪 Playwright E2E tests (bonus)

A feature-level suite (46 tests) runs across **Desktop Chrome** and **mobile Safari (iPhone 13)**, verifying real behaviour rather than just markup.

First-time setup installs the browser binaries:

```bash
npx playwright install
```

Run the suite (Playwright auto-starts the dev server):

```bash
npm run test:e2e        # headless
npm run test:e2e:ui     # interactive UI mode
```

### Run against the live deployed site

The exact same suite can point at any deployed URL — no local server is started:

```bash
PW_BASE_URL=https://yenikosebatuhan.github.io/legendary-club-owner/ npm run test:e2e
```

### What it covers

- **[`tests/landing.spec.js`](tests/landing.spec.js)** — page loads; hero headline + real-rewards value prop + trust line; all four trust badges; CTA hrefs; the brand logo and all four "How it works" images actually decode (`naturalWidth > 0`); "Why it's different" and credibility content; anchor navigation scrolls to sections; desktop nav (desktop only) and the hamburger menu (mobile only).
- **[`tests/build-your-club.spec.js`](tests/build-your-club.spec.js)** — the interactive element end to end: `Next` is gated on each step's validity; the **live Club Preview** updates in real time (name → crest initials, city, style, colour → crest `data-color`); `Back` preserves selections; the full flow issues a complete Club License (name, city, style, colours, Amateur League, opening fixture, season objective, £2.5M budget, 72% board confidence); `Edit Choices` and `Start a different club` behave correctly; Turkish characters are accepted in the club name.
- **[`tests/leaderboard.spec.js`](tests/leaderboard.spec.js)** — reward framing/heading, five base rows + reward-zone divider + prompt; after onboarding the created club is inserted at **#6**, highlighted as "Your Club" with the chosen management style and "Promotion hunt"; resetting removes it.

Stable selectors: `club-name-input`, `city-option`, `style-option`, `color-option`, `next-step`, `club-result`, `club-preview`, `club-name-display`, `club-crest`, `leaderboard-row`, `user-leaderboard-row`, `reward-zone-divider`, `leaderboard-placeholder`.

---

## 📝 About

See [`PROCESS_NOTE.md`](PROCESS_NOTE.md) for tooling, the AI visual prompt, design rationale, and next steps.

_Concept case study. Not an official No Surrender Studio product page._
