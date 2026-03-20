'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { insforge } from '@/lib/insforge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  featured_image?: string;
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
    featured_image: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: []
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
      // Convert markdown content to HTML
      const htmlContent = convertMarkdownToHTML(editingPost.content);

      if (editingPost.id) {
        // Update existing post
        const { error } = await insforge.database
          .from('blog_posts')
          .update({
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: htmlContent,
            author: editingPost.author,
            published: editingPost.published,
            featured_image: editingPost.featured_image,
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
            content: htmlContent,
            author: editingPost.author,
            published: editingPost.published,
            featured_image: editingPost.featured_image,
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
      featured_image: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: []
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
      return;
    }

    setIsUploadingImage(true);
    setMessage(null);

    try {
      const fileName = `blog-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

      const { data, error } = await insforge.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = insforge.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setEditingPost({
        ...editingPost,
        featured_image: urlData.publicUrl
      });

      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to upload image' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown;

    // Convert headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Convert italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Convert unordered lists
    html = html.replace(/^\s*[-*+]\s+(.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Convert ordered lists
    html = html.replace(/^\s*\d+\.\s+(.+)$/gim, '<li>$1</li>');

    // Convert blockquotes
    html = html.replace(/^>\s+(.+)$/gim, '<blockquote>$1</blockquote>');

    // Convert line breaks to paragraphs
    const lines = html.split('\n');
    const paragraphs: string[] = [];
    let currentParagraph = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip if it's already a tag
      if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<ol') ||
          line.startsWith('<li') || line.startsWith('<blockquote') ||
          line.startsWith('</')) {
        if (currentParagraph) {
          paragraphs.push(`<p>${currentParagraph}</p>`);
          currentParagraph = '';
        }
        paragraphs.push(line);
      } else if (line === '') {
        if (currentParagraph) {
          paragraphs.push(`<p>${currentParagraph}</p>`);
          currentParagraph = '';
        }
      } else {
        if (currentParagraph) {
          currentParagraph += ' ' + line;
        } else {
          currentParagraph = line;
        }
      }
    }

    if (currentParagraph) {
      paragraphs.push(`<p>${currentParagraph}</p>`);
    }

    html = paragraphs.join('\n');

    return html;
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
                <label className="block text-sm font-bold text-slate-300 mb-2">Featured Image</label>
                <div className="space-y-3">
                  {editingPost.featured_image ? (
                    <div className="relative group">
                      <img
                        src={editingPost.featured_image}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-lg border border-white/10"
                      />
                      <button
                        onClick={() => setEditingPost({ ...editingPost, featured_image: '' })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                      />
                    </label>
                  )}
                  {isUploadingImage && (
                    <div className="text-center text-primary text-sm font-semibold">
                      Uploading image...
                    </div>
                  )}
                </div>
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
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Content *
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    (Just paste your text - formatting will be applied automatically)
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="font-semibold mb-2">Formatting Tips:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Start headings with ## for main sections</li>
                      <li>• Use **bold text** for emphasis</li>
                      <li>• Create lists with - or numbers</li>
                      <li>• Add links: [text](url)</li>
                    </ul>
                  </div>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={20}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-base leading-relaxed focus:ring-2 focus:ring-primary outline-none resize-y"
                    placeholder="Paste your blog content here...

## Introduction
Start with an engaging introduction that hooks your readers.

## Main Points
- Point one with details
- Point two with explanation
- Point three with examples

## Conclusion
Wrap up with key takeaways and call to action."
                  />
                </div>
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
                onClick={() => setShowPreview(!showPreview)}
                className="px-8 py-4 border border-primary/50 text-primary font-bold rounded-xl hover:bg-primary/10 transition-all"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Live Preview */}
            {showPreview && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                  Preview
                </h3>
                <article className="prose prose-invert prose-lg max-w-none">
                  {editingPost.featured_image && (
                    <div className="mb-6">
                      <img
                        src={editingPost.featured_image}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <h1 className="text-4xl font-black text-white mb-4">
                    {editingPost.title || 'Your Title Here'}
                  </h1>
                  {editingPost.excerpt && (
                    <p className="text-xl text-slate-400 mb-6">
                      {editingPost.excerpt}
                    </p>
                  )}
                  <div className="text-sm text-slate-500 mb-6">
                    By {editingPost.author || 'Author'}
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <div
                      className="blog-content text-slate-300"
                      dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(editingPost.content || '') }}
                    />
                  </div>
                </article>
              </div>
            )}
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
