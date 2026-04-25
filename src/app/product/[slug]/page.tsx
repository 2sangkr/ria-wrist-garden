import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, PRODUCTS, formatPrice } from '@/lib/products';
import AddToCartButton from '@/components/product/AddToCartButton';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: '상품 없음' };
  return {
    title: product.name_ko,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="font-body text-xs text-ink-soft hover:text-ink transition-colors mb-8 inline-block tracking-wide">
        ← 전체 상품
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* 이미지 영역 */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] bg-cream-deep overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={`${product.name_ko} 팔찌 정면 사진`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-cream-deep via-line to-cream" />
            )}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col">
          <p className="font-display italic text-sm text-ink-soft tracking-widest mb-1">
            {product.name_en}
          </p>
          <h1 className="font-korean text-2xl md:text-3xl text-ink mb-4 leading-snug">
            {product.name_ko}
          </h1>

          {/* 가격 */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-line">
            {product.compare_at_price && (
              <s className="font-display text-base text-ink-soft/60">
                {formatPrice(product.compare_at_price)}
              </s>
            )}
            <span className={`font-display text-2xl ${product.compare_at_price ? 'text-rose-deep' : 'text-ink'}`}>
              {formatPrice(product.price)}
            </span>
          </div>

          {/* 옵션 + 장바구니 */}
          <AddToCartButton product={product} />

          {/* 작가 노트 */}
          <div className="mt-8 p-6 bg-cream-deep">
            <p className="font-korean text-xs tracking-widest text-ink-soft uppercase mb-3">
              작가 노트
            </p>
            <p className="font-body text-sm text-ink leading-relaxed">
              {product.description}
            </p>
            <p className="font-display italic text-sm text-rose mt-3">— 리아</p>
          </div>

          {/* 상품 정보표 (전자상거래법 의무 표기) */}
          <div className="mt-6 border border-line">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: '재질', value: product.materials.join(', ') },
                  { label: '사이즈', value: 'S(14cm) / M(16cm) / L(18cm)' },
                  { label: '제조국', value: '대한민국 (국내 수공예)' },
                  { label: '알레르기', value: '금속 알레르기가 있는 경우 착용 전 확인 권장' },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3 bg-cream-deep font-korean text-xs text-ink-soft w-24 align-top">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 주의사항 */}
          <div className="mt-6 space-y-2">
            {[
              '직접 만든 수공예 제품으로, 개체마다 약간의 차이가 있을 수 있습니다.',
              '단순 변심에 의한 교환·환불은 수령 후 7일 이내 가능합니다.',
              '착용 후 변형이나 파손의 경우 교환이 어려울 수 있습니다.',
              '물·화장품 접촉을 피해주세요.',
            ].map((note) => (
              <p key={note} className="font-body text-xs text-ink-soft leading-relaxed">
                · {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
