'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

interface NavbarClientProps {
  navItems: NavItem[];
}

export function NavbarClient({ navItems }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const bookingItem = navItems.find(item => item.href === '/booking');
  const regularItems = navItems.filter(item => item.href !== '/booking');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="glass-header-wrapper">
      <div className={`glass-header-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="glass-header-inner">
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
      </div>
    </header>
  );
}
