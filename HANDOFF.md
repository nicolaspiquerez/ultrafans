# Ultrafans — Handoff Document

> Last updated: March 4, 2026 (Session 2)

---

## What Is Ultrafans?

Ultrafans is a **fan engagement platform for sports**. Fans buy fan credits tied to their favorite clubs, stake those credits to earn loyalty points over time, and then spend points in live auctions for real-world experiences (VIP tickets, signed merch, meet-and-greets, travel with the team).

The platform serves **two audiences**:
1. **Fans** — Buy credits, earn points, bid on experiences.
2. **Clubs / Teams** — Issue their own fan credit, see their supporter base, and create auction experiences as a new revenue stream.

---

## Current State

**Pre-launch.** The codebase is a single-page marketing/landing site with a Firebase-backed waitlist. No app dashboard, no fan credit system, no auction engine exists yet.

### What's Built

| Component | Status | Notes |
|-----------|--------|-------|
| Landing page (7 sections) | Done | Hero, HowItWorks, FeatureShowcase, SportsVerticals, SocialProof, PartnerSection, FooterSection |
| Waitlist — Hero form | Done | Fan-only Firebase form with confetti on success |
| Waitlist — Footer form | Done | Brevo-hosted form with Fan/Club radio, loading state, confetti |
| Persistent waitlist counter | Done | Deterministic timestamp-based counter, ~500/day, same value for all visitors |
| Blog system | Done | `/blog` listing + `/blog/:slug` individual posts. Content in `src/data/blogPosts.ts` |
| Blog posts | Done | 3 posts by Nicolas (x2) and Ben (x1) |
| EN/FR i18n | Done | All UI strings in `src/locales/en.json` and `fr.json`. Language toggle in Hero |
| Partner contact CTA | Done | "Get in touch with us" + `mailto:partner@ultrafans.com` button in PartnerSection |
| SPA routing fix | Done | `public/_redirects` ensures Netlify serves `index.html` for all routes |
| Brand system | Done | Yellow/dark/indigo palette, Space Grotesk + DM Sans, custom CSS animations |
| Responsive design | Done | Mobile-first, horizontal scroll on card grids, hidden elements on small screens |
| shadcn/ui component library | Done | 49 UI primitives installed and configured |

### What's NOT Built

- User authentication / accounts
- Fan credit purchase flow
- Staking / points engine
- Auction system
- Club admin dashboard
- Payment processing
- API / backend services (beyond Firebase waitlist)
- Database schema for credits, points, users, auctions
- `careers.html` and `about.html` pages (footer links point to non-existent static files)
- French translations of blog post content (titles, excerpts, and body are English-only)

---

## Architecture Overview

```
Landing Page (React SPA)
    │
    ├── 7 section components (src/components/landing/)
    ├── Framer Motion scroll animations (useInView hook)
    ├── Tailwind CSS with brand design tokens (index.css)
    │
    └── Firebase Firestore
         └── waitlist collection
              └── { email, type: "fan"|"club", createdAt }
```

### Key Decisions

- **Vite + SWC** — Fast builds, HMR on port 8080.
- **shadcn/ui** — Component library is installed with 49 primitives ready to use for the future app UI.
- **Fan credits approach** — Tokenization was considered but the team is leaning toward **database-backed credits** (simpler, no blockchain complexity).
- **No SSR** — Pure client-side SPA. Deployed as static files on **Netlify** (via Lovable).
- **Blog** — Static data file (`blogPosts.ts`), no CMS. Add posts by appending objects to the array.
- **Waitlist counter** — Deterministic, no server. Reset by changing `EPOCH` in `src/hooks/useWaitlistCounter.ts`.
- **Footer form** — Switched from Firebase to **Brevo** for email list management. Hero form still uses Firebase.

---

## File Map — What Matters

| File | Purpose | Touch Frequency |
|------|---------|-----------------|
| `src/pages/Index.tsx` | Assembles all landing sections in order | Rarely |
| `src/pages/Blog.tsx` | Blog listing page (`/blog`) | When changing blog UI |
| `src/pages/BlogPost.tsx` | Individual blog post page (`/blog/:slug`) | When changing post UI |
| `src/data/blogPosts.ts` | All blog post content — **add new posts here** | When publishing posts |
| `src/App.tsx` | Route definitions — add new pages here | When adding routes |
| `src/hooks/useWaitlistCounter.ts` | Persistent waitlist counter — change `EPOCH` to reset | To reset the counter |
| `src/components/landing/Hero.tsx` | Hero section — waitlist CTA, floating athlete bubbles, sport SVG icons | Often (visual tweaks) |
| `src/components/landing/FeatureShowcase.tsx` | Three feature cards with mock UI previews | Moderate |
| `src/components/landing/SportsVerticals.tsx` | Sport image grid (6 sports) | Moderate (image swaps) |
| `src/components/landing/FooterSection.tsx` | Footer Brevo waitlist form (Fan/Club), confetti, loading state | Moderate |
| `src/components/landing/SocialProof.tsx` | Waitlist counter + testimonials + marquee | Rarely |
| `src/components/landing/PartnerSection.tsx` | B2B value props for clubs + "Get in touch" CTA | Rarely |
| `src/locales/en.json` | English UI strings for all components | When adding new UI text |
| `src/locales/fr.json` | French UI strings for all components | When adding new UI text |
| `src/lib/firebase.ts` | Firebase init + `addWaitlistEntry()` (Hero form only now) | Only when adding new Firebase features |
| `src/index.css` | All CSS variables, brand tokens, float animations, gradients | When changing brand/theme |
| `tailwind.config.ts` | Tailwind theme extension (brand colors, fonts, keyframes) | When changing brand/theme |
| `public/_redirects` | Netlify SPA routing — all paths serve `index.html` | Never (don't change) |
| `.env` | Firebase credentials (not committed) | Setup only |

---

## How to Pick Up Development

### 1. Run Locally
```sh
npm install
cp .env.example .env   # add Firebase credentials
npm run dev             # http://localhost:8080
```

### 2. Key Patterns to Follow
- **Section components** — Each landing section is a self-contained component in `src/components/landing/`. They use `useInView` + Framer Motion for scroll-triggered animations.
- **Brand tokens** — Colors are defined as HSL CSS variables in `index.css` `:root` and consumed via Tailwind (`text-brand-yellow`, `bg-brand-dark`, etc.).
- **Dark sections** — Apply the `.dark-section` class to flip the color scheme (used by PartnerSection and FooterSection).
- **Float animations** — Five `float-1` through `float-5` classes for subtle floating movement, defined in `index.css`.

### 3. Next Steps for a New Developer
1. Read `ROADMAP.md` for the planned feature sequence.
2. Read `TECHNICAL.md` for architecture decisions and conventions.
3. The 49 shadcn/ui components are already installed — use them for any new UI.
4. The waitlist data is in Firestore under the `waitlist` collection.

---

## Credentials & Services

| Service | Purpose | Access |
|---------|---------|--------|
| Firebase | Firestore waitlist (Hero form) | Credentials in `.env` (ask team lead) |
| Brevo (Sendinblue) | Email list for footer waitlist form | Brevo account (ask team lead) |
| Netlify (via Lovable) | Hosting & deployment | Lovable project / Netlify account |
| GitHub | Source control | Repository access required |

---

## Contacts

- **Co-Founder / Project Lead** — Benjamin
- **Co-Founder** — Nicolas
- **Repo** — https://github.com/nicolaspiquerez/ultrafans
- **Deployment** — Netlify (via Lovable)
