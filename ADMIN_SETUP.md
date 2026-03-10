# Admin Dashboard - Chatbot Configuration Setup

## Overview
The admin dashboard now includes a fully functional chatbot configuration panel where you can:
- Add/update OpenRouter API key
- Select Gemini AI models
- Customize system prompt
- Adjust temperature settings

## Setup Instructions

### 1. Database Setup (Supabase)

Run the SQL migration in your Supabase SQL Editor:

```sql
-- The migration file is located at: supabase-migration.sql
```

This will create the `chatbot_config` table with your API key pre-configured.

### 2. Access Admin Dashboard

Navigate to: **http://localhost:3001/admin**

### 3. Configure Chatbot

In the "Bot Configuration" panel on the right side:

1. **OpenRouter API Key**: Your key is already set (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)
2. **Model Selection**: Choose from Gemini models:
   - Gemini 2.0 Flash (Free) - Default
   - Gemini 1.5 Flash
   - Gemini 1.5 Pro
   - Gemini 1.5 Flash 8B
3. **System Prompt**: Customize the chatbot's personality and behavior
4. **Temperature**: Adjust creativity (0.0 = focused, 1.0 = creative)

Click **Save Configuration** to apply changes.

## Features

✅ API key management in dashboard
✅ Gemini model selection only
✅ Custom system prompts
✅ Temperature control
✅ Real-time configuration updates
✅ Settings persist in Supabase database

## API Endpoints

- `GET /api/chatbot-config` - Fetch current configuration
- `POST /api/chatbot-config` - Save configuration
- `POST /api/chat` - Chat with AI (uses saved config)

## Notes

- Configuration is stored in Supabase and loaded dynamically
- Changes take effect immediately for new chat messages
- Fallback to .env.local if database config is not available
