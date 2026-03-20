'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Zap, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { insforge } from '@/lib/insforge';

export function Footer() {
  const [year, setYear] = useState(2025);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('submitting');

    try {
      const { error } = await insforge.database
        .from('email_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setSubscribeStatus('error');
          setTimeout(() => setSubscribeStatus('idle'), 3000);
          return;
        }
        throw error;
      }

      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-background-dark pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded flex items-center justify-center">
                <Zap className="text-background-dark size-5" fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">PROMATIC</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Engineering the future of business with intelligent AI automation and digital solutions.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/share/1AjnzFhaBh/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/promatic.pk?igsh=aXhsN2NiOGtxdTZw" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/ai-website-design" className="text-slate-400 hover:text-primary text-sm transition-colors">AI Website Design</Link></li>
              <li><Link href="/services/ai-chatbot-development" className="text-slate-400 hover:text-primary text-sm transition-colors">AI Chatbot Development</Link></li>
              <li><Link href="/services/ai-automation-solutions" className="text-slate-400 hover:text-primary text-sm transition-colors">AI Automation Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="text-slate-400 hover:text-primary text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-primary text-sm transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Subscribe</h4>
            <p className="text-slate-400 text-sm mb-4">Get the latest AI automation insights delivered to your inbox.</p>
            {subscribeStatus === 'success' ? (
              <div className="bg-primary/10 border border-primary text-primary p-3 rounded-lg text-sm font-semibold">
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'submitting'}
                  className="bg-primary text-background-dark px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {subscribeStatus === 'submitting' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-red-500 text-xs mt-2">Already subscribed or error occurred.</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {year} PROMATIC Agency. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="/admin" className="text-primary font-bold text-sm hover:underline transition-all bg-primary/10 px-3 py-1.5 rounded-md">Admin Login</Link>
            <Link href="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
