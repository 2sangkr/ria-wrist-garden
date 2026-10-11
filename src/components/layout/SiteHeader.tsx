'use client';

import Link from 'next/link';
import ShareButton from '@/components/ui/ShareButton';
import AccountMenu from '@/components/account/AccountMenu';

export default function SiteHeader({ accountsEnabled = false }: { accountsEnabled?: boolean }) {
  return <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
      <div className="flex items-center justify-between gap-3 h-[72px] sm:h-20">
        <Link href="/" aria-label="모모갤러리 홈" className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-gray-900 text-white flex items-center justify-center font-black text-[17px]">my</div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-[16px] sm:text-[17px] font-black text-gray-900 tracking-tight whitespace-nowrap">모모갤러리</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 whitespace-nowrap">모든 아이의 모든 예술</span>
          </div>
        </Link>
        <nav aria-label="초대 및 계정" className="flex shrink-0 items-center gap-2 sm:gap-5">
          <ShareButton variant="plain" />
          {accountsEnabled && <AccountMenu />}
        </nav>
      </div>
    </div>
  </header>;
}
