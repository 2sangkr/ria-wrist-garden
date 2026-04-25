import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/products';

/* 썸네일 그라디언트 — 실제 사진으로 교체될 때까지 */
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

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const isSoldOut = product.sizes.every((s) => s.stock === 0);
  const badge = isSoldOut ? null : product.is_featured ? 'BEST' : product.is_new ? 'NEW' : null;
  const badgeIsNew = product.is_new && !product.is_featured && !isSoldOut;

  return (
    <Link href={`/product/${product.slug}`} className="group block text-left">
      {/* 썸네일 — 1:1 비율 */}
      <div className="relative aspect-square bg-[#f7f7f7] overflow-hidden mb-[14px]">
        {/* 그라디언트 배경 */}
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ background: THUMB_STYLES[product.thumb_class] ?? '#f0f0f0' }}
        >
          {/* 영문 이탤릭 레이블 */}
          <span className="absolute inset-0 flex items-center justify-center font-display italic text-[14px] text-white/65 tracking-[0.2em]">
            — {product.name_en} —
          </span>
        </div>

        {/* 뱃지 */}
        {badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-[10px] py-1 text-[10px] font-medium tracking-[0.15em] text-white ${
              badgeIsNew ? 'bg-[#c8755e]' : 'bg-ink'
            }`}
          >
            {badge}
          </span>
        )}

        {/* 품절 오버레이 */}
        {isSoldOut && (
          <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
            <span className="bg-ink text-white px-5 py-2 text-[11px] font-medium tracking-[0.2em]">
              SOLD OUT
            </span>
          </div>
        )}

        {/* 하트 버튼 */}
        <button
          className="absolute top-3 right-3 z-20 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center"
          aria-label="찜하기"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5">
            <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.5 4 4 7-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>
      </div>

      {/* 상품 정보 */}
      <div className="text-[13px] leading-[1.5] text-ink mb-2">
        <span className="font-medium text-ink-soft mr-1">상품명 :</span>
        {product.name_ko}
      </div>

      <div className="text-[11px] text-ink-mute mb-2">
        {product.materials.join(' · ')}
      </div>

      {/* 컬러 닷 */}
      {product.colors.length > 0 && (
        <div className="flex items-center gap-[6px] text-[11px] text-ink-soft mb-2">
          <span className="font-normal">상품색상 :</span>
          <span className="flex gap-1">
            {product.colors.map((c) => (
              <span
                key={c.hex}
                className="w-[10px] h-[10px] rounded-full border border-line inline-block"
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
          </span>
        </div>
      )}

      {/* 가격 */}
      <div className="text-[13px] font-medium text-ink">
        <span className="font-normal text-ink-soft mr-1">판매가 :</span>
        {product.compare_at_price && (
          <s className="text-ink-mute font-normal mr-2">{formatPrice(product.compare_at_price)}</s>
        )}
        {formatPrice(product.price)}
      </div>
    </Link>
  );
}
