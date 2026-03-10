# Admin Dashboard Guide

## Overview
Your admin dashboard now displays all form submissions from different sources in organized tabs.

## Database Setup Required
Run this SQL in your Supabase SQL Editor:
```sql
-- File: complete-database-setup.sql
-- This will create all necessary tables and permissions
```

## Dashboard Tabs

### 1. **Chatbot Leads** (Tab 1)
- **Source**: AI Chatbot widget on your website
- **Displays**: Name, Email, Phone, Message, Date
- **Database**: `form_submissions` table where `source_page = 'chatbot'`
- **How it works**: When users interact with the chatbot and fill the lead form

### 2. **Contact Form** (Tab 2)
- **Source**: Contact page at `/contact`
- **Displays**: Name, Email, Company, Service, Message, Date
- **Database**: `form_submissions` table where `source_page = 'contact'`
- **How it works**: When users submit the contact form

### 3. **Demo Bookings** (Tab 3)
- **Source**: Booking page at `/booking`
- **Displays**: Name, Email, Company, Date, Time, Status
- **Database**: `bookings` table
- **How it works**: When users schedule a demo/consultation session

### 4. **Email Subscribers** (Tab 4)
- **Source**: Newsletter subscription in Footer
- **Displays**: Email, Subscribed Date, Status
- **Database**: `email_subscriptions` table
- **How it works**: When users subscribe to your newsletter in the footer

## Access Dashboard
- URL: `http://localhost:3002/admin`
- Or click "Admin Login" link in the footer

## What Was Fixed

### Contact Form Issue
**Problem**: Contact form submissions weren't showing in admin dashboard
**Solution**:
- Added `source_page` column to differentiate form types
- Created separate tabs for each form type
- Contact form now properly saves with `source_page = 'contact'`

### Booking Form Issue
**Problem**: Bookings were trying to save to non-existent table
**Solution**:
- Created dedicated `bookings` table
- Added proper columns: name, email, company, service, date, time, notes, status
- Added RLS policies for anonymous inserts

### Email Subscription
**Problem**: Newsletter form in footer wasn't functional
**Solution**:
- Created `email_subscriptions` table
- Added form submission logic with success/error states
- Prevents duplicate subscriptions (unique email constraint)

## Database Tables Structure

### form_submissions
- Stores: Chatbot leads + Contact form submissions
- Columns: id, name, email, phone, message, service, status, source_page, company, created_at

### bookings
- Stores: Demo/consultation bookings
- Columns: id, name, email, company, service, date, time, notes, status, created_at

### email_subscriptions
- Stores: Newsletter subscribers
- Columns: id, email, subscribed_at, status

## Next Steps
1. Run `complete-database-setup.sql` in Supabase SQL Editor
2. Test each form on your website
3. Check admin dashboard to see submissions appear in correct tabs
4. All forms now work without needing to run SQL manually!
