-- Create navigation_items table for both header and footer menus
create table if not exists navigation_items (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  href text not null,
  menu_type text not null check (menu_type in ('header', 'footer')),
  order_index integer not null default 0,
  parent_id uuid references navigation_items(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create index for faster queries
create index idx_navigation_menu_type on navigation_items(menu_type);
create index idx_navigation_order on navigation_items(order_index);

-- Enable Row Level Security
alter table navigation_items enable row level security;

-- Allow public read access (anyone can view navigation)
create policy "Anyone can view navigation items"
  on navigation_items for select
  using (true);

-- Only authenticated users can modify (admin only in practice)
create policy "Authenticated users can insert navigation items"
  on navigation_items for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update navigation items"
  on navigation_items for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete navigation items"
  on navigation_items for delete
  using (auth.role() = 'authenticated');

-- Trigger to update updated_at timestamp
create or replace function update_navigation_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger navigation_updated_at
  before update on navigation_items
  for each row
  execute function update_navigation_timestamp();

-- Insert default header menu items
insert into navigation_items (label, href, menu_type, order_index) values
  ('Services', '/services', 'header', 1),
  ('Case Studies', '/case-studies', 'header', 2),
  ('About', '/about', 'header', 3),
  ('Blog', '/blog', 'header', 4),
  ('Contact', '/contact', 'header', 5);

-- Insert default footer menu items
insert into navigation_items (label, href, menu_type, order_index) values
  ('Privacy Policy', '/privacy', 'footer', 1),
  ('Terms of Service', '/terms', 'footer', 2);
