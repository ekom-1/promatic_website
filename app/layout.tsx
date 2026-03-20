import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'PROMATIC | AI Automation & Digital Solutions',
  description: 'B2B service agency offering AI-powered website development, AI chatbot solutions, and automation systems for small businesses.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
      </head>
      <body className="bg-background-dark text-white antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            const lenis = new Lenis({
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              orientation: 'vertical',
              gestureOrientation: 'vertical',
              smoothWheel: true,
              wheelMultiplier: 1,
              smoothTouch: false,
              touchMultiplier: 2,
              infinite: false,
            });

            function raf(time) {
              lenis.raf(time);
              requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
          `
        }} />
      </body>
    </html>
  );
}
