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
    tags: ['#핸드메이드', '#책갈피'],
    bio: '손으로 직접 만드는 책갈피.',
    profileColor: '#f4c2c2',
    works: [
      {
        slug: 'work-1',
        title: '책갈피',
        image: '/images/dhee-work-1.jpg',
        artistMessage: '만들면서 내내 봄 생각을 했어요.',
        materialsStory: '색이 마음에 들어서 직접 골랐어요. 하나하나 손으로 만들었습니다.',
        materials: ['종이', '리본', '수작업 마감'],
        price: 3000,
        stock: 5,
      },
      {
        slug: 'work-2',
        title: '키링',
        image: '/images/dhee-work-2.jpg',
        artistMessage: '밤하늘 같은 색이어서 여름밤이라고 이름 붙였어요.',
        materialsStory: '어두운 색감이 마음에 들어서 골랐어요. 시원한 느낌을 담고 싶었어요.',
        materials: ['종이', '리본', '수작업 마감'],
        price: 3000,
        stock: 4,
      },
    ],
  },
  { id: '2', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '4', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];
