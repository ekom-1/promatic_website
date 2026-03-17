import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MobileMenu } from './MobileMenu';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

async function getNavigationItems(): Promise<NavItem[]> {
  try {
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('menu_type', 'header')
      .order('order_index', { ascending: true });

    if (error) {
      console.warn('Navigation fetch error:', error);
      // Return default navigation items if there's an error
      return [
        { id: '1', label: 'Services', href: '/services', order_index: 1 },
        { id: '2', label: 'About', href: '/about', order_index: 2 },
        { id: '3', label: 'Contact', href: '/contact', order_index: 3 },
        { id: '4', label: 'Book Demo', href: '/booking', order_index: 4 }
      ];
    }

    return data || [];
  } catch (error) {
    console.warn('Unexpected navigation fetch error:', error);
    // Return default navigation items if there's an unexpected error
    return [
      { id: '1', label: 'Services', href: '/services', order_index: 1 },
      { id: '2', label: 'About', href: '/about', order_index: 2 },
      { id: '3', label: 'Contact', href: '/contact', order_index: 3 },
      { id: '4', label: 'Book Demo', href: '/booking', order_index: 4 }
    ];
  }
}

export async function Navbar() {
  const navItems = await getNavigationItems();
  const bookingItem = navItems.find(item => item.href === '/booking');
  const regularItems = navItems.filter(item => item.href !== '/booking');

  return (
    <header className="glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 glass-icon">
            <Zap className="text-background-dark size-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase logo-text">PROMATIC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {regularItems.slice(0, -1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {regularItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          {bookingItem && (
            <Link
              href={bookingItem.href}
              className="cta-button"
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
