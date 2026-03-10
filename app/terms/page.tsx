'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 text-white">Terms of Service</h1>
          
          <div className="space-y-8 text-slate-400 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p>PROMATIC provides AI automation, web design, and chatbot development services. We reserve the right to modify or discontinue any part of our services at any time without notice.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of any account information and for all activities that occur under your account.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
              <p>In no event shall PROMATIC be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
