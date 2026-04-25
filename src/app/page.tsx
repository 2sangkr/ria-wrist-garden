import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

const CATEGORIES = [
  { slug: 'summer', name_ko: '여름 시리즈', name_en: 'Summer', desc: '바다와 햇살을 담은 밝고 생기 있는 팔찌' },
  { slug: 'classic', name_ko: '클래식 시리즈', name_en: 'Classic', desc: '오래 두고 매일 착용하는 베이직한 디자인' },
  { slug: 'nature', name_ko: '자연 시리즈', name_en: 'Nature', desc: '숲, 흙, 꽃에서 영감을 받은 자연의 색깔' },
  { slug: 'custom', name_ko: '이름 각인', name_en: 'Custom', desc: '세상에 하나뿐인 나만의 팔찌' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative min-h-[80vh] flex items-center bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-deep to-line opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl">
            <p className="font-korean text-xs tracking-widest text-ink-soft uppercase mb-6">
              Handmade with love
            </p>
            <h1 className="font-display italic text-5xl md:text-7xl text-ink leading-tight mb-6">
              손목 위에<br />
              피어나는 정원
            </h1>
            <p className="font-body text-base text-ink-soft leading-relaxed mb-10 max-w-sm">
              초등학생 리아가 하나하나 손으로 만드는<br />
              세상에 하나뿐인 팔찌를 만나보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary text-center">
                전체 상품 보기
              </Link>
              <Link href="/story" className="btn-outline text-center">
                작가 이야기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">Collection</p>
          <h2 className="section-title">시리즈 둘러보기</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group block bg-cream-deep p-6 transition-all duration-300 hover:bg-line"
            >
              <p className="font-display italic text-2xl text-rose mb-2 tracking-wide">
                {cat.name_en}
              </p>
              <h3 className="font-korean text-sm text-ink mb-2">
                {cat.name_ko}
              </h3>
              <p className="font-body text-xs text-ink-soft leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle mb-3">Best Sellers</p>
            <h2 className="section-title">인기 팔찌</h2>
          </div>
          <Link
            href="/shop"
            className="font-display italic text-sm text-ink-soft hover:text-ink transition-colors tracking-wide"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 스토리 섹션 */}
      <section className="bg-ink py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* 플레이스홀더 이미지 */}
            <div className="aspect-[4/5] bg-gradient-to-br from-ink-soft via-rose/20 to-ink" />
            <div>
              <p className="font-korean text-xs tracking-widest text-cream/40 uppercase mb-6">
                Our Story
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-cream leading-tight mb-6">
                열 살 작가,<br />리아의 이야기
              </h2>
              <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                처음 팔찌를 만든 건 엄마 생일 선물을 사줄 돈이 없어서였어요.
                색색의 비즈를 늘어놓고, 어떻게 꿰면 예쁠까 고민하면서
                첫 번째 팔찌를 완성했을 때 엄마가 울었어요.
              </p>
              <p className="font-body text-sm text-cream/70 leading-relaxed mb-8">
                지금은 방 한쪽이 작은 작업실이 됐습니다.
                학교 끝나고 숙제 마치면 비즈를 꺼내는 게 하루에서 제일 행복한 시간이에요.
              </p>
              <Link href="/story" className="font-display italic text-sm text-rose hover:text-rose-deep transition-colors tracking-wide">
                더 읽기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 배송 안내 배너 */}
      <section className="bg-cream-deep py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: '무료 배송', desc: '5만원 이상 구매 시' },
              { title: '당일 발송', desc: '오후 2시 이전 주문' },
              { title: '손편지 동봉', desc: '모든 주문에 포함' },
            ].map((item) => (
              <div key={item.title} className="py-4">
                <p className="font-korean text-sm text-ink mb-1">{item.title}</p>
                <p className="font-body text-xs text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
