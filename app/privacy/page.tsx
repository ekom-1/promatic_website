'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 text-white">Privacy Policy</h1>
          
          <div className="space-y-8 text-slate-400 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you request information, sign up for our services, or communicate with us. This may include your name, email address, company name, and any other details you choose to provide.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you related information, including confirmations and invoices. We also use your information to respond to your comments, questions, and requests.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect the security of your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us via our Contact page.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
