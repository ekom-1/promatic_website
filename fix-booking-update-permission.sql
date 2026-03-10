-- Add UPDATE permission to bookings table for anonymous users
-- This allows the admin dashboard to update booking status

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anon update bookings" ON bookings;

-- Create policy to allow anonymous updates (for admin dashboard)
CREATE POLICY "Allow anon update bookings"
ON bookings FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Also add for authenticated users
DROP POLICY IF EXISTS "Allow authenticated update bookings" ON bookings;

CREATE POLICY "Allow authenticated update bookings"
ON bookings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
