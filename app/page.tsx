'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { DottedSurface } from '@/components/DottedSurface';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowRight, Bot, Globe, Workflow, BarChart3, Clock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-32 overflow-hidden">
          <DottedSurface />

          {/* Spotlight Effect - Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.15),rgba(57,255,20,0.08)_40%,transparent_70%)] blur-2xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.2),transparent_50%)] animate-pulse"></div>
          </div>

          {/* Secondary gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.05),transparent_50%)] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 mt-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary text-xs font-bold uppercase tracking-widest">AI Automation for Small Businesses</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              Automate Your <span className="text-primary italic">Growth</span> With AI.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Save time, reduce costs, and scale operations with intelligent AI websites, chatbots, and custom automation workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/booking" className="w-full sm:w-auto px-8 py-4 bg-primary text-background-dark rounded-xl font-extrabold text-lg shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 transition-transform">
                Book a Demo
              </Link>
              <Link href="/services" className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-lg transition-all text-white">
                Explore Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-white/10 py-8 bg-white/[0.02] rounded-3xl px-6">
              <div className="text-center">
                <AnimatedCounter end={150} suffix="+" />
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Businesses Served</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={95} suffix="%" />
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Efficiency Gains</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={10} suffix="M+" />
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Tasks Automated</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={24} suffix="/7" />
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="services">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Services</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Transform Your Business with AI
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Cutting-edge solutions designed to automate, optimize, and scale your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.1)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Globe className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">AI Website Design</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  High-performance websites that adapt to user behavior, driving conversions and capturing leads automatically.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Dynamic content personalization</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>SEO optimization with AI</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Real-time analytics dashboard</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.1)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Bot className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">AI Chatbot Development</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Intelligent chatbots that handle customer inquiries, qualify leads, and provide 24/7 support autonomously.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Natural language understanding</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>CRM integration & lead capture</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Multi-language support</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.1)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Workflow className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">AI Automation Solutions</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Custom workflow automation that connects your tools, eliminates manual tasks, and scales your operations.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>API integrations & data sync</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Custom ERP dashboards</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>Automated reporting & alerts</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4">The Outcomes</h2>
                <h3 className="text-4xl font-black text-white mb-8">Work Smarter, Not Harder.</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1"><Clock className="text-primary size-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Save Operational Time</h4>
                      <p className="text-slate-400">Automate repetitive tasks so your team can focus on high-value strategic work.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><BarChart3 className="text-primary size-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Reduce Manual Work</h4>
                      <p className="text-slate-400">Eliminate human error and data entry bottlenecks with seamless API integrations.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1"><Zap className="text-primary size-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Improve Response Speed</h4>
                      <p className="text-slate-400">Engage leads instantly with intelligent chatbots that qualify prospects 24/7.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <BarChart3 className="text-primary size-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Analytics Dashboard</h4>
                      <p className="text-slate-500 text-xs">Real-time Performance</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs text-slate-400">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="text-primary size-4" />
                      <span className="text-xs text-slate-400">Time Saved</span>
                    </div>
                    <div className="text-2xl font-black text-white">847h</div>
                    <div className="text-xs text-primary mt-1">↑ 23% this month</div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-primary size-4" />
                      <span className="text-xs text-slate-400">Tasks Done</span>
                    </div>
                    <div className="text-2xl font-black text-white">12.4K</div>
                    <div className="text-xs text-primary mt-1">↑ 156% growth</div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="text-primary size-4" />
                      <span className="text-xs text-slate-400">Efficiency</span>
                    </div>
                    <div className="text-2xl font-black text-white">94%</div>
                    <div className="text-xs text-primary mt-1">↑ 8% improved</div>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 h-[240px] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-400 font-bold">AUTOMATION PERFORMANCE</span>
                    <span className="text-xs text-primary">Last 7 days</span>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="flex items-end justify-between h-[160px] gap-2">
                    {[65, 78, 85, 72, 90, 88, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-lg relative group hover:from-primary hover:to-primary/60 transition-all"
                             style={{ height: `${height}%` }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white bg-primary px-2 py-1 rounded">{height}%</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-slate-400">3 workflows active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-400">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Testimonials</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
                What Our Clients Say
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Real results from businesses that transformed with AI automation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    "PROMATIC transformed our customer service. The AI chatbot handles 85% of inquiries automatically, saving us 30+ hours per week. ROI was achieved in just 2 months!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      JD
                    </div>
                    <div>
                      <div className="text-white font-bold">John Davis</div>
                      <div className="text-slate-500 text-sm">CEO, TechStart Inc</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    "The workflow automation they built eliminated all manual data entry between our systems. Zero errors, real-time sync, and our team can focus on growth instead of admin work."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      SM
                    </div>
                    <div>
                      <div className="text-white font-bold">Sarah Martinez</div>
                      <div className="text-slate-500 text-sm">Operations Director, GrowthCo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    "Our new AI-powered website converts 3x better than our old one. The personalization engine adapts to each visitor, and we're capturing qualified leads 24/7. Game changer!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      MK
                    </div>
                    <div>
                      <div className="text-white font-bold">Michael Kim</div>
                      <div className="text-slate-500 text-sm">Founder, Digital Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-black text-white mb-8">Ready to automate your future?</h2>
            <p className="text-slate-400 text-xl mb-12">Stop losing hours to manual tasks. Let&apos;s build your intelligent ecosystem today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking" className="px-10 py-5 bg-primary text-background-dark rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                Book a Demo
              </Link>
              <Link href="/contact" className="px-10 py-5 border border-white/10 text-white rounded-xl font-bold text-xl hover:bg-white/5">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
