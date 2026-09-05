import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: '모모갤러리는 어린 작가들의 공간입니다. 그림, 핸드메이드, 레고—무엇이든 작품이 됩니다.',
  alternates: {
    canonical: 'https://mymomo.gallery/about',
  },
  openGraph: {
    title: '소개 — 모모갤러리',
    description: '모모갤러리는 어린 작가들의 공간입니다. 그림, 핸드메이드, 레고—무엇이든 작품이 됩니다.',
    url: 'https://mymomo.gallery/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-12">

        <div className="mt-8 mb-14">
          <p className="text-[12px] tracking-[0.25em] text-gray-400 uppercase mb-4">about</p>
          <h1
            className="text-[36px] sm:text-[44px] text-gray-900 leading-snug"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            모든 아이의 모든 예술
          </h1>
        </div>

        <div className="space-y-10 text-[14px] text-gray-600 leading-[2]">

          <section>
            <p>
              모모갤러리는 어린 작가들의 공간이에요.
            </p>
            <p className="mt-4">
              그림이든, 핸드메이드든, 레고든—<br />
              네가 만든 것이라면 무엇이든 여기서 작품이 됩니다.
            </p>
          </section>

          <section>
            <p>
              작가로 등록하면 나만의 갤러리 페이지가 생겨요.<br />
              내 작품을 올리고, 친구들에게 링크를 보내보세요.
            </p>
            <p className="mt-4">
              친구가 내 페이지를 보고 "나도 올리고 싶다"고 한다면—<br />
              그 친구도 이곳의 작가가 될 수 있어요.
            </p>
          </section>

          <section>
            <p>
              모모갤러리는 지금도 새로운 작가를 기다리고 있어요.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">작가가 되고 싶다면</h2>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScpB6jkb5a05_y_p4GsIPSOLZSXWDApX61UBZ44oSTse3oPPg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[13px] font-medium text-white bg-gray-900 px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              나도 작가 되기 →
            </a>
          </section>

        </div>

      </div>
    </div>
  );
}
