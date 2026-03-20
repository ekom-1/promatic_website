'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import { insforge } from '@/lib/insforge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'PROMATIC Team',
    published: false,
    seo_title: '',
    seo_description: '',
    seo_keywords: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await insforge.database
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPost.title || !editingPost.slug || !editingPost.content) {
      setMessage({ type: 'error', text: 'Title, slug, and content are required' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      if (editingPost.id) {
        // Update existing post
        const { error } = await insforge.database
          .from('blog_posts')
          .update({
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            author: editingPost.author,
            published: editingPost.published,
            seo_title: editingPost.seo_title,
            seo_description: editingPost.seo_description,
            seo_keywords: editingPost.seo_keywords,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPost.id);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Post updated successfully!' });
      } else {
        // Create new post
        const { error } = await insforge.database
          .from('blog_posts')
          .insert([{
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            author: editingPost.author,
            published: editingPost.published,
            seo_title: editingPost.seo_title,
            seo_description: editingPost.seo_description,
            seo_keywords: editingPost.seo_keywords
          }]);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Post created successfully!' });
      }

      fetchPosts();
      setTimeout(() => {
        setIsEditing(false);
        setMessage(null);
      }, 1500);
    } catch (error: any) {
      console.error('Error saving post:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to save post' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await insforge.database
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
      setMessage({ type: 'success', text: 'Post deleted successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage({ type: 'error', text: 'Failed to delete post' });
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await insforge.database
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'PROMATIC Team',
      published: false,
      seo_title: '',
      seo_description: '',
      seo_keywords: []
    });
    setIsEditing(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-white">
              {editingPost.id ? 'Edit Post' : 'New Post'}
            </h1>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400"
            >
              <X size={24} />
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => {
                    setEditingPost({
                      ...editingPost,
                      title: e.target.value,
                      slug: editingPost.id ? editingPost.slug : generateSlug(e.target.value)
                    });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xl font-bold focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Slug *</label>
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono focus:ring-2 focus:ring-primary outline-none"
                  placeholder="post-url-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Excerpt</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Short description for blog listing"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Content * (HTML)</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="<h2>Heading</h2><p>Content...</p>"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Author</label>
                <input
                  type="text"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingPost.published}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                />
                <label htmlFor="published" className="text-sm font-bold text-slate-300">
                  Publish immediately
                </label>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">SEO Settings</h3>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">SEO Title</label>
                <input
                  type="text"
                  value={editingPost.seo_title}
                  onChange={(e) => setEditingPost({ ...editingPost, seo_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">SEO Description</label>
                <textarea
                  value={editingPost.seo_description}
                  onChange={(e) => setEditingPost({ ...editingPost, seo_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Meta description for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Keywords (comma separated)</label>
                <input
                  type="text"
                  value={editingPost.seo_keywords?.join(', ')}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    seo_keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="AI, automation, chatbots"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-4 bg-primary text-background-dark font-black font-mono uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Post'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">Blog Manager</h1>
            <p className="text-slate-400">Manage your blog posts and SEO</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]"
          >
            <Plus size={20} />
            New Post
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            {searchQuery ? 'No posts found' : 'No posts yet. Create your first post!'}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-black/40 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Author</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-bold">{post.title}</div>
                      <div className="text-sm text-slate-500 font-mono">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.published ? 'bg-primary/20 text-primary' : 'bg-slate-500/20 text-slate-500'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-primary transition-colors"
                          title={post.published ? 'Unpublish' : 'Publish'}
                        >
                          {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
