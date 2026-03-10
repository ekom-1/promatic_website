'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, Shield, Mail, Trash2 } from 'lucide-react';

export default function UsersPage() {
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

  const users = [
    {
      id: 1,
      name: 'Umar Farooq',
      email: 'promatic.pk@gmail.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@promatic.sys',
      role: 'Admin',
      status: 'Active',
      lastLogin: '1 day ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@promatic.sys',
      role: 'Editor',
      status: 'Active',
      lastLogin: '3 days ago'
    }
  ];

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Admin</span>
          <span className="text-slate-400">/</span>
          <span className="font-medium">Users</span>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="text-primary size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">User Management</h1>
              <p className="text-slate-400">Manage admin users and their permissions</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-background-dark rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-2">
            <UserPlus size={16} />
            Add New User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Users</span>
              <Users className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{users.length}</h3>
              <p className="text-sm text-slate-500 mt-1">Active admin accounts</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Super Admins</span>
              <Shield className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">1</h3>
              <p className="text-sm text-slate-500 mt-1">Full access users</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Sessions</span>
              <Mail className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">2</h3>
              <p className="text-sm text-slate-500 mt-1">Currently logged in</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Last Login</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.role === 'Super Admin' ? 'bg-primary/20 text-primary' :
                        user.role === 'Admin' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-purple-500/20 text-purple-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-primary/20 text-primary">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-1 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-all"
                          title="Edit user"
                        >
                          <Shield size={16} />
                        </button>
                        <button
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                          title="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">User Roles & Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-lg">
              <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="text-primary size-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Super Admin</h4>
                <p className="text-sm text-slate-400">Full access to all features, settings, and user management</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-lg">
              <div className="size-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="text-blue-500 size-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Admin</h4>
                <p className="text-sm text-slate-400">Can manage content, submissions, and chatbot settings</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-lg">
              <div className="size-10 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="text-purple-500 size-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Editor</h4>
                <p className="text-sm text-slate-400">Can view and respond to submissions, limited settings access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
