import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/products';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const badge = product.is_featured
    ? 'BEST'
    : product.is_new
    ? 'NEW'
    : product.sizes.every((s) => s.stock === 0)
    ? 'SOLD OUT'
    : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      aria-label={`${product.name_ko} 상품 페이지로 이동`}
    >
      {/* 이미지 영역 — 4:5 비율 */}
      <div className="relative overflow-hidden bg-cream-deep aspect-[4/5]">
        {badge && (
          <span className="absolute top-3 left-3 z-10 font-display text-xs tracking-widest text-cream bg-ink px-2 py-1">
            {badge}
          </span>
        )}
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={`${product.name_ko} 팔찌 정면 사진`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          /* 실제 사진 없을 때 그라디언트 플레이스홀더 */
          <div className="absolute inset-0 bg-gradient-to-br from-cream-deep via-line to-cream" />
        )}
        <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1" />
      </div>

      {/* 상품 정보 */}
      <div className="pt-3 pb-1 px-1">
        <p className="font-korean text-xs text-ink-soft tracking-widest uppercase mb-1">
          {product.name_en}
        </p>
        <h3 className="font-korean text-sm text-ink mb-2 leading-snug">
          {product.name_ko}
        </h3>
        <div className="flex items-center gap-2">
          {product.compare_at_price && (
            <s className="font-display text-sm text-ink-soft/60">
              {formatPrice(product.compare_at_price)}
            </s>
          )}
          <span className={`font-display text-base ${product.compare_at_price ? 'text-rose-deep' : 'text-ink'}`}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
