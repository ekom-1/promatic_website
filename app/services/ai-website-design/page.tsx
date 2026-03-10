'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AIWebsiteDesignPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Service_Detail</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">AI Website Design</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            High-performance digital experiences that adapt to user behavior in real-time. We build websites that don&apos;t just look good, but actively work to convert visitors into qualified leads.
          </p>
        </section>

        <section className="py-12 px-6 max-w-4xl mx-auto space-y-12">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 p-8 flex items-center justify-center relative h-[400px]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
             <Globe className="text-primary size-32 relative z-10 opacity-80" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white">Why AI-Powered Websites?</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Traditional websites are static brochures. An AI-powered website is a dynamic sales engine. By leveraging machine learning, we create digital experiences that personalize content based on visitor intent, optimizing the conversion path for every single user.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">Dynamic Content Generation</strong>
                  <span className="text-slate-500 text-sm">Personalized messaging based on visitor intent and behavior.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">Intent-Based SEO</strong>
                  <span className="text-slate-500 text-sm">Automated optimization for high-converting keywords to drive organic traffic.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">Conversion Rate Optimization</strong>
                  <span className="text-slate-500 text-sm">A/B testing driven by machine learning algorithms to maximize ROI.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to upgrade your digital presence?</h3>
            <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background-dark rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Book a Consultation <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
