# Requirements Document

## Introduction

The Pause is a psychological care clinic offering both online and in-person therapy sessions. The website serves as the primary patient acquisition and booking platform. The goal is to make the site fully functional, production-ready, and conversion-optimized — with a working booking system, real-time slot selection, therapist pre-selection, form validation, confirmation states, a FAQ section, and a polished multi-page structure — all while preserving the existing brand identity (logo, color palette, typography).

The site will be deployed on a custom domain with potential for subdomains (e.g., `book.thepause.in`, `therapists.thepause.in`). Components should be sourced or inspired by 21st.dev design patterns where applicable, keeping bundle size minimal.

## Glossary

- **The Pause**: The psychological care clinic brand
- **Patient**: A person seeking therapy services
- **Therapist**: A certified psychologist or counsellor listed on the platform
- **Session**: A 50-minute therapy appointment (online or in-person)
- **Booking Flow**: The multi-step form patients use to request an appointment
- **Slot**: A specific date and time available for a session
- **RCI**: Rehabilitation Council of India — the licensing body for therapists
- **Online Session**: A video or chat-based therapy session conducted remotely
- **In-Person Session**: A session at the Sonipat clinic
- **Confirmation State**: The UI shown after a booking is successfully submitted
- **FAQ**: Frequently Asked Questions section addressing patient concerns
- **21st.dev**: A component library/design system used for UI patterns
- **CTA**: Call to Action — a button or link prompting the patient to book

---

## Requirements

### Requirement 1 — Functional Booking Form

**User Story:** As a patient, I want to complete a booking form that actually submits my appointment request, so that I can schedule a session without calling or emailing.

#### Acceptance Criteria

1. WHEN a patient completes all three steps of the booking form and clicks "Complete Booking", THE System SHALL submit the form data to the `/api/bookings` endpoint via POST request.
2. WHEN the booking submission succeeds, THE System SHALL display a confirmation state with the patient's name, selected session type, and a reference number.
3. WHEN the booking submission fails due to a network or server error, THE System SHALL display an inline error message and allow the patient to retry without losing their form data.
4. WHEN a patient attempts to proceed past step 2 with an empty name, email, or phone field, THE System SHALL prevent navigation and highlight the missing fields.
5. WHEN a patient enters an invalid email format, THE System SHALL display a validation error message below the email field before allowing progression.
6. WHEN a patient enters a phone number that is not 10 digits, THE System SHALL display a validation error below the phone field.

---

### Requirement 2 — Date and Time Slot Selection

**User Story:** As a patient, I want to choose a specific date and time for my session, so that I can plan my schedule around the appointment.

#### Acceptance Criteria

1. WHEN a patient reaches step 2 of the booking form, THE System SHALL display a date picker showing the next 14 available days.
2. WHEN a patient selects a date, THE System SHALL display available time slots for that date (09:00–19:00 for in-person, 08:00–21:00 for online).
3. WHEN a time slot is already booked, THE System SHALL display that slot as disabled and non-selectable.
4. WHEN a patient selects a valid date and time slot, THE System SHALL store the selection and display it in the confirmation state.
5. IF a patient selects an in-person session on a Sunday, THE System SHALL display a notice that the clinic is closed on Sundays and disable Sunday dates.

---

### Requirement 3 — Therapist Pre-Selection

**User Story:** As a patient, I want to choose a specific therapist when booking, so that I can work with someone whose speciality matches my needs.

#### Acceptance Criteria

1. WHEN a patient clicks "Schedule Session" on a therapist card, THE System SHALL navigate to the booking section with that therapist pre-selected.
2. WHEN a therapist is pre-selected in the booking form, THE System SHALL display the therapist's name and speciality in step 1 of the form.
3. WHEN no therapist is pre-selected, THE System SHALL display a "Match me with the best fit" default option in the therapist selection step.
4. WHEN a patient wants to change the pre-selected therapist, THE System SHALL allow deselection and show all available therapists.

---

### Requirement 4 — FAQ Section Integration

**User Story:** As a patient, I want to read answers to common questions before booking, so that I can feel confident and informed about the process.

#### Acceptance Criteria

1. THE System SHALL render the FAQ component on the main page between the Testimonials section and the BookingSection.
2. WHEN a patient clicks a FAQ question, THE System SHALL expand the answer with a smooth animation.
3. WHEN a patient clicks an already-open FAQ question, THE System SHALL collapse it.
4. THE System SHALL include at minimum 6 FAQ items covering privacy, therapist qualifications, matching time, language options, cancellation policy, and therapist switching.

---

### Requirement 5 — Navbar Improvements

**User Story:** As a patient, I want a clear navigation with all key sections accessible, so that I can find what I need quickly.

#### Acceptance Criteria

1. THE System SHALL include a "FAQ" link in the desktop navbar pointing to the `#faq` anchor.
2. THE System SHALL include a "FAQ" link in the mobile menu overlay.
3. WHEN the page scrolls past the hero section, THE System SHALL transition the navbar to a frosted-glass pill style with shadow.
4. WHEN a patient clicks any navbar link on mobile, THE System SHALL close the mobile menu overlay.

---

### Requirement 6 — WhatsApp & Contact Accuracy

**User Story:** As a patient, I want accurate contact links so that I can reach the clinic directly.

#### Acceptance Criteria

1. THE System SHALL replace all placeholder WhatsApp numbers (`91XXXXXXXXXX`) with the real clinic number.
2. WHEN a patient clicks the WhatsApp button, THE System SHALL open WhatsApp with a pre-filled message in a new tab.
3. THE System SHALL display the clinic address (Sector 15, Sonipat) and operating hours (Mon–Sat, 09:00–19:00) in the footer contact card.

---

### Requirement 7 — SEO and Metadata

**User Story:** As a clinic owner, I want the site to be discoverable on search engines, so that patients can find The Pause when searching for therapy in Sonipat or online.

#### Acceptance Criteria

1. THE System SHALL set a unique `<title>` and `<meta description>` for the main page using Next.js Metadata API.
2. THE System SHALL include Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing.
3. THE System SHALL include a `robots.txt` and `sitemap.xml` accessible at the root domain.
4. WHEN the page loads, THE System SHALL render all above-the-fold content without client-side JavaScript (SSR/SSG).

---

### Requirement 8 — Performance and Bundle Size

**User Story:** As a clinic owner, I want the site to load fast on mobile networks, so that patients on slower connections can still access the booking form.

#### Acceptance Criteria

1. THE System SHALL lazy-load all sections below the fold using Next.js dynamic imports.
2. THE System SHALL not import any icon or component library module that is not used on the page.
3. WHEN the booking form is not in the viewport, THE System SHALL defer its JavaScript bundle.
4. THE System SHALL use `next/font` for font loading instead of Google Fonts `<link>` tags to eliminate render-blocking requests.

---

### Requirement 9 — Crisis / Emergency Banner

**User Story:** As a patient in distress, I want to see emergency mental health resources prominently, so that I can get immediate help if needed.

#### Acceptance Criteria

1. THE System SHALL display a sticky or prominently placed crisis line (iCall: 9152987821) visible on all viewport sizes.
2. WHEN a patient clicks the crisis number, THE System SHALL initiate a phone call via `tel:` link.
3. THE System SHALL display the crisis banner in a non-intrusive but clearly visible position (e.g., top of footer or fixed bottom bar on mobile).

---

### Requirement 10 — Booking API Endpoint

**User Story:** As a developer, I want a working API route that receives and stores booking requests, so that the clinic can follow up with patients.

#### Acceptance Criteria

1. WHEN the `/api/bookings` endpoint receives a valid POST request with name, email, phone, sessionType, date, time, and concern fields, THE System SHALL return a 200 response with a booking reference ID.
2. WHEN the `/api/bookings` endpoint receives a request with missing required fields, THE System SHALL return a 400 response with a descriptive error message.
3. THE System SHALL log each booking submission to the server console with a timestamp and reference ID.
4. WHERE email notification is configured, THE System SHALL send a confirmation email to the patient's provided address.
