'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Download, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SubmissionsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'chatbot' | 'contact' | 'booking' | 'email'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);

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

    const fetchAllSubmissions = async () => {
      try {
        // Fetch form submissions
        const { data: formData } = await supabase
          .from('form_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch bookings
        const { data: bookingData } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch email subscriptions
        const { data: emailData } = await supabase
          .from('email_subscriptions')
          .select('*')
          .order('subscribed_at', { ascending: false });

        // Combine and normalize data
        const combined = [
          ...(formData || []).map(item => ({ ...item, source_page: item.source_page })),
          ...(bookingData || []).map(item => ({
            ...item,
            source_page: 'booking',
            message: item.notes || 'Demo booking',
            phone: '-'
          })),
          ...(emailData || []).map(item => ({
            id: item.id,
            source_page: 'email',
            name: '-',
            email: item.email,
            phone: '-',
            company: '-',
            service: '-',
            message: 'Newsletter subscription',
            created_at: item.subscribed_at
          }))
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setAllSubmissions(combined);
        setFilteredSubmissions(combined);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchAllSubmissions();
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = allSubmissions;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(sub => sub.source_page === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(sub =>
        sub.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSubmissions(filtered);
  }, [activeFilter, searchQuery, allSubmissions]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAllSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission');
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
          <span className="font-medium">All Submissions</span>
        </div>
      </header>

      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">All Submissions</h1>
            <p className="text-slate-400">View and manage all form submissions from your website</p>
          </div>
          <button className="px-4 py-2 bg-primary text-background-dark rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-2">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm w-full focus:ring-1 focus:ring-primary text-white outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeFilter === 'all' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              All ({allSubmissions.length})
            </button>
            <button
              onClick={() => setActiveFilter('chatbot')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeFilter === 'chatbot' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Chatbot ({allSubmissions.filter(s => s.source_page === 'chatbot').length})
            </button>
            <button
              onClick={() => setActiveFilter('contact')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeFilter === 'contact' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Contact ({allSubmissions.filter(s => s.source_page === 'contact').length})
            </button>
            <button
              onClick={() => setActiveFilter('booking')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeFilter === 'booking' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Bookings ({allSubmissions.filter(s => s.source_page === 'booking').length})
            </button>
            <button
              onClick={() => setActiveFilter('email')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeFilter === 'email' ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Emails ({allSubmissions.filter(s => s.source_page === 'email').length})
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Source</th>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Company</th>
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Message</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        sub.source_page === 'chatbot' ? 'bg-primary/20 text-primary' :
                        sub.source_page === 'booking' ? 'bg-purple-500/20 text-purple-500' :
                        sub.source_page === 'email' ? 'bg-orange-500/20 text-orange-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {sub.source_page}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-200">{sub.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{sub.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{sub.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{sub.company || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{sub.service || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-400 max-w-xs truncate" title={sub.message}>
                        {sub.message || 'No message'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Full message:\n\n${sub.message || 'No message'}`)}
                          className="p-1 text-primary hover:bg-primary/10 rounded transition-all"
                          title="View full message"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-all"
                          title="Delete submission"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSubmissions.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-slate-500 text-sm">
                      No submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
