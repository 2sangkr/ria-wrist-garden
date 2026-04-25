import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '작가 이야기',
  description: '초등학생 리아가 팔찌를 만들기 시작한 이유와 작업실 이야기.',
};

export default function StoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="section-subtitle mb-3">Our Story</p>
        <h1 className="section-title">작가 이야기</h1>
      </div>

      {/* 작가 사진 플레이스홀더 */}
      <div className="aspect-[16/9] bg-gradient-to-br from-cream-deep via-line to-cream mb-12" />

      <div className="prose max-w-none space-y-6">
        <p className="font-body text-base text-ink leading-loose">
          처음 팔찌를 만든 건 열 살 생일이 지나고 얼마 되지 않았을 때였어요.
          엄마 생일이 다가오는데 용돈이 부족했거든요. 선물 가게 앞을 한참 서성이다가
          집에 있는 색색의 비즈로 직접 만들어보기로 했어요.
        </p>

        <p className="font-body text-base text-ink leading-loose">
          첫 번째 팔찌는 솔직히 좀 삐뚤었어요. 비즈가 한쪽에 몰리고, 줄 길이도 안 맞았죠.
          그런데 엄마가 그걸 받고 울었어요. 예뻐서 우는 게 아니라, 네가 만들었다는 사실이
          기쁘다고. 그날부터 팔찌 만들기가 진심이 됐어요.
        </p>

        <blockquote className="border-l-2 border-rose pl-6 my-8">
          <p className="font-display italic text-2xl text-ink leading-relaxed">
            "하나하나 꿸 때마다 이걸 받을 사람을 생각해요.<br />
            그러면 더 예쁘게 만들고 싶어져요."
          </p>
          <footer className="font-korean text-sm text-ink-soft mt-3">— 리아, 10세</footer>
        </blockquote>

        <p className="font-body text-base text-ink leading-loose">
          지금은 방 한쪽이 작은 작업실이 됐어요. 비즈 상자가 네 개, 줄 종류가 일곱 가지,
          집게와 가위도 제 것이 따로 있어요. 학교 끝나고 숙제를 마치면 작업실에 앉는 게
          하루에서 제일 행복한 시간이에요.
        </p>

        <p className="font-body text-base text-ink leading-loose">
          친구들이 "어떻게 이렇게 예쁘게 만들어?"라고 물으면 사실 별 비결이 없어요.
          그냥 오래 보고, 천천히 꿰고, 마음을 담는 것뿐이에요. 기계로 만든 팔찌와
          제가 만든 팔찌의 차이는 딱 하나예요. 세상에 하나뿐이라는 것.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-line">
        <Link href="/shop" className="btn-primary inline-block">
          리아의 팔찌 보러 가기
        </Link>
      </div>
    </div>
  );
}
