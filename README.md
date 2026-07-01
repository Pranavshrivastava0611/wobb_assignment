# Wobb Frontend Assignment — Influencer Search Application

A modern, high-performance influencer search and discovery dashboard built with React, TypeScript, Vite, and Tailwind CSS. 

This repository was submitted as part of the Wobb Frontend Assignment. It transforms the original starter template into a fully polished, production-ready interface with robust state management, micro-animations, and complete functionality.

## ✨ What's New & Changed

### 1. Complete UI/UX Redesign
- Replaced the basic layout with a sleek, modern **Dark Theme** utilizing glassmorphism and gradient accents.
- Implemented responsive grid layouts for profile cards and detail pages to ensure flawless rendering on mobile devices.
- Integrated `framer-motion` for smooth micro-animations, page transitions, and an interactive slide-out Drawer.
- Improved typography utilizing the `Inter` font family and clear visual hierarchy.

### 2. Robust State Management (Zustand)
- Replaced the legacy React Context API with **Zustand** for lightweight, predictable state management.
- Implemented the `persist` middleware to save the user's selected "My List" to LocalStorage.
- Ensure state persistence across page refreshes and seamless updates across different components without unnecessary prop drilling.

### 3. "Add to List" Feature
- Built the fully functional "Add to List" feature.
- Users can add/remove profiles from anywhere in the application (Dashboard or Profile Details).
- A centralized `ListDrawer` component acts as the "My List" hub. It uses `createPortal` to overlay the entire UI properly and allows users to manage their selected influencers effortlessly.
- Strict deduplication ensures profiles cannot be added twice.

### 4. Critical Bug Fixes & Resiliency
- **Data Formatting:** Fixed broken engagement rate logic and formatting issues across multiple files.
- **Search Resiliency:** Implemented a custom `useDebounce` hook to prevent rapid re-renders during search. Search is now fully case-insensitive.
- **Data Fallbacks:** Fixed an issue where clicking on 80% of the profiles resulted in a crash due to missing detailed JSON files. The app now gracefully falls back to displaying basic profile data from the search indices when a dedicated JSON file doesn't exist.

### 5. Code Quality & Performance
- Removed unused dependencies (e.g. `react-beautiful-dnd`) and consolidated utility functions.
- Used `React.memo`, `useMemo`, and debouncing to optimize rendering loops.
- Enforced strict TypeScript typing across all API payloads and internal state definitions.

---

## 📦 Libraries Added
- `zustand`: Used for global state management and LocalStorage persistence. Chosen for its zero-boilerplate API and excellent TypeScript support.
- `framer-motion`: Used for smooth layout transitions and the animated slide-out Drawer.
- `lucide-react`: Replaced emoji icons with professional, consistent SVG iconography.

---

## 🛠️ Assumptions & Trade-Offs

### Assumptions Made:
- **Data Completeness:** The starter project only provided 6 detailed JSON files for 30 total profiles. I assumed that rather than throwing an error for the missing 24 profiles, the application should intelligently merge and display whatever basic data is available from the search index. 
- **Persistence:** I assumed that "persistent after page refresh" meant client-side persistence (LocalStorage) rather than setting up a mock backend.

### Trade-Offs:
- **Client-Side Filtering vs API:** Since the data is static JSON, all search filtering is executed client-side. In a real-world scenario with millions of influencers, this would be shifted to a debounced backend API call. 
- **Tailwind v4 vs Legacy:** The project appears to be initialized with modern Tailwind CSS. I opted to use pure Tailwind classes (with custom theme variables) rather than bringing in complex UI component libraries (like shadcn/ui or MUI) to keep the bundle size small and demonstrate core CSS proficiency.

---

## 🚀 Future Improvements
Given more time, the following enhancements could be made:
1. **Virtualization:** For very large search results, implementing `react-window` or `@tanstack/react-virtual` to optimize DOM nodes.
2. **E2E Testing:** Adding Cypress or Playwright tests to verify the critical path (Search -> Click Profile -> Add to List -> Check Persistence).
3. **Advanced Filtering:** Allowing users to filter by Engagement Rate, Follower Count ranges, or specific demographic criteria.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Wobb-ai/vibe-coder-assignment

# Install dependencies
npm install

# Start the development server
npm run dev

# Create an optimized production build
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.
