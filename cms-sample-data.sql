-- Insert sample pages for immediate usability
INSERT INTO pages (slug, title, meta_description, meta_keywords, status) VALUES
('home', 'Home', 'Welcome to Promatic - AI-powered automation solutions', 'AI, automation, business solutions', 'published'),
('about', 'About Us', 'Learn more about Promatic and our mission', 'about, company, team', 'published'),
('services', 'Our Services', 'Explore our AI automation services', 'services, AI solutions, automation', 'published'),
('case-studies', 'Case Studies', 'Discover how we have helped businesses transform with AI automation', 'case studies, success stories, client results, portfolio', 'published'),
('blog', 'Blog', 'Latest news and insights from Promatic', 'blog, news, articles', 'published'),
('contact', 'Contact Us', 'Get in touch with our team', 'contact, support, inquiry', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, featured_image, author, category, tags, meta_description, status, published_at) VALUES
(
  'getting-started-with-ai-automation',
  'Getting Started with AI Automation',
  'Learn how AI automation can transform your business operations and increase efficiency.',
  'AI automation is revolutionizing the way businesses operate. In this comprehensive guide, we''ll explore the fundamentals of AI automation and how you can implement it in your organization.

## What is AI Automation?

AI automation combines artificial intelligence with automated processes to handle tasks that traditionally required human intervention. This technology can analyze data, make decisions, and execute actions with minimal human oversight.

## Benefits of AI Automation

1. **Increased Efficiency**: Automate repetitive tasks and free up your team for strategic work
2. **Cost Reduction**: Lower operational costs by reducing manual labor
3. **Improved Accuracy**: Minimize human errors in data processing and decision-making
4. **24/7 Operations**: AI systems can work around the clock without breaks

## Getting Started

To begin your AI automation journey:

1. Identify repetitive tasks in your workflow
2. Evaluate AI automation tools that fit your needs
3. Start with a pilot project
4. Measure results and scale gradually

Contact us to learn how Promatic can help you implement AI automation in your business.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  'Admin',
  'AI & Automation',
  ARRAY['AI', 'automation', 'business', 'technology'],
  'Discover how AI automation can transform your business operations',
  'published',
  NOW()
),
(
  'top-5-ai-tools-for-2026',
  'Top 5 AI Tools for Business in 2026',
  'Explore the most powerful AI tools that are helping businesses succeed in 2026.',
  'The AI landscape is evolving rapidly. Here are the top 5 AI tools that every business should consider in 2026.

## 1. ChatGPT Enterprise

Advanced conversational AI for customer service and internal operations.

## 2. Midjourney Pro

AI-powered design and creative content generation.

## 3. GitHub Copilot

AI pair programming for faster software development.

## 4. Jasper AI

Content creation and marketing automation.

## 5. Promatic AI Suite

Comprehensive AI automation platform for business processes.

Each of these tools offers unique capabilities that can help streamline your operations and drive growth.',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
  'Admin',
  'Technology',
  ARRAY['AI tools', 'business software', '2026', 'productivity'],
  'The best AI tools for businesses in 2026',
  'published',
  NOW()
),
(
  'ai-chatbots-customer-service',
  'How AI Chatbots Are Revolutionizing Customer Service',
  'AI chatbots are changing the game for customer support. Learn how to implement them effectively.',
  'Customer service is being transformed by AI chatbots. Here''s everything you need to know about implementing chatbots in your business.

## The Rise of AI Chatbots

Modern AI chatbots can handle complex queries, understand context, and provide personalized responses. They''re available 24/7 and can manage thousands of conversations simultaneously.

## Key Benefits

- **Instant Response Times**: No more waiting in queues
- **Consistent Service Quality**: Every customer gets the same high-quality experience
- **Cost Efficiency**: Handle more queries with fewer resources
- **Data Collection**: Gather valuable insights from customer interactions

## Implementation Best Practices

1. Define clear use cases
2. Train your chatbot with real customer data
3. Provide easy escalation to human agents
4. Continuously monitor and improve performance

Ready to implement AI chatbots? Contact Promatic for a consultation.',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
  'Admin',
  'Customer Service',
  ARRAY['chatbots', 'customer service', 'AI', 'support'],
  'Learn how AI chatbots are transforming customer service',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample page sections for home page
INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content)
SELECT
  p.id,
  'hero',
  1,
  true,
  jsonb_build_object(
    'heading', 'Transform Your Business with AI Automation',
    'subheading', 'Powerful AI solutions that streamline operations and drive growth',
    'cta_text', 'Get Started',
    'cta_link', '/contact',
    'background_image', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920'
  )
FROM pages p WHERE p.slug = 'home'
ON CONFLICT DO NOTHING;

INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content)
SELECT
  p.id,
  'features',
  2,
  true,
  jsonb_build_object(
    'heading', 'Why Choose Promatic',
    'features', jsonb_build_array(
      jsonb_build_object('icon', 'Zap', 'title', 'Lightning Fast', 'description', 'Deploy AI solutions in days, not months'),
      jsonb_build_object('icon', 'Shield', 'title', 'Secure & Reliable', 'description', 'Enterprise-grade security and 99.9% uptime'),
      jsonb_build_object('icon', 'TrendingUp', 'title', 'Scalable', 'description', 'Grow your automation as your business expands')
    )
  )
FROM pages p WHERE p.slug = 'home'
ON CONFLICT DO NOTHING;

INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content)
SELECT
  p.id,
  'cta',
  3,
  true,
  jsonb_build_object(
    'heading', 'Ready to Get Started?',
    'description', 'Join hundreds of businesses already using Promatic AI',
    'cta_text', 'Book a Demo',
    'cta_link', '/booking'
  )
FROM pages p WHERE p.slug = 'home'
ON CONFLICT DO NOTHING;

-- Insert sample page sections for case studies page
INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content)
SELECT
  p.id,
  'hero',
  1,
  true,
  jsonb_build_object(
    'heading', 'Success Stories',
    'subheading', 'See how businesses are transforming with Promatic AI automation',
    'background_image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920'
  )
FROM pages p WHERE p.slug = 'case-studies'
ON CONFLICT DO NOTHING;

INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content)
SELECT
  p.id,
  'case_studies_grid',
  2,
  true,
  jsonb_build_object(
    'heading', 'Client Success Stories',
    'case_studies', jsonb_build_array(
      jsonb_build_object(
        'title', 'E-commerce Automation',
        'client', 'TechRetail Inc.',
        'description', 'Reduced order processing time by 80% with AI-powered automation',
        'results', '80% faster processing, 95% accuracy, $500K annual savings',
        'image', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600'
      ),
      jsonb_build_object(
        'title', 'Customer Support AI',
        'client', 'ServicePro Solutions',
        'description', 'Implemented AI chatbot handling 10,000+ queries daily',
        'results', '24/7 availability, 90% query resolution, 60% cost reduction',
        'image', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600'
      ),
      jsonb_build_object(
        'title', 'Data Analytics Platform',
        'client', 'FinanceHub Corp',
        'description', 'Automated financial reporting and predictive analytics',
        'results', 'Real-time insights, 70% time savings, improved forecasting',
        'image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600'
      )
    )
  )
FROM pages p WHERE p.slug = 'case-studies'
ON CONFLICT DO NOTHING;
