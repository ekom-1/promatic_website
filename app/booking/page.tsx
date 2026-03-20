'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2 } from 'lucide-react';
import { insforge } from '@/lib/insforge';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    time: '',
    service: 'AI Consultation',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const availableTimes = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { data, error } = await insforge.database
        .from('bookings')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            service: formData.service,
            date: formData.date,
            time: formData.time,
            notes: formData.notes,
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        console.error('Booking error:', error);
        alert(`Failed to save booking: ${error.message}`);
        setStatus('error');
        return;
      }

      console.log('Booking saved successfully:', data);
      setStatus('success');
      setStep(3);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      alert(`Unexpected error: ${error?.message || 'Unknown error'}`);
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Schedule_Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">Book Your Strategy Session</h1>
          <p className="text-slate-400 text-lg">
            Select a time to discuss how AI automation can transform your business operations.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="flex border-b border-white/10">
            <div className={`flex-1 py-4 text-center font-mono text-xs font-bold uppercase tracking-widest ${step >= 1 ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500'}`}>
              1. Select Time
            </div>
            <div className={`flex-1 py-4 text-center font-mono text-xs font-bold uppercase tracking-widest ${step >= 2 ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500'}`}>
              2. Your Details
            </div>
            <div className={`flex-1 py-4 text-center font-mono text-xs font-bold uppercase tracking-widest ${step >= 3 ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500'}`}>
              3. Confirmation
            </div>
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <CalendarIcon className="text-primary" /> Select Date
                    </h3>
                    <input
                      type="date"
                      min={minDate}
                      value={formData.date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setFormData(prev => ({ ...prev, date: newDate }));
                      }}
                      className="w-full bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-white outline-none font-mono"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Clock className="text-primary" /> Select Time
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          type="button"
                          disabled={!formData.date}
                          onClick={() => setFormData(prev => ({ ...prev, time }))}
                          className={`py-3 rounded-xl font-mono text-sm border transition-all ${
                            !formData.date ? 'opacity-50 cursor-not-allowed border-white/5 bg-white/5 text-slate-500' :
                            formData.time === time ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-background-dark text-white hover:border-primary/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-white/10">
                  <button
                    type="button"
                    disabled={!formData.date || !formData.time}
                    onClick={() => setStep(2)}
                    className="px-8 py-4 bg-primary text-background-dark font-black font-mono uppercase tracking-widest rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-background-dark border border-white/10 p-4 rounded-xl flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                      <Video size={20} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Strategy Session (30 min)</p>
                      <p className="text-slate-400 text-xs font-mono">{formData.date} at {formData.time}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-primary text-xs font-mono hover:underline">Change</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Full Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-white outline-none"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Email Address</label>
                    <input
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-white outline-none"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">Company Name (Optional)</label>
                  <input
                    value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-white outline-none"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest block text-slate-400">What would you like to discuss?</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-white outline-none"
                    rows={4}
                  ></textarea>
                </div>

                <div className="flex justify-between pt-8 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-8 py-4 bg-primary text-background-dark font-black font-mono uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-12 space-y-6">
                <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-white">Booking Confirmed!</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  Your strategy session is scheduled for <span className="text-white font-bold">{formData.date} at {formData.time}</span>. We&apos;ve sent a calendar invitation to {formData.email}.
                </p>
                <div className="pt-8">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
