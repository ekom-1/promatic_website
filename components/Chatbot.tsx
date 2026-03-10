'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/lib/supabase';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', content: string, isForm?: boolean}[]>([
    { role: 'bot', content: 'Hi! I\'m PROMATIC AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showForm]);

  // Fetch chatbot enabled status from admin with polling
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await supabase
          .from('chatbot_config')
          .select('enabled')
          .single();
        if (data) {
          setIsEnabled(data.enabled !== false);
        }
      } catch (error) {
        console.log('Config fetch error:', error);
      }
    };

    fetchConfig();

    // Poll every 5 seconds to check if enabled status changed
    const interval = setInterval(fetchConfig, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Check if bot wants to show form
      const botMessage = data.message || 'Sorry, I could not process that request.';
      const shouldShowForm = data.showForm || botMessage.toLowerCase().includes('[show_form]');

      if (shouldShowForm) {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: botMessage.replace('[show_form]', '').trim(),
          isForm: true
        }]);
        setShowForm(true);
      } else {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: botMessage
        }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Sorry, something went wrong. Please try again.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Thank you! We\'ve received your details and will contact you within 24 hours. 🎉'
      }]);
      setShowForm(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Sorry, there was an error. Please try again or contact us directly.'
      }]);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Don't render if disabled
  if (!isEnabled) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 size-14 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} fill="currentColor" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-background-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-secondary p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">PROMATIC AI</h3>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <span className="size-1.5 bg-primary rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-dark/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                    {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-primary text-background-dark rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Contact Form */}
              {showForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <h4 className="text-white font-semibold text-sm">Share Your Details</h4>
                  <form onSubmit={handleFormSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    />
                    <textarea
                      placeholder="Your Message (optional)"
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none"
                    />
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-primary text-background-dark font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {formSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              )}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 rounded-tl-none flex gap-1 items-center">
                    <span className="size-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-secondary">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-background-dark p-2 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
