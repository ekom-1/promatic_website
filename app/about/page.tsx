'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Target, Eye, Lightbulb, ShieldCheck, Users, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-40 py-16 md:py-24">
          <div className="flex flex-wrap gap-2 py-4 mb-8">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
          </div>
          <div className="relative min-h-[450px] flex flex-col items-center justify-center p-8 rounded-2xl overflow-hidden border border-white/10">
            <Image 
              src="https://picsum.photos/seed/workspace/1920/1080" 
              alt="Modern clean facility" 
              fill 
              className="object-cover opacity-30 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-background-dark"></div>
            <div className="relative z-10 max-w-3xl text-center space-y-6">
              <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                Engineering the Future of <span className="text-primary">Automation</span>
              </h1>
              <p className="text-white/70 text-lg lg:text-xl font-normal leading-relaxed">
                Our mission is to empower small businesses through intelligent AI solutions and seamless integration, bridging the gap between human potential and digital precision.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 lg:px-40 py-12">
          <h2 className="text-white text-3xl font-black mb-8">Our Purpose</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-secondary/50 p-8 hover:border-primary/40 transition-colors group">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <Target size={24} />
              </div>
              <h3 className="text-white text-2xl font-bold">Our Mission</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                To deliver cutting-edge AI automation that redefines efficiency, scalability, and growth for small businesses worldwide, ensuring a sustainable digital future.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-secondary/50 p-8 hover:border-primary/40 transition-colors group">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                <Eye size={24} />
              </div>
              <h3 className="text-white text-2xl font-bold">Our Vision</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                To be the global leader in accessible AI systems, recognized for innovation that transforms how small businesses operate, scale, and serve their customers.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-6 lg:px-40 py-24 bg-white/[0.02]">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4">Core Values</h2>
            <p className="text-slate-400 text-xl">The principles that guide every breakthrough we achieve.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-secondary/50 rounded-xl border border-white/5 flex flex-col items-center text-center group transition-all hover:-translate-y-1 hover:border-primary/20">
              <Lightbulb className="text-primary size-10 mb-6" />
              <h4 className="text-white font-bold mb-3 text-lg">Innovation</h4>
              <p className="text-slate-400 text-sm leading-relaxed">We challenge the status quo to find better ways of solving complex operational problems.</p>
            </div>
            <div className="p-8 bg-secondary/50 rounded-xl border border-white/5 flex flex-col items-center text-center group transition-all hover:-translate-y-1 hover:border-primary/20">
              <ShieldCheck className="text-primary size-10 mb-6" />
              <h4 className="text-white font-bold mb-3 text-lg">Reliability</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Our automation systems are built to perform under pressure, every single time.</p>
            </div>
            <div className="p-8 bg-secondary/50 rounded-xl border border-white/5 flex flex-col items-center text-center group transition-all hover:-translate-y-1 hover:border-primary/20">
              <Users className="text-primary size-10 mb-6" />
              <h4 className="text-white font-bold mb-3 text-lg">Collaboration</h4>
              <p className="text-slate-400 text-sm leading-relaxed">We believe the best solutions come from working closely as partners with our clients.</p>
            </div>
            <div className="p-8 bg-secondary/50 rounded-xl border border-white/5 flex flex-col items-center text-center group transition-all hover:-translate-y-1 hover:border-primary/20">
              <Leaf className="text-primary size-10 mb-6" />
              <h4 className="text-white font-bold mb-3 text-lg">Efficiency</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Optimizing digital resources to minimize waste, reduce costs, and maximize ROI.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
