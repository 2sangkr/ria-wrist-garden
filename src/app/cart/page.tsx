import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '장바구니',
};

export default function CartPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title mb-10">장바구니</h1>

      {/* 빈 장바구니 상태 */}
      <div className="text-center py-24 border border-line">
        <p className="font-display italic text-3xl text-ink-soft mb-4">
          장바구니가 비어있어요
        </p>
        <p className="font-body text-sm text-ink-soft mb-8">
          마음에 드는 팔찌를 담아보세요.
        </p>
        <Link href="/shop" className="btn-primary inline-block">
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}
