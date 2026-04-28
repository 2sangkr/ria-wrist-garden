# 리아샵 — 다음 세션 재개 가이드

> 이 파일을 Claude Code에 보여주면 바로 이어서 작업할 수 있습니다.

---

## 프로젝트 기본 정보

- **프로젝트명**: 리아샵 (Lia's Shop) — 핸드메이드 팔찌 쇼핑몰
- **작업 경로**: `C:\Users\lette\claude_project\1_hp`
- **GitHub**: https://github.com/2sangkr/ria-wrist-garden
- **기술 스택**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **개발 서버**: `npm run dev` → http://localhost:3000

---

## 현재 상태 (2026-04-26 기준)

### 완료된 것
- Next.js 프로젝트 세팅 완료, GitHub 연결 완료
- 전체 페이지 구현 완료 (홈 / 상품목록 / 카테고리 / 상품상세 / 스토리 / 가이드3개 / 장바구니 / 404)
- `index.html` 디자인 그대로 재현:
  - 흰 배경, Noto Sans KR + Playfair Display 폰트
  - 유틸리티바 → 로고(중앙) → 스티키 네비 3단 헤더
  - 상품 카드: 1:1 그라디언트 썸네일, 라벨형(상품명/판매가), 컬러닷, 하트, 배지
  - 카테고리 배너 + 정렬바 + 4열 그리드 + 페이지네이션
  - 4열 푸터
- 상품 더미 데이터 8개 등록
- 최신 커밋: `cb90bb0` (PROGRESS.md 업데이트)

### 아직 안 된 것
- 장바구니 기능 미구현 (UI만 있음, 실제 담기/삭제 안 됨)
- 결제 연동 없음 (토스페이먼츠)
- DB 없음 (Supabase 미연결)
- 실제 상품 사진 없음 (그라디언트 플레이스홀더)
- 법률 페이지 없음 (개인정보처리방침, 이용약관)
- 푸터 사업자 정보 미입력 (OOO 상태)

---

## 다음 작업 순서 (우선순위 순)

### 1순위 — Phase 2: 콘텐츠 완성
```
[ ] /legal/privacy — 개인정보처리방침 페이지
[ ] /legal/terms   — 이용약관 페이지
[ ] 푸터 사업자 정보 실제 값 입력 (사용자에게 확인 후)
[ ] 모바일 반응형 점검
```

### 2순위 — Phase 3: 장바구니 기능
```
[ ] Zustand 설치 → 장바구니 전역 상태 관리
[ ] ProductCard 하트/담기 → Cart store 연동
[ ] /cart 페이지 완성 (상품 목록, 수량 변경, 삭제, 5만원 무료배송 게이지)
[ ] /checkout 주문서 페이지 (배송지 입력, 비회원 가능)
[ ] /order/complete 주문완료 페이지
```

### 3순위 — Phase 4: 결제 연동 (사업자등록 완료 후)
```
[ ] Supabase 프로젝트 생성 및 DB 스키마 설정
[ ] 토스페이먼츠 가맹점 신청 → 위젯 연동
[ ] 웹훅으로 주문 상태 업데이트
[ ] /admin 관리자 페이지
```

### 4순위 — Phase 5~6: 운영 도구 + 오픈 점검
```
[ ] Google Analytics 4, 카카오톡 채널, 인스타그램 피드
[ ] Vercel 배포 + 도메인 연결
[ ] SEO (sitemap.xml, robots.txt, OG 이미지)
[ ] Lighthouse 90점 이상
```

---

## 주요 파일 위치

```
src/
├── app/
│   ├── page.tsx                     # 홈
│   ├── layout.tsx                   # 루트 레이아웃 (헤더/푸터 포함)
│   ├── globals.css                  # 전역 스타일 + 폰트
│   ├── shop/page.tsx                # 전체상품
│   ├── shop/[category]/page.tsx     # 카테고리별
│   ├── product/[slug]/page.tsx      # 상품 상세
│   ├── cart/page.tsx                # 장바구니 (미완성)
│   ├── story/page.tsx               # 작가 이야기
│   ├── guide/size|care|shipping     # 가이드 페이지들
│   └── not-found.tsx                # 404
├── components/
│   ├── layout/Header.tsx            # 3단 헤더
│   ├── layout/Footer.tsx            # 4열 푸터
│   ├── product/ProductCard.tsx      # 상품 카드
│   └── product/AddToCartButton.tsx  # 옵션 선택 + 장바구니 버튼
├── lib/products.ts                  # 상품 더미 데이터 + 유틸 함수
└── types/index.ts                   # Product, Order 등 타입 정의
```

---

## Claude Code에게 전달할 첫 마디 예시

> "RESUME.md 확인하고 Phase 3 장바구니 기능부터 시작해줘"
> "RESUME.md 확인하고 법률 페이지(개인정보처리방침, 이용약관) 만들어줘"
> "RESUME.md 확인하고 Supabase 연동 시작해줘"
