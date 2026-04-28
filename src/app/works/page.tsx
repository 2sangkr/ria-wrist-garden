import Link from 'next/link';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { ARTISTS } from '@/lib/artists';

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">

        {/* 페이지 타이틀 */}
        <div className="mb-10">
          <p className="text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-2">Works</p>
          <h1
            className="text-[28px] sm:text-[36px] text-gray-800"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            작가들의 작품
          </h1>
        </div>

        {/* 작품이 있을 때 */}
        {PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10">
            {PRODUCTS.map((product) => {
              const artist = ARTISTS.find((a) =>
                product.slug.includes(a.slug) || a.id === '1'
              );
              const isSoldOut = product.sizes.every((s) => s.stock === 0);

              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="group block">
                  {/* 썸네일 */}
                  <div className="relative aspect-square overflow-hidden mb-3"
                    style={{ borderRadius: '16px', background: '#f7f7f7' }}>
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center"
                      style={{ background: THUMB_STYLES[product.thumb_class] ?? '#f0f0f0' }}
                    >
                      <span className="font-['Playfair_Display'] italic text-[13px] text-white/60 tracking-[0.2em]">
                        — {product.name_en} —
                      </span>
                    </div>

                    {/* 뱃지 */}
                    {!isSoldOut && (product.is_new || product.is_featured) && (
                      <span className={`absolute top-3 left-3 text-[10px] font-medium tracking-[0.1em] text-white px-2 py-1 rounded-full ${product.is_new ? 'bg-pink-400' : 'bg-gray-700'}`}>
                        {product.is_featured ? 'BEST' : 'NEW'}
                      </span>
                    )}
                    {isSoldOut && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-[16px]">
                        <span className="text-[11px] font-medium text-gray-500 border border-gray-400 px-3 py-1">SOLD OUT</span>
                      </div>
                    )}

                    {/* 작가 태그 */}
                    {artist && (
                      <span className="absolute bottom-3 right-3 text-[10px] bg-white/80 text-gray-600 px-2 py-0.5 rounded-full">
                        {artist.name}
                      </span>
                    )}
                  </div>

                  {/* 정보 */}
                  <p className="text-[13px] font-medium text-gray-800 mb-1 leading-snug">{product.name_ko}</p>
                  <p className="text-[11px] text-gray-400 mb-1">{product.materials.join(' · ')}</p>
                  <div className="flex items-center gap-2">
                    {product.compare_at_price && (
                      <s className="text-[11px] text-gray-300">{formatPrice(product.compare_at_price)}</s>
                    )}
                    <span className="text-[13px] font-medium text-gray-700">{formatPrice(product.price)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* 작품 없을 때 */
          <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
            <div
              className="w-24 h-24 flex items-center justify-center text-[36px] text-white/70 font-bold"
              style={{ background: '#f4c2c2', borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' }}
            >
              D
            </div>
            <p className="text-[18px] font-medium text-gray-700">곧 첫 번째 작품이 올라옵니다</p>
            <p className="text-[13px] text-gray-400">작가들이 열심히 준비 중이에요</p>
            <Link href="/" className="mt-2 text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
              ← 홈으로 돌아가기
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

const THUMB_STYLES: Record<string, string> = {
  'thumb-1': 'linear-gradient(135deg, #e8d4c4, #c8a08a)',
  'thumb-2': 'linear-gradient(135deg, #d6cfb3, #b89d7e)',
  'thumb-3': 'linear-gradient(135deg, #c8d6c0, #95a892)',
  'thumb-4': 'linear-gradient(135deg, #d8b8a8, #a87a68)',
  'thumb-5': 'linear-gradient(135deg, #e0d4c0, #b8a888)',
  'thumb-6': 'linear-gradient(135deg, #c4b8a8, #8a7d6c)',
  'thumb-7': 'linear-gradient(135deg, #ddc4b4, #b89478)',
  'thumb-8': 'linear-gradient(135deg, #d0d4c8, #9aa090)',
};
