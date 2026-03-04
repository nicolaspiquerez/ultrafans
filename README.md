# Ultrafans

> The platform where sports fans unlock real experiences with the teams they love.

Ultrafans is a fan engagement platform that lets supporters buy fan credits for their favorite sports clubs, stake them to earn loyalty points, and bid those points in live auctions for real-world experiences — VIP match tickets, signed shirts, travel with the squad, and more.

**Status:** Pre-launch (landing page + waitlist live)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite 5 (SWC) |
| **Styling** | Tailwind CSS 3 + tailwindcss-animate |
| **Components** | shadcn/ui (Radix primitives) |
| **Animation** | Framer Motion |
| **Backend** | Firebase (Firestore — waitlist collection) |
| **Routing** | React Router DOM v6 |
| **State** | TanStack React Query |
| **Fonts** | Space Grotesk (display) + DM Sans (body) |
| **Hosting** | Vercel |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **bun**

### Setup

```sh
# Clone the repo
git clone <YOUR_GIT_URL>
cd ultrafans-master

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your Firebase credentials in .env

# Start development server (http://localhost:8080)
npm run dev
```

### Environment Variables

Create a `.env` file with the following Firebase credentials:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Project Structure

```
src/
├── assets/              # Sport athlete images (jpg)
├── components/
│   ├── landing/         # 8 landing page sections
│   │   ├── Hero.tsx             # Hero with waitlist CTA + floating profiles
│   │   ├── HowItWorks.tsx       # 3-step explainer
│   │   ├── FeatureShowcase.tsx   # Fan Credits / Staking / Auctions cards
│   │   ├── SportsVerticals.tsx   # "Every sport. One platform." image grid
│   │   ├── SocialProof.tsx       # Waitlist counter + testimonials + marquee
│   │   ├── PartnerSection.tsx    # B2B value props for clubs
│   │   ├── FooterSection.tsx     # Waitlist form (fan/club toggle) + links
│   │   └── FoldTransition.tsx    # Section transition effect
│   ├── ui/              # 49 shadcn/ui components
│   └── NavLink.tsx      # Navigation link component
├── hooks/
│   ├── useInView.ts     # Intersection Observer for scroll animations
│   ├── use-mobile.tsx   # Mobile breakpoint detection
│   └── use-toast.ts     # Toast notification hook
├── lib/
│   ├── firebase.ts      # Firebase init + waitlist write
│   └── utils.ts         # cn() class merge utility
├── pages/
│   ├── Index.tsx         # Main landing page (assembles all sections)
│   └── NotFound.tsx      # 404 page
├── App.tsx              # Router + providers
├── main.tsx             # Entry point
└── index.css            # Global styles, brand tokens, animations
```

---

## Brand System

| Token | Value | Usage |
|-------|-------|-------|
| `brand-yellow` | `hsl(50 100% 60%)` | Primary brand color, CTAs, highlights |
| `brand-dark` | `hsl(240 33% 14%)` | Dark backgrounds, text |
| `brand-indigo` | `hsl(260 90% 25%)` | Accent, gradients |
| `brand-white` | `hsl(0 0% 98%)` | Light backgrounds, card surfaces |
| `brand-coral` | `hsl(10 90% 62%)` | Alerts, live indicators |

---

## Deployment

The app is deployed to **Vercel**. Any push to the main branch triggers an automatic build and deploy.

```sh
# Manual production build
npm run build
# Output: dist/
```

---

## License

Proprietary — All rights reserved. © 2026 Ultrafans.
