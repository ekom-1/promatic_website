'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AIChatbotDevelopmentPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Service_Detail</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">AI Chatbot Development</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Autonomous customer service agents that resolve 80% of inquiries without human intervention, 24/7. Capture leads while you sleep.
          </p>
        </section>

        <section className="py-12 px-6 max-w-4xl mx-auto space-y-12">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 p-8 flex items-center justify-center relative h-[400px]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
             <Bot className="text-primary size-32 relative z-10 opacity-80" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white">Always On, Always Selling</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Modern consumers expect instant answers. Our custom-trained AI chatbots understand natural language, context, and sentiment to provide human-like interactions. They qualify leads, schedule appointments, and resolve support tickets instantly.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">Natural Language Processing</strong>
                  <span className="text-slate-500 text-sm">Understands context, intent, and sentiment for natural conversations.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">CRM Integration</strong>
                  <span className="text-slate-500 text-sm">Automatically syncs leads, transcripts, and conversation history to your database.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-white block">Multi-Language Support</strong>
                  <span className="text-slate-500 text-sm">Communicate with global clients in their native language effortlessly.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to automate your customer support?</h3>
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
