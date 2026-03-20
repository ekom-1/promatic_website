-- PROMATIC Clean Database Schema
-- Delete old tables first, then run this

-- 1. Form Submissions Table (for contact form and chatbot leads)
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

-- 2. Bookings Table (for demo bookings)
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

-- 3. Chatbot Config Table
CREATE TABLE chatbot_config (
  id BIGSERIAL PRIMARY KEY,
  api_key TEXT DEFAULT '',
  model TEXT DEFAULT 'gemini-2.0-flash-exp',
  system_prompt TEXT DEFAULT 'You are PROMATIC AI assistant. Help users learn about our AI automation services.',
  temperature DECIMAL DEFAULT 0.7,
  enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Email Subscriptions Table
CREATE TABLE email_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Navigation Items Table
CREATE TABLE navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  menu_type TEXT DEFAULT 'header',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public INSERT and SELECT
CREATE POLICY "Public can insert form_submissions"
  ON form_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can select form_submissions"
  ON form_submissions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can select bookings"
  ON bookings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Public can select chatbot_config"
  ON chatbot_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update chatbot_config"
  ON chatbot_config FOR UPDATE
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Public can insert email_subscriptions"
  ON email_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can select email_subscriptions"
  ON email_subscriptions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can select navigation_items"
  ON navigation_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can manage navigation_items"
  ON navigation_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default data
INSERT INTO chatbot_config (id, api_key, enabled, system_prompt)
VALUES (
  1,
  '',
  true,
  'You are PROMATIC AI assistant. Help users learn about our AI automation services including AI websites, chatbots, and workflow automation. Be helpful and professional.'
);

INSERT INTO navigation_items (id, label, href, menu_type, order_index) VALUES
  ('1', 'Services', '/services', 'header', 1),
  ('2', 'About', '/about', 'header', 2),
  ('3', 'Contact', '/contact', 'header', 3),
  ('4', 'Book Demo', '/booking', 'header', 4);

-- Create indexes for performance
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
