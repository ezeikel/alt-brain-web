import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import Header from '@/components/Header/Header';
import LayoutWrap from '@/components/LayoutWrap/LayoutWrap';
import '@/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alt Brain',
  description: 'Supercharge your brain with Alt Brain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
