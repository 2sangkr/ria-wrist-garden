import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-10 sm:py-12">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

          {/* 브랜드 + 슬로건 */}
          <div>
            <p className="text-[13px] font-semibold text-gray-800">모든 아이의 모든 예술</p>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              모든 창작물의 저작권은<br />
              각 작품을 만든 어린이 작가에게 있습니다.
            </p>
            <p className="text-[11px] text-gray-300 mt-3">
              © {new Date().getFullYear()} 모든 아이의 모든 예술. All rights reserved.
            </p>
          </div>

          {/* 링크 */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-[12px] text-gray-400">

            <div className="space-y-2">
              <p className="font-medium text-gray-600 text-[11px] uppercase tracking-widest mb-2">Contact Us</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gray-700 transition-colors"
              >
                작가 등록 문의
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-gray-600 text-[11px] uppercase tracking-widest mb-2">Policy</p>
              <p className="text-gray-300">작품 저작권: 각 작가 본인</p>
              <p className="text-gray-300">무단 복제 및 상업적 사용 금지</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 text-right">
          <Link href="/admin" className="text-[11px] text-gray-200 hover:text-gray-400 transition-colors">
            관리자
          </Link>
        </div>

      </div>
    </footer>
  );
}
