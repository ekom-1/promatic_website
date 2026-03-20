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
  { id: '2', label: 'About', href: '/about', order_index: 2 },
  { id: '3', label: 'Contact', href: '/contact', order_index: 3 },
  { id: '4', label: 'Book Demo', href: '/booking', order_index: 4 }
];

export function Navbar() {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);

  useEffect(() => {
    // Fetch navigation items from API
    fetch('/api/navigation?menu_type=header')
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.length > 0) {
          setNavItems(result.data);
        }
      })
      .catch(error => {
        console.warn('Navigation fetch error:', error);
      });
  }, []);

  return <NavbarClient navItems={navItems} />;
}
