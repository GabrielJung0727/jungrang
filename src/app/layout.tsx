// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '랑구팸',
  description: '중랑구 패밀리의 공간',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="relative min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-20 pb-16 overflow-auto">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}