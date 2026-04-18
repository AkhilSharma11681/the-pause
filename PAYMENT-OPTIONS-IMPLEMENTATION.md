# Payment Options Implementation

## Overview
Added "Pay at Clinic (Cash)" option alongside the existing Razorpay online payment flow in the booking form.

---

## Changes Made

### 1. ✅ Booking Form - New Payment Step (Step 5)

**File:** `src/components/BookingSection.tsx`

**What was added:**
- New step 5 for payment method selection
- Two payment options displayed as cards:
  - **Pay Online Now** 💳 - Secure payment via Razorpay (ready for integration)
  - **Pay at Clinic (Cash)** 💵 - Pay ₹1500 cash at the clinic
- Progress bar updated from 4 to 5 steps
- New state variable: `paymentMethod` ('online' | 'cash' | '')
- Session price constant: `SESSION_PRICE = 1500`

**User Flow:**
1. Step 1: Session Type (Online/Offline)
2. Step 2: Choose Therapist
3. Step 3: Pick Date & Time
4. Step 4: Personal Details
5. **Step 5: Choose Payment Method** ← NEW
6. Confirmation

**Payment Logic:**
```typescript
// If cash payment selected
if (paymentMethod === 'cash') {
  await submitBooking('cash_pending')
}

// If online payment selected (Razorpay - to be integrated)
if (paymentMethod === 'online') {
  await submitBooking('pending')
}
```

---

### 2. ✅ Database Schema Update

**File:** `add-payment-status-column.sql` (new file)

**What was added:**
- New column `payment_status` in `bookings` table
- Allowed values: 'pending', 'cash_pending', 'paid', 'failed'
- Default value: 'pending'

**Migration SQL:**
```sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' 
CHECK (payment_status IN ('pending', 'cash_pending', 'paid', 'failed'));
```

**Run this in Supabase SQL Editor before testing!**

---

### 3. ✅ API Updates

**File:** `src/app/api/bookings/route.ts`

**What was changed:**
- Booking insert now includes `payment_status` field
- Email template updated to show cash payment notice when `payment_status === 'cash_pending'`

**Cash Payment Email:**
Shows a prominent yellow box with:
- 💵 Payment Due at Clinic
- ₹1500 (large, bold)
- "Please bring cash payment to your session"

**Code:**
```typescript
// Insert booking with payment status
const { data: savedBooking } = await admin
  .from('bookings')
  .insert({
    // ... other fields
    payment_status: booking.payment_status || 'pending',
  })
```

---

### 4. ✅ Booking Payload Type Update

**File:** `src/lib/booking.ts`

**What was added:**
```typescript
export interface BookingPayload {
  // ... existing fields
  payment_status?: string // 'pending', 'cash_pending', 'paid'
  // ... razorpay fields
}
```

---

### 5. ✅ Admin Dashboard - Cash Pending Badge

**Files:** 
- `src/app/admin/page.tsx`
- `src/components/admin/AdminPatientDetail.tsx`

**What was added:**
- Orange badge showing "💵 Cash Pending" for bookings with `payment_status === 'cash_pending'`
- Badge appears in both:
  - Today's Appointments tab
  - Patient detail bookings tab

**Badge Style:**
```tsx
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full 
  bg-orange-500/20 text-orange-300 border border-orange-500/30 
  text-[10px] font-medium">
  💵 Cash Pending
</span>
```

**Visual:**
- Orange background with orange border
- Small, compact design
- Appears next to booking details
- Doctor can easily see which bookings need cash collection

---

## Testing Checklist

### Booking Form
- [ ] Navigate through all 5 steps successfully
- [ ] Step 5 shows both payment options
- [ ] Select "Pay at Clinic (Cash)" → booking submits successfully
- [ ] Select "Pay Online Now" → booking submits (Razorpay integration pending)
- [ ] Confirmation screen shows correct details

### Email Confirmation
- [ ] Cash payment booking sends email with yellow payment notice
- [ ] Email shows "₹1500" and "Please bring cash payment"
- [ ] Online payment booking sends normal email (no cash notice)

### Database
- [ ] Run migration SQL in Supabase
- [ ] Cash bookings save with `payment_status: 'cash_pending'`
- [ ] Online bookings save with `payment_status: 'pending'`
- [ ] Check bookings table has `payment_status` column

### Admin Dashboard
- [ ] Today's Appointments shows "💵 Cash Pending" badge for cash bookings
- [ ] Badge is orange colored
- [ ] Badge appears next to booking details
- [ ] Patient detail page also shows the badge
- [ ] Badge does NOT appear for online payment bookings

---

## Payment Status Values

| Status | Meaning | When Used |
|--------|---------|-----------|
| `pending` | Payment not completed | Default for online bookings (before Razorpay) |
| `cash_pending` | Cash payment due at clinic | When user selects "Pay at Clinic" |
| `paid` | Payment completed online | After successful Razorpay payment |
| `failed` | Payment failed | If Razorpay payment fails |

---

## Future Razorpay Integration

When integrating Razorpay:

1. **In BookingSection.tsx:**
   - When `paymentMethod === 'online'`, trigger Razorpay checkout
   - On success, call `submitBooking('paid')` with Razorpay signature
   - On failure, show error and don't submit

2. **In API route:**
   - Payment signature verification already implemented
   - Just needs Razorpay keys in `.env.local`

3. **Email:**
   - For `payment_status === 'paid'`, show "Payment Confirmed" message

---

## Files Modified

1. ✅ `src/components/BookingSection.tsx` - Added step 5 for payment selection
2. ✅ `src/lib/booking.ts` - Added `payment_status` to interface
3. ✅ `src/app/api/bookings/route.ts` - Save payment status, update email
4. ✅ `src/app/admin/page.tsx` - Show cash pending badge
5. ✅ `src/components/admin/AdminPatientDetail.tsx` - Show cash pending badge

## Files Created

1. ✅ `add-payment-status-column.sql` - Database migration
2. ✅ `PAYMENT-OPTIONS-IMPLEMENTATION.md` - This documentation

---

## Summary

✅ **Payment Step Added** - New step 5 with two payment options  
✅ **Cash Payment Flow** - Skips Razorpay, saves as `cash_pending`  
✅ **Email Updated** - Shows cash payment notice for cash bookings  
✅ **Admin Badge** - Orange "Cash Pending" badge in dashboard  
✅ **Database Ready** - Migration SQL created for `payment_status` column  
✅ **Razorpay Compatible** - Existing Razorpay flow preserved and ready  

**No existing functionality was broken. All changes are additive.**

---

## Important: Run Migration First!

Before testing, run this in Supabase SQL Editor:

```sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' 
CHECK (payment_status IN ('pending', 'cash_pending', 'paid', 'failed'));
```

Or use the file: `add-payment-status-column.sql`
