import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-800 mb-10">소개</h1>

        <div className="space-y-10 text-[14px] text-gray-600 leading-loose">
          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-3">꿈꾸는 2Sang이란?</h2>
            <p>
              꿈꾸는 2Sang은 청소년 작가들이 자신의 작품을 세상에 선보이는 플랫폼입니다.
              학교 수업이 아닌 자신만의 방식으로 무언가를 만들고 있는 청소년이라면
              누구나 이곳에서 작가가 될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-3">왜 만들었나요?</h2>
            <p>
              재능 있는 청소년들이 만든 작품이 서랍 속에만 있는 게 아깝다는 생각에서 시작했습니다.
              직접 만든 팔찌, 그린 그림, 찍은 사진, 쓴 글씨 — 모든 것이 누군가에게 특별한 선물이 될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[16px] font-bold text-gray-800 mb-3">작가로 참여하고 싶다면?</h2>
            <p>
              청소년 작가라면 누구나 환영합니다. 아래 버튼으로 문의해 주세요.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 bg-gray-800 text-white text-[13px] font-medium px-6 py-3 rounded hover:bg-gray-700 transition-colors"
            >
              참여 문의하기
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
