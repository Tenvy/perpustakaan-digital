import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/provider/AuthProvider';
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Perpustakaan Web',
  description: 'Perpustakaan Web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider session={session}>
        {children}
      </Provider>
      </body>
    </html>
  );
}