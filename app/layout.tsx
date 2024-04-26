import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';
import Providers from './providers';
import Header from '@/components/Header/Header';
import LayoutWrap from '@/components/LayoutWrap/LayoutWrap';
import '@/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alt Brain: Your AI-Enhanced Digital Notebook',
  description:
    'Alt Brain combines the simplicity of a digital notebook with the power of AI to supercharge your productivity. Save links, jot down thoughts, and record audio clips—all while our AI helps you discover insights and draw connections between your snippets. Ideal for deep thinkers, researchers, and anyone looking to maximize their mental output with the aid of AI-driven analysis and suggestions.',
};
7;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="altbra.in" />
      </head>
      <body className={inter.className}>
        <Providers>
          <LayoutWrap>
            <Header className="row-start-1 row-span-1" />
            <main className="row-start-2 row-span-1">{children}</main>
          </LayoutWrap>
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
