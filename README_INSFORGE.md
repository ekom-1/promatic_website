# PROMATIC - InsForge Backend

This project now uses **InsForge** as the backend instead of Supabase.

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env.local` and update:
   ```
   NEXT_PUBLIC_INSFORGE_URL=https://qy8w2kuq.ap-southeast.insforge.app
   NEXT_PUBLIC_INSFORGE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## InsForge Backend

**Project**: My First Project  
**Region**: ap-southeast  
**Base URL**: https://qy8w2kuq.ap-southeast.insforge.app

### Database Tables

- `bookings` - Demo booking submissions
- `form_submissions` - Contact form and chatbot leads  
- `chatbot_config` - AI chatbot configuration
- `email_subscriptions` - Newsletter subscribers
- `navigation_items` - Dynamic navigation menu

### Managing Backend

Use the InsForge CLI to manage your backend:

```bash
# View all tables
insforge db tables

# Query database
insforge db query "SELECT * FROM bookings LIMIT 10"

# View logs
insforge logs insforge.logs

# Check project info
insforge current
```

## Features

✅ **Contact Form** - Submissions stored in `form_submissions`  
✅ **Demo Booking** - Bookings stored in `bookings` table  
✅ **AI Chatbot** - Google Gemini powered chatbot with config in `chatbot_config`  
✅ **Newsletter** - Email subscriptions in `email_subscriptions`  
✅ **Admin Dashboard** - View and manage all submissions at `/admin`

## Deployment

Deploy to InsForge hosting:

```bash
# Build first
npm run build

# Deploy
insforge deployments deploy
```

## Documentation

- [InsForge Docs](https://docs.insforge.com)
- [InsForge CLI Reference](https://docs.insforge.com/cli)
- [InsForge SDK Reference](https://docs.insforge.com/sdk)

## Migration Notes

This project was migrated from Supabase to InsForge on 2026-03-18. See `INSFORGE_MIGRATION.md` for details.
