# Design Document — The Pause (Complete Production Build)

## Overview

This document covers the full production upgrade of The Pause website. The existing codebase has a strong visual foundation — the design system, color palette (`#4a7c59` green, `#faf7f2` cream, `#1a1a1a` dark), typography (Playfair Display + DM Sans), and component structure are all preserved. The work here is about making the site **functional**, **fast**, and **complete**.

Key goals:
- Wire up the booking form to a real API with validation and confirmation
- Add date/time slot selection to the booking flow
- Enable therapist pre-selection from therapist cards
- Integrate the existing FAQ component into the page
- Fix navbar, WhatsApp, SEO, performance, and crisis line
- Use 21st.dev component patterns where applicable (minimal, composable)
- Keep bundle size lean — no new heavy dependencies

---

## Architecture

```
the-pause/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Main landing page (SSR)
│   │   ├── layout.tsx                # Root layout with next/font
│   │   ├── globals.css
│   │   ├── robots.txt                # SEO
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── api/
│   │       └── bookings/
│   │           └── route.ts          # POST /api/bookings
│   ├── components/
│   │   ├── Navbar.tsx                # + FAQ link
│   │   ├── Hero.tsx                  # unchanged
│   │   ├── TrustBar.tsx              # unchanged
│   │   ├── TrustBadges.tsx           # unchanged
│   │   ├── HowItWorks.tsx            # unchanged
│   │   ├── Therapists.tsx            # + pre-selection link
│   │   ├── Conditions.tsx            # unchanged
│   │   ├── MythBusters.tsx           # unchanged
│   │   ├── Pricing.tsx               # unchanged
│   │   ├── Testimonials.tsx          # unchanged
│   │   ├── FAQ.tsx                   # integrated into page
│   │   ├── BookingSection.tsx        # full rewrite — slots, validation, API
│   │   ├── CrisisBanner.tsx          # new — iCall sticky bar
│   │   ├── CTA.tsx                   # unchanged
│   │   ├── Footer.tsx                # + address, hours, real number
│   │   └── WhatsApp.tsx              # unchanged (number already correct)
│   └── lib/
│       └── booking.ts                # Booking types and helpers
```

The app remains a **single-page Next.js site** with anchor-based navigation. No routing changes needed for the MVP. Subdomains can be added later via Next.js middleware rewrites.

---

## Components and Interfaces

### BookingSection (full rewrite)

The booking form becomes a 4-step flow:

```
Step 1: Session type (Online / In-Person)  [existing]
Step 2: Therapist selection (pre-selectable from cards)  [new]
Step 3: Date + time slot picker  [new]
Step 4: Personal details + concern  [was step 2+3, merged]
→ Confirmation state  [new]
```

The therapist selection step shows all 4 therapists as compact cards. If a therapist was pre-selected via URL param or state, that card is pre-highlighted and the patient can change it.

The date picker is a minimal inline calendar (no external library — built with native Date API + Tailwind). It shows a 2-week rolling window. Time slots are rendered as a grid of pill buttons.

### Therapists (minor update)

Each therapist card's "Schedule Session" button passes the therapist index/name via a URL hash or React context so BookingSection can pre-select it.

### CrisisBanner (new)

A slim fixed bar at the bottom of the viewport on mobile, and a highlighted block in the footer on desktop. Contains iCall number as a `tel:` link.

### API Route — `/api/bookings`

```typescript
// POST /api/bookings
// Body: BookingPayload
// Returns: { success: true, referenceId: string } | { error: string }
```

Uses a simple in-memory log for MVP (no database required). Reference ID is generated as `PAUSE-{timestamp}-{random4}`.

---

## Data Models

```typescript
// src/lib/booking.ts

export interface BookingPayload {
  name: string           // required, non-empty
  email: string          // required, valid email format
  phone: string          // required, 10 digits
  sessionType: 'online' | 'offline'
  therapistId: string | 'auto'   // therapist name or 'auto' for best match
  date: string           // ISO date string YYYY-MM-DD
  time: string           // HH:MM 24h format
  concern: string        // selected from dropdown
  message?: string       // optional free text
}

export interface BookingResponse {
  success: boolean
  referenceId?: string
  error?: string
}

export interface TimeSlot {
  time: string           // HH:MM
  available: boolean
}

export interface TherapistOption {
  id: string
  name: string
  role: string
  speciality: string
  initial: string
  color: string
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Prework Analysis

Before writing properties, each acceptance criterion is analyzed for testability.

**1.1** Form submits to `/api/bookings` on complete
Thoughts: This is a UI interaction that triggers a network call. We can test this by mocking fetch and verifying it was called with the right payload after form completion.
Testable: yes - example

**1.2** Confirmation state shown on success
Thoughts: Given a mocked successful API response, the UI should render a confirmation. Testable as an example.
Testable: yes - example

**1.3** Error state shown on failure
Thoughts: Given a mocked failed API response, the UI should render an error. Testable as an example.
Testable: yes - example

**1.4** Step 2 blocked if name/email/phone empty
Thoughts: This applies to all combinations of empty fields — a property over the space of incomplete form states.
Testable: yes - property

**1.5** Email validation
Thoughts: This is a property over all strings — valid emails pass, invalid ones fail.
Testable: yes - property

**1.6** Phone validation (10 digits)
Thoughts: Property over all strings — exactly 10 digit strings pass, others fail.
Testable: yes - property

**2.1** Date picker shows next 14 days
Thoughts: For any "today", the picker should show exactly 14 future dates. Property over dates.
Testable: yes - property

**2.2** Time slots differ by session type
Thoughts: Online slots (08:00–21:00) vs in-person (09:00–19:00). For any session type, the slot range should match. Property.
Testable: yes - property

**2.3** Booked slots are disabled
Thoughts: Example — given a known booked slot, it should appear disabled.
Testable: yes - example

**2.5** Sundays disabled for in-person
Thoughts: For any Sunday date, in-person booking should reject it. Property over all Sundays.
Testable: yes - property

**3.1** Therapist pre-selection from card
Thoughts: UI interaction — clicking a card should set state. Example test.
Testable: yes - example

**3.3** Default "best fit" when no therapist selected
Thoughts: When therapistId is 'auto', the form should show the default option. Example.
Testable: yes - example

**10.1** API returns 200 + referenceId for valid payload
Thoughts: For any valid BookingPayload, the API should return success. Property over valid payloads.
Testable: yes - property

**10.2** API returns 400 for missing fields
Thoughts: For any payload missing a required field, the API should return 400. Property over invalid payloads.
Testable: yes - property

**10.3** Reference ID format
Thoughts: For any booking, the referenceId should match `PAUSE-{digits}-{4chars}`. Property.
Testable: yes - property

### Property Reflection

After reviewing all testable items:

- Properties 1.5 and 1.6 are both input validation properties — they can be tested with the same validation utility, but they test different fields so both are kept.
- Properties 10.1 and 10.2 are complementary (valid vs invalid inputs) — both kept.
- Properties 2.1 and 2.2 are independent (date count vs time range) — both kept.
- Property 2.5 (Sundays) is a specific case of slot availability — kept as a named edge case property.

No redundancies found. All properties provide unique validation value.

---

### Correctness Properties

**Property 1: Form validation blocks progression on empty required fields**
*For any* combination of empty name, email, or phone fields in step 3 of the booking form, the system should prevent navigation to the next step and the submit button should remain disabled or trigger validation errors.
**Validates: Requirements 1.4**

---

**Property 2: Email validation rejects malformed addresses**
*For any* string that does not match the pattern `[chars]@[chars].[chars]`, the email validation function should return false; for any string that does match, it should return true.
**Validates: Requirements 1.5**

---

**Property 3: Phone validation accepts only 10-digit strings**
*For any* string, the phone validation function should return true if and only if the string contains exactly 10 numeric digits (ignoring leading +91 prefix if present).
**Validates: Requirements 1.6**

---

**Property 4: Date picker always shows exactly 14 future dates**
*For any* value of "today", the date picker should generate exactly 14 selectable dates starting from tomorrow, with no past dates included.
**Validates: Requirements 2.1**

---

**Property 5: Time slot ranges match session type**
*For any* session type, the generated time slots should fall within the correct range — online sessions produce slots from 08:00 to 21:00, in-person sessions produce slots from 09:00 to 19:00, and no slot outside the respective range should appear.
**Validates: Requirements 2.2**

---

**Property 6: Sundays are always disabled for in-person sessions**
*For any* date that falls on a Sunday, the slot generation function for in-person sessions should mark that date as unavailable.
**Validates: Requirements 2.5**

---

**Property 7: API accepts any valid BookingPayload and returns a reference ID**
*For any* BookingPayload where all required fields are present and correctly formatted, the `/api/bookings` endpoint should return HTTP 200 with a `referenceId` field that is a non-empty string.
**Validates: Requirements 10.1**

---

**Property 8: API rejects any payload with missing required fields**
*For any* BookingPayload where one or more required fields (name, email, phone, sessionType, date, time, concern) are absent or empty, the `/api/bookings` endpoint should return HTTP 400 with an `error` field.
**Validates: Requirements 10.2**

---

**Property 9: Reference IDs always match the expected format**
*For any* successful booking submission, the returned `referenceId` should match the pattern `PAUSE-[0-9]+-[A-Z0-9]{4}`.
**Validates: Requirements 10.3**

---

## Error Handling

| Scenario | Handling |
|---|---|
| API POST fails (network) | Inline error in booking form, retry button, form data preserved |
| API returns 400 | Show field-level error from response body |
| Invalid date selected | Date picker prevents selection, no error needed |
| Sunday in-person | Date disabled in picker, tooltip "Clinic closed Sundays" |
| Empty required field | Red border + helper text below field |
| Invalid email | "Please enter a valid email" below field |
| Invalid phone | "Please enter a 10-digit number" below field |

---

## Testing Strategy

### Unit Tests (Vitest)

- `validateEmail(str)` — specific valid and invalid examples
- `validatePhone(str)` — 10-digit, 9-digit, with +91 prefix
- `generateSlots(sessionType, date)` — correct range, Sunday exclusion
- `generateDateRange(today, 14)` — correct count, no past dates
- `generateReferenceId()` — format check
- API route handler — mock request/response objects

### Property-Based Tests (fast-check)

The project uses **fast-check** as the property-based testing library (lightweight, TypeScript-native, no extra runtime deps).

Each property-based test runs a minimum of **100 iterations**.

Each test is tagged with the format: `**Feature: the-pause-complete, Property {N}: {text}**`

```
Property 1 → BookingSection validation
Property 2 → validateEmail
Property 3 → validatePhone
Property 4 → generateDateRange
Property 5 → generateSlots (time range)
Property 6 → generateSlots (Sunday exclusion)
Property 7 → POST /api/bookings (valid payload)
Property 8 → POST /api/bookings (invalid payload)
Property 9 → generateReferenceId format
```

Unit tests cover specific examples and edge cases. Property tests verify universal correctness across all inputs. Both are required — they complement each other.
