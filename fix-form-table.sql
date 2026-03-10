-- Drop and recreate form_submissions table with correct columns
DROP TABLE IF EXISTS form_submissions;

CREATE TABLE form_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  service TEXT DEFAULT 'Chatbot Lead',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS and add policies
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON form_submissions
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON form_submissions
FOR SELECT
TO authenticated
USING (true);
