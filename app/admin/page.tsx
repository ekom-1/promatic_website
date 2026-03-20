'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Settings, TrendingUp, Users, MessageSquare, Activity, Bot, Clock, LogOut } from 'lucide-react';
import { insforge } from '@/lib/insforge';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    submissions: 0,
    bots: 42,
    conversion: '18.5%',
    avgResponse: '1.2s'
  });

  const [activeTab, setActiveTab] = useState<'chatbot' | 'contact' | 'bookings' | 'subscriptions'>('chatbot');
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  // Chatbot configuration state
  const [config, setConfig] = useState({
    api_key: '',
    model: 'gemini-2.0-flash-exp',
    system_prompt: '',
    enabled: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token');

        if (!token) {
          router.push('/admin/login');
          return;
        }

        const response = await fetch('/api/admin/auth', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch chatbot leads
    const fetchChatbotLeads = async () => {
      try {
        const { data } = await insforge.database
          .from('form_submissions')
          .select('*')
          .eq('source_page', 'chatbot')
          .order('created_at', { ascending: false })
          .limit(10);

        if (data) {
          setRecentSubmissions(data);
        }
      } catch (error) {
        console.error('Error fetching chatbot leads:', error);
      }
    };

    // Fetch total submissions count (all forms + bookings + email subscriptions)
    const fetchTotalSubmissions = async () => {
      try {
        const { count: formCount } = await insforge.database
          .from('form_submissions')
          .select('*', { count: 'exact', head: true });

        const { count: bookingCount } = await insforge.database
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        const { count: emailCount } = await insforge.database
          .from('email_subscriptions')
          .select('*', { count: 'exact', head: true });

        const totalCount = (formCount || 0) + (bookingCount || 0) + (emailCount || 0);
        setStats(prev => ({ ...prev, submissions: totalCount }));
      } catch (error) {
        console.error('Error fetching total submissions:', error);
      }
    };

    // Fetch contact form submissions
    const fetchContactSubmissions = async () => {
      try {
        const { data } = await insforge.database
          .from('form_submissions')
          .select('*')
          .eq('source_page', 'contact')
          .order('created_at', { ascending: false })
          .limit(10);

        if (data) {
          setContactSubmissions(data);
        }
      } catch (error) {
        console.error('Error fetching contact submissions:', error);
      }
    };

    // Fetch bookings
    const fetchBookings = async () => {
      try {
        const { data } = await insforge.database
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (data) {
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    // Fetch email subscriptions
    const fetchSubscriptions = async () => {
      try {
        const { data } = await insforge.database
          .from('email_subscriptions')
          .select('*')
          .order('subscribed_at', { ascending: false })
          .limit(10);

        if (data) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    // Fetch chatbot configuration
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

    fetchChatbotLeads();
    fetchTotalSubmissions();
    fetchContactSubmissions();
    fetchBookings();
    fetchSubscriptions();
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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleUpdateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      console.log('Updating booking:', bookingId, 'to status:', newStatus);

      const { data, error } = await insforge.database
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .select();

      if (error) {
        console.error('InsForge error:', error);
        throw error;
      }

      console.log('Update successful:', data);

      // Refresh bookings list
      const { data: updatedBookings } = await insforge.database
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (updatedBookings) {
        setBookings(updatedBookings);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update status. Check console for details.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-primary text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Topbar */}
      <header className="h-16 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Admin</span>
          <span className="text-slate-400">/</span>
          <span className="font-medium">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="pl-10 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm w-64 focus:ring-1 focus:ring-primary text-white outline-none"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-[#0A0A0A]"></span>
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Submissions</span>
              <Activity className="text-primary size-5 neon-text-glow" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{stats.submissions.toLocaleString()}</h3>
              <p className="text-sm text-primary font-medium mt-1">+12.5% vs last month</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Bots</span>
              <Bot className="text-primary size-5 neon-text-glow" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{stats.bots}</h3>
              <p className="text-sm text-primary font-medium mt-1">+3.2% vs last month</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Conversion Rate</span>
              <TrendingUp className="text-primary size-5 neon-text-glow" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{stats.conversion}</h3>
              <p className="text-sm text-primary font-medium mt-1">+2.1% improvement</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg Response</span>
              <Clock className="text-primary size-5 neon-text-glow" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{stats.avgResponse}</h3>
              <p className="text-sm text-primary font-medium mt-1">+5.4% improvement</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area with Tabs */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col">
            {/* Tab Navigation */}
            <div className="p-6 border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('chatbot')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'chatbot' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Chatbot Leads
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'contact' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Contact Form
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'bookings' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Demo Bookings
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'subscriptions' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Email Subscribers
                </button>
              </div>
            </div>

            {/* Chatbot Leads Table */}
            {activeTab === 'chatbot' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Phone</th>
                      <th className="px-6 py-3 font-semibold">Message</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentSubmissions.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                              {sub.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="text-sm font-medium text-slate-200">{sub.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{sub.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{sub.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-400 max-w-xs truncate" title={sub.message}>
                            {sub.message || 'No message'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {recentSubmissions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                          No chatbot leads yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Contact Form Submissions Table */}
            {activeTab === 'contact' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Company</th>
                      <th className="px-6 py-3 font-semibold">Service</th>
                      <th className="px-6 py-3 font-semibold">Message</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contactSubmissions.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-200">{sub.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{sub.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{sub.company || '-'}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{sub.service}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-400 max-w-xs truncate" title={sub.message}>
                            {sub.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {contactSubmissions.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 text-sm">
                          No contact form submissions yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Demo Bookings Table */}
            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Company</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                      <th className="px-6 py-3 font-semibold">Time</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map((booking, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-200">{booking.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{booking.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{booking.company || '-'}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{booking.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{booking.time}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            booking.status === 'confirmed' ? 'bg-primary/20 text-primary' :
                            'bg-slate-500/20 text-slate-500'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {booking.status !== 'confirmed' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                className="px-3 py-1 bg-primary/20 text-primary rounded text-xs font-bold hover:bg-primary/30 transition-all"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                className="px-3 py-1 bg-red-500/20 text-red-500 rounded text-xs font-bold hover:bg-red-500/30 transition-all"
                              >
                                Cancel
                              </button>
                            )}
                            {booking.status !== 'pending' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'pending')}
                                className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs font-bold hover:bg-yellow-500/30 transition-all"
                              >
                                Pending
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 text-sm">
                          No demo bookings yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Email Subscriptions Table */}
            {activeTab === 'subscriptions' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Subscribed Date</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscriptions.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-200">{sub.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {new Date(sub.subscribed_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            sub.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-slate-500/20 text-slate-500'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {subscriptions.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm">
                          No email subscribers yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Chatbot Settings Panel */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Bot Configuration</h2>
              <button className="size-8 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:brightness-110 transition-all">
                <Settings size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">AI Assistance</label>
                <button
                  onClick={() => setConfig({ ...config, enabled: !config.enabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.enabled ? 'bg-primary shadow-[0_0_10px_rgba(57,255,20,0.3)]' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Google Gemini API Key</label>
                <input
                  type="password"
                  className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none p-2 placeholder:text-slate-600 font-mono"
                  placeholder="AIzaSy..."
                  value={config.api_key}
                  onChange={(e) => setConfig({ ...config, api_key: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Model Selection</label>
                <select
                  className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none p-2"
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
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">System Prompt</label>
                <textarea
                  className="w-full bg-black/40 border border-white/10 text-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none p-2 placeholder:text-slate-600"
                  placeholder="Define the chatbot's personality and rules..."
                  rows={4}
                  value={config.system_prompt}
                  onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
                ></textarea>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                  className="w-full bg-primary text-background-dark font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
                {saveMessage && (
                  <p className={`text-xs mt-2 text-center ${saveMessage.includes('success') ? 'text-primary' : 'text-red-500'}`}>
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
