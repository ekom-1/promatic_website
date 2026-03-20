<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PROMATIC - AI Automation Platform

This contains everything you need to run your app locally or deploy to Vercel.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the environment variables in [.env.local](.env.local) according to the table below
3. Run the app:
   `npm run dev`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL | Yes |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anon key | Yes |
| NEXT_PUBLIC_GEMINI_API_KEY | Your Google Gemini API key | Yes |
| NEXT_PUBLIC_GEMINI_MODEL | (Optional) The Gemini model to use | No (default: gemini-3.1-flash-lite-preview) |
| NEXT_PUBLIC_GEMINI_PROMPT | (Optional) Custom system prompt for the chatbot | No |

## Deploy to Vercel

For detailed deployment instructions to Vercel, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

## View Live App

View your app in AI Studio: https://ai.studio/apps/272229a1-624e-4720-9be6-097e6440426e
