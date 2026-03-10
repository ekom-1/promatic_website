'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          { 
            name: formData.name,
            company: formData.company,
            email: formData.email,
            service: formData.service,
            message: formData.message,
            source_page: 'contact'
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', company: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-12 md:py-20">
        <div className="mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-[0.9] text-white">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl font-mono">
            Let's discuss how we can help transform your business with AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
              <h2 className="font-mono text-primary font-bold mb-8 uppercase tracking-widest">Send Us a Message</h2>

              {status === 'success' ? (
                <div className="bg-primary/10 border border-primary text-primary p-6 rounded-xl font-mono">
                  <p className="font-bold mb-2">Message Sent Successfully!</p>
                  <p className="text-sm">Thank you for contacting us. We'll get back to you shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-4 py-2 bg-primary text-background-dark font-bold text-sm rounded hover:brightness-110"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Your Name *</label>
                      <input
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-4 px-4 font-mono text-sm text-white placeholder:text-white/20 outline-none"
                        placeholder="John Doe"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Company Name</label>
                      <input
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-4 px-4 font-mono text-sm text-white placeholder:text-white/20 outline-none"
                        placeholder="Your Company"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Email Address *</label>
                    <input
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-4 px-4 font-mono text-sm text-white placeholder:text-white/20 outline-none"
                      placeholder="you@example.com"
                      type="email"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Service You're Interested In *</label>
                    <select
                      required
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-4 px-4 font-mono text-sm text-white outline-none appearance-none"
                    >
                      <option value="" disabled className="bg-background-dark">Select a service</option>
                      <option value="ai_website" className="bg-background-dark">AI Website Design</option>
                      <option value="ai_chatbot" className="bg-background-dark">AI Chatbot Development</option>
                      <option value="ai_automation" className="bg-background-dark">AI Automation Solutions</option>
                      <option value="other" className="bg-background-dark">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Your Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-4 px-4 font-mono text-sm text-white placeholder:text-white/20 outline-none"
                      placeholder="Tell us about your project..."
                      rows={4}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-5 bg-primary text-background-dark font-black font-mono uppercase tracking-widest rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'SENDING...' : 'Send Message'}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-500 font-mono text-xs mt-2">ERROR: Failed to send message. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 space-y-8 bg-white/5 border border-white/10 rounded-2xl">
              <h2 className="font-mono text-slate-400 font-bold mb-6 uppercase tracking-widest">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Email</p>
                    <p className="font-mono text-sm font-bold text-white">promatic.pk@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Phone</p>
                    <p className="font-mono text-sm font-bold text-white">+92 345 7175634</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Business Hours</p>
                    <p className="font-mono text-sm font-bold text-white">06:00 PM - 12:00 AM (PKT)</p>
                    <p className="font-mono text-xs text-slate-500">Daily</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Location</p>
                    <p className="font-mono text-sm font-bold text-white">Online Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
