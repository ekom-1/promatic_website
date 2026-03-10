-- CMS Database Schema for Promatic Admin Dashboard

-- 1. Pages Table (for managing all website pages)
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Page Sections Table (for managing sections within pages)
CREATE TABLE IF NOT EXISTS page_sections (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- hero, features, testimonials, cta, etc.
  section_order INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  content JSONB NOT NULL, -- stores all section data as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'Admin',
  category TEXT,
  tags TEXT[],
  meta_description TEXT,
  meta_keywords TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Media Library Table
CREATE TABLE IF NOT EXISTS media_library (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- image/jpeg, image/png, etc.
  file_size INTEGER NOT NULL, -- in bytes
  alt_text TEXT,
  caption TEXT,
  uploaded_by TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Site Settings Table (for theme, colors, fonts, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Navigation Menus Table
CREATE TABLE IF NOT EXISTS navigation_menus (
  id SERIAL PRIMARY KEY,
  menu_name TEXT UNIQUE NOT NULL, -- header, footer, sidebar
  menu_items JSONB NOT NULL, -- array of menu items with label, url, order
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('theme', '{"primaryColor": "#39FF14", "backgroundColor": "#0A0A0A", "textColor": "#FFFFFF"}'),
('typography', '{"headingFont": "Inter", "bodyFont": "Inter", "fontSize": "16px"}'),
('layout', '{"headerStyle": "default", "footerStyle": "default", "sidebarPosition": "right"}')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default navigation menu
INSERT INTO navigation_menus (menu_name, menu_items) VALUES
('header', '[
  {"label": "Home", "url": "/", "order": 1},
  {"label": "About", "url": "/about", "order": 2},
  {"label": "Services", "url": "/services", "order": 3},
  {"label": "Case Studies", "url": "/case-studies", "order": 4},
  {"label": "Blog", "url": "/blog", "order": 5},
  {"label": "Contact", "url": "/contact", "order": 6}
]'),
('footer', '[
  {"label": "Privacy Policy", "url": "/privacy", "order": 1},
  {"label": "Terms of Service", "url": "/terms", "order": 2}
]')
ON CONFLICT (menu_name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_menus ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DROP POLICY IF EXISTS "Public can read published pages" ON pages;
DROP POLICY IF EXISTS "Public can read visible sections" ON page_sections;
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read media" ON media_library;
DROP POLICY IF EXISTS "Public can read settings" ON site_settings;
DROP POLICY IF EXISTS "Public can read active menus" ON navigation_menus;

CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read visible sections" ON page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read published posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read media" ON media_library FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active menus" ON navigation_menus FOR SELECT USING (is_active = true);

-- Create policies for admin full access (you'll need to adjust based on your auth setup)
DROP POLICY IF EXISTS "Admin full access pages" ON pages;
DROP POLICY IF EXISTS "Admin full access sections" ON page_sections;
DROP POLICY IF EXISTS "Admin full access posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access media" ON media_library;
DROP POLICY IF EXISTS "Admin full access settings" ON site_settings;
DROP POLICY IF EXISTS "Admin full access menus" ON navigation_menus;

CREATE POLICY "Admin full access pages" ON pages FOR ALL USING (true);
CREATE POLICY "Admin full access sections" ON page_sections FOR ALL USING (true);
CREATE POLICY "Admin full access posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Admin full access media" ON media_library FOR ALL USING (true);
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (true);
CREATE POLICY "Admin full access menus" ON navigation_menus FOR ALL USING (true);

-- Create indexes for better performance
DROP INDEX IF EXISTS idx_pages_slug;
DROP INDEX IF EXISTS idx_pages_status;
DROP INDEX IF EXISTS idx_page_sections_page_id;
DROP INDEX IF EXISTS idx_blog_posts_slug;
DROP INDEX IF EXISTS idx_blog_posts_status;
DROP INDEX IF EXISTS idx_blog_posts_category;
DROP INDEX IF EXISTS idx_media_library_file_type;

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_media_library_file_type ON media_library(file_type);
