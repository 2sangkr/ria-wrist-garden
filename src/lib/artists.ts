export type Work = {
  slug: string;
  title: string;
  image: string;
  artistMessage: string;
  materialsStory: string;
  materials: string[];
  created_at: string;
  age?: number;
};

export function workDateLabel(work: Work): string {
  const year = work.created_at.slice(0, 4);
  if (work.age !== undefined) return `${work.age}살 · ${year}`;
  return year;
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
        image: '/images/dhee-work-1.jpg',
        artistMessage: '만들면서 내내 봄 생각을 했어요.',
        materialsStory: '색이 마음에 들어서 직접 골랐어요. 하나하나 손으로 만들었습니다.',
        materials: ['종이', '리본', '수작업 마감'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-2',
        title: '키링',
        image: '/images/dhee-work-2.jpg',
        artistMessage: '밤하늘 같은 색이어서 여름밤이라고 이름 붙였어요.',
        materialsStory: '어두운 색감이 마음에 들어서 골랐어요. 시원한 느낌을 담고 싶었어요.',
        materials: ['종이', '리본', '수작업 마감'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-5',
        title: '이모지 얼굴들',
        image: '/images/dhee-work-5.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['마커', '색연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-6',
        title: '미키 & 미니',
        image: '/images/dhee-work-6.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['마커', '색연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-7',
        title: '달리는 말',
        image: '/images/dhee-work-7.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-8',
        title: '퍼핀',
        image: '/images/dhee-work-8.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-9',
        title: '동물 스케치 — 고양이와 코끼리',
        image: '/images/dhee-work-9.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-10',
        title: '새끼 회색곰',
        image: '/images/dhee-work-10.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-11',
        title: '라2벌',
        image: '/images/dhee-work-11.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['마커', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-12',
        title: '머리카락 스케치',
        image: '/images/dhee-work-12.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-13',
        title: '눈 드로잉',
        image: '/images/dhee-work-13.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-14',
        title: '구체 드로잉',
        image: '/images/dhee-work-14.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '노트'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-15',
        title: '애니 소녀 스케치 1',
        image: '/images/dhee-work-15.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-16',
        title: '애니 소녀 스케치 2',
        image: '/images/dhee-work-16.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['연필', '스케치북'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-17',
        title: '펜 드로잉',
        image: '/images/dhee-work-17.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['펜', '도화지'],
        created_at: '2026-04-29',
      },
      {
        slug: 'work-18',
        title: '카드 지갑',
        image: '/images/dhee-work-18.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['코바늘', '실'],
        created_at: '2026-05-01',
      },
      {
        slug: 'work-19',
        title: '네잎크로버 (파랑)',
        image: '/images/dhee-work-19.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['코바늘', '실'],
        created_at: '2026-05-01',
      },
      {
        slug: 'work-20',
        title: '네잎크로버 (핑크)',
        image: '/images/dhee-work-20.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['코바늘', '실'],
        created_at: '2026-05-01',
      },
    ],
  },
  {
    id: '2',
    slug: 'whee',
    name: 'W.hee',
    tags: ['#레고', '#모형', '#조립'],
    bio: '레고로 만드는 정밀한 세계.',
    profileColor: '#a8c8f0',
    works: [
      {
        slug: 'work-1',
        title: '2017년형 포드 F-150 랩터',
        image: '/images/whee-work-1.jpg',
        artistMessage: '',
        materialsStory: '',
        materials: ['레고'],
        created_at: '2026-05-01',
      },
    ],
  },
  { id: '3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: '4', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];
