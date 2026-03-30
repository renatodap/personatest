# Build PersonaTest — Surprise Personality Quiz

## Context
Single-page Next.js app that looks like a legitimate personality quiz ("startup quiz app vibes") but secretly leads to a romantic surprise at the end. Must look completely professional — no hints it's personal. Dark mode, sleek, modern. Deploy to Vercel.

## Investigation Steps
1. Initialize Next.js project in this directory (`npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"`)
2. Use Inter font (Next.js built-in `next/font/google`)
3. Keep everything in a single page component (`src/app/page.tsx`) with state-driven screens

## Requirements

### Screen Flow (6 screens, state-driven)
1. **Landing** — Logo "PersonaTest", tagline "Discover your personality in 3 questions.", CTA "Start Quiz →"
2. **Q1** — "What environment energizes you most?" → Ocean / Forest / City / Mountains (with emojis)
3. **Q2** — "How do you handle pressure?" → freeze+analyze / react first / ask for help / ignore+push through
4. **Q3** — "What drives you most?" → Adventure / Connection / Achievement / Peace
5. **Loading** — "Analyzing your profile..." with progress bar filling to 100% over 3 seconds. Must feel real and satisfying.
6. **Surprise** — Full dark screen. Photo fades in centered (use `/foto.jpg` from `public/`). Below photo, typewriter effect: "tu eres mi favorita ❤️". After 2 seconds, second line fades in: "te quiero". Nothing else. Let it breathe.

### Design
- Dark mode throughout (dark bg, light text)
- Clean, professional — think real quiz startup
- Sleek typography with Inter
- Mobile-first responsive
- Smooth fade/slide transitions between all screens
- Progress indicator during questions (1/3, 2/3, 3/3)
- Answer options as clickable cards, not radio buttons
- Answers don't affect outcome — all roads lead to surprise

### Loading Screen
- Progress bar must feel real, not rushed
- Smooth fill animation over 3 seconds
- Subtle "analyzing" text

### Surprise Screen
- Photo: max-width ~350px on mobile, centered, rounded corners, subtle shadow
- Typewriter effect on first line (letter by letter)
- Second line fades in after typewriter completes + 2s delay
- No buttons, no share, no navigation — just the moment

## Constraints
- Single page component — no routing, just state
- Place a placeholder `public/foto.jpg` (1x1 white pixel is fine — user will replace)
- All CSS via Tailwind + inline styles for animations
- No external animation libraries — use CSS transitions/keyframes
- Must deploy cleanly to Vercel with zero config
- No analytics, no tracking, no cookies

## Deployment
- GitHub account: `renatodap`
- Vercel account: `renatodaps-projects`
- Init git repo, create GitHub remote, push, deploy to Vercel
- Run `gh auth switch --user renatodap` before any git/GitHub operations

## After Completing the Work
1. Verify with `npm run build` — must pass with zero errors
2. Open in browser and click through all 6 screens
3. Run `/document` to log what was done
