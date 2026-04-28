import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-800 mb-2">전체 작품</h1>
        <p className="text-[13px] text-gray-400 mb-10">청소년 작가들이 직접 만든 작품을 모두 모았습니다.</p>

        {PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-300 text-[15px]">
            아직 등록된 작품이 없습니다.<br />
            <span className="text-[13px]">곧 첫 번째 작품이 올라옵니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
