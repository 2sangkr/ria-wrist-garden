import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mymomo.gallery'),
  title: { default: '모모갤러리 — 모든 아이의 모든 예술', template: '%s | 모모갤러리' },
  description: '아이들의 작품이 빛나는 온라인 갤러리. 어린이 작가들의 그림, 핸드메이드, 일러스트를 만나보세요.',
  keywords: ['어린이 갤러리', '어린이 작가', '모모갤러리', '아이 그림', '어린이 미술', '온라인 갤러리', '초등학생 작가', '어린이 예술', 'mymomo.gallery'],
  authors: [{ name: '모모갤러리', url: 'https://mymomo.gallery' }],
  creator: '모모갤러리',
  publisher: '모모갤러리',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://mymomo.gallery',
    siteName: '모모갤러리',
    title: '모모갤러리 — 모든 아이의 모든 예술',
    description: '아이들의 작품이 빛나는 온라인 갤러리. 어린이 작가들의 그림, 핸드메이드, 일러스트를 만나보세요.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '모모갤러리',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '모모갤러리 — 모든 아이의 모든 예술',
    description: '아이들의 작품이 빛나는 온라인 갤러리.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://mymomo.gallery',
  },
  verification: {
    google: 'BQP_FbZ9CAOra4XifBR7TdvpEN6bSh5YLEanbUGWUXM',
    other: {
      'naver-site-verification': ['4e3eb9cf2fc59594239fb650bf76615fa2b49e5b'],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Archivo+Black&family=Nanum+Brush+Script&family=Jua&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
<SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
