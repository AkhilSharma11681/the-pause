# Design Document — Navbar Navigation Redesign

## Overview

This feature replaces the current flat four-link navbar with a structured navigation system: two dropdown menus ("About Us" and "Services"), four standalone links, and a prominent "Book Now" CTA. The existing scroll-driven pill animation and mobile hamburger menu are preserved. All changes are contained within `src/components/Navbar.tsx`.

## Architecture

The change is self-contained in `src/components/Navbar.tsx`. No new routes, API calls, or files are required. The component gains dropdown state management and a richer link data structure.

```
Navbar.tsx
  ├── NAV_ITEMS config array     — defines top-level links and dropdown children
  ├── activeDropdown state       — tracks which dropdown (if any) is open
  ├── mobileOpenSection state    — tracks which accordion is expanded in mobile menu
  ├── DropdownMenu component     — renders desktop hover dropdown panel
  ├── MobileAccordion component  — renders expandable section in mobile overlay
  └── existing scroll/pill logic — unchanged
```

## Components and Interfaces

### Nav Item Config

```ts
type NavChild = { label: string; href: string }

type NavItem =
  | { kind: 'link';     label: string; href: string }
  | { kind: 'dropdown'; label: string; children: NavChild[] }
```

```ts
const NAV_ITEMS: NavItem[] = [
  {
    kind: 'dropdown',
    label: 'About Us',
    children: [
      { label: 'Idea Behind The Pause', href: '#about' },
      { label: 'Our Space',             href: '#our-space' },
      { label: 'Meet the Team',         href: '#therapists' },
      { label: 'How It Works',          href: '#how-it-works' },
    ],
  },
  {
    kind: 'dropdown',
    label: 'Services',
    children: [
      { label: 'Individual Therapy',  href: '#individual' },
      { label: 'Couples & Family',    href: '#couples' },
      { label: 'Teen & Child Care',   href: '#teen' },
      { label: 'Workshops',           href: '#workshops' },
      { label: 'Communities',         href: '#communities' },
    ],
  },
  { kind: 'link', label: 'Pricing',          href: '#pricing' },
  { kind: 'link', label: 'Upcoming Events',  href: '#events' },
  { kind: 'link', label: 'FAQ',              href: '#faq' },
  { kind: 'link', label: 'Client Stories',   href: '#testimonials' },
]
```

### `DropdownMenu` (desktop)

- Rendered inside a `relative` wrapper on the nav item.
- Appears on `mouseenter`, disappears on `mouseleave` with a 150 ms delay (via `setTimeout` ref).
- Animated with Framer Motion: `opacity` 0→1, `y` -8→0, duration 180 ms ease-out.
- Styled as a white card with subtle shadow, `rounded-2xl`, `min-w-[220px]`.

### `MobileAccordion`

- Rendered inside the full-screen mobile overlay.
- Toggled by tapping the parent label.
- Animated with Framer Motion `AnimatePresence` + height animation.
- Only one accordion open at a time (controlled by `mobileOpenSection` state).

### State

```ts
const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null)
const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
```

`activeDropdown` holds the `label` of the currently open desktop dropdown, or `null`. Opening a new dropdown automatically closes the previous one (single source of truth).

## Data Models

No backend data. All navigation structure is static config defined in the component file.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Only one dropdown active at a time

*For any* sequence of `setActiveDropdown` calls with distinct dropdown labels, the resulting `activeDropdown` state SHALL equal only the most recently set label — never two labels simultaneously.

**Validates: Requirements 6.1, 6.2**

---

### Property 2: Dropdown close on outside interaction

*For any* state where `activeDropdown` is non-null, calling `setActiveDropdown(null)` SHALL result in `activeDropdown` being null (no dropdown open).

**Validates: Requirements 6.3**

---

### Property 3: Mobile accordion mutual exclusion

*For any* sequence of accordion toggle operations in the mobile menu, at most one accordion SHALL be in the open state at any point in time.

**Validates: Requirements 5.3**

---

### Property 4: All nav items rendered

*For any* render of the desktop Navbar, the rendered output SHALL contain exactly one element for each entry in `NAV_ITEMS` (two dropdown triggers + four standalone links).

**Validates: Requirements 1.1, 2.1, 3.1**

---

### Property 5: Dropdown children completeness

*For any* dropdown item in `NAV_ITEMS`, when that dropdown is set as active, the rendered dropdown panel SHALL contain exactly the same number of child links as defined in the config, with matching labels.

**Validates: Requirements 1.1, 2.1**

---

### Property 6: Book Now always present

*For any* render state (scrolled or not, dropdown open or not, mobile menu open or not), the rendered output SHALL contain exactly one "Book Now" element.

**Validates: Requirements 4.1, 4.3**

---

### Property 7: Child link click closes dropdown

*For any* open dropdown (desktop or mobile accordion), clicking any child link within that dropdown SHALL result in `activeDropdown` (or `mobileOpenSection`) being set to null.

**Validates: Requirements 1.3, 2.3, 5.4**

## Error Handling

- If a `href` value is an anchor (`#...`) and the target element does not exist on the current page, `scrollIntoView` will silently no-op — no error thrown.
- The `closeTimer` ref must be cleared on component unmount to prevent state updates on an unmounted component.
- On SSR, `window` is undefined; the existing guard in the scroll handler already covers this.

## Testing Strategy

### Property-Based Testing

Library: **fast-check** (`npm install --save-dev fast-check`). Each property-based test runs a minimum of 100 iterations.

Every property-based test MUST be tagged with:
`// **Feature: navbar-navigation-redesign, Property {N}: {property_text}**`

| Test   | Property                              | Requirement       |
|--------|---------------------------------------|-------------------|
| PBT-1  | Only one dropdown active at a time    | 6.1, 6.2          |
| PBT-2  | Dropdown close on outside interaction | 6.3               |
| PBT-3  | Mobile accordion mutual exclusion     | 5.3               |
| PBT-4  | All nav items rendered                | 1.1, 2.1, 3.1     |
| PBT-5  | Dropdown children completeness        | 1.1, 2.1          |
| PBT-6  | Book Now always present               | 4.1, 4.3          |
| PBT-7  | Child link click closes dropdown      | 1.3, 2.3, 5.4     |

The pure state-transition logic (`activeDropdown`, `mobileOpenSection`) will be extracted into testable reducer functions so tests run without a DOM.

### Unit Tests

- Renders all top-level nav labels on desktop.
- "About Us" dropdown shows correct 4 children on hover.
- "Services" dropdown shows correct 5 children on hover.
- Opening Services while About Us is open closes About Us.
- Mobile menu renders all items including accordion parents.
- Tapping a mobile accordion item closes the menu and navigates.
- Book Now button is present in both desktop and mobile views.
