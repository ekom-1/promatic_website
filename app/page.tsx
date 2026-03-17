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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-12 bg-white/[0.02]">
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
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4">Core Solutions</h2>
            <h3 className="text-4xl font-black text-white">AI-Powered Digital Transformation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Globe className="text-primary group-hover:text-background-dark transition-colors size-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">AI Website Design</h4>
              <p className="text-slate-400 leading-relaxed mb-6">High-performance digital experiences that adapt to user behavior, driving more conversions and leads.</p>
              <Link href="/services/ai-website-design" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Bot className="text-primary group-hover:text-background-dark transition-colors size-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">AI Chatbot Development</h4>
              <p className="text-slate-400 leading-relaxed mb-6">Autonomous customer service agents that resolve inquiries, capture leads, and support customers 24/7.</p>
              <Link href="/services/ai-chatbot-development" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Workflow className="text-primary group-hover:text-background-dark transition-colors size-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">AI Automation Solutions</h4>
              <p className="text-slate-400 leading-relaxed mb-6">Seamlessly connect your tools and eliminate manual data entry with custom workflow integrations.</p>
              <Link href="/services/ai-automation-solutions" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
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
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop&q=80"
                  alt="Business automation and analytics dashboard"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
              </div>
            </div>
          </div>
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
                Contact Sales
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
