# Requirements Document

## Introduction

The Navbar currently renders as a fixed-width pill at the top of the page. This feature adds a scroll-driven width animation: on page load the navbar spans the full viewport width, and as the user scrolls down it smoothly contracts to the current compact pill size. Scrolling back to the top expands it back to full width. The transition must feel fluid and natural.

## Glossary

- **Navbar**: The top navigation bar rendered by `src/components/Navbar.tsx`.
- **Pill state**: The compact, rounded-full, max-w-2xl centered bar shown after scrolling.
- **Wide state**: The full-width (or near-full-width) bar shown at the top of the page before scrolling.
- **Scroll threshold**: The number of pixels scrolled at which the transition from wide to pill is considered complete.
- **Framer Motion**: The animation library already used in the project (`framer-motion`).

## Requirements

### Requirement 1

**User Story:** As a visitor, I want the navbar to start wide when I first open the website, so that it feels immersive and visually distinct on the landing view.

#### Acceptance Criteria

1. WHEN the page loads with `scrollY === 0`, THE Navbar SHALL render at full viewport width (or near-full with minimal horizontal padding).
2. WHEN the page is at `scrollY === 0`, THE Navbar SHALL display without the pill's rounded-full border-radius, appearing as a flat or lightly rounded bar.
3. WHEN the page is at `scrollY === 0`, THE Navbar SHALL use a transparent or near-transparent background with no heavy shadow.

### Requirement 2

**User Story:** As a visitor, I want the navbar to smoothly shrink into a pill as I scroll down, so that the transition feels polished and intentional.

#### Acceptance Criteria

1. WHEN the user scrolls past the scroll threshold (40 px), THE Navbar SHALL animate its width from full-viewport to `max-w-2xl` using a smooth easing curve.
2. WHEN the navbar contracts, THE Navbar SHALL simultaneously animate border-radius from a low value to `9999px` (fully rounded pill).
3. WHEN the navbar contracts, THE Navbar SHALL animate the background from transparent to the frosted-glass white used in the current pill state.
4. WHEN the navbar contracts, THE Navbar SHALL animate padding/margin so the pill appears centered with appropriate top spacing.
5. WHEN the scroll-driven animation runs, THE Navbar SHALL complete the transition within 500 ms using a spring or ease-out curve so it feels natural, not mechanical.

### Requirement 3

**User Story:** As a visitor, I want the navbar to expand back to full width when I scroll back to the top, so that the experience is consistent in both directions.

#### Acceptance Criteria

1. WHEN the user scrolls back to `scrollY < 40`, THE Navbar SHALL animate back to the wide state, reversing all properties (width, border-radius, background, shadow).
2. WHEN reversing the animation, THE Navbar SHALL use the same easing and duration as the forward transition so the motion feels symmetric.

### Requirement 4

**User Story:** As a visitor on any device, I want the animation to work correctly on both desktop and mobile, so that the experience is consistent.

#### Acceptance Criteria

1. WHILE the viewport width is below 640 px, THE Navbar SHALL still perform the wide-to-pill transition but MAY use a reduced wide-state padding to avoid overflow.
2. WHEN the animation runs, THE Navbar SHALL not cause horizontal scroll or layout shift on any viewport size.
