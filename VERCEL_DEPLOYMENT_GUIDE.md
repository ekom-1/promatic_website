# Vercel Deployment Guide for PROMATIC

This guide explains how to properly deploy the PROMATIC application to Vercel and resolve common issues with chatbot and admin dashboard features.

## Environment Variables Setup

To properly deploy to Vercel, you need to set the following environment variables in your Vercel project settings:

### Required Environment Variables

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anon key
3. **NEXT_PUBLIC_GEMINI_API_KEY** - Your Google Gemini API key
4. **NEXT_PUBLIC_GEMINI_MODEL** - (Optional) The Gemini model to use (default: gemini-3.1-flash-lite-preview)
5. **NEXT_PUBLIC_GEMINI_PROMPT** - (Optional) Custom system prompt for the chatbot

## Common Issues and Fixes

### 1. Chatbot Not Opening
- Fixed by switching from `motion/react` to `framer-motion` library (already implemented)
- Updated next.config.ts to properly transpile `framer-motion`
- This resolves client-side rendering issues in Vercel environment

### 2. API Routes Not Working
- Updated API routes to properly handle environment variables in serverless environment
- Added fallbacks for environment variables in both chat and chatbot-config API routes
- Ensured proper CORS headers and request handling

### 3. Admin Dashboard Features Not Working
- Added proper error handling for authentication API calls
- Improved error handling for database operations
- Fixed state management issues that occur in serverless environments

### 4. Supabase Connection Issues
- Added explicit error checking for missing environment variables
- Provided fallback values for local development
- Improved error messaging for debugging

## Deployment Steps

1. Fork or clone the repository
2. Import the project in Vercel
3. Add the required environment variables in the Vercel dashboard under Settings > Environment Variables
4. Deploy the project
5. Verify that the chatbot and admin dashboard features are working properly

## Troubleshooting

### If the chatbot still doesn't open:
- Check browser console for JavaScript errors
- Verify that `framer-motion` is properly installed (it should be in package.json)
- Make sure the `transpilePackages` setting in next.config.ts includes `framer-motion`

### If API routes return 500 errors:
- Verify all required environment variables are set in Vercel
- Check that the API keys are valid and have proper permissions
- Review the Vercel logs for detailed error messages

### If admin dashboard features don't work:
- Ensure the Supabase database is properly configured
- Check that the required tables exist (form_submissions, bookings, email_subscriptions, chatbot_config, navigation_items)
- Verify that RLS policies are set up correctly in Supabase

## Additional Notes

- The application uses Google Gemini for AI responses in the chatbot
- Supabase is used for database operations and authentication
- The admin dashboard requires proper authentication and database setup
- Make sure your Supabase project allows requests from your Vercel deployment URL