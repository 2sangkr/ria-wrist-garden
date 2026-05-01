import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '모든 아이의 모든 예술', template: '%s | 모든 아이의 모든 예술' },
  description: '모든 아이의 모든 예술 — 어린이 작가들의 작품을 만나보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Nanum+Brush+Script&family=Jua&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
