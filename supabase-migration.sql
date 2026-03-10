-- Create chatbot_config table
CREATE TABLE IF NOT EXISTS chatbot_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  api_key TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'google/gemini-flash-1.5',
  system_prompt TEXT NOT NULL DEFAULT 'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default configuration
INSERT INTO chatbot_config (id, api_key, model, system_prompt)
VALUES (
  1,
  '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',
  'google/gemini-flash-1.5',
  'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.'
)
ON CONFLICT (id) DO NOTHING;
