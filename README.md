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

### Micro-Interactions & Graceful Fallbacks
| Element | Interaction / Fallback |
|---------|-------------------------|
| Profile Cards | Hover lift with shadow bloom |
| Logo | Letter-spacing widens on hover |
| Back Button | Arrow slides left on hover |
| Profile Avatar | Elegant zoom on hover; automatic transition to initials fallback on loading error |
| Search Input | Brown glow ring on focus |
| Platform Tabs | Sliding active indicator |
| Buttons | Scale up + shadow on hover |

---

## 🧹 Key Bug Fixes & Refinements

### 1. YouTube Creator Page Openings
* **Problem**: YouTube creators such as **Vlad and Niki** and **Kids Diana Show** did not have a `"username"` key defined in their source search data (`youtube.json`), causing the application to redirect to `/profile/undefined` and fail to load.
* **Resolution**: Updated `extractProfiles` in `src/utils/dataHelpers.ts` to automatically map fallback identifiers (`.handle`, `.custom_name`, or `.user_id`) to the `username` property if the primary field is missing. All creators now map to unique valid paths.

### 2. Broken Image Fallbacks
* **Problem**: YouTube profile avatars (`yt3.googleusercontent.com` / `yt3.ggpht.com`) block requests with `403 Forbidden` after expiry, displaying broken icons in the browser.
* **Resolution**: Created a reusable `<Avatar />` component in `src/components/Avatar.tsx` that catches `onError` events and dynamically generates monogram initials (e.g., `MR` for MrBeast, `VN` for Vlad and Niki). It styled using the editorial theme's warm-beige (`#F5F0E8`) background and gold (`#8B6914`) text. Integrated across all screens.

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
├── components/
│   ├── Avatar.tsx          # Memoized premium initials fallback avatar
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
│   ├── profileLoader.ts    # Dynamic profile JSON loader with fallback and cache
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

## 🧹 Code Quality & Refactoring

- **Extracted Reusable Components**: `StatCard`, `MarqueeCard`, and `<Avatar />` pulled out of monolithic pages into single-responsibility, memoized files.
- **Dynamic Profile Caching**: Added client-side lookup `Map` cache to `profileLoader.ts` to skip redundant filesystem imports when visiting profiles repeatedly.
- **Zustand Persistence**: Persistent drawer state saved to LocalStorage using Zustand persist middleware.

---

## 🛠️ Assumptions & Trade-Offs

### Assumptions
- **Static Dataset**: Only 6 of 30 profiles have detailed JSON files. The app gracefully falls back to basic search index data for profiles without dedicated files.
- **Referrer Blocks**: Assumed avatar image URLs can fail unexpectedly at any time due to expiration and hotlinking limits, mandating visual fallback states.

### Trade-Offs
- **Client-Side Search**: Search and filtering occur in-memory. A real-world application with millions of profiles would query an Elasticsearch/Database endpoint.
- **GSAP over Framer Motion**: GSAP was selected for complex ScrollTrigger pins and horizontal coordinate scrolling, ensuring a high-performance visual polish.

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
