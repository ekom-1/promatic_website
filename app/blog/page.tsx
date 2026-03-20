'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  created_at: string;
  featured_image?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await insforge.database
        .from('blog_posts')
        .select('id, title, slug, excerpt, author, created_at, featured_image')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">The Automation Blog</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Expert insights on AI automation, digital transformation, and business efficiency.
          </p>
        </section>

        <section className="py-12 px-6 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No blog posts yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
                >
                  {post.featured_image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-white/5 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05),transparent_70%)]"></div>
                      <div className="relative z-10 text-6xl font-black text-primary/30">AI</div>
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Clock size={14} />
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-400 mb-6 text-sm flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                      <span className="text-xs font-mono text-slate-500">{post.author}</span>
                      <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                        Read article <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
