-- PROMATIC Supabase Database Schema
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create form_submissions table (for chatbot leads and contact form)
CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  service TEXT DEFAULT 'Chatbot Lead',
  source_page TEXT DEFAULT 'chatbot',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create bookings table (for appointment bookings)
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT DEFAULT 'AI Consultation',
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create chatbot_config table (already exists, but here for reference)
CREATE TABLE IF NOT EXISTS chatbot_config (
  id BIGSERIAL PRIMARY KEY,
  api_key TEXT,
  model TEXT DEFAULT 'gemini-2.0-flash-exp',
  system_prompt TEXT DEFAULT 'You are a helpful AI assistant for PROMATIC, an AI automation company.',
  temperature DECIMAL DEFAULT 0.7,
  enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default chatbot config (will be updated later via admin dashboard)
INSERT INTO chatbot_config (id, enabled, model, temperature, api_key, system_prompt)
VALUES (
  1,
  true,
  'gemini-2.0-flash-exp',
  0.7,
  '',
  'You are PROMATIC AI assistant, a helpful AI that assists businesses with automation solutions.'
)
ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  temperature = EXCLUDED.temperature,
  enabled = EXCLUDED.enabled;

-- 4. Create email_subscriptions table (for newsletter)
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create navigation_items table (for dynamic navigation)
CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  menu_type TEXT DEFAULT 'header',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts to form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated reads on form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated reads on chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Allow authenticated updates on chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Allow authenticated updates on bookings" ON bookings;

-- 6. Create policies for public access (anon users can insert and select)
CREATE POLICY "Enable insert for anon users on form_submissions"
ON form_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for anon users on form_submissions"
ON form_submissions FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable insert for anon users on bookings"
ON bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for anon users on bookings"
ON bookings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable select for anon users on chatbot_config"
ON chatbot_config FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable insert for anon users on email_subscriptions"
ON email_subscriptions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for anon users on email_subscriptions"
ON email_subscriptions FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable select for anon users on navigation_items"
ON navigation_items FOR SELECT
TO anon, authenticated
USING (true);

-- 7. Create policies for authenticated updates (for admin dashboard)
CREATE POLICY "Enable update for authenticated users on chatbot_config"
ON chatbot_config FOR UPDATE
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users on bookings"
ON bookings FOR UPDATE
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users on navigation_items"
ON navigation_items FOR UPDATE
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users on navigation_items"
ON navigation_items FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users on navigation_items"
ON navigation_items FOR DELETE
TO authenticated
USING (true);

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
