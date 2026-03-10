-- Test if bookings table exists and check its structure
SELECT * FROM bookings LIMIT 1;

-- Check if there are any bookings
SELECT COUNT(*) as total_bookings FROM bookings;

-- View all bookings
SELECT * FROM bookings ORDER BY created_at DESC;

-- Check RLS policies on bookings table
SELECT * FROM pg_policies WHERE tablename = 'bookings';
