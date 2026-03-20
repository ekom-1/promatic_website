# 🚀 PROMATIC - Complete Deployment Guide

## ✅ Current Status

### Working Features:
- ✅ Chatbot API - Tested and working
- ✅ Supabase connection - Connected successfully
- ✅ Booking form - Ready to save to database
- ✅ Lead capture form - Ready to save to database
- ✅ Admin dashboard - Structure in place
- ✅ All pages compile successfully

### What You Need to Do:

---

## 📋 Step 1: Setup Supabase Database

1. **Go to your Supabase project:** https://supabase.com/dashboard
2. **Click on "SQL Editor"** in the left sidebar
3. **Copy and paste the entire content** from `supabase-schema.sql`
4. **Click "Run"** to create all tables and policies

This will create:
- `form_submissions` table (for chatbot leads)
- `bookings` table (for appointments)
- `chatbot_config` table (for chatbot settings)
- All necessary security policies

---

## 🔑 Step 2: Environment Variables for Vercel

When deploying to Vercel, add these environment variables:

```bash
# Gemini AI API Key
GEMINI_API_KEY=AIzaSyBAPyaXFCGsHEgkB_RRLbJMFqz_mCEHW0Y

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xqfmvtlauscaiyvkoiip.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZm12dGxhdXNjYWl5dmtvaWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NzczOTQsImV4cCI6MjA4ODQ1MzM5NH0.5T8B3Fjv9qoCF4ROrCduTYmemGeoe76iXjfHxCNprSM

# App URL (update after deployment)
APP_URL=https://your-app.vercel.app
```

---

## 🚀 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables from Step 2
4. Click "Deploy"

### Option B: Deploy via Git Push

```bash
# Commit your changes
git add .
git commit -m "Ready for deployment"
git push origin main

# Vercel will auto-deploy if connected to your repo
```

---

## 🧪 Step 4: Test Everything After Deployment

### Test Chatbot:
1. Open your deployed site
2. Look for green button in bottom-right corner
3. Click to open chatbot
4. Send a message - should get AI response
5. Ask for consultation - form should appear
6. Fill form and submit - should save to Supabase

### Test Booking Form:
1. Go to `/booking` page
2. Select date and time
3. Fill in your details
4. Submit - should save to Supabase
5. Check Supabase dashboard → `bookings` table

### Test Admin Dashboard:
1. Go to `/admin/login`
2. Login credentials need to be set up
3. View submissions in `/admin/submissions`

---

## 🐛 Common Issues & Fixes

### Issue 1: Chatbot button not visible
**Solution:**
- Check browser console (F12) for errors
- Verify Supabase connection
- Check if `chatbot_config.enabled = true` in database

### Issue 2: Forms not submitting
**Solution:**
- Check Supabase RLS policies are created
- Verify `anon` key has insert permissions
- Check browser console for API errors

### Issue 3: Build fails on Vercel
**Solution:**
- Check all environment variables are set
- Ensure no TypeScript errors: `npm run build`
- Check Vercel build logs for specific errors

### Issue 4: Internal Server Error
**Solution:**
- Check Vercel function logs
- Verify Gemini API key is valid
- Check Supabase connection string

---

## 📊 Verify Database Tables

After running the SQL schema, verify these tables exist in Supabase:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Should show:
-- - form_submissions
-- - bookings
-- - chatbot_config
```

---

## 🔐 Admin Dashboard Setup

The admin dashboard is at `/admin`. To set up authentication:

1. **Option A: Use Supabase Auth**
   - Enable Email auth in Supabase
   - Update `/admin/login` to use Supabase auth

2. **Option B: Simple Password (Current)**
   - Check `app/api/admin/auth/route.ts`
   - Default password may be set there

---

## 📱 Test Checklist

Before going live, test:

- [ ] Homepage loads
- [ ] Chatbot button appears
- [ ] Chatbot opens and responds
- [ ] Chatbot form submits successfully
- [ ] Booking page loads
- [ ] Booking form submits successfully
- [ ] Contact page works
- [ ] Admin login works
- [ ] Admin can view submissions
- [ ] All animations work
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎯 Current Server Status

**Local Development:**
- Server: http://localhost:3003
- Status: ✅ Running
- Chatbot API: ✅ Working
- Supabase: ✅ Connected

**Next Steps:**
1. Run the SQL schema in Supabase
2. Test locally one more time
3. Deploy to Vercel
4. Test on production

---

## 📞 Support

If you face any issues:
1. Check browser console (F12)
2. Check Vercel function logs
3. Check Supabase logs
4. Verify all environment variables

---

**Last Updated:** 2026-03-14
**Status:** Ready for deployment ✅
