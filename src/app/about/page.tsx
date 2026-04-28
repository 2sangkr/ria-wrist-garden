import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-12">

        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← 홈
        </Link>

        <div className="mt-12 mb-14">
          <p className="text-[12px] tracking-[0.25em] text-gray-400 uppercase mb-4">about</p>
          <h1
            className="text-[36px] sm:text-[44px] text-gray-900 leading-snug"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            꿈꾸는 2Sang
          </h1>
        </div>

        <div className="space-y-10 text-[14px] text-gray-600 leading-[2]">

          <section>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">우리는 누구인가요</h2>
            <p>
              꿈꾸는 2Sang은 청소년 작가들이 자신의 작품을 세상에 선보이는 플랫폼입니다.
              스스로의 방식으로 무언가를 만들고 있는 청소년이라면 누구나 이곳에서 작가가 될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">왜 만들었나요</h2>
            <p>
              재능 있는 청소년들이 만든 작품이 서랍 속에만 있는 게 아깝다는 생각에서 시작했습니다.
            </p>
            <p className="mt-4">
              2Sang은 <em>"두 가지 상상"</em>을 뜻합니다.
              만드는 사람의 꿈과, 받는 사람의 기쁨.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">함께하고 싶다면</h2>
            <p>초등학생부터 고등학생까지, 만들고 그리고 표현하는 청소년이라면 누구나 환영합니다.</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-[13px] font-medium text-white bg-gray-900 px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              참여 문의하기
            </a>
          </section>

        </div>

      </div>
    </div>
  );
}
