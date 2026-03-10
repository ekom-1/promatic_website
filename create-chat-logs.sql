-- Create chat_logs table for storing chat history
CREATE TABLE IF NOT EXISTS chat_logs (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  role TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
