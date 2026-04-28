export type Work = {
  slug: string;
  title: string;
  image: string;
  artistMessage: string;
  materialsStory: string;
  materials: string[];
  price: number;
  stock: number;
};

export type Artist = {
  id: string;
  slug: string;
  name: string;
  tags: string[];
  bio: string;
  profileColor: string;
  isEmpty?: boolean;
  works?: Work[];
};

export function formatPrice(price: number) {
  return price.toLocaleString('ko-KR') + '원';
}

export const ARTISTS: Artist[] = [
  {
    id: '1',
    slug: 'dhee',
    name: 'D.hee',
    tags: ['#핸드메이드', '#수공예'],
    bio: '핸드메이드 팔찌를 만듭니다.',
    profileColor: '#f4c2c2',
    works: [
      {
        slug: 'work-1',
        title: '봄날의 손목정원',
        image: '/images/dhee-work-1.jpg',
        artistMessage: '만들면서 내내 봄 생각을 했어요. 받는 분도 따뜻해지면 좋겠어요.',
        materialsStory: '문구점을 세 군데나 돌아다니며 직접 고른 천연석 비즈예요. 색이 조금씩 달라서 하나씩 맞춰 끼우는 게 제일 재미있었어요.',
        materials: ['천연석 비즈', '은침', '탄성줄'],
        price: 12000,
        stock: 3,
      },
      {
        slug: 'work-2',
        title: '여름밤 팔찌',
        image: '/images/dhee-work-2.jpg',
        artistMessage: '밤하늘 같은 색이어서 여름밤이라고 이름 붙였어요.',
        materialsStory: '어두운 계열의 비즈를 모아모아 만들었어요. 밤하늘처럼 깊고 시원한 느낌을 담고 싶었어요.',
        materials: ['유리 비즈', '메탈 참', '탄성줄'],
        price: 13000,
        stock: 2,
      },
    ],
  },
  { id: '2', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '4', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];
