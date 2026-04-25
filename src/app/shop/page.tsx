import type { Metadata } from 'next';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '전체 상품',
  description: '리아의 손목정원 전체 상품 목록. 여름, 클래식, 자연, 각인 팔찌를 만나보세요.',
};

const CATEGORIES = [
  { slug: 'all', label: '전체' },
  { slug: 'summer', label: '여름' },
  { slug: 'classic', label: '클래식' },
  { slug: 'nature', label: '자연' },
  { slug: 'custom', label: '이름 각인' },
];

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <p className="section-subtitle mb-3">Shop</p>
        <h1 className="section-title">전체 상품</h1>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 flex-wrap mb-10 border-b border-line pb-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === 'all' ? '/shop' : `/shop/${cat.slug}`}
            className={`font-body text-xs tracking-widest px-4 py-2 transition-all ${
              cat.slug === 'all'
                ? 'bg-ink text-cream'
                : 'text-ink-soft hover:text-ink border border-line hover:border-ink'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {PRODUCTS.length === 0 && (
        <div className="text-center py-24">
          <p className="font-body text-ink-soft">등록된 상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
