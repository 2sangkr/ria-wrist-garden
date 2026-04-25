import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'ocean-coral',
    name_ko: '바다의 산호',
    name_en: 'Ocean Coral',
    category: 'summer',
    price: 18000,
    compare_at_price: 22000,
    description:
      '여름 바다에서 영감을 받은 팔찌입니다. 산호빛 비즈와 투명한 유리 비즈가 어우러져 손목 위에 잔잔한 파도를 만들어냅니다. 리아가 직접 하나하나 꿰어 만들었어요.',
    materials: ['코랄 비즈', '유리 비즈', '스테인리스 줄'],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 3 },
      { label: 'M', wrist_cm: 16, stock: 5 },
      { label: 'L', wrist_cm: 18, stock: 2 },
    ],
    images: ['/images/placeholder-1.jpg'],
    is_featured: true,
    is_new: true,
    created_at: '2026-04-01',
  },
  {
    id: '2',
    slug: 'forest-morning',
    name_ko: '숲의 아침',
    name_en: 'Forest Morning',
    category: 'nature',
    price: 16000,
    description:
      '초록빛 세이지와 흙빛 갈색이 어우러진 자연 팔찌입니다. 숲속 산책을 떠올리게 하는 차분한 색감으로 어떤 옷에도 잘 어울립니다.',
    materials: ['나무 비즈', '세이지 비즈', '왁스 코드'],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 4 },
      { label: 'M', wrist_cm: 16, stock: 6 },
      { label: 'L', wrist_cm: 18, stock: 3 },
    ],
    images: ['/images/placeholder-2.jpg'],
    is_featured: true,
    is_new: false,
    created_at: '2026-03-15',
  },
  {
    id: '3',
    slug: 'pearl-classic',
    name_ko: '진주빛 클래식',
    name_en: 'Pearl Classic',
    category: 'classic',
    price: 22000,
    description:
      '화이트 진주 비즈와 골드 줄이 조화를 이루는 클래식 팔찌입니다. 특별한 날 선물로도, 매일 착용하기에도 좋습니다. 엄마 생일 선물로 만들기 시작한 첫 번째 작품이에요.',
    materials: ['인조 진주 비즈', '골드 줄', '골드 클래습'],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 2 },
      { label: 'M', wrist_cm: 16, stock: 4 },
      { label: 'L', wrist_cm: 18, stock: 2 },
    ],
    images: ['/images/placeholder-3.jpg'],
    is_featured: true,
    is_new: false,
    created_at: '2026-02-14',
  },
  {
    id: '4',
    slug: 'custom-name',
    name_ko: '이름 각인 팔찌',
    name_en: 'Custom Name',
    category: 'custom',
    price: 28000,
    description:
      '원하는 이름이나 단어를 각인해드립니다. 세상에 하나뿐인 나만의 팔찌. 최대 6글자까지 가능하며, 주문 시 각인할 텍스트를 남겨주세요.',
    materials: ['스테인리스 각인 비즈', '투명 비즈', '스테인리스 줄'],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 5 },
      { label: 'M', wrist_cm: 16, stock: 5 },
      { label: 'L', wrist_cm: 18, stock: 5 },
    ],
    images: ['/images/placeholder-4.jpg'],
    is_featured: false,
    is_new: true,
    created_at: '2026-04-10',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.is_featured);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}
