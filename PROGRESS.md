# 리아의 손목정원 — 개발 진행사항

> 마지막 업데이트: 2026-04-25

---

## Phase 1: 정적 페이지 완성 ✅ 완료 (2026-04-25)

### 완료된 작업

| 항목 | 상태 | 비고 |
|------|------|------|
| 프로젝트 초기 세팅 (Next.js 16 + TypeScript + Tailwind) | ✅ | `package.json`, `tsconfig.json`, `tailwind.config.ts` |
| 디자인 시스템 설정 | ✅ | 컬러 팔레트 CSS 변수, 폰트 설정 |
| 공통 헤더 (반응형, 모바일 햄버거 메뉴) | ✅ | `src/components/layout/Header.tsx` |
| 공통 푸터 (사업자 정보 포함) | ✅ | `src/components/layout/Footer.tsx` |
| 메인 페이지 (히어로, 카테고리, 베스트, 스토리, 배송 배너) | ✅ | `src/app/page.tsx` |
| 전체 상품 목록 페이지 | ✅ | `src/app/shop/page.tsx` |
| 카테고리별 페이지 | ✅ | `src/app/shop/[category]/page.tsx` |
| 상품 상세 페이지 (옵션 선택, 작가 노트, 상품 정보표) | ✅ | `src/app/product/[slug]/page.tsx` |
| 장바구니 담기 버튼 컴포넌트 | ✅ | `src/components/product/AddToCartButton.tsx` |
| 작가 이야기 페이지 | ✅ | `src/app/story/page.tsx` |
| 사이즈 가이드 페이지 | ✅ | `src/app/guide/size/page.tsx` |
| 관리 방법 페이지 | ✅ | `src/app/guide/care/page.tsx` |
| 배송·교환·환불 페이지 | ✅ | `src/app/guide/shipping/page.tsx` |
| 장바구니 페이지 (UI 스켈레톤) | ✅ | `src/app/cart/page.tsx` |
| 404 페이지 | ✅ | `src/app/not-found.tsx` |
| 상품 타입 정의 | ✅ | `src/types/index.ts` |
| 상품 더미 데이터 (4개) | ✅ | `src/lib/products.ts` |

### 커밋 히스토리
- `c1ffb0e` feat: Phase 1 — 프로젝트 초기 세팅
- `4bb8394` feat: Phase 1 완성 — 전체 페이지 구조 (정적 페이지)

### 미완료 (다음 단계로 이월)
- [ ] 실제 상품 사진 교체 (현재 그라디언트 플레이스홀더)
- [ ] 모바일 실기기 테스트

---

## Phase 2: 콘텐츠 채우기 🔜 예정

| 항목 | 상태 |
|------|------|
| 상품 사진 5~10개 등록 | ⏳ 사용자 촬영 필요 |
| 작가 노트 최종 검수 | ⏳ |
| 사이즈 가이드 일러스트 | ⏳ |
| 배송·교환 정책 최종 확인 | ⏳ |
| 개인정보처리방침 작성 | ⏳ |
| 이용약관 작성 | ⏳ |

---

## Phase 3: 결제·주문 연동 🔜 예정

| 항목 | 상태 |
|------|------|
| Supabase 프로젝트 설정 | ⏳ |
| 토스페이먼츠 가맹점 신청 | ⏳ 사업자등록 완료 후 |
| 결제 위젯 연동 | ⏳ |
| 관리자 페이지 | ⏳ |
| 장바구니 상태 관리 (Zustand) | ⏳ |

---

## Phase 4: 운영 도구 🔜 예정

| 항목 | 상태 |
|------|------|
| 인스타그램 피드 임베드 | ⏳ |
| 카카오톡 채널 연결 | ⏳ |
| Google Analytics 4 | ⏳ |
| 이메일 알림 (Resend) | ⏳ |

---

## Phase 5: 오픈 전 점검 🔜 예정

| 항목 | 상태 |
|------|------|
| 모바일 실기기 테스트 | ⏳ |
| 결제 테스트 모드 검증 | ⏳ |
| Lighthouse 90점 이상 | ⏳ |
| SEO 메타 태그, sitemap.xml | ⏳ |
| 사업자 정보 최종 확인 | ⏳ |

---

## 기술 스택

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **폰트**: Cormorant Garamond, Gowun Batang, Gowun Dodum
- **DB (예정)**: Supabase
- **결제 (예정)**: 토스페이먼츠
- **호스팅 (예정)**: Vercel

## 사용자 작업 필요 항목

1. **사업자등록** — 통신판매업 신고를 위해 필요
2. **도메인 구매** — gabia.com 또는 hosting.kr 권장
3. **상품 사진 촬영** — 실제 팔찌 사진 (WebP 변환 후 전달)
4. **푸터 사업자 정보 입력** — `src/components/layout/Footer.tsx` 수정 필요
5. **토스페이먼츠 가맹점 신청** — 사업자등록 완료 후
