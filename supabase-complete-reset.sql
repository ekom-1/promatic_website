-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Enable insert for anon users on form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Enable select for anon users on form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users on bookings" ON bookings;
DROP POLICY IF EXISTS "Enable select for anon users on bookings" ON bookings;
DROP POLICY IF EXISTS "Enable update for authenticated users on bookings" ON bookings;
DROP POLICY IF EXISTS "Enable select for anon users on chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Enable update for authenticated users on chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Enable insert for anon users on email_subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Enable select for anon users on email_subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Enable select for anon users on navigation_items" ON navigation_items;
DROP POLICY IF EXISTS "Enable update for authenticated users on navigation_items" ON navigation_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users on navigation_items" ON navigation_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users on navigation_items" ON navigation_items;
DROP POLICY IF EXISTS "Enable authenticated updates on chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Public can insert form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Public can select form_submissions" ON form_submissions;
DROP POLICY IF EXISTS "Public can insert bookings" ON bookings;
DROP POLICY IF EXISTS "Public can select bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated can update bookings" ON bookings;
DROP POLICY IF EXISTS "Public can select chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Authenticated can update chatbot_config" ON chatbot_config;
DROP POLICY IF EXISTS "Public can insert email_subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Public can select email_subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Public can select navigation_items" ON navigation_items;
DROP POLICY IF EXISTS "Authenticated can manage navigation_items" ON navigation_items;

-- Step 2: Drop all tables
DROP TABLE IF EXISTS form_submissions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS chatbot_config CASCADE;
DROP TABLE IF EXISTS email_subscriptions CASCADE;
DROP TABLE IF EXISTS navigation_items CASCADE;

-- Step 3: Create fresh tables
CREATE TABLE form_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  service TEXT,
  source_page TEXT DEFAULT 'contact',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
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

CREATE TABLE chatbot_config (
  id BIGSERIAL PRIMARY KEY,
  api_key TEXT DEFAULT '',
  model TEXT DEFAULT 'gemini-2.0-flash-exp',
  system_prompt TEXT DEFAULT 'You are PROMATIC AI assistant.',
  temperature DECIMAL DEFAULT 0.7,
  enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  menu_type TEXT DEFAULT 'header',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 4: Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policies
CREATE POLICY "public_insert_form_submissions" ON form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_select_form_submissions" ON form_submissions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_select_bookings" ON bookings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "auth_update_bookings" ON bookings FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "public_select_chatbot_config" ON chatbot_config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "auth_update_chatbot_config" ON chatbot_config FOR UPDATE TO authenticated WITH CHECK (true);

CREATE POLICY "public_insert_email_subscriptions" ON email_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public_select_email_subscriptions" ON email_subscriptions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_select_navigation_items" ON navigation_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "auth_all_navigation_items" ON navigation_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Step 6: Insert default data
INSERT INTO chatbot_config (id, api_key, enabled, system_prompt) VALUES (
  1, '', true,
  'You are PROMATIC AI assistant. Help users learn about our AI automation services including AI websites, chatbots, and workflow automation.'
);

INSERT INTO navigation_items (id, label, href, menu_type, order_index) VALUES
  ('1', 'Services', '/services', 'header', 1),
  ('2', 'About', '/about', 'header', 2),
  ('3', 'Contact', '/contact', 'header', 3),
  ('4', 'Book Demo', '/booking', 'header', 4);

-- Step 7: Create indexes
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
