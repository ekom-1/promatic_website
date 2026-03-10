-- Enable Row Level Security and add policy for form_submissions
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for chatbot form submissions)
CREATE POLICY "Allow anonymous inserts" ON form_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read all (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON form_submissions
FOR SELECT
TO authenticated
USING (true);
