# Implementation Plan — The Pause (Complete Production Build)

- [ ] 1. Set up core utilities and types
  - Create `src/lib/booking.ts` with `BookingPayload`, `BookingResponse`, `TimeSlot`, `TherapistOption` interfaces
  - Implement `validateEmail(str: string): boolean` — regex-based email validation
  - Implement `validatePhone(str: string): boolean` — accepts 10-digit strings, strips +91 prefix
  - Implement `generateReferenceId(): string` — returns `PAUSE-{timestamp}-{4 random uppercase alphanumeric chars}`
  - Implement `generateDateRange(today: Date, days: number): Date[]` — returns array of `days` future dates starting tomorrow
  - Implement `generateSlots(sessionType: 'online' | 'offline', date: Date): TimeSlot[]` — online 08:00–21:00, in-person 09:00–19:00, Sundays return empty array for in-person
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.2, 2.5, 10.3_

- [ ]* 1.1 Write property test for validateEmail
  - **Feature: the-pause-complete, Property 2: Email validation rejects malformed addresses**
  - **Validates: Requirements 1.5**

- [ ]* 1.2 Write property test for validatePhone
  - **Feature: the-pause-complete, Property 3: Phone validation accepts only 10-digit strings**
  - **Validates: Requirements 1.6**

- [ ]* 1.3 Write property test for generateDateRange
  - **Feature: the-pause-complete, Property 4: Date picker always shows exactly 14 future dates**
  - **Validates: Requirements 2.1**

- [ ]* 1.4 Write property test for generateSlots time range
  - **Feature: the-pause-complete, Property 5: Time slot ranges match session type**
  - **Validates: Requirements 2.2**

- [ ]* 1.5 Write property test for generateSlots Sunday exclusion
  - **Feature: the-pause-complete, Property 6: Sundays are always disabled for in-person sessions**
  - **Validates: Requirements 2.5**

- [ ]* 1.6 Write property test for generateReferenceId format
  - **Feature: the-pause-complete, Property 9: Reference IDs always match the expected format**
  - **Validates: Requirements 10.3**

- [ ] 2. Implement `/api/bookings` route
  - Create `src/app/api/bookings/route.ts` as a Next.js App Router POST handler
  - Validate all required fields (name, email, phone, sessionType, date, time, concern) — return 400 with descriptive error if any are missing or malformed
  - Generate a `referenceId` using `generateReferenceId()`
  - Log each booking to console with timestamp and referenceId
  - Return `{ success: true, referenceId }` on success
  - _Requirements: 10.1, 10.2, 10.3_

- [ ]* 2.1 Write property test for API valid payload
  - **Feature: the-pause-complete, Property 7: API accepts any valid BookingPayload and returns a reference ID**
  - **Validates: Requirements 10.1**

- [ ]* 2.2 Write property test for API invalid payload
  - **Feature: the-pause-complete, Property 8: API rejects any payload with missing required fields**
  - **Validates: Requirements 10.2**

- [ ] 3. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Rewrite BookingSection with 4-step flow
  - Step 1: Session type selection (online / in-person) — existing UI preserved
  - Step 2: Therapist selection — compact cards for all 4 therapists + "Best match" default; accept pre-selected therapist via prop
  - Step 3: Date + time slot picker — inline 2-week calendar using `generateDateRange`, slot grid using `generateSlots`, disabled slots shown greyed out
  - Step 4: Personal details (name, email, phone) + concern dropdown + optional message — with inline validation using `validateEmail` and `validatePhone`
  - On submit: POST to `/api/bookings`, show loading state on button, handle success (confirmation state with name + referenceId) and error (inline error + retry)
  - Progress bar updated to 4 steps
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 3.2, 3.3_

- [ ]* 4.1 Write property test for form validation blocking progression
  - **Feature: the-pause-complete, Property 1: Form validation blocks progression on empty required fields**
  - **Validates: Requirements 1.4**

- [ ] 5. Update Therapists component for pre-selection
  - Change "Schedule Session" anchor tag to a button that sets a shared state or URL hash param with the therapist's id/name
  - Pass selected therapist down to BookingSection via a shared React state in `page.tsx` (lift state up)
  - When therapist is pre-selected, BookingSection step 2 shows that therapist highlighted
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 6. Integrate FAQ into page and update Navbar
  - Add `import FAQ from '@/components/FAQ'` to `page.tsx` and render it between `<Testimonials />` and `<BookingSection />`
  - Add `id="faq"` to the FAQ section wrapper
  - Add `{ href: '#faq', label: 'FAQ' }` to the `navLinks` array in `Navbar.tsx`
  - Add FAQ link to the mobile menu overlay in `Navbar.tsx`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2_

- [ ] 7. Add CrisisBanner component
  - Create `src/components/CrisisBanner.tsx` — a slim fixed bar at the bottom of the viewport on mobile (`md:hidden`) with iCall number as `tel:9152987821` link
  - On desktop, render as a highlighted block inside the Footer (already has a placeholder — replace it with the new component)
  - Import and render `<CrisisBanner />` in `page.tsx` (for mobile fixed bar)
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 8. Update Footer with real contact details
  - Replace `wa.me/91XXXXXXXXXX` with `wa.me/919152987821` in `Footer.tsx`
  - Add clinic address "Sector 15, Sonipat, Haryana" and hours "Mon–Sat · 09:00–19:00" to the Connect card in the footer
  - _Requirements: 6.1, 6.3_

- [ ] 9. SEO and font improvements
  - Replace Google Fonts `<link>` tags in `layout.tsx` with `next/font/google` — import `Playfair_Display` and `DM_Sans`, apply via `className` on `<body>`
  - Update `metadata` in `layout.tsx` to include `openGraph` fields: `title`, `description`, `images`
  - Create `src/app/robots.txt` (static file) with `Allow: /` and `Sitemap:` pointing to the domain
  - Create `src/app/sitemap.ts` returning a single entry for the root URL
  - _Requirements: 7.1, 7.2, 7.3, 8.4_

- [ ] 10. Performance — lazy loading below-the-fold sections
  - In `page.tsx`, wrap `Therapists`, `Conditions`, `MythBusters`, `Pricing`, `Testimonials`, `FAQ`, `BookingSection`, `CTA` with `next/dynamic` and `{ ssr: false }` where appropriate
  - Keep `Navbar`, `Hero`, `TrustBar`, `TrustBadges`, `HowItWorks` as static imports (above the fold)
  - _Requirements: 8.1, 8.3_

- [ ] 11. Final Checkpoint — Ensure all tests pass, ask the user if questions arise.
