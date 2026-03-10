-- Fix all database tables - Run this in Supabase SQL Editor

-- 1. Drop and recreate form_submissions with all columns
DROP TABLE IF EXISTS form_submissions CASCADE;
CREATE TABLE form_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  service TEXT,
  status TEXT DEFAULT 'New',
  source_page TEXT DEFAULT 'chatbot',
  company TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Drop and recreate bookings table
DROP TABLE IF EXISTS bookings CASCADE;
CREATE TABLE bookings (
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

-- 3. Drop and recreate email_subscriptions table
DROP TABLE IF EXISTS email_subscriptions CASCADE;
CREATE TABLE email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active'
);

-- 4. Enable RLS on all tables
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if any
DROP POLICY IF EXISTS "Allow all operations" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous insert form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated read form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous insert subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Allow authenticated read subscriptions" ON email_subscriptions;

-- 6. Create new policies for form_submissions
CREATE POLICY "Allow anonymous insert form_submissions"
ON form_submissions FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated read form_submissions"
ON form_submissions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow anon read form_submissions"
ON form_submissions FOR SELECT
TO anon
USING (true);

-- 7. Create policies for bookings
CREATE POLICY "Allow anonymous insert bookings"
ON bookings FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated read bookings"
ON bookings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow anon read bookings"
ON bookings FOR SELECT
TO anon
USING (true);

-- 8. Create policies for email_subscriptions
CREATE POLICY "Allow anonymous insert subscriptions"
ON email_subscriptions FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated read subscriptions"
ON email_subscriptions FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow anon read subscriptions"
ON email_subscriptions FOR SELECT
TO anon
USING (true);
