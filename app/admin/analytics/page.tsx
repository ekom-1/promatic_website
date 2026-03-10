'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Users, MessageSquare, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          <span className="font-medium">Analytics</span>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <BarChart3 className="text-primary size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Analytics Dashboard</h1>
            <p className="text-slate-400">Track your website performance and user engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Page Views</span>
              <TrendingUp className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">12,543</h3>
              <p className="text-sm text-primary font-medium mt-1">+18.2% vs last month</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Unique Visitors</span>
              <Users className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">3,842</h3>
              <p className="text-sm text-primary font-medium mt-1">+12.5% vs last month</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Chat Sessions</span>
              <MessageSquare className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">1,284</h3>
              <p className="text-sm text-primary font-medium mt-1">+24.8% vs last month</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg. Session</span>
              <Calendar className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">4m 32s</h3>
              <p className="text-sm text-primary font-medium mt-1">+8.4% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Traffic Overview</h2>
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <BarChart3 className="size-16 mx-auto mb-4 text-slate-600" />
              <p className="text-sm">Analytics charts coming soon...</p>
              <p className="text-xs mt-2">Integrate with Google Analytics or custom tracking</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Pages</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">/</span>
                <span className="text-white font-bold">4,523 views</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">/services</span>
                <span className="text-white font-bold">2,841 views</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">/about</span>
                <span className="text-white font-bold">1,632 views</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">/contact</span>
                <span className="text-white font-bold">1,284 views</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-300 text-sm">/booking</span>
                <span className="text-white font-bold">963 views</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">Direct</span>
                <span className="text-white font-bold">42%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">Organic Search</span>
                <span className="text-white font-bold">31%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">Social Media</span>
                <span className="text-white font-bold">18%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-300 text-sm">Referral</span>
                <span className="text-white font-bold">9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
