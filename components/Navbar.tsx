import { supabase } from '@/lib/supabase';
import { NavbarClient } from './NavbarClient';

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
  return <NavbarClient navItems={navItems} />;
}
