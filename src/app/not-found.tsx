import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <p className="font-display italic text-7xl text-line mb-6">404</p>
      <h1 className="font-korean text-xl text-ink mb-3">페이지를 찾을 수 없어요</h1>
      <p className="font-body text-sm text-ink-soft mb-10">
        주소가 잘못됐거나 삭제된 페이지입니다.
      </p>
      <Link href="/" className="btn-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
