import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Provider, { EdgeStoreProvider } from '@/provider/AuthProvider';
import { getServerSession } from 'next-auth'
import Sidebar from '@/components/sidebar/sidebar';
import Container from '@/components/elements/container';

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
          <EdgeStoreProvider>
            <div className='flex'>
              <Sidebar />
              <Container>
                {children}
              </Container>
            </div>
          </EdgeStoreProvider>
        </Provider>
      </body>
    </html>
  );
}