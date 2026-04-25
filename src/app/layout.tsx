import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: '리아의 손목정원 — 핸드메이드 팔찌',
    template: '%s | 리아의 손목정원',
  },
  description:
    '초등학생 리아가 직접 손으로 만드는 세상에 하나뿐인 핸드메이드 팔찌. 여름, 클래식, 자연, 각인 팔찌를 만나보세요.',
  keywords: ['핸드메이드 팔찌', '손목 장신구', '각인 팔찌', '수공예'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '리아의 손목정원',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
