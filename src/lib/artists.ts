export type Artist = {
  id: string;
  slug: string;
  name: string;
  age?: number;
  bio: string;
  profileColor: string;
};

export const ARTISTS: Artist[] = [
  { id: '1', slug: 'ria',    name: '리아',   age: 10, bio: '핸드메이드 팔찌를 만듭니다.',   profileColor: '#f4c2c2' },
  { id: '2', slug: 'junho',  name: '준호',   age: 14, bio: '그림과 일러스트를 그립니다.',   profileColor: '#c2d4f4' },
  { id: '3', slug: 'soyeon', name: '소연',   age: 13, bio: '점토로 작은 조각을 만듭니다.',  profileColor: '#c2f4d0' },
  { id: '4', slug: 'minjun', name: '민준',   age: 15, bio: '사진을 찍고 편집합니다.',       profileColor: '#f4ecc2' },
  { id: '5', slug: 'yuna',   name: '유나',   age: 12, bio: '수채화 그림을 그립니다.',       profileColor: '#e8c2f4' },
  { id: '6', slug: 'jiwon',  name: '지원',   age: 14, bio: '손글씨 캘리그라피를 씁니다.',  profileColor: '#f4d4c2' },
  { id: '7', slug: 'seojun', name: '서준',   age: 13, bio: '종이 접기 작품을 만듭니다.',   profileColor: '#c2f4f0' },
  { id: '8', slug: 'haein',  name: '해인',   age: 15, bio: '자수와 패브릭 아트를 합니다.', profileColor: '#f4c2e4' },
];
