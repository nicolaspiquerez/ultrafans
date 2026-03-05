# Ultrafans — Session Log

> Chronological record of development sessions and changes.

---

## Session 1 — March 4, 2026

### Landing Page Polish & Image Replacement

**Duration:** ~45 minutes

#### Changes Made

1. **Replaced sport athlete images in SportsVerticals section ("Every sport. One platform.")**
   - `athlete-soccer.jpg` — New soccer player bicycle kick photo
   - `athlete-baseball.jpg` — New baseball batter in action photo

2. **Replaced rugby and hockey images across the site**
   - `athlete-rugby.jpg` — New rugby image (used in SportsVerticals grid)
   - `athlete-ufc.jpg` — Replaced with rugby image (this asset is used for the "6.7K Rugby fans" floating bubble in Hero)
   - `athlete-hockey.jpg` — New hockey image (used in SportsVerticals grid)
   - `fans-cheering.jpg` — Replaced with hockey image (used for the "Hockey fans" floating bubble in Hero)

3. **Updated Hero floating bubble labels**
   - Changed "Fan Club" / "23.4K fans" → "Fan Club" / "23.4K Hockey fans" to match the new hockey image

4. **Replaced geometric shapes with sport icon SVGs in Hero**
   - Removed: generic rounded squares and circles (3 shapes)
   - Added 5 floating SVG sport icons:
     - Rugby ball (tilted oval)
     - Basketball (circle)
     - Baseball (circle)
     - Pennant flag (long triangle on pole)
     - Hockey stick (L-shaped with puck)
   - All use `text-foreground/10` for subtlety and existing `float-*` animation classes

5. **Cleaned up sport icon SVGs**
   - Removed all internal seam/stitch lines from rugby ball, basketball, and baseball
   - Icons are now clean silhouettes — outer shape + subtle fill only

6. **Created project documentation**
   - `README.md` — Complete rewrite replacing Lovable boilerplate
   - `HANDOFF.md` — Onboarding document for new developers
   - `ROADMAP.md` — 8-phase product roadmap from landing page to multi-sport expansion
   - `SESSION_LOG.md` — This file
   - `TECHNICAL.md` — Architecture, conventions, and technical decisions

#### Files Modified
- `src/assets/athlete-soccer.jpg` (replaced)
- `src/assets/athlete-baseball.jpg` (replaced)
- `src/assets/athlete-rugby.jpg` (replaced)
- `src/assets/athlete-ufc.jpg` (replaced with rugby image)
- `src/assets/athlete-hockey.jpg` (replaced)
- `src/assets/fans-cheering.jpg` (replaced with hockey image)
- `src/components/landing/Hero.tsx` (floating bubbles text, geometric shapes → sport SVGs, seam removal)
- `README.md` (full rewrite)

#### Files Created
- `HANDOFF.md`
- `ROADMAP.md`
- `SESSION_LOG.md`
- `TECHNICAL.md`

#### Decisions
- Fan credits will likely be **database-backed** rather than blockchain tokens (simpler, avoids crypto complexity)
- Deployment target is **Vercel**
- Team structure is **co-founders / small team** with Benjamin as lead

---

## Session 2 — March 4, 2026

### Blog System, Waitlist Counter, Brevo Integration, i18n, and Partner Contact

**Duration:** ~2 hours

#### Changes Made

1. **Implemented persistent global waitlist counter**
   - Created `src/hooks/useWaitlistCounter.ts` — deterministic timestamp-based counter
   - Starts at 2,500 at epoch `2026-03-04T12:00:00Z`, grows ~500/day
   - Uses splitmix32 pseudo-RNG so all visitors see the same number at the same time
   - Full days computed in bulk (O(1)), only current partial day iterates slots
   - Recomputes every 30–60s in-browser for visible tick-up effect
   - Updated `SocialProof.tsx` to use the new hook (replaced simple `useState` counter)

2. **Built blog system from scratch**
   - `src/data/blogPosts.ts` — Data store with `BlogPost` interface and 3 posts
   - `src/pages/Blog.tsx` — Listing page at `/blog` with post cards, author avatars, dates
   - `src/pages/BlogPost.tsx` — Individual post page at `/blog/:slug` with heading/paragraph rendering and author bio
   - Routes added to `src/App.tsx`: `/blog` and `/blog/:slug`
   - Footer blog link updated from `/blog.html` → `/blog` (React Router)

3. **Added 3 blog posts**
   - *"Clubs Are Sitting on a Fan Data Goldmine and Doing Nothing With It"* — Nicolas, Feb 26
   - *"The Next Wave of Sports Revenue Won't Come From Broadcasters"* — Nicolas, Mar 1
   - *"The Financial Case for Treating Fans Like Investors"* — Ben, Mar 4

4. **Fixed deployed site 404 on SPA routes**
   - Created `public/_redirects` with `/* /index.html 200`
   - Fixes Netlify/Lovable returning 404 when navigating directly to `/blog` or `/blog/:slug`

5. **Added "Get in touch" CTA to PartnerSection**
   - Added `"Get in touch with us"` label above a `mailto:partner@ultrafans.co` button
   - Styled as yellow brand button matching site design

6. **Replaced footer waitlist form with Brevo (Sendinblue) embed**
   - Removed Firebase-backed custom form from `FooterSection.tsx`
   - Integrated Brevo hosted form with Fan/Club radio buttons and email input
   - Dynamically injects Brevo's `main.js` script on mount, cleans up on unmount
   - Added loading spinner and `disabled` state on submit button
   - Added `confetti` celebration on successful submission

7. **Made all pages fully translatable (EN/FR)**
   - Added missing keys to `src/locales/en.json` and `src/locales/fr.json`:
     - `partner.getInTouch`
     - `blog.heading`, `blog.subtitle`, `blog.backToHome`, `blog.allPosts`, `blog.home`, `blog.about`
   - Updated `PartnerSection.tsx`, `Blog.tsx`, `BlogPost.tsx` to use `t()` for all strings
   - Date formatting now uses `i18n.language` locale instead of hardcoded `"en-US"`

#### Files Created
- `src/hooks/useWaitlistCounter.ts`
- `src/data/blogPosts.ts`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `public/_redirects`

#### Files Modified
- `src/App.tsx` — Added Blog and BlogPost routes
- `src/components/landing/SocialProof.tsx` — Replaced fake counter with `useWaitlistCounter`
- `src/components/landing/FooterSection.tsx` — Brevo form, loading state, confetti
- `src/components/landing/PartnerSection.tsx` — Added "Get in touch" CTA, i18n
- `src/locales/en.json` — Added `partner.getInTouch` and `blog.*` keys
- `src/locales/fr.json` — Added `partner.getInTouch` and `blog.*` keys (French)
- `src/pages/Blog.tsx` — Full i18n, date locale from `i18n.language`
- `src/pages/BlogPost.tsx` — Full i18n, date locale from `i18n.language`

#### Decisions
- Blog post content is stored in a static TypeScript data file (`blogPosts.ts`). No CMS needed at this stage — just add objects to the array.
- Waitlist counter is fully deterministic (no server, no database). Reset by changing the `EPOCH` constant in `useWaitlistCounter.ts`.
- Switched footer form from Firebase to **Brevo** for email list management. Firebase `addWaitlistEntry` is still used in the Hero form.
- Blog posts are written in English only for now. Internationalizing blog content (separate EN/FR post arrays) is a future consideration.
- Deployment is on **Netlify** (via Lovable). The `_redirects` file is required for SPA client-side routing to work on direct URL access.

#### Open Issues
- Blog post content (titles, excerpts, author bios) is hardcoded in English. French translations of blog content not yet implemented.
- `careers.html` and `about.html` footer links still point to static HTML files that don't exist in the React app.

---

## Template for Future Sessions

```
## Session N — [Date]

### [Summary Title]

**Duration:** ~X minutes

#### Changes Made
1. ...

#### Files Modified
- ...

#### Files Created
- ...

#### Decisions
- ...

#### Open Issues
- ...
```
