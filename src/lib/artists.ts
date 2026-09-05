export type Work = {
  id?: number;
  slug: string;
  title: string;
  image: string;
  materials: string[];
  created_at: string;
  age?: number;
};

export function workDateLabel(work: Work): string {
  const year = work.created_at.slice(0, 4);
  const month = work.created_at.slice(5, 7);
  return `${year}.${month}`;
}

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

export const ARTISTS: Artist[] = [
  {
    id: '1',
    slug: 'dhee',
    name: 'D.hee',
    tags: ['#핸드메이드', '#드로잉', '#일러스트'],
    bio: '손으로 직접 만드는 책갈피.',
    profileColor: '#f4c2c2',
    works: [
      {
        slug: 'work-1',
        title: '책갈피',
        image: '/images/dhee-work-1b.jpg',
        materials: ['종이', '리본', '수작업 마감'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-2',
        title: '키링',
        image: '/images/dhee-work-2.jpg',
        materials: ['종이', '리본', '수작업 마감'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-5',
        title: '이모지 얼굴들',
        image: '/images/dhee-work-5.jpg',
        materials: ['마커', '색연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-6',
        title: '미키 & 미니',
        image: '/images/dhee-work-6.jpg',
        materials: ['마커', '색연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-7',
        title: '달리는 말',
        image: '/images/dhee-work-7.jpg',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-8',
        title: '퍼핀',
        image: '/images/dhee-work-8.jpg',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-9',
        title: '동물 스케치 — 고양이와 코끼리',
        image: '/images/dhee-work-9.jpg',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
        age: 12,
      },
{
        slug: 'work-12',
        title: '머리카락 스케치',
        image: '/images/dhee-work-12.jpg',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-13',
        title: '눈 드로잉',
        image: '/images/dhee-work-13.jpg',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-15',
        title: '애니 소녀 스케치 1',
        image: '/images/dhee-work-15.jpg',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-16',
        title: '애니 소녀 스케치 2',
        image: '/images/dhee-work-16.jpg',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-17',
        title: '펜 드로잉',
        image: '/images/dhee-work-17.jpg',
        materials: ['펜', '도화지'],
        created_at: '2026-04-29',
        age: 12,
      },
      {
        slug: 'work-18',
        title: '카드 지갑',
        image: '/images/dhee-work-18.jpg',
        materials: ['코바늘', '실'],
        created_at: '2026-05-01',
        age: 12,
      },
{
        slug: 'work-20',
        title: '네잎크로버 (핑크)',
        image: '/images/dhee-work-20.jpg',
        materials: ['코바늘', '실'],
        created_at: '2026-05-01',
        age: 12,
      },
      {
        slug: 'work-22',
        title: '축하드려요',
        image: '/images/dhee-work-22.jpg',
        materials: ['코바늘', '실'],
        created_at: '2026-05-03',
        age: 12,
      },
      {
        slug: 'work-25',
        title: 'HARIBO',
        image: '/images/dhee-work-25.jpg',
        materials: ['종이접기', '색종이', '수제 패키지'],
        created_at: '2026-05-01',
        age: 12,
      },
      {
        slug: 'work-26',
        title: '무지개 캔버스',
        image: '/images/dhee-work-26.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-01-01',
        age: 11,
      },
      {
        slug: 'work-27',
        title: '파랑',
        image: '/images/dhee-work-27.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-01-01',
        age: 11,
      },
      {
        slug: 'work-28',
        title: '지붕 위의 고양이',
        image: '/images/dhee-work-28.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-09-27',
        age: 11,
      },
      {
        slug: 'work-29',
        title: '바다 노을',
        image: '/images/dhee-work-29.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-01-01',
        age: 11,
      },
      {
        slug: 'work-30',
        title: '달밤',
        image: '/images/dhee-work-30.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-01-01',
        age: 11,
      },
      {
        slug: 'work-31',
        title: '레몬',
        image: '/images/dhee-work-31.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-10-25',
        age: 11,
      },
      {
        slug: 'work-32',
        title: '노을 속 돛단배',
        image: '/images/dhee-work-32.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2025-01-01',
        age: 11,
      },
      {
        slug: 'work-33',
        title: "DADA's ART",
        image: '/images/dhee-work-33.jpg',
        materials: ['마커', '스케치북'],
        created_at: '2026-05-31',
        age: 12,
      },
      {
        slug: 'work-21',
        title: '녹아내리는 도시',
        image: '/images/dhee-work-21.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
      {
        slug: 'work-23',
        title: '분홍 골목',
        image: '/images/dhee-work-23.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
      {
        slug: 'work-24',
        title: '숲의 반짝임',
        image: '/images/dhee-work-24.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
    ],
  },
  {
    id: '2',
    slug: 'james',
    name: 'James',
    tags: ['#레고', '#모형', '#조립'],
    bio: '레고로 만드는 정밀한 세계.',
    profileColor: '#a8c8f0',
    works: [
      {
        slug: 'work-2',
        title: '페라리 488 GTB',
        image: '/images/whee-work-2.jpg',
        materials: ['레고'],
        created_at: '2021-01-01',
        age: 8,
      },
      {
        slug: 'work-3',
        title: '사무라이',
        image: '/images/whee-work-3.jpg',
        materials: ['레고'],
        created_at: '2021-01-01',
        age: 8,
      },
      {
        slug: 'work-4',
        title: '기사도',
        image: '/images/whee-work-4.jpg',
        materials: ['레고'],
        created_at: '2021-01-01',
        age: 8,
      },
      {
        slug: 'work-5',
        title: '아바타',
        image: '/images/whee-work-5.jpg',
        materials: ['레고'],
        created_at: '2021-01-01',
        age: 8,
      },
      {
        slug: 'work-6',
        title: '건담',
        image: '/images/whee-work-6.jpg',
        materials: ['종이접기'],
        created_at: '2021-01-01',
        age: 8,
      },
      {
        slug: 'work-1',
        title: '2017년형 포드 F-150 랩터',
        image: '/images/whee-work-1.jpg',
        materials: ['레고'],
        created_at: '2026-05-01',
        age: 13,
      },
    ],
  },
  {
    id: '3',
    slug: 'emma',
    name: 'Emma',
    tags: ['#아크릴', '#회화', '#동물'],
    bio: '따뜻한 색으로 세상을 그려요.',
    profileColor: '#f5c842',
    works: [
      {
        slug: 'work-1',
        title: '꿈꾸는 고양이',
        image: '/images/rhee-work-1.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
      {
        slug: 'work-2',
        title: '맛있겠다',
        image: '/images/rhee-work-2.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
      {
        slug: 'work-3',
        title: '부풀어오르는 집',
        image: '/images/rhee-work-3.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
      {
        slug: 'work-4',
        title: '가을',
        image: '/images/rhee-work-4.jpg',
        materials: ['색연필', '도화지'],
        created_at: '2022-01-01',
        age: 8,
      },
      {
        slug: 'work-5',
        title: '동굴',
        image: '/images/rhee-work-5.jpg',
        materials: ['아크릴 물감', '캔버스'],
        created_at: '2023-01-01',
        age: 9,
      },
    ],
  },
  { id: '4', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '5', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '6', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];
