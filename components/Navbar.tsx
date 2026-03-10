'use client';

import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/services" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Services</Link>
          <Link href="/case-studies" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Case Studies</Link>
          <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">About</Link>
          <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Insights</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Contact</Link>
          <Link href="/booking" className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all neon-glow-hover">
            Book a Demo
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background-dark border-b border-white/10 p-6 flex flex-col gap-4">
          <Link href="/services" className="text-lg font-medium text-slate-300 hover:text-primary" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/case-studies" className="text-lg font-medium text-slate-300 hover:text-primary" onClick={() => setIsOpen(false)}>Case Studies</Link>
          <Link href="/about" className="text-lg font-medium text-slate-300 hover:text-primary" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/blog" className="text-lg font-medium text-slate-300 hover:text-primary" onClick={() => setIsOpen(false)}>Insights</Link>
          <Link href="/contact" className="text-lg font-medium text-slate-300 hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/booking" className="bg-primary text-background-dark px-6 py-3 rounded-lg text-center font-bold mt-4" onClick={() => setIsOpen(false)}>
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
