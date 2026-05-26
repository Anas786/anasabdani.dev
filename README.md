# anasabdani.dev

Personal portfolio for **Muhammad Anas** — Engineering Manager (Flipdish).
Built as a single-page React + TypeScript site with styled-components and motion.

> Live: [anasabdani.dev](https://anasabdani.dev)

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** for dev/build
- **styled-components 6** for theming (light + dark) and per-component styles
- **motion** (Framer Motion) for entrance, scroll, tilt, and shimmer animations
- No global CSS file — every style lives in a styled component (theme tokens in `src/styles/theme.ts`)

## Scripts

```bash
npm run dev        # vite dev server (http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npx tsc --noEmit   # strict type-check
```

## Project structure

```
src/
├── App.tsx                 # Root: theme provider, global styles, section order
├── main.tsx                # React entry
├── components/             # Section + utility components
│   ├── Hero, Stats, About, AI, Experience, Skills,
│   ├── Testimonials, Certifications, Contact, Navbar, Footer
│   ├── Loader, ScrollProgress, Background, Logo
│   ├── Reveal, Parallax, TiltCard, ThemeToggle
│   └── icons.tsx           # Lucide-style inline SVG icons
├── context/
│   └── ThemeModeContext.tsx  # dark/light state + ThemeProvider wrap
├── data/
│   └── content.ts          # All typed content (profile, experience, etc.)
└── styles/
    ├── theme.ts            # darkTheme + lightTheme tokens
    ├── styled.d.ts         # DefaultTheme augmentation
    ├── GlobalStyles.tsx    # createGlobalStyle (resets + body + ::selection)
    └── ui.tsx              # Shared styled primitives (Container, Section, Button…)

public/
├── anas.webp / anas.jpg    # Hero portrait (optimized: ~27 KB / 100 KB)
├── og.png                  # Social share card (1200×630)
├── logos/                  # Company logos for the experience stepper
└── Anas-Abdani-Resume.pdf
```

## Theming

Two themes (`dark` / `light`) defined in `src/styles/theme.ts`. The active mode is held in
`ThemeModeContext`, set on `<html data-theme="…">` for no-flash hydration, and synced to
`localStorage`. The `ThemeToggle` button in the navbar flips it.

## Deploy

This project deploys cleanly to **Vercel** (auto-detected as Vite).
Connect the GitHub repo on [vercel.com/new](https://vercel.com/new) — every push to `main`
ships to production, branches/PRs get preview deploys automatically.

Build settings:
- Framework preset: **Vite** (auto-detected)
- Build command: `npm run build`
- Output directory: `dist`
