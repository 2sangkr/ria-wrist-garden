import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory } from '@/lib/products';
import Link from 'next/link';
import { Category } from '@/types';

const CATEGORY_INFO: Record<Category, { name_ko: string; name_en: string; desc: string }> = {
  summer: {
    name_ko: '여름 시리즈',
    name_en: 'Summer',
    desc: '바다와 햇살을 담은 밝고 생기 있는 팔찌 모음',
  },
  classic: {
    name_ko: '클래식 시리즈',
    name_en: 'Classic',
    desc: '오래 두고 매일 착용하는 베이직한 디자인',
  },
  nature: {
    name_ko: '자연 시리즈',
    name_en: 'Nature',
    desc: '숲, 흙, 꽃에서 영감을 받은 자연의 색깔',
  },
  custom: {
    name_ko: '이름 각인',
    name_en: 'Custom',
    desc: '세상에 하나뿐인 나만의 팔찌. 최대 6글자 각인 가능',
  },
};

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_INFO[category as Category];
  if (!info) return { title: '카테고리 없음' };
  return {
    title: info.name_ko,
    description: info.desc,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = CATEGORY_INFO[category as Category];
  if (!info) notFound();

  const products = getProductsByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link href="/shop" className="font-body text-xs text-ink-soft hover:text-ink transition-colors mb-4 inline-block tracking-wide">
          ← 전체 상품
        </Link>
        <p className="section-subtitle mb-3">{info.name_en}</p>
        <h1 className="section-title">{info.name_ko}</h1>
        <p className="font-body text-sm text-ink-soft mt-3">{info.desc}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-24">
          <p className="font-body text-ink-soft">이 카테고리에는 아직 상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
