# Ultrafans — Technical Details

> Last updated: March 2026

---

## Stack Summary

| Layer | Choice | Version |
|-------|--------|---------|
| **Language** | TypeScript | 5.8 |
| **Framework** | React | 18.3 |
| **Build Tool** | Vite (SWC plugin) | 5.4 |
| **Styling** | Tailwind CSS + tailwindcss-animate | 3.4 |
| **UI Components** | shadcn/ui (Radix primitives) | — |
| **Animation** | Framer Motion | 12.34 |
| **Routing** | React Router DOM | 6.30 |
| **Server State** | TanStack React Query | 5.83 |
| **Forms** | React Hook Form + Zod | 7.61 / 3.25 |
| **Backend** | Firebase (Firestore) | 12.10 |
| **Testing** | Vitest + Testing Library + jsdom | 3.2 / 16.0 |
| **Linting** | ESLint 9 + typescript-eslint | 9.32 |
| **Hosting** | Vercel | — |

---

## Architecture

### Current (Phase 0 — Landing Page)

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
│                                              │
│   React SPA (Vite)                           │
│   ├── Index page                             │
│   │   ├── Hero (waitlist CTA)                │
│   │   ├── HowItWorks                         │
│   │   ├── FeatureShowcase                    │
│   │   ├── SportsVerticals                    │
│   │   ├── SocialProof                        │
│   │   ├── PartnerSection                     │
│   │   └── FooterSection (waitlist CTA)       │
│   └── 404 page                               │
│                                              │
│   Firebase SDK (client-side)                 │
│   └── Firestore write: waitlist collection   │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Firebase Firestore  │
│  └── waitlist        │
│       ├── email      │
│       ├── type       │
│       └── createdAt  │
└─────────────────────┘
```

There is no backend server. Firebase is accessed directly from the client via the Firebase JS SDK. The only write operation is `addWaitlistEntry()` in `src/lib/firebase.ts`.

### Future (Phase 1+)

When the product expands beyond the landing page, the architecture will need:
- **Backend API** (Node.js/Express, Next.js API routes, or similar)
- **Database** (PostgreSQL or Firebase Firestore expansion)
- **Authentication** (Firebase Auth or Auth0)
- **Payment processing** (Stripe)
- **Real-time** (WebSockets or Firestore real-time listeners for live auctions)

---

## Project Configuration

### Vite (`vite.config.ts`)
- **SWC** — Uses `@vitejs/plugin-react-swc` for fast compilation.
- **Dev server** — Runs on port `8080` with HMR overlay disabled.
- **Path alias** — `@` maps to `./src` for clean imports.
- **Lovable tagger** — Dev-only plugin (`lovable-tagger`) for component tracking. Can be removed if not using Lovable.

### Tailwind (`tailwind.config.ts`)
- **Content paths** — Scans `src/**/*.{ts,tsx}`.
- **Dark mode** — Class-based (`.dark`).
- **Custom fonts** — `font-display` (Space Grotesk) and `font-body` (DM Sans).
- **Brand colors** — Defined as CSS variables in `index.css`, consumed via `brand-*` Tailwind classes.
- **Custom animations** — `fade-up`, `scale-in`, `number-tick` keyframes.
- **Plugin** — `tailwindcss-animate` for utility animation classes.

### TypeScript
- **Strict mode** enabled.
- **Path alias** — `@/*` resolves to `./src/*` (configured in `tsconfig.app.json`).
- **Separate configs** — `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite/Node config files).

---

## Design System

### Typography

| Usage | Font | Tailwind Class |
|-------|------|----------------|
| Headings, buttons, labels | Space Grotesk | `font-display` |
| Body text, descriptions | DM Sans | `font-body` |

Fonts are loaded from Google Fonts via `@import` in `index.css`.

### Color System

Colors are defined as HSL CSS variables in `:root` (light theme) and `.dark-section` (dark override).

| Token | CSS Variable | HSL Value | Tailwind Class |
|-------|-------------|-----------|----------------|
| Yellow | `--brand-yellow` | `50 100% 60%` | `text-brand-yellow`, `bg-brand-yellow` |
| Dark | `--brand-dark` | `240 33% 14%` | `text-brand-dark`, `bg-brand-dark` |
| Indigo | `--brand-indigo` | `260 90% 25%` | `text-brand-indigo`, `bg-brand-indigo` |
| White | `--brand-hot-white` | `0 0% 98%` | `text-brand-white`, `bg-brand-white` |
| Coral | `--brand-coral` | `10 90% 62%` | `text-brand-coral`, `bg-brand-coral` |

### Section Theming

- **Light sections** (HowItWorks, FeatureShowcase, SportsVerticals) — Default `:root` variables. Yellow gradient or white backgrounds.
- **Dark sections** (PartnerSection, FooterSection) — Apply `.dark-section` class which overrides `--background`, `--foreground`, `--card`, etc. Combined with `.dark-gradient` for background.

### Utility Classes (Custom)

| Class | Purpose |
|-------|---------|
| `.brand-gradient` | Yellow gradient background |
| `.dark-gradient` | Dark-to-indigo gradient background |
| `.text-gradient` | Dark-to-indigo gradient text |
| `.text-gradient-light` | Yellow-to-white gradient text |
| `.card-tilt` | 3D tilt hover effect for cards |
| `.glow-yellow` | Yellow box-shadow glow |
| `.marquee` | Infinite horizontal scroll animation |
| `.float-1` to `.float-5` | Five floating animation variants (different speeds/paths) |

### Animation System

Five float keyframes create organic floating movement for hero elements:

| Class | Duration | Character |
|-------|----------|-----------|
| `float-1` | 6s | Gentle diagonal with slight rotation |
| `float-2` | 8s | Opposite diagonal pattern |
| `float-3` | 7s | Horizontal drift |
| `float-4` | 9s | Vertical drift |
| `float-5` | 5s | Fast with rotation |

The `hero-gradient` keyframe animates the hero background gradient position on an 8s loop.

---

## Component Patterns

### Landing Section Pattern

Every landing section follows the same structure:

```tsx
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

export default function SectionName() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 ...">
      <div className="max-w-Xxl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ...
        </motion.h2>
        {/* Content with staggered motion.div children */}
      </div>
    </section>
  );
}
```

- **`useInView`** — Custom hook wrapping `IntersectionObserver`. Returns `{ ref, isInView }`.
- **Framer Motion** — Elements animate from `opacity: 0, y: 30` to visible when scrolled into view.
- **Staggered delays** — Child elements use `delay: 0.2 + i * 0.15` for sequential reveal.

### Waitlist Form Pattern

Two waitlist entry points exist:

1. **Hero** — Simple email input, submits as `type: "fan"`.
2. **Footer** — Two-step: select "I'm a Club" or "I'm a Fan", then enter email. Includes error handling.

Both call `addWaitlistEntry(email, type)` from `src/lib/firebase.ts`.

---

## Firebase

### Configuration

Firebase is initialized in `src/lib/firebase.ts` using environment variables prefixed with `VITE_`.

### Data Model

Currently only one collection:

```
firestore/
└── waitlist/
    └── {auto-id}
        ├── email: string
        ├── type: "fan" | "club"
        └── createdAt: Timestamp (server)
```

### Security Rules

Firebase security rules should be configured to:
- Allow writes to `waitlist` collection from any client (public waitlist).
- Deny reads from `waitlist` (admin access only via Firebase Console).

---

## Assets

### Athlete Images

Six sport images stored in `src/assets/`:

| File | Sport | Used In |
|------|-------|---------|
| `athlete-soccer.jpg` | Football/Soccer | SportsVerticals, Hero floating bubble |
| `athlete-basketball.jpg` | Basketball | SportsVerticals, Hero floating bubble |
| `athlete-nfl.jpg` | American Football | SportsVerticals, Hero floating bubble |
| `athlete-rugby.jpg` | Rugby | SportsVerticals |
| `athlete-hockey.jpg` | Hockey | SportsVerticals |
| `athlete-baseball.jpg` | Baseball | SportsVerticals |
| `athlete-ufc.jpg` | Rugby (repurposed) | Hero floating bubble ("6.7K Rugby fans") |
| `fans-cheering.jpg` | Hockey (repurposed) | Hero floating bubble ("23.4K Hockey fans") |

Images are imported as ES modules via Vite's asset handling and used as `src` attributes.

### Hero Sport SVGs

Five inline SVG sport icons float in the hero background:

| Icon | Position | Animation |
|------|----------|-----------|
| Rugby ball (oval) | Top-right | `float-2`, rotated 30° |
| Basketball (circle) | Bottom-left | `float-4` |
| Baseball (circle) | Mid-right | `float-3`, hidden on mobile |
| Pennant flag (long triangle + pole) | Center-right | `float-1`, rotated -12° |
| Hockey stick (L-shape + puck) | Left | `float-5`, hidden below `lg` |

All SVGs use `text-foreground/10` for extreme subtlety.

---

## Testing

- **Runner** — Vitest with jsdom environment.
- **Utilities** — Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- **Config** — `vitest.config.ts` (separate from Vite config).
- **Location** — `src/test/`.

Run tests:
```sh
npm run test          # Single run
npm run test:watch    # Watch mode
```

---

## Conventions

### Naming
- **Components** — PascalCase, one component per file.
- **Hooks** — `use-*.ts` or `useX.ts` in `src/hooks/`.
- **Utilities** — `src/lib/` for shared helpers.

### Imports
- Use `@/` alias for all imports from `src/`.
- Image assets are imported as ES modules (not URL strings).

### Styling
- Tailwind utility classes inline — no separate CSS files per component.
- Brand colors via `brand-*` classes, never raw HSL values in JSX.
- Responsive: mobile-first, use `sm:`, `md:`, `lg:` breakpoints.
- Dark sections use `.dark-section` + `.dark-gradient` classes on the section element.

### State
- Local state with `useState` for UI state (forms, toggles).
- TanStack React Query installed but not yet actively used (ready for API integration).
- No global state management yet (consider Zustand when needed).
