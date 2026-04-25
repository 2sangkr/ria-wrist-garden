import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const newProducts = PRODUCTS.filter((p) => p.is_new).slice(0, 4);
  const bestProducts = PRODUCTS.filter((p) => p.is_featured).slice(0, 4);

  return (
    <>
      {/* 히어로 배너 */}
      <div
        className="w-full h-[400px] md:h-[560px] relative overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f5f5f0 0%, #ebe6dc 40%, #e0d8cc 100%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 60%, rgba(200,160,130,0.18) 0%, transparent 35%), radial-gradient(circle at 75% 40%, rgba(160,180,150,0.15) 0%, transparent 35%)',
          }}
        />
        <div className="relative text-center px-5">
          <p className="text-[11px] tracking-[0.4em] text-ink-mute uppercase mb-6">
            Handmade with love
          </p>
          <h1 className="font-display italic text-[52px] md:text-[72px] text-ink leading-tight mb-6">
            Lia&apos;s Shop
          </h1>
          <p className="text-[13px] text-ink-soft mb-10 tracking-wide">
            초등학생 리아가 하나하나 손으로 만드는 핸드메이드 팔찌
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop/new"
              className="bg-ink text-white px-10 py-3 text-[13px] font-medium tracking-[0.1em] hover:bg-ink-soft transition-colors"
            >
              신상품 보기
            </Link>
            <Link
              href="/shop"
              className="border border-ink text-ink px-10 py-3 text-[13px] font-medium tracking-[0.1em] hover:bg-ink hover:text-white transition-colors"
            >
              전체상품
            </Link>
          </div>
        </div>
      </div>

      {/* 신상품 섹션 */}
      <section className="max-w-site mx-auto px-5 pt-16 pb-12">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-line">
          <div>
            <h2 className="text-[20px] font-bold tracking-[0.05em]">신상품</h2>
            <p className="text-[11px] text-ink-mute mt-1">New Arrivals</p>
          </div>
          <Link href="/shop/new" className="text-[12px] text-ink-soft hover:text-ink transition-colors">
            더보기 &gt;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-[50px]">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 베스트 섹션 */}
      <section className="max-w-site mx-auto px-5 pt-4 pb-16">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-line">
          <div>
            <h2 className="text-[20px] font-bold tracking-[0.05em]">베스트</h2>
            <p className="text-[11px] text-ink-mute mt-1">Best Sellers</p>
          </div>
          <Link href="/shop/best" className="text-[12px] text-ink-soft hover:text-ink transition-colors">
            더보기 &gt;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-[50px]">
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 카테고리 배너 열 */}
      <section className="max-w-site mx-auto px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { slug: 'summer',  en: 'Summer',  ko: '여름시리즈', bg: 'linear-gradient(135deg,#e8d4c4,#c8a08a)' },
            { slug: 'classic', en: 'Classic', ko: '클래식',     bg: 'linear-gradient(135deg,#d6cfb3,#b89d7e)' },
            { slug: 'nature',  en: 'Nature',  ko: '자연시리즈', bg: 'linear-gradient(135deg,#c8d6c0,#95a892)' },
            { slug: 'custom',  en: 'Custom',  ko: '주문제작',   bg: 'linear-gradient(135deg,#d8b8a8,#a87a68)' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative h-[140px] overflow-hidden flex items-center justify-center"
              style={{ background: cat.bg }}
            >
              <div className="text-center">
                <div className="font-display italic text-[22px] text-white/80 tracking-wide group-hover:text-white transition-colors">
                  {cat.en}
                </div>
                <div className="text-[10px] tracking-[0.3em] text-white/60 mt-1 group-hover:text-white/80 transition-colors">
                  {cat.ko}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
