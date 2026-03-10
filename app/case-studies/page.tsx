'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Case_Studies</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">Proven Results</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See how we&apos;ve helped businesses scale operations and increase efficiency through intelligent automation.
          </p>
        </section>

        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 hover:border-primary/50 transition-all duration-300">
              <div className="h-64 bg-white/5 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl font-black text-primary mb-2">40%</div>
                  <div className="text-sm font-bold text-white uppercase tracking-widest">Reduction in Overhead</div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-400">E-Commerce</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-400">Automation</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global Fashion Brand</h3>
                <p className="text-slate-400 mb-6 line-clamp-3">
                  We helped a global fashion brand automate their entire customer support and stock management system, resulting in a massive reduction in overhead and a 65% increase in customer retention.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  Read full study <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 hover:border-primary/50 transition-all duration-300">
              <div className="h-64 bg-white/5 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl font-black text-primary mb-2">$200k</div>
                  <div className="text-sm font-bold text-white uppercase tracking-widest">Saved in Q1</div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-400">Logistics</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-400">AI Chatbot</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">NexaLogistics</h3>
                <p className="text-slate-400 mb-6 line-clamp-3">
                  Built an automation layer for their logistics tracking and customer inquiries that saved roughly $200k in the first quarter alone by deflecting 85% of routine support tickets.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  Read full study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
