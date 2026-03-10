-- Add enabled column to chatbot_config table
ALTER TABLE chatbot_config ADD COLUMN IF NOT EXISTS enabled BOOLEAN DEFAULT true;

-- Update system prompt for shorter responses
UPDATE chatbot_config
SET
  system_prompt = 'You are PROMATIC AI assistant. Keep responses brief (2-3 sentences max). Help customers with AI automation, chatbot development, and AI website design. Be friendly and professional. Always offer to book a demo or consultation.',
  enabled = true,
  updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
