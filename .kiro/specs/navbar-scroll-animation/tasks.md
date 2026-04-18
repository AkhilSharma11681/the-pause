# Implementation Plan

- [x] 1. Extract scroll progress utility and update Navbar state
  - Create a pure `getScrollProgress(scrollY: number, threshold: number): number` function that returns a clamped 0–1 value
  - Replace the existing `scrolled` boolean with a `useMotionValue(0)` and update it on scroll events using the utility function
  - Keep the existing scroll listener pattern in `useEffect`
  - _Requirements: 2.1, 3.1_

- [ ]* 1.1 Write property tests for getScrollProgress
  - **Property 1: Wide state at scroll top** — for any scrollY = 0, result must be 0
  - **Property 2: Pill state when scrolled past threshold** — for any scrollY ≥ threshold, result must be 1
  - **Property 3: Scroll round-trip restores wide state** — progress(0) === progress after going up from >threshold
  - **Property 4: Scroll logic is viewport-width independent** — threshold logic unchanged for any viewport width
  - Use fast-check with ≥ 100 iterations per property
  - Tag each test: `// **Feature: navbar-scroll-animation, Property N: ...**`
  - _Requirements: 1.1–1.3, 2.1–2.4, 3.1, 4.1_

- [x] 2. Wire Framer Motion interpolations to the motion.nav element
  - Use `useTransform` to derive `animatedMaxWidth`, `animatedBorderRadius`, `animatedBackground`, `animatedBoxShadow` from the scroll progress MotionValue
  - Apply these as inline `style` props on `motion.nav`, replacing the current `className` conditional
  - Wide state values: maxWidth `calc(100vw - 32px)`, borderRadius `16px`, background `rgba(255,255,255,0)`, boxShadow `none`
  - Pill state values: maxWidth `672px`, borderRadius `9999px`, background `rgba(255,255,255,0.8)`, boxShadow existing pill shadow string
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Handle SSR and mobile edge cases
  - Guard the scroll listener with `typeof window !== 'undefined'` to avoid SSR errors
  - Ensure the wide-state `maxWidth` is capped at `100vw` so no horizontal overflow occurs on any viewport
  - _Requirements: 4.1, 4.2_

- [x] 4. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [ ]* 5. Write unit tests for Navbar scroll states
  - Snapshot: navbar in wide state at mount (scrollY = 0)
  - Snapshot: navbar in pill state after scroll past threshold (scrollY = 100)
  - Edge case: scrollY exactly at threshold produces progress = 1
  - Edge case: scrollY between 0 and threshold produces intermediate 0–1 progress
  - _Requirements: 1.1, 2.1, 3.1_
