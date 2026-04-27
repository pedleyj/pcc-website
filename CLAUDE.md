# CLAUDE.md - PCC Website Project Guide

**Last Updated**: April 27, 2026
**Project**: Peninsula Covenant Church Website Redesign
**Status**: Sprint 1 + 1.5 Complete; Sprint 2 substantially shipped (events, prayer, newsletter, message sync, small groups). Remaining: shared Button component, logo wordmark sizing, MessageResource UI surface.

---

## PROJECT OVERVIEW

### What This Is
A modern, user-friendly website for **Peninsula Covenant Church** (PCC) in Redwood City, California, replacing the outdated WordPress site at wearepcc.com.

### Primary Goal
Make it **easy for spiritual seekers to discover and sign up for Alpha** - a faith exploration program. The entire site is designed with this user journey as the top priority.

### Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack) + TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-based config with `@config` directive in globals.css) + `tailwind.config.ts`
- **Database**: PostgreSQL (hosted on Neon.tech, pooler connection, sslmode=require)
- **ORM**: Prisma v6 (NOT v7 — v7 removed `url` from schema)
- **Deployment**: Vercel
- **Production URL**: https://pcc-website-ten.vercel.app
- **GitHub**: https://github.com/pedleyj/pcc-website.git
- **`package.json`** has `"type": "module"`

---

## PROJECT STRUCTURE

```
pcc-website/
├── app/                          # Next.js App Router pages (NO route groups)
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + Tailwind @config
│   ├── new/                      # I'm New page
│   ├── gatherings/               # Sunday services, latest 4 messages
│   ├── explore-faith/            # Hub page (card grid)
│   │   ├── alpha/                # Alpha program page (KEY PAGE)
│   │   └── faq/                  # Faith questions FAQ
│   ├── connect/                  # Hub page (card grid)
│   │   ├── groups/               # Small groups (links to Church Center)
│   │   └── serve/                # Serve opportunities (absorbed Ministries)
│   ├── support/                  # Hub page (card grid)
│   │   ├── prayer/               # Prayer request form (Resend email + DB)
│   │   ├── stephen-ministry/
│   │   ├── community-care/
│   │   ├── counseling/
│   │   ├── marriage/
│   │   └── groups/               # Support groups
│   ├── about/                    # Hub page with anchor IDs
│   │   ├── beliefs/              # Six Covenant Affirmations
│   │   ├── leadership/           # LST: Officers, Team, Nominating
│   │   ├── staff/                # Staff directory
│   │   ├── community/            # Hub for community programs
│   │   │   ├── preschool/        # PCC Preschool landing
│   │   │   ├── community-center/ # PCC Community Center landing
│   │   │   └── sacc/             # SACC landing
│   │   └── newsletter/           # Newsletter signup + confirm pages
│   ├── messages/                 # Paginated archive (12/page) with filters
│   │   └── [id]/                 # Detail: media toggle, share, related
│   ├── events/                   # Calendar with category filters + month/list
│   ├── actions/                  # Server actions (alpha-interest, prayer, newsletter)
│   ├── api/                      # Route handlers (see API ROUTES section)
│   └── give/                     # Giving page
├── components/
│   ├── alpha/                    # alpha-interest-form.tsx
│   ├── events/                   # calendar-view.tsx (filtering + view toggle)
│   ├── groups/                   # groups-browser.tsx
│   ├── home/                     # hero-carousel.tsx
│   ├── icons/                    # social-icons.tsx
│   ├── layout/                   # header, footer, footer-newsletter, logo,
│   │                             # nav-dropdown, breadcrumb, scroll-to-top
│   ├── messages/                 # filter-select, share-buttons,
│   │                             # media-player, view-counter
│   └── support/                  # prayer-form.tsx
├── lib/
│   ├── db/                       # Prisma singleton (prisma.ts) + query functions (queries.ts)
│   └── utils/                    # cn() helper (clsx + tailwind-merge)
├── prisma/
│   ├── schema.prisma             # Database schema (10 models)
│   └── seed.ts                   # Seed data script
└── public/images/                # PCC logos (white + black variants)
```

---

## DESIGN SYSTEM

### Brand Colors (Tailwind Config)
**Primary Palette**:
- `pcc-navy`: #254b5a (headers, navigation, hero backgrounds)
- `pcc-teal`: #31825e (accents, links)
- `pcc-gold`: #f4b73f (primary CTAs)
- `pcc-sage`: #849c8d (support sections)
- `pcc-emerald`: #346e4b (Alpha sections)

**Full palette**: See `tailwind.config.ts` — warm tones, reds, cool tones, neutrals with light/dark variants.

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, navy or deep blue
- **Body**: Regular, charcoal (#505251)

### Key Design Decisions
- **No hero gradients**: All heroes use solid `bg-pcc-navy` (no `bg-gradient-to-br`)
- **CTA sections** at bottom of pages also use solid `bg-pcc-navy`
- **Nav hover states**: `border-transparent hover:border-white/40` pill outlines
- **Nav active states**: `border-white/60` pill outlines via `usePathname()` + `isActivePath()`

---

## DATABASE SCHEMA

### Models (Prisma v6)
12 models total:

| Model | Key Fields |
|-------|-----------|
| **AlphaSession** | startDate, endDate, location, registrationUrl |
| **AlphaInterest** | email, firstName, sessionId (FK→AlphaSession), notifiedAt |
| **Message** | title, speaker, series, videoUrl, audioUrl, resourceUrl, scripture, viewCount |
| **MessageResource** | messageId (FK), type (beyond_sunday / discussion_guide / sermon_notes), fileUrl |
| **Event** | startTime, endTime, recurring, recurrenceRule, location, category, featured, registrationUrl |
| **Ministry** | name, description, category, contactEmail |
| **StaffMember** | name, title, department, bio, imageUrl |
| **SmallGroup** | name, type (growth/life), leader, meetingDay, ageGroup, capacity, openForSignup |
| **PrayerRequest** | name, email, phone, request, isPublic, isConfidential |
| **SupportResource** | title, category, description, contactInfo |
| **NewsletterSubscriber** | email, status (pending/confirmed/unsubscribed), confirmToken, unsubscribeToken |
| **SiteSettings** | key/value pairs for site-wide config |

### Query Functions (`lib/db/queries.ts`)

| Function | Purpose |
|----------|---------|
| `getSiteSettings()` | Site-wide settings |
| `getLatestMessages(limit)` | Recent messages (default 4) |
| `getMessageById(id)` | Single message lookup |
| `getAllMessages({ series?, speaker? })` | Filtered list, date desc |
| `getMessagesBySeries(series, excludeId?)` | Related messages |
| `getDistinctSeries()` | Unique series for filter dropdown |
| `getDistinctSpeakers()` | Unique speakers for filter dropdown |
| `getUpcomingEvents(limit)` | Future events |
| `getCurrentAlphaSession()` | Session in registration window (6wk before → 3wk after start) |
| `getNextAlphaSession()` | Next future session (for "Alpha returns..." messaging) |
| `createAlphaInterest(data)` | Submit interest (returns null on duplicate email+session) |
| `getUnnotifiedAlphaInterests(sessionId?)` | Interests not yet emailed |
| `markAlphaInterestsNotified(ids)` | Mark interests as emailed |
| `getActiveMinistries()` | Active ministries |
| `getLeadershipTeam()` | Leadership staff |
| `getAllStaff()` | Full staff directory |
| `getStaffByDepartment(dept)` | Staff filtered by department |
| `getStaffMemberById(id)` | Single staff member |
| `getAllSmallGroups()` | All small groups |
| `getSmallGroupsByType(type)` | Growth or life groups |
| `getOpenSmallGroups()` | Groups accepting members |
| `getAllSupportResources()` | All support resources |
| `getSupportResourcesByCategory(cat)` | Filtered support resources |
| `createPrayerRequest(data)` | Submit prayer request |

### Seed Data (`npm run db:seed`)
Clears all data before re-seeding. Includes: 27 staff, 6 small groups, 6 support resources, 6 ministries, 4 messages (2 with videoUrl, 1 with resourceUrl), 2 events, 1 alpha session, 1 site settings.

---

## NAVIGATION

- **Top-level nav:** I'm New | Gatherings | Explore Faith | Connect | Support | About | Give
- **Dropdowns:** Explore Faith (3 items), Connect (4 items), Support (6 items), About (7 items)
- **Simple links:** I'm New, Gatherings, Give (no dropdowns)
- **CTA button:** "Join Alpha" → `/explore-faith/alpha`
- **Components:** `header.tsx` (nav data + layout), `nav-dropdown.tsx` (reusable dropdown)
- **Mobile:** Slide-in panel from right, overlay, focus trap, sticky CTA at bottom
- **Active states:** Pill-outline borders using `usePathname()` + `isActivePath()` helper
- **Hover states:** `border-transparent hover:border-white/40` on desktop nav links

### Route Redirects (in `next.config.ts`)
- `/alpha` → `/explore-faith/alpha` (permanent 301)
- `/ministries` → `/connect/serve` (permanent 301)
- `/connect/ministries` → `/connect/serve` (permanent 301 — Ministries page was deleted, content consolidated into Serve)

---

## KEY FEATURES

### Messages System
- **Archive page** (`/messages`): Filter by series/speaker via searchParams, card grid
- **Detail page** (`/messages/[id]`): YouTube embed, audio player, resource download, related messages
- **Client component:** `components/messages/filter-select.tsx` — auto-submit on change
- **Gatherings page:** Shows 4 latest messages + "View All Messages" link
- YouTube URL parsing handles youtu.be, youtube.com/watch, and youtube.com/embed formats

### Alpha Registration & Interest
- **Church Center integration:** iframe embed with `?embed=true` at `/explore-faith/alpha`
- **Registration window:** 6 weeks before startDate through 3 weeks after startDate
- **Three page states:**
  1. **In registration window:** Session details card + iframe registration form
  2. **Outside window, future session in DB:** "Alpha Returns [Month Year]" + interest form
  3. **No future session:** "Alpha Returns In The Spring/In The Fall" + interest form
- **Season heuristic (fallback):** Feb–Jun → "In The Fall", Jul–Jan → "In The Spring"
- **Interest form:** Collects name + email, stored in `AlphaInterest` model, linked to session if known
- **Interest notification:** POST `/api/alpha/notify-interest` (requires `CRON_SECRET` Bearer token)
  - Sends "registration is open" email to all un-notified interests for a session
  - Trigger manually when opening registration: `curl -X POST .../api/alpha/notify-interest -H "Authorization: Bearer $CRON_SECRET" -d '{"sessionId":"..."}'`
- **Server action:** `app/actions/alpha-interest.ts` — rate limited, honeypot, sends Resend acknowledgment
- **Component:** `components/alpha/alpha-interest-form.tsx` (client component)
- **Messaging:** "Explore Life's Big Questions" — welcoming to seekers, not conversion-focused

### Events Calendar
- **Page**: `/events` — month view + list view toggle, category filters (worship, alpha, ministry, youth, kids, outreach, community), search
- **Component**: `components/events/calendar-view.tsx` (client, uses `date-fns`)
- **Sync**: `/api/sync-events` — Vercel cron daily at 06:00 UTC pulls from Planning Center; auth via `SYNC_SECRET` (also accepts Vercel cron header)
- **Detail pages**: include "View on Church Center" CTA when `registrationUrl` present
- Image hosts allowed for Planning Center CDN (next.config.ts + CSP)

### Prayer Request System
- **Page**: `/support/prayer` with `components/support/prayer-form.tsx`
- **Server action**: `app/actions/prayer.ts` — honeypot, rate-limited (5/IP/hr), 5000-char limit
- **Visibility toggle**: Private (prayer team only) vs Public on prayer wall
- **Email**: Resend sends `[PCC PRAYER REQUEST]` to pedleyj@gmail.com on submit
- **Storage**: `PrayerRequest` model with `isPublic` + `isConfidential` flags

### Newsletter (Double Opt-In)
- **Footer signup**: `components/layout/footer-newsletter.tsx` (minimal email + button)
- **Server action**: `app/actions/newsletter.ts` — honeypot (`company` field), rate-limited (2/IP/hr, 1/email/24hr)
- **Flow**: Signup → Resend confirmation email → user clicks token link → `/api/newsletter/confirm` → status=confirmed
- **Unsubscribe**: token-based at `/api/newsletter/unsubscribe`
- **Admin**: `/api/newsletter/preview` (sample HTML), `/api/newsletter/send-test` (auth via `SYNC_SECRET`)
- **Confirm pages**: `/about/newsletter/confirm` for success/error UI

### Message Sync (Planning Center + YouTube + Beyond Sunday)
- **Endpoint**: `/api/sync-messages` (manual trigger, auth via `SYNC_SECRET`)
- **Sources**: Planning Center Services API (sermon metadata) + YouTube Data API (video matching by `MM.DD.YYYY` title format) + Beyond Sunday PDF URLs
- **Stores**: Messages with `videoUrl`, `audioUrl`, `resourceUrl`, plus `MessageResource` rows for Beyond Sunday PDFs / discussion guides
- **Note**: `MessageResource` data syncs to DB but is **not yet surfaced on the message detail UI** — see Remaining Work
- **View counter**: `/api/messages/[id]/view` increments `Message.viewCount`

### Hub Pages
`/explore-faith`, `/connect`, `/support` — card grids linking to sub-pages. About page has "Learn More" hub card section with anchor IDs. `/about/community` is itself a hub linking to Preschool, Community Center, and SACC landing pages.

### Breadcrumbs
All level-2+ pages use `components/layout/breadcrumb.tsx` for consistent navigation context.

---

## API ROUTES

| Route | Purpose | Auth |
|-------|---------|------|
| `POST /api/sync-events` | Pull events from Planning Center | `SYNC_SECRET` Bearer or Vercel cron header |
| `POST /api/sync-messages` | Pull sermons + Beyond Sunday + YouTube videos | `SYNC_SECRET` Bearer |
| `POST /api/messages/[id]/view` | Increment message view counter | None |
| `POST /api/alpha/notify-interest` | Email all un-notified Alpha interests | `CRON_SECRET` Bearer |
| `GET  /api/newsletter/confirm?token=` | Confirm subscription | Token in URL |
| `GET  /api/newsletter/unsubscribe?token=` | Unsubscribe | Token in URL |
| `GET  /api/newsletter/preview` | Preview rendered newsletter HTML | None (read-only) |
| `POST /api/newsletter/send-test` | Send test or broadcast newsletter | `SYNC_SECRET` Bearer |

**Vercel Cron** (`vercel.json`): only `/api/sync-events` runs on schedule (`0 6 * * *` daily). Hobby plan limits us to one cron — message sync is manually triggered.

---

## KEY USER JOURNEYS

### 1. Spiritual Seeker → Alpha (TOP PRIORITY)
**Flow**: Homepage → Alpha section → Alpha page → Registration (or Interest Form if outside window)
**Messaging**: "Explore Life's Big Questions" (not conversion-focused)
**Tone**: Welcoming, non-assumptive, inviting to skeptics

### 2. First-Time Visitor → Plan Visit
**Flow**: Homepage → I'm New page → Service times & location
**Key Info**: Sunday 9:00 AM & 10:45 AM, address, what to expect

### 3. Member → Find Content
**Flow**: Navigation → Gatherings/Messages/Events
**Features**: Message archive, event calendar, group signup

### 4. Person Needing Support → Resources
**Flow**: Navigation → Support section → Prayer/counseling/care
**Tone**: Warm, caring, confidential

---

## DEVELOPMENT

### Commands
```bash
npm run dev               # Dev server at localhost:3000 (Turbopack)
npm run build             # Production build (runs prisma generate first)
npx prisma studio         # Visual database editor
npx prisma generate       # Regenerate Prisma client
npx prisma db push        # Push schema changes (no migrations directory)
npm run db:seed           # Seed database (tsx prisma/seed.ts)
```

### Deploy
```bash
git push origin main                                    # Push to GitHub
npx vercel --token <TOKEN> --prod --yes                 # Deploy to Vercel
```
- Vercel token stored in MEMORY.md
- robots.txt + noindex meta tags block SEO (staging site) — remove when going to production domain

### Key Architecture Notes
- All DB-backed pages use `export const dynamic = 'force-dynamic'` (required for Vercel builds)
- Prisma reads `.env` (not `.env.local`); Next.js reads `.env.local` — both files exist
- Hot reload works automatically — no need to restart dev server after file changes
- Server components by default; `'use client'` only when needed (e.g., `filter-select.tsx`, `hero-carousel.tsx`)
- `searchParams` is Promise-based in Next.js 16

---

## CONTENT GUIDELINES

### Tone & Voice
- **Welcoming** but not pushy
- **Professional** but approachable
- **Clear** over clever
- **Inclusive** language (avoid insider jargon)

### Alpha Content (CRITICAL)
- Frame as **exploration**, not conversion
- Welcome skeptics and questioners
- Use Alpha USA's language: "No matter who you are or what you believe, there's a seat for you at the Alpha table"
- Avoid assumptive phrases like "grow your faith" for non-believers
- Prefer "In The Spring" / "In The Fall" over "This Spring" / "This Fall" (avoids ambiguity)

---

## KNOWN ISSUES & REMAINING WORK

### Sprint 1.5 — Complete ✓
All items shipped in commits leading up to f72790e ("Fix bugs, security issues, accessibility, and add Alpha interest system"):
- [x] Content updates (Community, Beliefs, Serve, Prayer)
- [x] Leadership page restructure (LST: Officers, Team Members, Nominating)
- [x] Footer improvements (mailto, social icons, newsletter signup)
- [x] Accessibility fixes (44 aria-labels across 11 files; `min-h-[44px]` touch targets; focus-visible rings)
- [x] Security headers (`next.config.ts:4-35` + nonce-based CSP in middleware; X-Frame-Options DENY, COOP same-origin)
- [x] Caching (Cache-Control on static assets; no `unload` listeners — bfcache friendly; per-page `revalidate`)
- [x] Form testing (validation, aria-invalid, honeypots, rate limiting on all server actions)

### Sprint 2 — Substantially Complete ✓
- [x] Events calendar with filtering (`/events` + Planning Center daily sync)
- [x] Support section with prayer requests (form + Resend email + DB)
- [x] Small groups browsing (`/connect/groups` — links to Church Center filtered directories; no in-app group detail pages, by design)
- [x] Newsletter integration (double opt-in, token-based confirm/unsub, branded email)
- [~] Beyond Sunday PDFs — **PARTIAL**: sync writes `MessageResource` rows but message detail UI does not yet display them

### Remaining Work
- [ ] **Logo wordmark sizing** — font is `font-light`, but visual size against new layout still needs review (`components/layout/logo.tsx`)
- [ ] **Shared `<Button>` component** — buttons are still inline-styled across pages; consolidate into `components/ui/button.tsx` for consistency
- [ ] **Surface MessageResource on detail pages** — render Beyond Sunday / discussion guide / sermon notes downloads on `/messages/[id]`
- [ ] **Pre-launch**: remove robots.txt + noindex meta tags when moving to production domain (currently blocking SEO since this is staging)

### Sprint 3 — Ideas / Backlog
- Public prayer wall surface (model already supports `isPublic`)
- Individual small group detail pages (model has `capacity`, `openForSignup` — currently delegated to Church Center)
- Newsletter content management UI (currently send-test endpoint only)

---

## GOTCHAS

- **Prisma v7** breaks traditional schema — stick with v6
- **Prisma generate EPERM** on Windows when dev server is running — benign DLL file lock, ignore it
- **placehold.co** returns SVGs — `dangerouslyAllowSVG: true` in next.config.ts
- **`wearepcc.com`** added to allowed image remotePatterns
- **Windows** creates stray `nul` files — clean up before git commits
- **Windows `taskkill`** via Git Bash needs `cmd /c` prefix; `timeout` command differs from Unix
- **Inline string onChange** handlers fail in React/TS — use client components instead

---

## IMPORTANT LINKS

### External Sites
- **Current PCC site**: https://wearepcc.com (reference for content)
- **Church Center**: https://wearepcc.churchcenter.com/home (member login)
- **Alpha USA**: https://alphausa.org (messaging reference)
- **Alpha registration form**: https://wearepcc.churchcenter.com/people/forms/894477

### Community Ministries (External Links)
- PCC Preschool: peninsulacovenantpreschool.com
- Peninsula Community Center: peninsulacommunitycenter.com
- SACC: pccsacc.com

### Church Info
- **Address**: 3560 Farm Hill Boulevard, Redwood City, CA 94061
- **Phone**: 650-365-8094
- **Email**: info@wearepcc.com
- **Service Times**: Sunday 9:00 AM & 10:45 AM
- **Denomination**: Evangelical Covenant Church

---

## COMMON TASKS

### Adding a New Page
1. Create file in `app/[section]/page.tsx` (no route groups)
2. Use server component by default
3. Add `export const dynamic = 'force-dynamic'` if it fetches from DB
4. Fetch data with Prisma query functions
5. Add to navigation in `components/layout/header.tsx` if needed

### Adding a New Database Model
1. Update `prisma/schema.prisma`
2. Run `npx prisma db push` (no migrations directory — push directly)
3. Run `npx prisma generate`
4. Create query functions in `lib/db/queries.ts`
5. Update `prisma/seed.ts` if needed

### Updating Navigation
- **File**: `components/layout/header.tsx`
- **Mobile nav**: Same file, separate mobile menu section
- **Active states**: Uses `usePathname()` + `isActivePath()` helper
- **Dropdowns**: `components/layout/nav-dropdown.tsx` (accepts `isActive` prop)

### Deploying
1. `npm run build` to verify no errors
2. `git add` + `git commit` + `git push origin main`
3. Run Vercel deploy command (see Deploy section above)

---

## DO / DON'T

### DO
- Use Prisma for all database queries (type-safe)
- Use Next.js Image component for images (optimization)
- Keep Alpha messaging welcoming to seekers
- Test on mobile (mobile-first design)
- Use server components by default ('use client' only when needed)
- Use `cn()` helper for conditional class merging
- Add `force-dynamic` to any page that reads from the database

### DON'T
- Use gradients in hero sections (solid `bg-pcc-navy` only)
- Make Alpha page assumptive or conversion-focused
- Hardcode data that should come from the database
- Use `any` in TypeScript
- Upgrade to Prisma v7
- Forget to run `npx prisma db push` after schema changes
