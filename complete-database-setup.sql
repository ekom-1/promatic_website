-- Complete database setup for all form types

-- 1. Update form_submissions table to handle all form types
ALTER TABLE form_submissions
ADD COLUMN IF NOT EXISTS source_page TEXT DEFAULT 'chatbot',
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS booking_date DATE,
ADD COLUMN IF NOT EXISTS booking_time TEXT;

-- 2. Create bookings table for demo/consultation bookings
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create email_subscriptions table for newsletter
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active'
);

-- 4. Add RLS policies for all tables
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for all tables
CREATE POLICY IF NOT EXISTS "Allow anonymous insert form_submissions"
ON form_submissions FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anonymous insert bookings"
ON bookings FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anonymous insert subscriptions"
ON email_subscriptions FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated reads for admin dashboard
CREATE POLICY IF NOT EXISTS "Allow authenticated read form_submissions"
ON form_submissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated read bookings"
ON bookings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated read subscriptions"
ON email_subscriptions FOR SELECT
TO authenticated
USING (true);
