import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory } from '@/lib/products';

const CATEGORY_INFO: Record<string, { name_ko: string; name_en: string }> = {
  new:     { name_ko: '신상품',     name_en: 'New Arrivals' },
  best:    { name_ko: '베스트',     name_en: 'Best Sellers' },
  summer:  { name_ko: '여름시리즈', name_en: 'Summer' },
  classic: { name_ko: '클래식',     name_en: 'Classic' },
  nature:  { name_ko: '자연시리즈', name_en: 'Nature' },
  custom:  { name_ko: '주문제작',   name_en: 'Custom' },
};

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_INFO[category];
  return { title: info?.name_ko ?? '카테고리' };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = CATEGORY_INFO[category];
  if (!info) notFound();

  const products = getProductsByCategory(category);

  return (
    <>
      {/* 브레드크럼 */}
      <div className="max-w-site mx-auto px-5 py-[18px] text-[11px] text-ink-mute">
        <Link href="/" className="hover:text-ink transition-colors">홈</Link>
        <span className="mx-[6px]">&gt;</span>
        <span>{info.name_ko}</span>
      </div>

      {/* 카테고리 배너 */}
      <div className="max-w-site mx-auto px-5 mb-8">
        <div
          className="w-full h-[220px] relative overflow-hidden flex items-center justify-center md:h-[220px] h-[140px]"
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
            <div className="font-display italic md:text-[48px] text-[32px] text-ink tracking-[0.02em]">
              {info.name_en}
            </div>
            <div className="text-[13px] tracking-[0.3em] text-ink-soft mt-2">
              2 0 2 6 &nbsp; S P R I N G
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <div className="max-w-site mx-auto px-5 pb-5 text-center border-b border-line">
        <h1 className="text-[24px] font-bold tracking-[0.05em] mb-2">{info.name_ko}</h1>
        <div className="text-[12px] text-ink-soft">
          등록 제품 : <strong className="text-ink font-medium">{products.length}</strong>개
        </div>
      </div>

      {/* 정렬 바 */}
      <div className="max-w-site mx-auto px-5 py-4 border-b border-line flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap">
          {['신상품', '상품명', '낮은가격', '높은가격', '제조사', '사용후기'].map((s, i) => (
            <span
              key={s}
              className={`text-[12px] px-[14px] py-1 border-r border-line last:border-r-0 cursor-pointer transition-colors ${
                i === 0 ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <button className="border border-line bg-white px-[14px] py-[5px] text-[11px] text-ink">상품비교</button>
          <select className="border border-line bg-white px-[10px] py-[5px] text-[11px] text-ink-soft">
            <option>- 조건선택 -</option>
            <option>가격대별</option>
          </select>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="max-w-site mx-auto px-5 pt-10 pb-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-[50px]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-ink-mute text-[13px]">
            등록된 상품이 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-2 pt-5 pb-[60px]">
          {['‹‹', '‹', '1', '›', '››'].map((p, i) => (
            <button
              key={i}
              className={`w-8 h-8 border text-[12px] flex items-center justify-center transition-colors ${
                p === '1' ? 'bg-ink text-white border-ink' : 'bg-white text-ink-soft border-line hover:text-ink'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
