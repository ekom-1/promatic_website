import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { MobileMenu } from './MobileMenu';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

async function getNavigationItems(): Promise<NavItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .eq('menu_type', 'header')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }

  return data || [];
}

export async function Navbar() {
  const navItems = await getNavigationItems();
  const bookingItem = navItems.find(item => item.href === '/booking');
  const regularItems = navItems.filter(item => item.href !== '/booking');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded flex items-center justify-center">
            <Zap className="text-background-dark size-5" fill="currentColor" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white uppercase">PROMATIC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {regularItems.slice(0, -1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {regularItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {bookingItem && (
            <Link
              href={bookingItem.href}
              className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all neon-glow-hover"
            >
              {bookingItem.label}
            </Link>
          )}
        </div>

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
