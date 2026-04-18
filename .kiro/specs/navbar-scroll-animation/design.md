# Design Document — Navbar Scroll Animation

## Overview

The Navbar currently renders as a static pill. This feature makes it scroll-aware: it starts wide (full viewport width) on page load and smoothly contracts into the existing pill shape as the user scrolls. Scrolling back to the top reverses the animation. All transitions are driven by Framer Motion, which is already installed in the project.

## Architecture

The change is entirely contained within `src/components/Navbar.tsx`. No new files, routes, or API changes are needed. The existing `scrolled` boolean state is extended with a scroll progress value so Framer Motion can interpolate between the two visual states.

```
Navbar.tsx
  ├── useScrollProgress()   — maps window.scrollY → 0..1 progress value
  ├── useMotionValue        — drives Framer Motion interpolations
  └── motion.nav            — animates maxWidth, borderRadius, background, shadow
```

## Components and Interfaces

### `useScrollProgress` (inline hook)

```ts
// Returns a MotionValue<number> in range [0, 1]
// 0 = top of page (wide state), 1 = scrolled past threshold (pill state)
const THRESHOLD = 40 // px
```

The hook listens to `window.scroll` and updates a `MotionValue` so Framer Motion can drive CSS interpolations without React re-renders on every frame.

### `motion.nav` animated properties

| Property | Wide state (progress = 0) | Pill state (progress = 1) |
|---|---|---|
| `maxWidth` | `100vw` (minus small padding) | `672px` (max-w-2xl) |
| `borderRadius` | `16px` | `9999px` |
| `background` | `rgba(255,255,255,0.0)` | `rgba(255,255,255,0.8)` |
| `boxShadow` | `none` | existing pill shadow |
| `paddingLeft/Right` | `24px` | `24px` (unchanged) |

Framer Motion's `useTransform` maps the `MotionValue` progress through these ranges, producing smooth interpolation on every scroll tick.

## Data Models

No new data models. The only state is:

```ts
const scrollProgress = useMotionValue(0) // 0..1
```

All visual values are derived from this single source of truth via `useTransform`.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Wide state at scroll top

*For any* render of the Navbar where `scrollY === 0`, the navbar's animated style values should reflect the wide state: `maxWidth` near viewport width, `borderRadius` low (≤ 16px), and background near-transparent.

**Validates: Requirements 1.1, 1.2, 1.3**

---

### Property 2: Pill state when scrolled past threshold

*For any* scroll position ≥ 40 px, the navbar's animated style values should reflect the pill state: `maxWidth` ≤ 672px, `borderRadius` = 9999px, and background opaque frosted-glass.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

---

### Property 3: Scroll round-trip restores wide state

*For any* scroll sequence that goes past the threshold and then returns to `scrollY < 40`, the navbar should return to the same wide-state style values as if the page had just loaded.

**Validates: Requirements 3.1**

---

### Property 4: Scroll logic is viewport-width independent

*For any* viewport width (including < 640 px), the transition from wide to pill state MUST be triggered by the same scroll threshold (40 px), and the resulting pill `maxWidth` MUST not exceed the viewport width.

**Validates: Requirements 4.1, 4.2**

## Error Handling

- If `window` is undefined (SSR), the scroll listener must not be attached. The navbar should default to the wide state (progress = 0) on the server.
- If `framer-motion` `useMotionValue` / `useTransform` are unavailable, fall back to the existing `scrolled` boolean approach.

## Testing Strategy

### Property-Based Testing

Library: **fast-check** (already common in TypeScript projects; install with `npm install --save-dev fast-check`).

Each property-based test runs a minimum of 100 iterations with randomly generated inputs.

Every property-based test MUST be tagged with:
`// **Feature: navbar-scroll-animation, Property {N}: {property_text}**`

#### Properties to implement

| Test | Property | Requirement |
|---|---|---|
| PBT-1 | Wide state at scroll top | 1.1–1.3 |
| PBT-2 | Pill state when scrolled past threshold | 2.1–2.4 |
| PBT-3 | Scroll round-trip restores wide state | 3.1 |
| PBT-4 | Scroll logic is viewport-width independent | 4.1–4.2 |

The tests will exercise the pure `getScrollProgress(scrollY, threshold)` utility function extracted from the hook, making them fast and deterministic.

### Unit Tests

- Snapshot test: navbar renders in wide state at mount (scrollY = 0).
- Snapshot test: navbar renders in pill state after scroll event (scrollY = 100).
- Edge case: scrollY exactly at threshold (40) produces progress = 1.
- Edge case: scrollY between 0 and threshold produces intermediate progress.
