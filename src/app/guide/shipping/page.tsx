import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '배송·교환·환불',
  description: '배송 안내, 교환 및 환불 정책 — 전자상거래 표준약관 기준.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="section-subtitle mb-3">Guide</p>
        <h1 className="section-title">배송·교환·환불</h1>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="font-korean text-base text-ink mb-4 pb-2 border-b border-line">배송 안내</h2>
          <div className="space-y-3 font-body text-sm text-ink-soft leading-relaxed">
            <p>· 배송 방법: CJ대한통운 택배</p>
            <p>· 배송 기간: 결제 완료 후 1~3 영업일 이내 발송 (주문 제작 상품은 3~5일)</p>
            <p>· 배송비: 3,000원 (50,000원 이상 구매 시 무료)</p>
            <p>· 제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
          </div>
        </section>

        <section>
          <h2 className="font-korean text-base text-ink mb-4 pb-2 border-b border-line">교환·환불 정책</h2>
          <div className="space-y-3 font-body text-sm text-ink-soft leading-relaxed">
            <p>· <strong className="text-ink">단순 변심</strong>: 수령 후 7일 이내 교환·환불 가능 (왕복 배송비 고객 부담)</p>
            <p>· <strong className="text-ink">상품 하자</strong>: 수령 후 30일 이내 교환·환불 가능 (배송비 당사 부담)</p>
            <p>· <strong className="text-ink">각인 상품</strong>: 주문 제작 특성상 단순 변심에 의한 환불 불가</p>
            <p>· 착용 흔적이 있거나 손상된 상품은 교환·환불이 불가합니다.</p>
          </div>
        </section>

        <section>
          <h2 className="font-korean text-base text-ink mb-4 pb-2 border-b border-line">교환·환불 신청 방법</h2>
          <div className="space-y-3 font-body text-sm text-ink-soft leading-relaxed">
            <p>1. 카카오톡 채널 <strong className="text-ink">@리아의손목정원</strong>으로 문의</p>
            <p>2. 주문번호, 교환·환불 사유, 상품 사진 전송</p>
            <p>3. 확인 후 회수 방법 안내 (영업일 기준 1~2일 이내)</p>
          </div>
        </section>

        <section className="bg-cream-deep p-6">
          <p className="font-korean text-xs tracking-widest text-ink-soft uppercase mb-3">참고사항</p>
          <p className="font-body text-xs text-ink-soft leading-relaxed">
            수공예 제품의 특성상 개체마다 약간의 색상·크기 차이가 있을 수 있습니다.
            이는 교환·환불 사유에 해당하지 않으나, 차이가 심각하다고 판단되는 경우 문의해 주세요.
            전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 처리됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
