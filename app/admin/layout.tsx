'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Inbox, Bot, BarChart, Users, LogOut, Zap, FileText, Palette, Image, Menu, Newspaper } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleSignOut = () => {
    localStorage.removeItem('admin_token');
    router.push('/');
  };

  // Don't show sidebar on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0A0A0A] h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="size-8 bg-primary rounded flex items-center justify-center">
            <Zap className="text-background-dark size-5" fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">PROMATIC</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <div className="pt-4 pb-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3">CMS</div>
          </div>

          <Link
            href="/admin/content"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/content'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <FileText size={20} />
            Content Manager
          </Link>
          <Link
            href="/admin/blog"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/blog'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Newspaper size={20} />
            Blog Manager
          </Link>
          <Link
            href="/admin/design"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/design'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Palette size={20} />
            Design
          </Link>
          <Link
            href="/admin/media"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/media'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Image size={20} />
            Media Library
          </Link>
          <Link
            href="/admin/navigation"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/navigation'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Menu size={20} />
            Navigation
          </Link>

          <div className="pt-4 pb-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3">System</div>
          </div>

          <Link
            href="/admin/submissions"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/submissions'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Inbox size={20} />
            Submissions
          </Link>
          <Link
            href="/admin/chatbot"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/chatbot'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Bot size={20} />
            Chatbot Settings
          </Link>
          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/analytics'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <BarChart size={20} />
            Analytics
          </Link>
          <Link
            href="/admin/users"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
              pathname === '/admin/users'
                ? 'bg-primary text-background-dark neon-glow'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Users size={20} />
            Users
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-xl mb-4">
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <span className="font-bold text-sm">UF</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Umar Farooq</span>
              <span className="text-xs text-slate-500">Super Admin</span>
            </div>
          </div>
          <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-2 border border-white/10 rounded-lg hover:bg-white/5 text-sm font-medium transition-colors">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
