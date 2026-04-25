'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/shop', label: '전체상품' },
  { href: '/shop/new', label: '신상품' },
  { href: '/shop/best', label: '베스트' },
  { href: '/shop/summer', label: '여름시리즈' },
  { href: '/shop/classic', label: '클래식' },
  { href: '/shop/nature', label: '자연시리즈' },
  { href: '/shop/custom', label: '주문제작' },
  { href: '/guide/shipping', label: '공지·이용안내' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 유틸리티 바 */}
      <div className="border-b border-line text-[11px]">
        <div className="max-w-site mx-auto px-5 py-[10px] flex justify-end gap-[18px] text-ink-soft">
          <Link href="/account/login" className="hover:text-ink transition-colors">로그인</Link>
          <Link href="/account/register" className="hover:text-ink transition-colors">회원가입</Link>
          <Link href="/account/mypage" className="hover:text-ink transition-colors">마이페이지</Link>
          <Link href="/account/orders" className="hover:text-ink transition-colors">주문조회</Link>
          <Link href="/guide/shipping" className="hover:text-ink transition-colors">고객센터</Link>
          <Link href="/cart" className="text-ink font-medium hover:text-ink-soft transition-colors">
            장바구니 (0)
          </Link>
        </div>
      </div>

      {/* 로고 헤더 */}
      <header className="border-b border-line bg-bg">
        <div className="max-w-site mx-auto px-5 py-[30px] text-center">
          <Link href="/">
            <span className="font-display text-[32px] font-normal tracking-[0.05em] text-ink">
              Lia<i className="italic font-normal">&apos;s</i> Shop
            </span>
          </Link>
          <div className="text-[10px] tracking-[0.4em] text-ink-mute mt-[6px] uppercase">
            Handmade Bracelet
          </div>
        </div>
      </header>

      {/* 메인 네비 (스티키) */}
      <nav className="border-b border-line bg-bg sticky top-0 z-50">
        <div className="max-w-site mx-auto px-5 hidden md:flex justify-center gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-4 px-1 text-[13px] font-medium tracking-[0.05em] text-ink border-b-2 border-transparent hover:border-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 모바일 */}
        <div className="md:hidden px-5 py-3 flex items-center justify-between">
          <span className="text-[13px] font-medium">메뉴</span>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-1" aria-label="메뉴">
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-line flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-3 text-[13px] text-ink border-b border-line-soft hover:bg-line-soft transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
