import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 브랜드 */}
          <div>
            <h3 className="font-display italic text-xl mb-4 text-cream tracking-wide">
              Ria&apos;s Wrist Garden
            </h3>
            <p className="font-body text-sm text-cream/60 leading-relaxed">
              초등학생 리아가 직접 손으로 만드는<br />
              세상에 하나뿐인 핸드메이드 팔찌
            </p>
          </div>

          {/* 안내 */}
          <div>
            <h4 className="font-korean text-xs tracking-widest text-cream/40 uppercase mb-4">
              쇼핑 안내
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/guide/size', label: '사이즈 가이드' },
                { href: '/guide/care', label: '관리 방법' },
                { href: '/guide/shipping', label: '배송·교환·환불' },
                { href: '/story', label: '작가 이야기' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="font-korean text-xs tracking-widest text-cream/40 uppercase mb-4">
              고객센터
            </h4>
            <p className="font-body text-sm text-cream/60 leading-relaxed">
              카카오톡 채널: @리아의손목정원<br />
              운영시간: 평일 10:00 – 18:00<br />
              (주말·공휴일 휴무)
            </p>
          </div>
        </div>

        {/* 사업자 정보 (전자상거래법 의무 표기) */}
        <div className="border-t border-cream/10 pt-8">
          <p className="font-body text-xs text-cream/30 leading-relaxed">
            상호명: 리아의 손목정원 &nbsp;|&nbsp; 대표자: 홍길동 &nbsp;|&nbsp;
            사업자등록번호: 000-00-00000 &nbsp;|&nbsp; 통신판매업 신고번호: 제0000-서울강남-0000호<br />
            주소: 서울특별시 강남구 (주소 입력 필요) &nbsp;|&nbsp; 이메일: ria@wristgarden.kr &nbsp;|&nbsp; 전화: 010-0000-0000<br />
            <br />
            <Link href="/legal/privacy" className="hover:text-cream/60 transition-colors">
              개인정보처리방침
            </Link>
            &nbsp;&nbsp;
            <Link href="/legal/terms" className="hover:text-cream/60 transition-colors">
              이용약관
            </Link>
          </p>
          <p className="font-body text-xs text-cream/20 mt-4">
            © 2026 Ria&apos;s Wrist Garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
