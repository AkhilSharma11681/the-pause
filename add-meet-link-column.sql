-- Add meet_link column to bookings table
-- Run this in Supabase SQL Editor

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS meet_link text;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookings' AND column_name = 'meet_link';
