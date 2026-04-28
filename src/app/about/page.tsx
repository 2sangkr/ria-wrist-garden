import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16">

        {/* 헤더 */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-3">About</p>
          <h1
            className="text-[36px] sm:text-[48px] text-gray-800 leading-tight"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            꿈꾸는 2Sang
          </h1>
        </div>

        {/* 크레파스 구분선 */}
        <svg width="120" height="10" viewBox="0 0 120 10" className="mb-12" aria-hidden="true">
          {[
            { color: '#e8312a', y: 2 },
            { color: '#f5c518', y: 4 },
            { color: '#1a6fce', y: 6 },
            { color: '#2db35d', y: 8 },
          ].map((l) => (
            <line key={l.color} x1="0" y1={l.y} x2="120" y2={l.y}
              stroke={l.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          ))}
        </svg>

        {/* 본문 */}
        <div className="space-y-12 text-[14px] sm:text-[15px] text-gray-600 leading-[2]">

          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-4">우리는 누구인가요</h2>
            <p>
              꿈꾸는 2Sang은 청소년 작가들이 자신의 작품을 세상에 선보이는 플랫폼입니다.
              학교 수업이 아닌 스스로의 방식으로 무언가를 만들고 있는 청소년이라면
              누구나 이곳에서 작가가 될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-4">왜 만들었나요</h2>
            <p>
              재능 있는 청소년들이 만든 작품이 서랍 속에만 있는 게 아깝다는 생각에서 시작했습니다.
              직접 만든 팔찌, 그린 그림, 찍은 사진, 쓴 글씨 —
              모든 것이 누군가에게 특별한 선물이 될 수 있습니다.
            </p>
            <p className="mt-4">
              2Sang은 <em>"두 가지 상상"</em>을 뜻합니다.
              만드는 사람의 꿈과, 받는 사람의 기쁨.
              두 가지가 만나는 곳이 여기입니다.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-4">작가로 참여하고 싶다면</h2>
            <p>
              초등학생부터 고등학생까지, 만들고 그리고 표현하는 청소년이라면 누구나 환영합니다.
              작품의 완성도보다 진심을 봅니다.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-gray-800 text-white text-[13px] font-medium px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              참여 문의하기 →
            </a>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
