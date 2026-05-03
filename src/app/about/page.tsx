import Link from 'next/link';

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
              아이들이 그리고 만든 것들,<br />
              결국 박스에 넣어 두다가 버려지곤 했어요.
            </p>
            <p className="mt-4">
              그게 아까웠어요.
            </p>
          </section>

          <section>
            <p>
              모든 아이의 모든 예술은<br />
              그 작품들이 사라지지 않도록<br />
              온라인 갤러리로 남기는 공간이에요.
            </p>
          </section>

          <section>
            <p>
              그림이든, 핸드메이드든, 레고든—<br />
              아이가 만든 것이라면 무엇이든 여기서 작품이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">함께하고 싶다면</h2>
            <p>내 아이의 작품을 갤러리에 올리고 싶다면 언제든 문의해주세요.</p>
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
