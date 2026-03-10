'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Globe, Bot, Workflow, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Our_Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">Elite Solutions for Complex Challenges</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We don&apos;t just build tools; we engineer competitive advantages through intelligent design and automation.
          </p>
        </section>

        {/* Services List */}
        <section className="py-12 px-6 max-w-7xl mx-auto space-y-24">
          
          {/* Service 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Globe className="text-primary size-8" />
              </div>
              <h2 className="text-3xl font-black text-white">AI Website Design</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                High-performance digital experiences that adapt to user behavior in real-time. We build websites that don&apos;t just look good, but actively work to convert visitors into qualified leads.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Dynamic Content Generation</strong>
                    <span className="text-slate-500 text-sm">Personalized messaging based on visitor intent.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Intent-Based SEO</strong>
                    <span className="text-slate-500 text-sm">Automated optimization for high-converting keywords.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Conversion Rate Optimization</strong>
                    <span className="text-slate-500 text-sm">A/B testing driven by machine learning algorithms.</span>
                  </div>
                </li>
              </ul>
              <div className="pt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Start your website project <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
              <div className="relative z-10 w-full max-w-md bg-background-dark border border-white/10 rounded-xl shadow-2xl p-6 space-y-4">
                <div className="flex gap-2 mb-6">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <div className="size-3 rounded-full bg-yellow-500"></div>
                  <div className="size-3 rounded-full bg-green-500"></div>
                </div>
                <div className="h-4 w-1/3 bg-white/10 rounded"></div>
                <div className="h-8 w-3/4 bg-white/20 rounded"></div>
                <div className="h-24 w-full bg-white/5 rounded mt-4"></div>
                <div className="flex gap-4 mt-4">
                  <div className="h-10 w-32 bg-primary rounded"></div>
                  <div className="h-10 w-32 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
              <div className="relative z-10 w-full max-w-sm bg-background-dark border border-white/10 rounded-xl shadow-2xl flex flex-col h-full max-h-[300px]">
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Bot size={16} /></div>
                  <div className="font-bold text-sm text-white">AI Assistant</div>
                </div>
                <div className="p-4 flex-1 space-y-4">
                  <div className="bg-white/10 p-3 rounded-xl rounded-tl-none text-xs text-white w-3/4">How can I help you today?</div>
                  <div className="bg-primary p-3 rounded-xl rounded-tr-none text-xs text-background-dark w-3/4 ml-auto">I need to book a consultation.</div>
                  <div className="bg-white/10 p-3 rounded-xl rounded-tl-none text-xs text-white w-3/4">I can help with that! What time works best for you?</div>
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="h-8 w-full bg-white/5 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bot className="text-primary size-8" />
              </div>
              <h2 className="text-3xl font-black text-white">AI Chatbot Development</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Autonomous customer service agents that resolve 80% of inquiries without human intervention, 24/7. Capture leads while you sleep.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Natural Language Processing</strong>
                    <span className="text-slate-500 text-sm">Understands context, intent, and sentiment.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">CRM Integration</strong>
                    <span className="text-slate-500 text-sm">Automatically syncs leads and conversation history.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Multi-Language Support</strong>
                    <span className="text-slate-500 text-sm">Communicate with global clients in their native language.</span>
                  </div>
                </li>
              </ul>
              <div className="pt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Build your AI agent <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Workflow className="text-primary size-8" />
              </div>
              <h2 className="text-3xl font-black text-white">Workflow Automation</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Seamlessly connect your tech stack and eliminate manual data entry. We build custom API integrations that let your software talk to each other.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Zero-Error Data Sync</strong>
                    <span className="text-slate-500 text-sm">Eliminate human error in data transfer between systems.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Custom ERP Building</strong>
                    <span className="text-slate-500 text-sm">Tailored dashboards for your specific operational needs.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-white block">Automated Reporting</strong>
                    <span className="text-slate-500 text-sm">Real-time analytics delivered straight to your inbox.</span>
                  </div>
                </li>
              </ul>
              <div className="pt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Automate your workflows <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
              <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-4">
                <div className="w-full flex justify-between items-center">
                  <div className="size-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">APP 1</div>
                  <div className="h-px w-16 bg-primary relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 bg-primary rounded-full animate-ping"></div></div>
                  <div className="size-20 bg-primary/20 rounded-xl border border-primary flex items-center justify-center text-primary font-bold">HUB</div>
                  <div className="h-px w-16 bg-primary relative"><div className="absolute left-0 top-1/2 -translate-y-1/2 size-2 bg-primary rounded-full animate-ping"></div></div>
                  <div className="size-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">APP 2</div>
                </div>
                <div className="h-16 w-px bg-primary relative"><div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-2 bg-primary rounded-full animate-ping"></div></div>
                <div className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xs text-slate-500 mb-2">DATABASE</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => <div key={i} className="h-2 bg-white/10 rounded"></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* CTA */}
        <section className="py-24 bg-white/[0.02] border-t border-white/5 mt-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-white mb-6">Not sure where to start?</h2>
            <p className="text-slate-400 text-lg mb-10">Book a free discovery call and our experts will audit your current operations to find the highest-ROI automation opportunities.</p>
            <Link href="/booking" className="inline-block px-10 py-5 bg-primary text-background-dark rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Book Free Audit
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
