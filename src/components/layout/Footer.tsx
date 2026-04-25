import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#fafafa] pt-[50px] pb-[30px] px-5 text-[11px] text-ink-soft mt-auto">
      <div className="max-w-site mx-auto">
        {/* 4열 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-[30px] border-b border-line mb-6">
          {/* 사업자 정보 */}
          <div className="leading-[1.8]">
            <strong className="block text-[12px] text-ink font-medium mb-[6px]">리아샵 (Lia&apos;s Shop)</strong>
            대표자 : OOO<br />
            소재지 : 서울특별시 OO구 OO로 00<br />
            사업자등록번호 : 000-00-00000<br />
            통신판매업 신고 : 0000-서울-0000<br />
            개인정보보호책임자 : OOO
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-[12px] font-bold text-ink mb-[14px] tracking-[0.05em]">SHOP</h4>
            {[
              { href: '/shop', label: '전체 상품' },
              { href: '/shop/new', label: '신상품' },
              { href: '/shop/best', label: '베스트' },
              { href: '/shop/custom', label: '주문 제작' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block mb-[6px] hover:text-ink transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-[12px] font-bold text-ink mb-[14px] tracking-[0.05em]">HELP</h4>
            {[
              { href: '/guide/shipping', label: '배송 안내' },
              { href: '/guide/shipping', label: '교환·환불' },
              { href: '/guide/size', label: '사이즈 가이드' },
              { href: '/guide/care', label: '자주 묻는 질문' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="block mb-[6px] hover:text-ink transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="text-[12px] font-bold text-ink mb-[14px] tracking-[0.05em]">고객센터</h4>
            <a href="#" className="block mb-[6px] hover:text-ink transition-colors">카카오채널 [리아샵]</a>
            <a href="mailto:hello@liashop.kr" className="block mb-[6px] hover:text-ink transition-colors">hello@liashop.kr</a>
            <a href="tel:02-000-0000" className="block mb-[6px] hover:text-ink transition-colors">02-000-0000</a>
            <a href="#" className="block mt-[10px] hover:text-ink transition-colors">Instagram @lia_shop</a>
          </div>
        </div>

        {/* 하단 */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span>COPYRIGHT © 리아샵. ALL RIGHTS RESERVED.</span>
          <div>
            <Link href="/legal/privacy" className="mr-[14px] hover:text-ink transition-colors">개인정보 처리방침</Link>
            <Link href="/legal/terms" className="mr-[14px] hover:text-ink transition-colors">이용약관</Link>
            <Link href="/guide/shipping" className="hover:text-ink transition-colors">이용안내</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
