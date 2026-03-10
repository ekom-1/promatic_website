# Admin Credentials

## Default Login
- **Username:** `admin`
- **Password:** `admin123`

## Security Notes
⚠️ **IMPORTANT:** Change these credentials before deploying to production!

### How to Change Credentials

1. Create a `.env.local` file in the root directory
2. Add the following variables:
```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

3. Restart your development server

### Production Deployment
For production, set these environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Refer to their documentation

## Access
- Login page: `/admin/login`
- Dashboard: `/admin` (requires authentication)

## Features
- Session-based authentication using localStorage
- Automatic redirect to login if not authenticated
- Logout button in the dashboard header
- Token validation on each page load
