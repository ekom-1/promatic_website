'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'How AI Chatbots Are Revolutionizing Customer Support in 2024',
      excerpt: 'Discover how businesses are using advanced natural language processing to automate 80% of customer inquiries without sacrificing personalization.',
      category: 'AI Chatbots',
      date: 'Oct 12, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Workflow Automation for Small Businesses',
      excerpt: 'Stop doing manual data entry. Learn how connecting your tech stack with custom API integrations can save your team hundreds of hours per month.',
      category: 'Automation',
      date: 'Oct 05, 2024',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Why Your Next Website Needs to be AI-Powered',
      excerpt: 'Static websites are dead. Explore how dynamic content generation and intent-based SEO are driving 3x more conversions for forward-thinking brands.',
      category: 'Web Design',
      date: 'Sep 28, 2024',
      readTime: '6 min read'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="group rounded-3xl overflow-hidden border border-white/10 bg-secondary/50 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                <div className="h-48 bg-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05),transparent_70%)]"></div>
                  <div className="relative z-10 text-center text-white/20 font-mono text-xs uppercase tracking-widest">
                    [IMAGE PLACEHOLDER]
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">{post.category}</span>
                    <span className="text-xs font-mono text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <span className="text-xs font-mono text-slate-500">{post.date}</span>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                      Read article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
