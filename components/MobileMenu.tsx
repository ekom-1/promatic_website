'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background-dark border-b border-white/10 p-6 flex flex-col gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={
                item.href === '/booking'
                  ? 'bg-primary text-background-dark px-6 py-3 rounded-lg text-center font-bold mt-4'
                  : 'text-lg font-medium text-slate-300 hover:text-primary'
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
