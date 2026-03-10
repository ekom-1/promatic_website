'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContentManager() {
  const router = useRouter();
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    meta_description: '',
    meta_keywords: '',
    status: 'draft'
  });

  useEffect(() => {
    checkAuth();
    fetchPages();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPage) {
        const { error } = await supabase
          .from('pages')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingPage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([formData]);

        if (error) throw error;
      }

      setShowModal(false);
      setEditingPage(null);
      setFormData({ slug: '', title: '', meta_description: '', meta_keywords: '', status: 'draft' });
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page. Please try again.');
    }
  };

  const handleEdit = (page: any) => {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || '',
      status: page.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page.');
    }
  };

  const toggleStatus = async (page: any) => {
    try {
      const newStatus = page.status === 'published' ? 'draft' : 'published';
      const { error } = await supabase
        .from('pages')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', page.id);

      if (error) throw error;
      fetchPages();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Content Manager</h1>
            <p className="text-slate-400">Manage all website pages and content</p>
          </div>
          <button
            onClick={() => {
              setEditingPage(null);
              setFormData({ slug: '', title: '', meta_description: '', meta_keywords: '', status: 'draft' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)]"
          >
            <Plus size={20} />
            New Page
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="text-primary size-8" />
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  page.status === 'published'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {page.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{page.title}</h3>
              <p className="text-sm text-slate-400 mb-1">/{page.slug}</p>
              <p className="text-xs text-slate-500 mb-4">
                Updated: {new Date(page.updated_at).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(page)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => toggleStatus(page)}
                  className="flex items-center justify-center bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg transition-all"
                  title={page.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {page.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 px-3 py-2 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto size-16 text-slate-600 mb-4" />
            <p className="text-slate-400">No pages found. Create your first page!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Page Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="About Us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="about-us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Meta Description (SEO)</label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  rows={3}
                  placeholder="Brief description for search engines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Meta Keywords (SEO)</label>
                <input
                  type="text"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                >
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPage(null);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
