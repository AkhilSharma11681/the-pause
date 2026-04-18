-- Add payment_status column to bookings table
-- Run this in Supabase SQL Editor

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' 
CHECK (payment_status IN ('pending', 'cash_pending', 'paid', 'failed'));

-- Add comment to explain the column
COMMENT ON COLUMN bookings.payment_status IS 'Payment status: pending (not paid), cash_pending (pay at clinic), paid (online payment completed), failed (payment failed)';
