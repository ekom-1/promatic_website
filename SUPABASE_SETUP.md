# Supabase Setup Instructions

## Step 1: Run SQL Schema in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Copy the entire content from `supabase-schema.sql` file
5. Paste it in the SQL Editor
6. Click "Run" to execute all commands

## Step 2: Verify Tables Created

Go to "Table Editor" and verify these tables exist:
- `form_submissions`
- `bookings`
- `chatbot_config`
- `email_subscriptions`
- `navigation_items`

## Step 3: Check RLS Policies

1. Go to "Authentication" > "Policies"
2. Verify that each table has policies enabled
3. Make sure anonymous users can INSERT and SELECT on:
   - `form_submissions`
   - `bookings`
   - `email_subscriptions`
   - `navigation_items`

## Step 4: Test Booking Form

1. Go to your website: https://your-site.vercel.app/booking
2. Select a date
3. Select a time
4. Click "Continue" - should go to Step 2
5. Fill in your details
6. Click "Confirm Booking"
7. Should see success message

## Step 5: Verify in Admin Dashboard

1. Go to: https://your-site.vercel.app/admin/login
2. Login with your credentials
3. Click on "Demo Bookings" tab
4. You should see the booking you just created

## Troubleshooting

### Issue: Continue button not working
- Check browser console for errors
- Verify date and time are selected
- Make sure JavaScript is enabled

### Issue: Booking not saving
- Check Supabase logs in Dashboard > Logs
- Verify RLS policies are correct
- Check that `bookings` table has INSERT policy for anon users

### Issue: Bookings not showing in admin
- Verify you're logged in to admin dashboard
- Check that SELECT policy exists for authenticated users
- Refresh the page

## Environment Variables

Make sure these are set in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
