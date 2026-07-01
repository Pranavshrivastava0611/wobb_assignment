# Wobb — Influencer Search & Discovery

A premium influencer search and discovery dashboard built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **GSAP**. Features a luxury editorial design in white, black, and warm brown with cinematic scroll animations.

---

## ✨ Design & Features

### Premium Visual Identity
- **Color Palette**: Warm white (`#FAFAF8`), black (`#1A1A1A`), and curated browns (`#C4A265`, `#8B6914`, `#6B4226`) for a luxury editorial aesthetic.
- **Typography**: Dual font system — *Playfair Display* (serif, italic) for headings and *Inter* (sans-serif) for body text.
- **Cards**: White card surfaces with warm brown-tinted borders, hover-lift animations, and shadow bloom effects.
- **Responsive**: Fully responsive across mobile, tablet, and desktop breakpoints.

### GSAP-Powered Animations
- **ScrollTrigger** stagger reveals on profile card grids — cards fade in as you scroll.
- **Horizontal cinema scroll** on the profile detail page — stats slide horizontally as you scroll vertically.
- **Parallax** depth effect on profile avatars.
- **Marquee** featured creators strip on the search page with seamless infinite scroll.
- **Sliding tab indicator** on platform filter — animated via GSAP tween.
- **Drawer** slide-in/out with spring-physics easing and staggered list item reveals.
- **Page entrance** fade-up on every route transition.

### Micro-Interactions
| Element | Interaction |
|---------|-------------|
| Profile Cards | Hover lift with shadow bloom |
| Logo | Letter-spacing widens on hover |
| Back Button | Arrow slides left on hover |
| Profile Avatar | Subtle zoom on hover |
| Search Input | Brown glow ring on focus |
| Platform Tabs | Sliding active indicator |
| Buttons | Scale up + shadow on hover |

### Core Functionality
- **Influencer Search** — browse top creators across Instagram, YouTube, and TikTok with debounced search.
- **Profile Detail Page** — view full stats, bio, engagement metrics with cinematic scroll presentation.
- **Add to Collection** — curate a list of influencers, persisted to LocalStorage via Zustand.
- **List Drawer** — slide-out panel to manage your selected creators from anywhere in the app.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **GSAP + ScrollTrigger** | Scroll-based animations, parallax, horizontal scroll |
| **Zustand** | Global state management with LocalStorage persistence |
| **Lucide React** | Icon system |
| **React Router v7** | Client-side routing |
| **Vitest + Happy DOM** | Unit testing framework & mocked browser environment |

---

## 📁 Project Structure

```
src/
├── assets/data/           # Static JSON data (search indices, profiles)
├── components/
│   ├── Layout.tsx          # Premium navbar, page wrapper, GSAP page entrance
│   ├── PlatformFilter.tsx  # Tab pills with GSAP sliding indicator
│   ├── ProfileCard.tsx     # Memoized magazine-style card with hover-lift
│   ├── ProfileList.tsx     # Memoized grid with GSAP stagger scroll reveal
│   ├── StatCard.tsx        # Reusable stat display card (extracted, memoized)
│   ├── VerifiedBadge.tsx   # Brown/gold verified badge
│   └── list/
│       ├── ListDrawer.tsx  # GSAP-animated slide-out drawer
│       └── ListItem.tsx    # Individual list item
├── hooks/
│   ├── useDebounce.ts      # Debounce hook for search
│   └── useGsap.ts          # Custom GSAP hooks (scroll reveal, stagger, parallax, horizontal scroll, counter)
├── pages/
│   ├── SearchPage.tsx      # Hero section, marquee, filters, profile grid
│   └── ProfileDetailPage.tsx # Profile detail with cinema scroll stats
├── store/
│   └── useListStore.ts     # Zustand store with persist middleware
├── tests/
│   ├── dataHelpers.test.ts # Search & filtering unit tests
│   ├── formatters.test.ts  # Followers & engagement formatting tests
│   └── useListStore.test.ts # Zustand list collection CRUD store tests
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   ├── dataHelpers.ts      # Data extraction & optimized filtering
│   ├── formatters.ts       # Number formatting utilities
│   ├── gsapInit.ts         # GSAP + ScrollTrigger plugin registration
│   ├── profileLoader.ts    # Dynamic profile JSON loader with fallback
│   └── statHelpers.ts      # Reusable stat item builder & types
├── App.tsx                 # Router with React.lazy code splitting
├── index.css               # Design system (colors, typography, glass, cards, animations)
└── main.tsx                # Entry point with GSAP init
```

---

## 🔄 CI/CD

GitHub Actions CI pipeline (`.github/workflows/ci.yml`) runs on every push and PR to `main`/`master`:

1. **Lint** — `npm run lint` (ESLint with React Hooks & Refresh plugins)
2. **Type Check** — `npx tsc --noEmit` (verifies complete type-safety)
3. **Test** — `npm run test` (runs Vitest unit tests in a happy-dom sandbox environment)
4. **Build** — `npm run build` (production bundle, runs after lint, typecheck, and test jobs successfully pass)

---

## 🧹 Code Quality

- **Extracted reusable components**: `StatCard`, `MarqueeCard` pulled out of monolithic page components into focused, single-responsibility files.
- **Extracted reusable utilities**: `buildStatItems()` in `statHelpers.ts` centralises stat construction logic that was previously inlined (60+ lines) in `ProfileDetailPage`.
- **Removed dead code**: Cleaned up unused props (`searchQuery` on `ProfileCard`), dead scratch files, and stale imports.
- **Proper TypeScript types**: `ListProfile.platform` now uses the shared `Platform` type instead of an inline string union. `StatItem` interface exported for reuse.
- **Consistent naming**: Record lookups replace if-chains for `getPlatformLabel`. JSDoc comments on all utility functions.
- **Clean folder structure**: Hooks, utils, types, store, components, and pages each have clear responsibilities.

---

## ⚡ Performance Optimizations

| Optimization | Details |
|-------------|--------|
| **Route-based code splitting** | `React.lazy` + `Suspense` on both pages. Initial bundle reduced from 391 KB → 347 KB gzip. |
| **React.memo** | `ProfileCard`, `ProfileList`, `StatCard` all memoized to prevent re-renders when sibling state changes. |
| **useCallback** | All event handlers in `SearchPage`, `ProfileCard`, `ProfileDetailPage` wrapped in `useCallback` to maintain stable references. |
| **useMemo** | Profile extraction, filtering, stat building, and marquee array all memoized. |
| **Debounced search** | Custom `useDebounce(300ms)` hook prevents rapid re-filtering on every keystroke. |
| **Optimized filtering** | `filterProfiles` lowercases the query once, not per-item (saves O(n) string operations). |
| **Lazy image loading** | `loading="lazy"` on all profile avatars and marquee images. |
| **Zustand deduplication** | `addProfile` returns the same state reference if the profile already exists, skipping a re-render. |

---

## 🛠️ Assumptions & Trade-Offs

### Assumptions
- **Data Completeness**: Only 6 of 30 profiles have detailed JSON files. The app gracefully falls back to basic search index data for profiles without dedicated files.
- **Persistence**: "Persistent after refresh" uses client-side LocalStorage rather than a backend.

### Trade-Offs
- **Client-Side Filtering**: All search is client-side since data is static JSON. A production app would use a debounced API call.
- **GSAP over Framer Motion**: GSAP was chosen for its superior scroll-based animation capabilities (ScrollTrigger, pinning, horizontal scroll) which are critical for the cinematic design language.

---

## 🚀 Future Improvements

1. **Virtualization** — `@tanstack/react-virtual` for large result sets.
2. **E2E Testing** — Playwright tests for the critical path (Search → Profile → Add to List → Persistence).
3. **Advanced Filtering** — Filter by engagement rate, follower count ranges, or demographics.
4. **Dark Mode Toggle** — Theme switcher between the warm white and a dark editorial mode.
5. **Image CDN** — Use responsive `srcset` with an image optimization service for profile avatars.

---

## 💻 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Pranavshrivastava0611/wobb_assignment.git
cd wobb_assignment

# Install dependencies
npm install

# Start the development server
npm run dev

# Run unit tests
npm run test

# Lint & type check
npm run lint
npx tsc --noEmit

# Create an optimized production build
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.
