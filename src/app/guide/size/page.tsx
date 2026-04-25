import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사이즈 가이드',
  description: '손목 둘레 측정 방법과 팔찌 사이즈 선택 가이드.',
};

const SIZE_TABLE = [
  { size: 'S', wrist: '13 – 14 cm', fits: '가는 손목' },
  { size: 'M', wrist: '15 – 16 cm', fits: '보통 손목' },
  { size: 'L', wrist: '17 – 18 cm', fits: '굵은 손목' },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="section-subtitle mb-3">Guide</p>
        <h1 className="section-title">사이즈 가이드</h1>
      </div>

      {/* 측정 방법 */}
      <section className="mb-12">
        <h2 className="font-korean text-lg text-ink mb-6">손목 측정 방법</h2>
        <div className="bg-cream-deep p-6 space-y-4">
          {[
            { step: '01', desc: '줄자 또는 종이를 준비하세요. 종이를 가늘게 잘라 쓸 수도 있어요.' },
            { step: '02', desc: '손목의 가장 가는 부분(손목뼈 위)을 한 바퀴 둘러주세요.' },
            { step: '03', desc: '겹치는 부분의 길이를 자로 재면 손목 둘레가 나옵니다.' },
            { step: '04', desc: '아래 표에서 맞는 사이즈를 고르세요. 여유롭게 착용하고 싶다면 한 사이즈 위를 추천해요.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="font-display italic text-rose text-lg shrink-0">{item.step}</span>
              <p className="font-body text-sm text-ink leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 사이즈 표 */}
      <section className="mb-12">
        <h2 className="font-korean text-lg text-ink mb-6">사이즈 표</h2>
        <div className="border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink text-cream">
                <th className="px-6 py-4 font-korean text-xs tracking-widest text-left">사이즈</th>
                <th className="px-6 py-4 font-korean text-xs tracking-widest text-left">손목 둘레</th>
                <th className="px-6 py-4 font-korean text-xs tracking-widest text-left">해당 체형</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row, idx) => (
                <tr key={row.size} className={idx % 2 === 0 ? 'bg-cream' : 'bg-cream-deep'}>
                  <td className="px-6 py-4 font-display text-base text-rose">{row.size}</td>
                  <td className="px-6 py-4 font-display text-sm text-ink">{row.wrist}</td>
                  <td className="px-6 py-4 font-body text-xs text-ink-soft">{row.fits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-xs text-ink-soft mt-3">
          * 팔찌 길이는 손목 둘레보다 약 1~1.5cm 여유있게 제작됩니다.
        </p>
      </section>

      {/* 안내 */}
      <section className="bg-cream-deep p-6">
        <p className="font-korean text-xs tracking-widest text-ink-soft uppercase mb-3">사이즈 고민 중이라면</p>
        <p className="font-body text-sm text-ink leading-relaxed">
          경계선에 있다면 <strong>M을 추천</strong>해요. 팔찌는 약간 여유있게 착용하는 게 편하고 예쁩니다.
          특별한 사이즈가 필요하다면 카카오톡 채널(@리아의손목정원)로 문의해 주세요. 맞춤 제작도 가능해요.
        </p>
      </section>
    </div>
  );
}
