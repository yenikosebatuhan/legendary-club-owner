# AI Visual Assets

All visual assets in `public/assets/` were generated with **Google Gemini**. The original, unrenamed Gemini exports are preserved in `public/assets/raw/`. Every image is decorative atmosphere — all important, readable text on the page is real HTML and never depends on text baked into an image.

## Asset map — where each image is used

| Production asset | Used in | Role | Component |
| --- | --- | --- | --- |
| `logo-lco.png` | Navbar + Footer | LCO shield/crest brand mark next to the "Legendary Club Owner" wordmark (`object-contain`, never stretched); falls back to a simple CSS "LCO" box if missing | [`Logo.jsx`](src/components/Logo.jsx) |
| `hero-lco.png` | Hero section | Main hero visual inside the premium frame; left edge darkened + `object-position` shifted to mask AI UI text. Real HTML overlay chips (Tactics · 4-3-3, Scout · OVR 89, League Rank · #6) and a live matchday scoreboard sit on top | [`Hero.jsx`](src/components/Hero.jsx) |
| `empty-president-chair.png` | Final CTA | Cinematic full-bleed backdrop behind "Your club is waiting for a president." | [`FinalCTA.jsx`](src/components/FinalCTA.jsx) |
| `club-license-bg.png` | Build Your Club | Subtle low-opacity pitch texture behind both the live Club Preview panel and the final Club License card | [`BuildYourClub.jsx`](src/components/BuildYourClub.jsx) |
| `weekly-league.png` | Leaderboard | Atmospheric low-opacity section background (the readable leaderboard stays HTML) | [`Leaderboard.jsx`](src/components/Leaderboard.jsx) |
| `tactics-board.png` | How It Works → "Set tactics" | Card image area | [`HowItWorks.jsx`](src/components/HowItWorks.jsx) |
| `scout-player-cards.png` | How It Works → "Scout player cards" | Card image area | [`HowItWorks.jsx`](src/components/HowItWorks.jsx) |
| `build-club-city.png` | How It Works → "Build the club city" | Card image area | [`HowItWorks.jsx`](src/components/HowItWorks.jsx) |

## Raw → production filename mapping

| Raw Gemini file | Renamed to |
| --- | --- |
| `Gemini_Generated_Image_ihftv4ihftv4ihft.png` | `logo-lco.png` |
| `Gemini_Generated_Image_lrp8m6lrp8m6lrp8.png` | `hero-lco.png` |
| `Gemini_Generated_Image_qdq9gqdq9gqdq9gq.png` | `empty-president-chair.png` |
| `Gemini_Generated_Image_3smdsi3smdsi3smd.png` | `club-license-bg.png` |
| `Gemini_Generated_Image_4xyvzt4xyvzt4xyv.png` | `weekly-league.png` |
| `Gemini_Generated_Image_w8vu7aw8vu7aw8vu.png` | `tactics-board.png` |
| `Gemini_Generated_Image_qafgy2qafgy2qafg.png` | `scout-player-cards.png` |
| `Gemini_Generated_Image_4913op4913op4913.png` | `build-club-city.png` |

## Hero prompt (reference)

> Create a premium mobile football management game hero image: a confident football club president in a dark modern boardroom overlooking a glowing stadium at night, neon green accents, floating mobile dashboard cards showing tactics, player cards, leaderboard and stadium upgrades, cinematic lighting, realistic but slightly stylized, high-end sports tech aesthetic.

## Integration notes

- Rendered via [`SafeImage.jsx`](src/components/SafeImage.jsx): if an asset is missing, the `<img>` removes itself and the styled container / CSS fallback shows instead — the UI never breaks.
- Consistent treatment: `object-cover`, rounded corners, subtle borders, dark gradient overlays and an emerald glow so each asset feels native to the dark navy / emerald design.
- No real-world club names, crests or logos are used; all clubs and identities are fictional.
