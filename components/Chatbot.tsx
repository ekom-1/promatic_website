'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { insforge } from '@/lib/insforge';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm PROMATIC AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showForm]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Fetch enabled status from InsForge
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await insforge.database
          .from('chatbot_config')
          .select('enabled')
          .single();

        if (error) {
          setIsEnabled(true);
          return;
        }

        setIsEnabled(data?.enabled !== false);
      } catch (error) {
        setIsEnabled(true);
      }
    };

    fetchConfig();
    const interval = setInterval(fetchConfig, 10000);
    return () => clearInterval(interval);
  }, []);

  // Send message
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage = data.message || 'Sorry, I could not process that request.';
      const shouldShowForm = data.showForm ||
        botMessage.toLowerCase().includes('[show_form]') ||
        botMessage.toLowerCase().includes('[open_lead_form]');

      const cleanMessage = botMessage
        .replace(/\[show_form\]/gi, '')
        .replace(/\[open_lead_form\]/gi, '')
        .trim();

      setMessages(prev => [...prev, { role: 'bot', content: cleanMessage }]);

      if (shouldShowForm && !showForm) {
        setShowForm(true);
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

  // Submit form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        content: "Thank you! We've received your details and will contact you within 24 hours. 🎉"
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

  if (!isEnabled) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button clicked! Opening chat...');
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 size-14 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-all z-[9999] cursor-pointer"
          aria-label="Open chat"
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <MessageSquare size={24} fill="currentColor" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[380px] h-[500px] sm:h-[550px] bg-background-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden">
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

          <div className="p-4 border-t border-white/10 bg-secondary">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-background-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-primary text-background-dark p-2 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
