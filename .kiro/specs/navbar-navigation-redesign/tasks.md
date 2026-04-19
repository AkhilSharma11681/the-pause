# Implementation Plan

- [x] 1. Define nav config and state types in Navbar.tsx
  - Replace the existing `links` array with the `NavItem` / `NavChild` types and `NAV_ITEMS` config array as specified in the design
  - Add `activeDropdown` (string | null) and `mobileOpenSection` (string | null) state variables
  - Add `closeTimer` ref for desktop dropdown close delay
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 2. Implement desktop dropdown rendering
  - [x] 2.1 Build the desktop nav link loop
    - Replace the static `links.map` with a loop over `NAV_ITEMS` that renders either a plain anchor or a dropdown trigger based on `item.kind`
    - _Requirements: 3.1_
  - [x] 2.2 Build the DropdownMenu panel
    - Render a Framer Motion animated panel (opacity + y) below the trigger when `activeDropdown === item.label`
    - Wire `onMouseEnter` / `onMouseLeave` with the 150 ms `closeTimer` ref
    - Opening a new dropdown must set `activeDropdown` to the new label (closes any previous one automatically)
    - _Requirements: 1.1, 1.4, 2.1, 2.4, 6.1, 6.2_
  - [ ]* 2.3 Write property test — Property 1: Only one dropdown active at a time
    - **Property 1: Only one dropdown active at a time**
    - **Validates: Requirements 6.1, 6.2**
  - [ ]* 2.4 Write property test — Property 2: Dropdown close on outside interaction
    - **Property 2: Dropdown close on outside interaction**
    - **Validates: Requirements 6.3**
  - [ ]* 2.5 Write property test — Property 5: Dropdown children completeness
    - **Property 5: Dropdown children completeness**
    - **Validates: Requirements 1.1, 2.1**
  - [ ]* 2.6 Write property test — Property 7: Child link click closes dropdown
    - **Property 7: Child link click closes dropdown**
    - **Validates: Requirements 1.3, 2.3**

- [x] 3. Implement outside-click close for desktop dropdowns
  - Add a `useEffect` that attaches a `mousedown` listener to `document`; when the click target is outside the nav, call `setActiveDropdown(null)`
  - Clean up the listener on unmount
  - _Requirements: 6.3_

- [x] 4. Implement standalone link rendering on desktop
  - Ensure `NavItem` entries with `kind: 'link'` render as plain anchors in the desktop nav row
  - Verify Pricing, Upcoming Events, FAQ, and Client Stories all appear
  - _Requirements: 3.1, 3.2_
  - [ ]* 4.1 Write property test — Property 4: All nav items rendered
    - **Property 4: All nav items rendered**
    - **Validates: Requirements 1.1, 2.1, 3.1**

- [ ] 5. Implement mobile menu accordion
  - [ ] 5.1 Update mobile menu overlay to loop over `NAV_ITEMS`
    - Render dropdown items as accordion parents (label + chevron) and plain items as direct links
    - _Requirements: 5.1_
  - [x] 5.2 Build accordion toggle logic
    - Tapping a dropdown parent toggles `mobileOpenSection`; if the tapped section is already open, close it; otherwise close the previous and open the new one
    - Animate child list with Framer Motion `AnimatePresence` + height
    - _Requirements: 5.2, 5.3_
  - [ ]* 5.3 Write property test — Property 3: Mobile accordion mutual exclusion
    - **Property 3: Mobile accordion mutual exclusion**
    - **Validates: Requirements 5.3**

- [x] 6. Ensure Book Now CTA is always present
  - Verify the "Book Now" button exists in both the desktop nav and the mobile menu overlay
  - No logic change needed if it already renders in both — just confirm placement after the nav restructure
  - _Requirements: 4.1, 4.2, 4.3_
  - [ ]* 6.1 Write property test — Property 6: Book Now always present
    - **Property 6: Book Now always present**
    - **Validates: Requirements 4.1, 4.3**

- [ ] 7. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 8. Wire close-on-navigate for all menu links
  - Update `handleNav` so that clicking any child link or standalone link in the mobile menu sets `open` to false, `mobileOpenSection` to null, and `activeDropdown` to null before navigating
  - _Requirements: 1.3, 2.3, 5.4_

- [ ] 9. Final Checkpoint — Ensure all tests pass, ask the user if questions arise.
