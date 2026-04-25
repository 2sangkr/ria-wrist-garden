import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: '전체상품',
  description: '리아샵 전체 상품 목록.',
};

export default function ShopPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <div className="max-w-site mx-auto px-5 py-[18px] text-[11px] text-ink-mute">
        <Link href="/" className="hover:text-ink transition-colors">홈</Link>
        <span className="mx-[6px]">&gt;</span>
        <span>전체상품</span>
      </div>

      {/* 카테고리 배너 */}
      <div className="max-w-site mx-auto px-5 mb-8">
        <div
          className="w-full h-[220px] relative overflow-hidden flex items-center justify-center"
          style={{ background: 'linear-gradient(90deg, #f5f5f0 0%, #ebe6dc 50%, #f5f5f0 100%)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(200,160,130,0.15) 0%, transparent 25%), radial-gradient(circle at 80% 50%, rgba(160,180,150,0.12) 0%, transparent 25%)',
            }}
          />
          <div className="relative text-center">
            <div className="font-display italic text-[48px] text-ink tracking-[0.02em]">All Products</div>
            <div className="text-[13px] tracking-[0.3em] text-ink-soft mt-2">전 체 상 품</div>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <div className="max-w-site mx-auto px-5 pb-5 text-center border-b border-line">
        <h1 className="text-[24px] font-bold tracking-[0.05em] mb-2">전체상품</h1>
        <div className="text-[12px] text-ink-soft">
          등록 제품 : <strong className="text-ink font-medium">{PRODUCTS.length}</strong>개
        </div>
      </div>

      {/* 정렬 바 */}
      <SortBar />

      {/* 상품 그리드 */}
      <div className="max-w-site mx-auto px-5 pt-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-[50px]">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <Pagination current={1} total={1} />
      </div>
    </>
  );
}

function SortBar() {
  const sorts = ['신상품', '상품명', '낮은가격', '높은가격', '제조사', '사용후기'];
  return (
    <div className="max-w-site mx-auto px-5 py-4 border-b border-line flex flex-wrap justify-between items-center gap-3">
      <div className="flex flex-wrap">
        {sorts.map((s, i) => (
          <span
            key={s}
            className={`text-[12px] px-[14px] py-1 border-r border-line last:border-r-0 cursor-pointer transition-colors ${
              i === 0 ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
            }`}
            style={i === 0 ? {} : {}}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-4 items-center text-[11px] text-ink-soft">
        <button className="border border-line bg-white px-[14px] py-[5px] text-[11px] text-ink cursor-pointer">
          상품비교
        </button>
        <select className="border border-line bg-white px-[10px] py-[5px] text-[11px] text-ink-soft">
          <option>- 조건선택 -</option>
          <option>가격대별</option>
          <option>색상별</option>
        </select>
      </div>
    </div>
  );
}

function Pagination({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-center items-center gap-2 pt-5 pb-[60px]">
      {['‹‹', '‹', ...Array.from({ length: Math.max(total, 1) }, (_, i) => String(i + 1)), '›', '››'].map(
        (p, i) => (
          <button
            key={i}
            className={`w-8 h-8 border text-[12px] flex items-center justify-center transition-colors ${
              p === String(current)
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-ink-soft border-line hover:text-ink'
            }`}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
