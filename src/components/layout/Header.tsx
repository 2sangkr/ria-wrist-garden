'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/shop', label: '쇼핑하기' },
  { href: '/story', label: '작가 이야기' },
  { href: '/guide/size', label: '사이즈 가이드' },
  { href: '/guide/care', label: '관리 방법' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display italic text-xl md:text-2xl text-ink tracking-wide">
              Ria&apos;s Wrist Garden
            </span>
            <span className="font-korean text-xs text-ink-soft tracking-widest">
              리아의 손목정원
            </span>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-ink-soft hover:text-ink transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 우측 아이콘 */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="font-display text-sm text-ink-soft hover:text-ink transition-colors tracking-widest"
              aria-label="장바구니"
            >
              Cart
            </Link>
            <Link
              href="/account/login"
              className="hidden md:block font-display text-sm text-ink-soft hover:text-ink transition-colors tracking-widest"
              aria-label="로그인"
            >
              Login
            </Link>
            {/* 모바일 햄버거 */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴"
            >
              <span className={`block w-5 h-px bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-line px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-soft hover:text-ink transition-colors tracking-wide py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account/login"
            className="font-body text-sm text-ink-soft hover:text-ink transition-colors tracking-wide py-1"
            onClick={() => setMenuOpen(false)}
          >
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
