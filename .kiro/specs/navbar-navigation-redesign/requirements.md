# Requirements Document

## Introduction

The Navbar currently displays a flat list of four links (How it works, Therapists, Pricing, FAQ). This feature replaces those links with a structured navigation system featuring two dropdown menus ("About Us" and "Services"), plus standalone links for Pricing, Upcoming Events, FAQ, and Client Stories, and a prominent "Book Now" CTA button. The redesign must preserve the existing scroll-driven pill animation and mobile menu behavior.

## Glossary

- **Navbar**: The top navigation bar rendered by `src/components/Navbar.tsx`.
- **Dropdown**: A panel that appears below a nav item on hover (desktop) or tap (mobile), revealing child links.
- **CTA Button**: The "Book Now" call-to-action button, styled in green (`#4a7c59`), always visible.
- **About Us Dropdown**: A dropdown containing links to Idea Behind The Pause, Our Space, Meet the Team, and How It Works.
- **Services Dropdown**: A dropdown containing links to Individual Therapy, Couples & Family, Teen & Child Care, Workshops, and Communities.
- **Active Dropdown**: The dropdown currently open and visible to the user.
- **Scroll Threshold**: 50 px of vertical scroll, after which the navbar transitions to pill state (existing behavior).
- **Framer Motion**: The animation library used in the project for transitions.
- **Mobile Menu**: The full-screen overlay menu triggered by the hamburger button on viewports below `lg` (1024 px).

## Requirements

### Requirement 1

**User Story:** As a visitor, I want an "About Us" dropdown in the navbar, so that I can quickly navigate to pages that explain the clinic's story, space, team, and process.

#### Acceptance Criteria

1. WHEN a visitor hovers over the "About Us" nav item on desktop, THE Navbar SHALL display a dropdown panel containing links: "Idea Behind The Pause", "Our Space", "Meet the Team", and "How It Works".
2. WHEN a visitor clicks the "About Us" nav item on mobile, THE Navbar SHALL expand an accordion section containing the same four child links.
3. WHEN a visitor clicks any child link inside the "About Us" dropdown, THE Navbar SHALL close the dropdown and navigate to the corresponding anchor or page.
4. WHEN a visitor moves the cursor away from the "About Us" dropdown on desktop, THE Navbar SHALL close the dropdown within 150 ms.

### Requirement 2

**User Story:** As a visitor, I want a "Services" dropdown in the navbar, so that I can explore the different therapy offerings available.

#### Acceptance Criteria

1. WHEN a visitor hovers over the "Services" nav item on desktop, THE Navbar SHALL display a dropdown panel containing links: "Individual Therapy", "Couples & Family", "Teen & Child Care", "Workshops", and "Communities".
2. WHEN a visitor clicks the "Services" nav item on mobile, THE Navbar SHALL expand an accordion section containing the same five child links.
3. WHEN a visitor clicks any child link inside the "Services" dropdown, THE Navbar SHALL close the dropdown and navigate to the corresponding anchor or page.
4. WHEN a visitor moves the cursor away from the "Services" dropdown on desktop, THE Navbar SHALL close the dropdown within 150 ms.

### Requirement 3

**User Story:** As a visitor, I want standalone navigation links for Pricing, Upcoming Events, FAQ, and Client Stories, so that I can reach those sections directly without opening a dropdown.

#### Acceptance Criteria

1. THE Navbar SHALL render standalone links for "Pricing", "Upcoming Events", "FAQ", and "Client Stories" at the top level of the desktop navigation.
2. WHEN a visitor clicks any standalone link, THE Navbar SHALL navigate to the corresponding anchor or page.
3. WHILE any dropdown is open, THE Navbar SHALL keep standalone links visible and interactive.

### Requirement 4

**User Story:** As a visitor, I want the "Book Now" button to remain prominent and always visible, so that I can start the booking process at any point.

#### Acceptance Criteria

1. THE Navbar SHALL render a "Book Now" button styled with a green background (`#4a7c59`) and white text at all times on both desktop and mobile.
2. WHEN a visitor clicks the "Book Now" button, THE Navbar SHALL navigate to the `#book` anchor section.
3. WHILE the mobile menu is open, THE Navbar SHALL display the "Book Now" button at the bottom of the mobile menu overlay.

### Requirement 5

**User Story:** As a visitor on mobile, I want the full navigation structure to be accessible through the mobile menu, so that I can reach all pages without a keyboard or mouse.

#### Acceptance Criteria

1. WHEN the mobile menu is open, THE Navbar SHALL display all top-level items: "About Us", "Services", "Pricing", "Upcoming Events", "FAQ", "Client Stories", and "My Portal".
2. WHEN a visitor taps "About Us" or "Services" in the mobile menu, THE Navbar SHALL toggle an accordion revealing the respective child links.
3. WHEN only one dropdown accordion is open in the mobile menu, THE Navbar SHALL collapse any previously open accordion.
4. WHEN a visitor taps any link in the mobile menu, THE Navbar SHALL close the mobile menu and navigate to the target.

### Requirement 6

**User Story:** As a visitor, I want only one dropdown to be open at a time on desktop, so that the navigation does not feel cluttered.

#### Acceptance Criteria

1. WHEN a visitor opens the "Services" dropdown while "About Us" is already open, THE Navbar SHALL close "About Us" and open "Services".
2. WHEN a visitor opens the "About Us" dropdown while "Services" is already open, THE Navbar SHALL close "Services" and open "About Us".
3. WHEN a visitor clicks outside any open dropdown on desktop, THE Navbar SHALL close the active dropdown.
