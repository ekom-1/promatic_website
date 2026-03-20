'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featured_image?: string;
  created_at: string;
  seo_title?: string;
  seo_description?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await insforge.database
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      if (data) setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-20">
          <div className="text-center text-slate-400">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 -mx-6 md:mx-0">
              <div className="relative w-full h-[300px] md:h-[500px] rounded-none md:rounded-2xl overflow-hidden border-y md:border border-white/10">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-slate-500 font-mono mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                5 min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-slate-400 mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span>By {post.author}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div
              className="blog-content text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-slate-400 mb-6">
              Let's discuss how AI automation can help you achieve your goals.
            </p>
            <Link
              href="/booking"
              className="inline-block px-8 py-4 bg-primary text-background-dark font-black font-mono uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />

      <style jsx global>{`
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 800;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          color: #39FF14;
          font-weight: 700;
        }
        .blog-content a {
          color: #39FF14;
          text-decoration: underline;
        }
        .blog-content a:hover {
          text-decoration: none;
        }
        .blog-content img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .blog-content blockquote {
          border-left: 4px solid #39FF14;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #94a3b8;
        }
        .blog-content code {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875em;
          color: #39FF14;
        }
        .blog-content pre {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .blog-content pre code {
          background: none;
          padding: 0;
          color: #e2e8f0;
        }
      `}</style>
    </>
  );
}
