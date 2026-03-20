# Testing Guide - InsForge Migration

## Server Status
✅ Development server running at: http://localhost:3000

## Testing Steps

### 1. Test Contact Form
1. Visit: http://localhost:3000/contact
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Service: AI Website Design
   - Message: Testing contact form
3. Click "Send Message"
4. Should see success message

### 2. Test Booking Form
1. Visit: http://localhost:3000/booking
2. Step 1 - Select date and time:
   - Choose today's date or future date
   - Select a time slot
   - Click "Continue"
3. Step 2 - Fill details:
   - Name: Test Booking
   - Email: booking@example.com
   - Company: Test Corp
   - Notes: Testing booking system
4. Click "Confirm Booking"
5. Should see confirmation page

### 3. Test Chatbot
1. On any page, click the green chat button (bottom right)
2. Type a message: "I need help with AI automation"
3. Wait for AI response
4. Try asking: "I want to book a demo"
5. Should show lead form
6. Fill the form and submit

### 4. Test Newsletter Subscription
1. Scroll to footer on any page
2. Enter email: newsletter@example.com
3. Click "Join"
4. Should see success message

### 5. Check Admin Dashboard
1. Visit: http://localhost:3000/admin
2. Login with your credentials
3. Check each tab:
   - **Chatbot Leads**: Should show chatbot submissions
   - **Contact Form**: Should show contact form submission
   - **Demo Bookings**: Should show booking with status controls
   - **Email Subscribers**: Should show newsletter subscription

### 6. Test Booking Status Update
1. In Admin Dashboard, go to "Demo Bookings" tab
2. Click "Confirm" on a pending booking
3. Status should change to "confirmed"
4. Try "Cancel" and "Pending" buttons

### 7. Test Chatbot Configuration
1. In Admin Dashboard, right panel shows "Bot Configuration"
2. Toggle "AI Assistance" on/off
3. Update system prompt
4. Click "Save Configuration"
5. Should see success message

## Verify Data in InsForge

Check data was saved to InsForge database:

```bash
# View contact submissions
insforge db query "SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 5"

# View bookings
insforge db query "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5"

# View email subscriptions
insforge db query "SELECT * FROM email_subscriptions ORDER BY subscribed_at DESC LIMIT 5"

# View chatbot config
insforge db query "SELECT * FROM chatbot_config"
```

## Expected Results

After testing, you should have:
- ✅ 1 contact form submission
- ✅ 1 demo booking
- ✅ 1-2 chatbot leads
- ✅ 1 newsletter subscription
- ✅ All visible in admin dashboard
- ✅ Booking status can be updated
- ✅ Chatbot config can be saved

## Troubleshooting

### Forms not submitting?
- Check browser console for errors
- Verify `.env.local` has correct InsForge credentials
- Check server logs in terminal

### Admin dashboard empty?
- Ensure you submitted test data first
- Check if data exists: `insforge db query "SELECT COUNT(*) FROM form_submissions"`
- Verify RLS policies allow reading

### Chatbot not responding?
- Check `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local`
- Verify API key is valid
- Check browser console for errors

## Quick Database Check

```bash
# Count all records
insforge db query "SELECT 
  (SELECT COUNT(*) FROM form_submissions) as forms,
  (SELECT COUNT(*) FROM bookings) as bookings,
  (SELECT COUNT(*) FROM email_subscriptions) as emails"
```

---

**Server**: http://localhost:3000  
**Admin**: http://localhost:3000/admin  
**Status**: Ready for testing ✅
