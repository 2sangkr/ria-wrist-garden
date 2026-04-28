import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: '리아샵 - 핸드메이드 팔찌',
    template: '%s | 리아샵',
  },
  description: '초등학생 리아가 직접 손으로 만드는 핸드메이드 팔찌 쇼핑몰.',
  keywords: ['핸드메이드 팔찌', '손목 장신구', '각인 팔찌', '수공예'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '리아샵',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[13px]">
        {children}
      </body>
    </html>
  );
}
