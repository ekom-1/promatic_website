'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { DottedSurface } from '@/components/DottedSurface';
import { Globe, Bot, Workflow, ArrowRight, CheckCircle2, Sparkles, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Header with Spotlight */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <DottedSurface />

          {/* Spotlight Effect - Center */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.15),rgba(57,255,20,0.08)_40%,transparent_70%)] blur-2xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.2),transparent_50%)] animate-pulse"></div>
          </div>

          {/* Secondary gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.05),transparent_50%)] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-5xl mx-auto text-white">
              Transform Your Business with <span className="text-primary italic">AI</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
              Cutting-edge solutions designed to automate, optimize, and scale your operations with intelligent AI-powered systems.
            </p>
          </div>
        </section>

        {/* Service Cards Grid - From Home Page */}
        <section className="py-24 max-w-7xl mx-auto px-6">
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

        {/* Detailed Services with Card Layout */}
        <section className="relative py-24 px-6 max-w-7xl mx-auto space-y-24 overflow-hidden">
          {/* Spotlight Effect - Left Side */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_60%)] blur-3xl"></div>
          </div>

          {/* Spotlight Effect - Right Side */}
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_60%)] blur-3xl"></div>
          </div>

          {/* Service 1 - AI Website Design */}
          <div className="relative group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-primary/20 transition-all duration-500">
              <div className="order-2 lg:order-1 space-y-6 relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Globe className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h2 className="text-4xl font-black text-white">AI Website Design</h2>
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
              <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-md bg-background-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/10">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <div className="size-3 rounded-full bg-yellow-500"></div>
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 flex-1 bg-white/5 rounded px-3 py-1 text-xs text-slate-500">yourwebsite.com</div>
                  </div>

                  {/* Website Content */}
                  <div className="p-6 space-y-4">
                    {/* Hero Section */}
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-primary/30 rounded"></div>
                      <div className="h-6 w-3/4 bg-white/20 rounded"></div>
                      <div className="h-3 w-full bg-white/10 rounded"></div>
                      <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-2">
                      <div className="h-9 w-28 bg-primary rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center justify-center">
                        <div className="h-2 w-16 bg-background-dark/50 rounded"></div>
                      </div>
                      <div className="h-9 w-28 bg-white/10 rounded-lg flex items-center justify-center">
                        <div className="h-2 w-16 bg-white/30 rounded"></div>
                      </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-3 gap-2 pt-4">
                      <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        <div className="size-6 bg-primary/20 rounded"></div>
                        <div className="h-2 w-full bg-white/20 rounded"></div>
                        <div className="h-1.5 w-3/4 bg-white/10 rounded"></div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        <div className="size-6 bg-primary/20 rounded"></div>
                        <div className="h-2 w-full bg-white/20 rounded"></div>
                        <div className="h-1.5 w-3/4 bg-white/10 rounded"></div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        <div className="size-6 bg-primary/20 rounded"></div>
                        <div className="h-2 w-full bg-white/20 rounded"></div>
                        <div className="h-1.5 w-3/4 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2 - AI Chatbot Development */}
          <div className="relative group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-primary/20 transition-all duration-500">
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-sm bg-background-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col h-full max-h-[350px] overflow-hidden">
                  {/* Chatbot Header */}
                  <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/30">
                      <Bot size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-white">PROMATIC AI Assistant</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                        Online
                      </div>
                    </div>
                    <div className="size-8 bg-white/5 rounded-lg flex items-center justify-center">
                      <div className="size-1 bg-white/50 rounded-full"></div>
                      <div className="size-1 bg-white/50 rounded-full mx-0.5"></div>
                      <div className="size-1 bg-white/50 rounded-full"></div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 flex-1 space-y-3 overflow-hidden">
                    <div className="flex gap-2">
                      <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-primary" />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-xs text-white max-w-[80%]">
                        Hi! How can I help you today? 👋
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary p-3 rounded-2xl rounded-tr-sm text-xs text-background-dark max-w-[80%] shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                        I need help with automation for my business
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-primary" />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-xs text-white max-w-[80%]">
                        Great! I can help you with that. What type of automation are you looking for?
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex gap-2">
                      <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-primary" />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                        <div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                    <div className="flex gap-2 items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                      <div className="h-2 flex-1 bg-white/10 rounded"></div>
                      <div className="size-6 bg-primary rounded-full flex items-center justify-center">
                        <ArrowRight size={14} className="text-background-dark" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Bot className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h2 className="text-4xl font-black text-white">AI Chatbot Development</h2>
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
          </div>

          {/* Service 3 - Workflow Automation */}
          <div className="relative group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-primary/20 transition-all duration-500">
              <div className="order-2 lg:order-1 space-y-6 relative z-10">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Workflow className="text-primary group-hover:text-background-dark transition-colors size-8" />
                </div>
                <h2 className="text-4xl font-black text-white">Workflow Automation</h2>
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
              <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-md space-y-6">
                  {/* Top Row - Apps */}
                  <div className="flex justify-between items-center">
                    <div className="bg-white/10 rounded-xl border border-white/20 p-4 space-y-2 w-24">
                      <div className="size-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                        <Globe size={16} className="text-blue-400" />
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded"></div>
                      <div className="h-1 w-3/4 bg-white/10 rounded mx-auto"></div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 bg-primary rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl border border-white/20 p-4 space-y-2 w-24">
                      <div className="size-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                        <Zap size={16} className="text-purple-400" />
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded"></div>
                      <div className="h-1 w-3/4 bg-white/10 rounded mx-auto"></div>
                    </div>
                  </div>

                  {/* Center Hub */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Connecting Lines */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary to-transparent"></div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-primary to-transparent"></div>

                      {/* Hub */}
                      <div className="bg-primary/20 rounded-2xl border-2 border-primary p-6 shadow-[0_0_30px_rgba(57,255,20,0.3)] backdrop-blur-sm">
                        <div className="text-center space-y-2">
                          <Workflow className="text-primary mx-auto" size={32} />
                          <div className="text-primary font-bold text-sm">Automation Hub</div>
                          <div className="flex gap-1 justify-center">
                            <div className="size-1.5 bg-primary rounded-full animate-pulse"></div>
                            <div className="size-1.5 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="size-1.5 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom - Database */}
                  <div className="w-full bg-background-dark border border-white/10 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="size-6 bg-green-500/20 rounded flex items-center justify-center">
                        <Target size={12} className="text-green-400" />
                      </div>
                      <div className="text-xs text-slate-400 font-bold">DATABASE SYNC</div>
                      <div className="ml-auto flex items-center gap-1">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[10px] text-green-400">Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-2 bg-gradient-to-r from-primary/30 to-primary/10 rounded animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Last sync: 2s ago</span>
                      <span className="text-primary">↑ 1.2k records</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* CTA Section with Spotlight */}
        <section className="relative py-32 bg-white/[0.02] border-t border-white/5 mt-12 overflow-hidden">
          {/* Spotlight Effect - Bottom Center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.12),transparent_60%)] blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-black text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-slate-400 text-xl mb-12">Let's discuss how AI automation can revolutionize your operations and drive growth.</p>
            <Link href="/booking" className="inline-block px-10 py-5 bg-primary text-background-dark rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Book a Demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
