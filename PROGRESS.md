# 리아샵 — 개발 진행사항

> 마지막 업데이트: 2026-04-25

---

## ✅ 완료된 작업

### Phase 0: 환경 세팅
- [x] Next.js 16 + TypeScript + Tailwind CSS 프로젝트 초기화
- [x] autoprefixer 설치
- [x] GitHub 레포지토리 생성 및 연결 (`https://github.com/2sangkr/ria-wrist-garden`)
- [x] git 커밋 / 푸시 설정 완료

### Phase 1: 디자인 시스템 + 전체 페이지 구조

#### 디자인 시스템 (index.html 기준)
- [x] 색상 변수: `--bg #fff / --ink #222 / --ink-soft #555 / --ink-mute #999 / --line #e5e5e5`
- [x] 폰트: Noto Sans KR + Playfair Display
- [x] Tailwind 커스텀 컬러 및 폰트 설정

#### 공통 레이아웃
- [x] **Header** — 유틸리티바(로그인/회원가입/장바구니) → 로고(중앙) → 스티키 네비 3단 구조
- [x] **Footer** — 4열 그리드 (사업자정보 / SHOP / HELP / 고객센터)
- [x] 모바일 햄버거 메뉴

#### 페이지
| 경로 | 설명 | 상태 |
|------|------|------|
| `/` | 홈 (히어로 배너 + 신상품 + 베스트 + 카테고리 열) | ✅ |
| `/shop` | 전체상품 (배너 + 정렬바 + 4열 그리드 + 페이지네이션) | ✅ |
| `/shop/[category]` | 카테고리별 (new / best / summer / classic / nature / custom) | ✅ |
| `/product/[slug]` | 상품 상세 (이미지 + 옵션 선택 + 작가 노트 + 상품 정보표) | ✅ |
| `/story` | 작가 이야기 | ✅ |
| `/guide/size` | 사이즈 가이드 | ✅ |
| `/guide/care` | 관리 방법 | ✅ |
| `/guide/shipping` | 배송·교환·환불 | ✅ |
| `/cart` | 장바구니 (UI 스켈레톤) | ✅ |
| `/not-found` | 404 페이지 | ✅ |

#### 컴포넌트
- [x] **ProductCard** — 1:1 썸네일, 라벨형(상품명/판매가), 컬러닷, 하트 버튼, 배지(NEW/BEST/SOLD OUT)
- [x] **AddToCartButton** — 사이즈 선택, 수량 선택, 각인 텍스트(custom), 장바구니/바로구매 버튼

#### 데이터
- [x] 상품 더미 데이터 8개 (바다의산호, 꿀빛오후, 이끼정원, 장미노을, 바닐라크림, 숲속산책, 복숭아꽃, 안개낀아침)
- [x] 타입 정의 (`Product`, `CartItem`, `Order`, `ColorOption`, `SizeOption`)

---

## 🔜 남은 작업

### Phase 2: 콘텐츠 완성
- [ ] 실제 상품 사진 교체 (현재 그라디언트 플레이스홀더) — **사용자 촬영 필요**
- [ ] 푸터 사업자 정보 실제 값 입력 (대표자명, 주소, 사업자번호 등) — **사용자 입력 필요**
- [ ] 개인정보처리방침 페이지 (`/legal/privacy`)
- [ ] 이용약관 페이지 (`/legal/terms`)
- [ ] 사이즈 가이드 일러스트 추가
- [ ] 모바일 실기기 테스트 (380px / 768px)

### Phase 3: 장바구니 + 주문 기능
- [ ] 장바구니 상태 관리 (Zustand 또는 Context API)
- [ ] 장바구니 담기 실제 동작 (ProductCard → Cart 연동)
- [ ] 장바구니 페이지 완성 (상품 목록, 수량 변경, 삭제, 5만원 무료배송 게이지)
- [ ] 주문서 페이지 (`/checkout`) — 배송지 입력, 결제수단 선택
- [ ] 주문 완료 페이지 (`/order/complete`)
- [ ] 비회원 주문 지원 (이메일 + 전화번호만 입력)

### Phase 4: 결제 연동 (사업자등록 완료 후)
- [ ] Supabase 프로젝트 설정 (DB 스키마, Storage, RLS 정책)
- [ ] 토스페이먼츠 가맹점 신청 — **사용자 작업 필요 (사업자등록증 필요)**
- [ ] 토스페이먼츠 결제 위젯 연동
- [ ] 웹훅으로 주문 상태 자동 업데이트
- [ ] 주문 내역 조회 페이지 (`/account/orders`)
- [ ] 관리자 페이지 (`/admin`) — 주문 목록, 상태 변경, CSV 다운로드

### Phase 5: 운영 도구
- [ ] 인스타그램 피드 임베드 (메인 하단)
- [ ] 카카오톡 채널 연결 버튼
- [ ] Google Analytics 4 스크립트 삽입
- [ ] 이메일 알림 (주문 접수/발송 시 — Resend 사용 예정)

### Phase 6: 오픈 전 최종 점검
- [ ] Lighthouse 성능 90점 이상 목표
- [ ] SEO: 각 페이지 메타 태그, OG 이미지, sitemap.xml, robots.txt
- [ ] 모든 페이지 모바일 실기기 최종 확인
- [ ] 결제 테스트 모드로 전체 플로우 검증 (장바구니 → 결제 → 주문완료 → 환불)
- [ ] 사업자 정보 풋터 표기 최종 확인 (전자상거래법 의무사항)
- [ ] Vercel 배포 (도메인 연결)

---

## 사용자 직접 해야 할 항목

| 항목 | 이유 |
|------|------|
| 사업자등록 | 통신판매업 신고 및 PG 가맹점 심사 필요 |
| 도메인 구매 | gabia.com 또는 hosting.kr 권장 |
| 상품 사진 촬영 | WebP 형식, 1080px 기준으로 전달 |
| 토스페이먼츠 가맹점 신청 | 사업자등록 완료 후 진행 |
| 푸터 사업자 정보 입력 | `src/components/layout/Footer.tsx` 수정 |

---

## 커밋 히스토리

| 커밋 | 내용 |
|------|------|
| `c1ffb0e` | feat: Phase 1 — 프로젝트 초기 세팅 |
| `4bb8394` | feat: Phase 1 완성 — 전체 페이지 구조 |
| `b3f633c` | docs: PROGRESS.md 최초 작성 |
| `deab78c` | feat: index.html 디자인으로 전면 재작업 |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS + PostCSS |
| 폰트 | Noto Sans KR, Playfair Display |
| DB (예정) | Supabase |
| 결제 (예정) | 토스페이먼츠 |
| 호스팅 (예정) | Vercel |
| 레포지토리 | https://github.com/2sangkr/ria-wrist-garden |
