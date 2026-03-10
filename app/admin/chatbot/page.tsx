'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Save, Power } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ChatbotSettingsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState({
    api_key: '',
    model: 'gemini-2.0-flash-exp',
    system_prompt: '',
    enabled: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/admin/auth', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
        }
      } catch (error) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/chatbot-config');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, [isAuthenticated]);

  const handleSaveConfig = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/chatbot-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setSaveMessage('Configuration saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setSaveMessage('Error saving configuration');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-primary text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Admin</span>
          <span className="text-slate-400">/</span>
          <span className="font-medium">Chatbot Settings</span>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bot className="text-primary size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Chatbot Configuration</h1>
            <p className="text-slate-400">Manage your AI chatbot settings and behavior</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Chatbot Status</h2>
              <p className="text-sm text-slate-400">Enable or disable the chatbot on your website</p>
            </div>
            <button
              onClick={() => setConfig({ ...config, enabled: !config.enabled })}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${config.enabled ? 'bg-primary shadow-[0_0_10px_rgba(57,255,20,0.3)]' : 'bg-slate-600'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-7' : 'translate-x-1'}`}></span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-slate-400 tracking-wider">Google Gemini API Key</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none p-3 placeholder:text-slate-600 font-mono text-sm"
              placeholder="AIzaSy..."
              value={config.api_key}
              onChange={(e) => setConfig({ ...config, api_key: e.target.value })}
            />
            <p className="text-xs text-slate-500">Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-primary hover:underline">Google AI Studio</a></p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-slate-400 tracking-wider">Model Selection</label>
            <select
              className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none p-3"
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
            >
              <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
              <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite (Preview)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash 8B</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-slate-400 tracking-wider">System Prompt</label>
            <textarea
              className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none p-3 placeholder:text-slate-600"
              placeholder="Define the chatbot's personality and rules..."
              rows={6}
              value={config.system_prompt}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
            ></textarea>
            <p className="text-xs text-slate-500">This prompt defines how your chatbot behaves and responds to users</p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={handleSaveConfig}
              disabled={isSaving}
              className="w-full bg-primary text-background-dark font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
            {saveMessage && (
              <p className={`text-sm mt-3 text-center ${saveMessage.includes('success') ? 'text-primary' : 'text-red-500'}`}>
                {saveMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
