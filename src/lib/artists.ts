export type Artist = {
  id: string;
  slug: string;
  name: string;
  tags: string[];
  bio: string;
  profileColor: string;
  isEmpty?: boolean;
  works?: { title: string; image: string }[];
};

export const ARTISTS: Artist[] = [
  {
    id: '1',
    slug: 'dhee',
    name: 'D.hee',
    tags: ['#핸드메이드', '#수공예'],
    bio: '핸드메이드 팔찌를 만듭니다.',
    profileColor: '#f4c2c2',
    works: [
      { title: '작품 1', image: '/images/dhee-work-1.jpg' },
      { title: '작품 2', image: '/images/dhee-work-2.jpg' },
    ],
  },
  { id: '2', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '4', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];
