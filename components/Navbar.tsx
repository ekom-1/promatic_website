'use client';

import { useState, useEffect } from 'react';
import { NavbarClient } from './NavbarClient';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

const defaultNavItems: NavItem[] = [
  { id: '0', label: 'Home', href: '/', order_index: 0 },
  { id: '1', label: 'Services', href: '/services', order_index: 1 },
  { id: '2', label: 'Blog', href: '/blog', order_index: 2 },
  { id: '3', label: 'About', href: '/about', order_index: 3 },
  { id: '4', label: 'Contact', href: '/contact', order_index: 4 },
  { id: '5', label: 'Book Demo', href: '/booking', order_index: 5 }
];

export function Navbar() {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);

  useEffect(() => {
    // Fetch navigation items from API
    fetch('/api/navigation?menu_type=header')
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.length > 0) {
          // Merge API data with default items, keeping defaults if not in API
          const apiHrefs = result.data.map((item: NavItem) => item.href);
          const missingDefaults = defaultNavItems.filter(
            defaultItem => !apiHrefs.includes(defaultItem.href)
          );

          // Combine and sort by order_index
          const combined = [...result.data, ...missingDefaults].sort(
            (a, b) => a.order_index - b.order_index
          );

          setNavItems(combined);
        }
        // If API returns empty or fails, keep defaultNavItems
      })
      .catch(error => {
        console.warn('Navigation fetch error:', error);
        // Keep default items on error
      });
  }, []);

  return <NavbarClient navItems={navItems} />;
}
