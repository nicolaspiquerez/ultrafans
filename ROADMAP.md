# UltraFans — Product Roadmap

> Last updated: March 2026

---

## Phase 0: Landing & Waitlist (CURRENT — Complete)

**Goal:** Validate demand, collect emails, establish brand identity.

- [x] Landing page with 7 sections (Hero, HowItWorks, FeatureShowcase, SportsVerticals, SocialProof, PartnerSection, Footer)
- [x] Waitlist collection (fan + club signups) via Firebase Firestore
- [x] Brand system — yellow/dark/indigo palette, Space Grotesk + DM Sans typography
- [x] Responsive design (mobile-first, horizontal scroll grids)
- [x] Framer Motion scroll animations
- [x] Sport athlete imagery for 6 verticals (Football, Basketball, American Football, Rugby, Hockey, Baseball)
- [x] Floating sport icon SVGs in hero (rugby ball, basketball, baseball, pennant, hockey stick)
- [x] shadcn/ui component library (49 primitives) installed for future use
- [x] Vercel deployment

---

## Phase 1: Authentication & User Profiles

**Goal:** Let fans and clubs create accounts and manage their profiles.

- [ ] Email/password + OAuth signup/login (Firebase Auth or alternative)
- [ ] User roles: `fan` and `club`
- [ ] Fan profile: name, avatar, favorite teams, notification preferences
- [ ] Club profile: team name, logo, sport vertical, description
- [ ] Protected routes and auth guards
- [ ] Convert waitlist emails to pre-registered accounts (import pipeline)

---

## Phase 2: Fan Credits

**Goal:** Fans can buy credits tied to specific clubs. Credits are the core unit of the platform.

- [ ] Club admin: create and configure their fan credit (name, supply, price per credit)
- [ ] Fan-facing credit purchase flow (card payment)
- [ ] Payment integration (Stripe or equivalent)
- [ ] Credit balance display per club
- [ ] Transaction history
- [ ] Credit portfolio view (all clubs a fan has backed)
- [ ] Database schema: `credits`, `transactions`, `club_credits`
- [ ] Decide: database-backed credits vs. on-chain tokens (leaning database for simplicity)

---

## Phase 3: Staking & Points Engine

**Goal:** Fans stake credits to passively earn loyalty points over time.

- [ ] Staking mechanism: lock credits → earn points daily
- [ ] Points accumulation engine (background job / cron)
- [ ] Staking dashboard: active stakes, points earned, projected earnings
- [ ] Unstaking flow (with or without cooldown period)
- [ ] Points leaderboard per club
- [ ] Points do not expire — they accumulate until spent

---

## Phase 4: Auctions & Experiences

**Goal:** Clubs create experiences, fans bid with points. This is the monetization loop.

- [ ] Club admin: create auction (title, description, images, date, seats, starting bid)
- [ ] Live auction page with real-time bidding
- [ ] Auction states: upcoming → live → ended → fulfilled
- [ ] Bid placement with points deduction
- [ ] Outbid notifications (push / email)
- [ ] Winner selection and fulfillment flow
- [ ] Auction history for fans and clubs
- [ ] Experience categories: VIP tickets, signed merch, travel, meet-and-greet, etc.

---

## Phase 5: Club Dashboard

**Goal:** Give clubs full visibility into their fanbase and a self-serve admin panel.

- [ ] Fan directory: email, credit balance, points, join date
- [ ] Analytics: credit sales over time, top supporters, auction performance
- [ ] Auction management: create, edit, close, fulfill
- [ ] Credit supply management
- [ ] Payout / revenue reporting
- [ ] Export fan data (CSV)

---

## Phase 6: Notifications & Engagement

**Goal:** Keep fans engaged and coming back.

- [ ] Push notifications (auction going live, outbid alerts, new experiences)
- [ ] Email digests (weekly points summary, new auctions)
- [ ] In-app notification center
- [ ] Social sharing (auction wins, credit milestones)

---

## Phase 7: Mobile App

**Goal:** Native mobile experience for fans on the go.

- [ ] React Native or PWA evaluation
- [ ] Core flows: browse clubs, buy credits, check points, bid on auctions
- [ ] Push notification integration
- [ ] Biometric login

---

## Phase 8: Multi-Sport Expansion

**Goal:** Scale beyond initial verticals.

- [ ] Onboard clubs from additional sports (tennis, golf, cricket, esports, etc.)
- [ ] Sport-specific experience templates
- [ ] Regional expansion (localization, currency support)
- [ ] Partnership program for leagues and federations

---

## Future Considerations

- **Tokenization** — If demand warrants it, consider migrating credits to on-chain tokens for transferability and secondary markets.
- **Marketplace** — Fan-to-fan credit trading.
- **API for Clubs** — Public API so clubs can integrate credit/points data into their own apps.
- **Sponsor integrations** — Brands can sponsor auction experiences or offer co-branded credits.
- **Gamification** — Badges, streaks, fan tiers based on credit holding and points earned.
