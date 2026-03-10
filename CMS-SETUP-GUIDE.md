# CMS Setup Instructions

## Step 1: Run Database Migrations

Execute the following SQL files in your Supabase SQL Editor in this order:

1. **cms-database-schema.sql** - Creates all CMS tables (run this first, it now handles existing policies)
2. **cms-sample-data-clean.sql** - Populates with sample content (use this instead of cms-sample-data.sql)

### How to run:
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to SQL Editor
4. Copy and paste the contents of **cms-database-schema.sql**
5. Click "Run" to execute
6. Then copy and paste the contents of **cms-sample-data-clean.sql**
7. Click "Run" to execute

## Step 2: Verify Tables Created

Check that these tables exist in your database:
- `pages`
- `page_sections`
- `blog_posts`
- `media_library`
- `site_settings`
- `navigation_menus`

You should see these sample pages:
- Home
- About
- Services
- Case Studies (new)
- Blog
- Contact

## Step 3: Access New Admin Features

Your admin dashboard now has these new sections:

### CMS Section:
- **Content Manager** (`/admin/content`) - Manage pages and SEO
- **Blog Manager** (`/admin/blog`) - Create and publish blog posts
- **Design Customizer** (`/admin/design`) - Customize colors, fonts, layouts
- **Media Library** (`/admin/media`) - Upload and manage images
- **Navigation Editor** (`/admin/navigation`) - Edit header and footer menus

### System Section (existing):
- Dashboard
- Submissions
- Chatbot Settings
- Analytics
- Users

## Step 4: Test the CMS

1. Login to admin: http://localhost:3000/admin/login
2. Navigate to Content Manager
3. You should see sample pages (Home, About, Services, Case Studies, Blog, Contact)
4. Navigate to Blog Manager
5. You should see 3 sample blog posts
6. Navigate to Navigation Editor
7. You should see header menu with: Home, About, Services, Case Studies, Blog, Contact
8. Try creating a new page or blog post
9. Test the Design Customizer to change colors
10. Upload a test image in Media Library
11. Edit navigation menus

## Features Included

### ✅ Content Management
- Create, edit, delete pages
- Draft and publish workflow
- SEO meta tags (title, description, keywords)
- URL slug management

### ✅ Blog System
- Full blog post management
- Categories and tags
- Featured images
- Author attribution
- Excerpt and full content
- SEO optimization

### ✅ Design Customization
- Theme colors (primary, background, text, secondary, accent)
- Typography (fonts, sizes, weights)
- Layout settings (header style, footer style, container width, spacing)
- Live preview

### ✅ Media Library
- File upload system
- Image management
- File type filtering
- Search functionality
- Copy file paths
- Storage stats

### ✅ Navigation Management
- Header menu editor
- Footer menu editor
- Drag and drop reordering
- Add/edit/delete menu items
- Live preview

### ✅ SEO Management
- Meta descriptions
- Meta keywords
- URL slugs
- Page titles

## Next Steps

### To make the CMS fully functional on the frontend:

1. **Create dynamic page routes** - Use Next.js dynamic routes to fetch and display pages from the database
2. **Implement blog listing page** - Show all published blog posts
3. **Create blog post detail page** - Display individual blog posts
4. **Apply design settings** - Load theme settings from database and apply to frontend
5. **Load navigation from database** - Replace hardcoded menus with database-driven menus
6. **Implement media upload to Supabase Storage** - Currently media library stores metadata only

### Sample code for dynamic pages:

```typescript
// app/[slug]/page.tsx
export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { data: page } = await supabase
    .from('pages')
    .select('*, page_sections(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!page) notFound();

  return (
    <div>
      <h1>{page.title}</h1>
      {/* Render page sections */}
    </div>
  );
}
```

## Troubleshooting

### Tables not created?
- Make sure you're running the SQL in the correct Supabase project
- Check for error messages in the SQL Editor
- Verify you have proper permissions

### Can't access admin pages?
- Make sure you're logged in to admin
- Check browser console for errors
- Verify the routes exist in your app/admin folder

### Sample data not showing?
- Run cms-sample-data.sql after cms-database-schema.sql
- Check if data exists: `SELECT * FROM pages;`

## Support

If you encounter issues, check:
1. Browser console for JavaScript errors
2. Network tab for API errors
3. Supabase logs for database errors

Your CMS is now ready to use! 🚀
