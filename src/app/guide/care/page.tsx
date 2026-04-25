import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리 방법',
  description: '핸드메이드 팔찌를 오래 예쁘게 착용하는 관리 방법.',
};

const CARE_TIPS = [
  {
    title: '물 접촉 피하기',
    desc: '수영이나 샤워 전에 팔찌를 벗어주세요. 물에 장시간 노출되면 줄이 늘어나거나 비즈 색이 변할 수 있어요.',
  },
  {
    title: '화장품·향수 주의',
    desc: '향수, 로션, 헤어스프레이를 바른 후 팔찌를 착용하세요. 화학 성분이 비즈나 줄에 영향을 줄 수 있어요.',
  },
  {
    title: '보관 방법',
    desc: '착용하지 않을 때는 직사광선을 피해 서늘한 곳에 보관하세요. 함께 제공되는 작은 파우치를 활용하면 좋아요.',
  },
  {
    title: '세척이 필요하다면',
    desc: '부드러운 천으로 가볍게 닦아주세요. 세제나 물 세척은 팔찌 손상의 원인이 됩니다.',
  },
  {
    title: '충격 주의',
    desc: '비즈는 충격에 약할 수 있어요. 운동이나 작업 시에는 팔찌를 벗어두는 걸 권장해요.',
  },
];

export default function CarePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="section-subtitle mb-3">Guide</p>
        <h1 className="section-title">관리 방법</h1>
        <p className="font-body text-sm text-ink-soft mt-4 leading-relaxed">
          리아가 정성껏 만든 팔찌를 오래오래 예쁘게 착용하는 방법을 알려드려요.
        </p>
      </div>

      <div className="space-y-6">
        {CARE_TIPS.map((tip, idx) => (
          <div key={tip.title} className="flex gap-6 pb-6 border-b border-line last:border-b-0">
            <span className="font-display italic text-rose text-2xl shrink-0 leading-none">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-korean text-sm text-ink mb-2">{tip.title}</h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-ink p-8">
        <p className="font-display italic text-xl text-cream mb-3">
          "잘 관리하면 1~2년도 예쁘게 착용할 수 있어요."
        </p>
        <p className="font-body text-sm text-cream/60">
          수리나 교체가 필요하다면 카카오톡 채널(@리아의손목정원)로 문의해 주세요.
          직접 만든 것이니 AS도 직접 해드릴 수 있어요.
        </p>
      </div>
    </div>
  );
}
