import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'ocean-coral',
    name_ko: '바다의 산호 팔찌',
    name_en: 'ocean coral',
    category: 'summer',
    price: 18000,
    description: '여름 바다에서 영감을 받은 팔찌입니다. 코랄빛 비즈와 투명한 유리 비즈가 어우러져 손목 위에 잔잔한 파도를 만들어냅니다.',
    materials: ['코랄 비즈', '스테인리스 줄'],
    colors: [{ name: '코랄', hex: '#d4806b' }, { name: '살몬', hex: '#e8b3a0' }],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 3 },
      { label: 'M', wrist_cm: 16, stock: 5 },
      { label: 'L', wrist_cm: 18, stock: 2 },
    ],
    thumb_class: 'thumb-1',
    images: [],
    is_featured: false,
    is_new: true,
    created_at: '2026-04-01',
  },
  {
    id: '2',
    slug: 'honey-afternoon',
    name_ko: '꿀빛 오후 팔찌',
    name_en: 'honey afternoon',
    category: 'classic',
    price: 16500,
    description: '따스한 오후 햇살을 담은 팔찌입니다. 유리 비즈의 투명함과 골드 디테일이 조화를 이룹니다.',
    materials: ['유리 비즈', '골드 디테일'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 4 },
      { label: 'M', wrist_cm: 16, stock: 6 },
      { label: 'L', wrist_cm: 18, stock: 3 },
    ],
    thumb_class: 'thumb-2',
    images: [],
    is_featured: false,
    is_new: true,
    created_at: '2026-04-02',
  },
  {
    id: '3',
    slug: 'moss-garden',
    name_ko: '이끼 정원 팔찌',
    name_en: 'moss garden',
    category: 'nature',
    price: 19000,
    description: '이끼 낀 돌 위의 정원에서 영감을 받았습니다. 세이지 그린 비즈와 실크 끈의 조화.',
    materials: ['세이지 그린 비즈', '실크 끈'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 0 },
      { label: 'M', wrist_cm: 16, stock: 0 },
      { label: 'L', wrist_cm: 18, stock: 0 },
    ],
    thumb_class: 'thumb-3',
    images: [],
    is_featured: true,
    is_new: false,
    created_at: '2026-03-15',
  },
  {
    id: '4',
    slug: 'rose-sunset',
    name_ko: '장미 노을 팔찌',
    name_en: 'rose sunset',
    category: 'summer',
    price: 21000,
    compare_at_price: 24000,
    description: '노을빛 장미처럼 물드는 팔찌. 로즈 골드 체인과 핸드페인팅 비즈가 특별합니다.',
    materials: ['로즈 골드', '핸드페인팅 비즈'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 3 },
      { label: 'M', wrist_cm: 16, stock: 4 },
      { label: 'L', wrist_cm: 18, stock: 2 },
    ],
    thumb_class: 'thumb-4',
    images: [],
    is_featured: false,
    is_new: true,
    created_at: '2026-04-05',
  },
  {
    id: '5',
    slug: 'vanilla-cream',
    name_ko: '바닐라 크림 팔찌',
    name_en: 'vanilla cream',
    category: 'classic',
    price: 17500,
    description: '아이보리 진주와 실버 체인의 부드러운 조화. 어떤 옷에도 잘 어울리는 베이직 디자인.',
    materials: ['아이보리 진주', '실버 체인'],
    colors: [{ name: '아이보리', hex: '#f0e6d2' }, { name: '베이지', hex: '#d8c8a0' }],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 5 },
      { label: 'M', wrist_cm: 16, stock: 5 },
      { label: 'L', wrist_cm: 18, stock: 3 },
    ],
    thumb_class: 'thumb-5',
    images: [],
    is_featured: false,
    is_new: false,
    created_at: '2026-03-20',
  },
  {
    id: '6',
    slug: 'forest-walk',
    name_ko: '숲속 산책 팔찌',
    name_en: 'forest walk',
    category: 'nature',
    price: 15000,
    description: '숲속 산책의 기억을 손목에. 우드 비즈와 가죽 끈의 자연스러운 조화.',
    materials: ['우드 비즈', '가죽 끈'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 4 },
      { label: 'M', wrist_cm: 16, stock: 6 },
      { label: 'L', wrist_cm: 18, stock: 4 },
    ],
    thumb_class: 'thumb-6',
    images: [],
    is_featured: true,
    is_new: false,
    created_at: '2026-03-10',
  },
  {
    id: '7',
    slug: 'peach-blossom',
    name_ko: '복숭아 꽃 팔찌',
    name_en: 'peach blossom',
    category: 'summer',
    price: 16000,
    description: '봄날 복숭아 꽃처럼 사랑스러운 팔찌. 파스텔 핑크 비즈와 실크 끈.',
    materials: ['파스텔 핑크 비즈', '실크 끈'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 0 },
      { label: 'M', wrist_cm: 16, stock: 0 },
      { label: 'L', wrist_cm: 18, stock: 0 },
    ],
    thumb_class: 'thumb-7',
    images: [],
    is_featured: false,
    is_new: false,
    created_at: '2026-03-05',
  },
  {
    id: '8',
    slug: 'misty-morning',
    name_ko: '안개 낀 아침 팔찌',
    name_en: 'misty morning',
    category: 'classic',
    price: 20000,
    description: '이른 아침의 고요한 안개처럼. 스모키 그레이 비즈와 실버 체인.',
    materials: ['스모키 그레이 비즈', '실버'],
    colors: [],
    sizes: [
      { label: 'S', wrist_cm: 14, stock: 3 },
      { label: 'M', wrist_cm: 16, stock: 4 },
      { label: 'L', wrist_cm: 18, stock: 2 },
    ],
    thumb_class: 'thumb-8',
    images: [],
    is_featured: false,
    is_new: true,
    created_at: '2026-04-10',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'new') return PRODUCTS.filter((p) => p.is_new);
  if (category === 'best') return PRODUCTS.filter((p) => p.is_featured);
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.is_featured);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}
