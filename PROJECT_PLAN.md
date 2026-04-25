# 리아의 손목정원 — 핸드메이드 팔찌 쇼핑몰 개발계획

> Claude Code 작업 지시서. 이 파일을 프로젝트 루트에 두고 `claude` 명령어로 시작하세요.

---

## 0. 프로젝트 개요

초등학생 자녀가 직접 만든 핸드메이드 팔찌를 판매하는 1인 쇼핑몰입니다. 키터샵(kittershop.co.kr)의 깔끔한 구조를 참고하되, "수공예·따뜻함·작은 작업실"의 감성을 시각적으로 강하게 드러냅니다.

**규모 가정**: 월 10~30개 판매. 취미 → 부업 단계.
**대상 사용자**: 20~40대 여성, 선물 구매자, 핸드메이드 애호가.
**핵심 차별점**: "초등학생 작가가 직접 만든다"는 스토리 자체가 상품의 일부.

---

## 1. 기술 스택 결정

두 가지 트랙 중 **상황에 맞는 것**을 선택하세요. 사용자에게 먼저 확인해야 합니다.

### 트랙 A: SaaS 빌더 활용 (권장 — 빠른 오픈)
- **카페24** 또는 **아임웹**의 무료/저가 플랜으로 운영
- 이 저장소의 HTML/CSS는 **디자인 레퍼런스**로만 사용
- Claude Code의 역할: 카페24 디자인 편집기에 넣을 HTML/CSS 스니펫, 상품 등록용 상세페이지 HTML 템플릿, 인스타그램 콘텐츠 템플릿 생성

### 트랙 B: 직접 개발 (Next.js + Stripe/토스페이먼츠)
- 완전한 커스터마이징을 원할 때
- 사업자등록·PG 가맹점 심사 완료 후 진행
- 호스팅: Vercel (프론트) + Supabase (DB·인증·이미지)

**기본값은 트랙 A**입니다. 사용자가 명시적으로 "직접 개발"을 원할 때만 트랙 B로 전환하세요.

---

## 2. 디자인 시스템

### 컬러 팔레트
```
--cream:      #f5efe6   (메인 배경)
--cream-deep: #ede4d3   (보조 배경)
--ink:        #2b2419   (메인 텍스트, 다크 섹션)
--ink-soft:   #5a4f3f   (보조 텍스트)
--rose:       #c08772   (포인트, 따뜻한 강조)
--rose-deep:  #9a6450   (호버, 액티브)
--sage:       #8a9a7b   (자연 시리즈 강조)
--gold:       #b8956a   (디테일)
--line:       #d4c5ae   (구분선)
```

### 타이포그래피
- **영문 디스플레이**: Cormorant Garamond (italic 자주 사용)
- **한글 디스플레이**: Gowun Batang Bold
- **본문**: Gowun Dodum
- 영문은 letter-spacing을 0.05~0.4em으로 넓게, 한글은 자연스럽게.
- 절대 사용 금지: Inter, Roboto, Arial, Pretendard 같은 흔한 폰트.

### 톤앤매너 원칙
- 절대 화려하지 않게. 키터샵처럼 흰 공간이 많아야 함.
- 컬러는 따뜻한 베이지 + 한 가지 포인트(로즈/세이지)만.
- 사진 자리는 그라디언트 플레이스홀더로 처리하고, 실제 사진이 들어왔을 때 제일 빛나도록 설계.
- 영문 italic으로 우아함을 더하되, 한글은 또박또박 가독성 우선.

---

## 3. 페이지 구조 (라우팅)

```
/                          메인 (히어로 + 카테고리 + 베스트 + 스토리 + 인스타)
/shop                      전체 상품 리스트
/shop/[category]           카테고리별 (summer / classic / nature / custom)
/product/[id]              상품 상세
/cart                      장바구니
/checkout                  결제
/order/complete            주문 완료
/story                     브랜드 스토리 (작가 소개)
/guide/size                사이즈 가이드
/guide/care                관리 방법
/guide/shipping            배송·교환·환불 안내
/account/login             로그인
/account/orders            주문 조회
/admin                     관리자 (트랙 B만)
```

트랙 A에서는 카페24 기본 라우팅을 따르고, 위 구조는 메뉴 설계 기준으로만 사용하세요.

---

## 4. 핵심 컴포넌트

### 4.1 상품 카드 (ProductCard)
- 이미지 비율 4:5 고정
- 좌상단 배지: BEST / NEW / SOLD OUT
- 호버 시 살짝 위로 이동 (`translateY(-4px)`)
- 정가→할인가 표시 시: `<s>` 태그로 정가 취소선
- 상품명은 한글 Gowun Batang Bold, 가격은 영문 Cormorant Garamond

### 4.2 상품 상세 페이지 (필수 영역 순서)
1. 메인 이미지 캐러셀 (5~8장)
2. 상품명 + 가격 + 재고
3. **옵션 선택**: 사이즈(S 14cm / M 16cm / L 18cm), 각인 텍스트(선택)
4. 수량 선택 + 장바구니/바로구매 버튼
5. **작가 노트** (이 상품에 담긴 이야기 2~3줄) ← 핵심 차별 영역
6. 상품 정보표 (재질, 길이, 무게, 알레르기 정보)
7. 디테일 사진 갤러리
8. 착용샷
9. 주의사항 + 배송·교환 안내
10. 리뷰 (별점 + 사진)

### 4.3 장바구니
- 좌측: 상품 리스트 (수량 변경, 삭제)
- 우측: 주문 요약 (소계, 배송비, 총합)
- 5만원 이상 시 배송비 무료 표시 (게이지 바)

### 4.4 결제 (트랙 B)
- 토스페이먼츠 SDK 사용 (한국 시장 표준)
- 결제수단: 신용카드, 카카오페이, 네이버페이, 계좌이체
- 비회원 주문 가능하게 설계 (이메일·전화번호만 받음)

---

## 5. 데이터 모델 (트랙 B만 해당)

```typescript
// 상품
type Product = {
  id: string;
  slug: string;                    // URL용 (예: "ocean-coral")
  name_ko: string;                 // "바다의 산호"
  name_en: string;                 // "Ocean Coral"
  category: 'summer' | 'classic' | 'nature' | 'custom';
  price: number;                   // 원
  compare_at_price?: number;       // 정가(할인 표시용)
  description: string;             // 작가 노트
  materials: string[];             // ["코랄 비즈", "스테인리스 줄"]
  sizes: SizeOption[];             // [{ label: 'S', wrist_cm: 14, stock: 3 }]
  images: string[];                // Supabase Storage URL
  is_featured: boolean;
  is_new: boolean;
  created_at: timestamp;
};

// 주문
type Order = {
  id: string;
  order_number: string;            // 표시용 (예: "20260425-0001")
  customer: { name, email, phone };
  shipping_address: Address;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'canceled';
  payment_method: string;
  payment_id: string;              // 토스페이먼츠 결제 키
  memo?: string;                   // 손편지 메시지 등
  created_at: timestamp;
};
```

---

## 6. 단계별 작업 목록 (Claude Code 실행 순서)

### Phase 1: 정적 페이지 완성 (1~2일)
- [ ] `index.html` 기반으로 다른 페이지 만들기 (shop, product detail, cart, story, guide)
- [ ] 공통 헤더·푸터를 컴포넌트화 (트랙 B는 React, 트랙 A는 카페24 모듈)
- [ ] 모바일 반응형 검증 (380px / 768px / 1280px 브레이크포인트)
- [ ] 폰트 로딩 최적화 (`font-display: swap`)

### Phase 2: 콘텐츠 채우기 (2~3일)
- [ ] 상품 사진 5~10개 등록 (실물 사진으로 교체)
- [ ] 작가 노트 작성 도와주기 (각 상품마다 2~3줄)
- [ ] 사이즈 가이드 페이지 작성 (손목 측정법 일러스트 포함)
- [ ] 배송·교환 정책 작성 (공정거래위원회 표준 약관 참조)
- [ ] 개인정보처리방침·이용약관 (자동 생성 도구 활용)

### Phase 3: 결제·주문 (트랙 B만, 3~5일)
- [ ] Supabase 프로젝트 설정 (DB 스키마, Storage, RLS 정책)
- [ ] 토스페이먼츠 가맹점 심사 신청 (사업자등록증 필요)
- [ ] 결제 위젯 연동 + 웹훅으로 주문 상태 업데이트
- [ ] 관리자 페이지 (주문 목록, 상태 변경, CSV 다운로드)

### Phase 4: 운영 도구 (1~2일)
- [ ] 인스타그램 피드 임베드 (메인 페이지 하단)
- [ ] 카카오톡 채널 챗봇 연결 (1:1 문의)
- [ ] Google Analytics 4 + 페이스북 픽셀 (광고 운영 시)
- [ ] 이메일 알림 (주문 접수/발송 시 — Resend 또는 카페24 기본 기능)

### Phase 5: 오픈 전 점검
- [ ] 모든 페이지 모바일에서 확인 (실제 폰으로 테스트)
- [ ] 결제 테스트 (테스트 모드로 1원 결제 → 환불까지)
- [ ] 로딩 속도 (Lighthouse 90점 이상 목표)
- [ ] SEO: 메타 태그, OG 이미지, sitemap.xml, robots.txt
- [ ] 사업자정보 풋터 표기 확인 (전자상거래법 의무사항)

---

## 7. Claude Code 작업 시 지켜야 할 규칙

### 7.1 디자인 일관성
- `:root` CSS 변수 외 색상 절대 사용 금지
- 새 컴포넌트 만들 때도 위에 정의된 폰트만 사용
- 그림자는 `0 12px 30px rgba(43, 36, 25, 0.1)` 톤으로 통일 (잉크색 기반의 따뜻한 그림자)

### 7.2 한글 처리
- 한글 텍스트는 절대 영문 폰트로 fallback 되지 않게 `font-family: 'Gowun Batang', 'Gowun Dodum', serif` 명시
- 영문/숫자가 섞인 텍스트(가격, 상품번호)는 Cormorant Garamond 사용
- letter-spacing은 한글에는 거의 적용하지 말 것 (가독성 떨어짐)

### 7.3 이미지 처리
- 모든 상품 이미지는 WebP 변환, 1080px 너비 기준
- `<img>`에 `loading="lazy"` + `decoding="async"` 필수
- alt 텍스트는 한글로 구체적으로 ("바다의 산호 팔찌 정면 사진")

### 7.4 한국 이커머스 법규 준수
- 풋터에 사업자등록번호, 통신판매업 신고번호, 대표자명, 주소, 연락처 노출
- 상품 상세에 **재질·치수·제조국·취급주의** 의무 표기
- 환불 정책: 단순 변심 7일 / 하자 30일 명시
- 14세 미만 회원가입 시 법정대리인 동의 절차 (해당 시)
- 개인정보처리방침에 수집·이용 목적, 보유 기간, 제3자 제공 명시

### 7.5 절대 하지 말 것
- 보라색 그라디언트 (AI 생성 사이트 클리셰)
- 이모지로 카테고리 아이콘 표시
- 과한 애니메이션 (스크롤마다 떠오르는 효과 등)
- 영문 placeholder ("Lorem ipsum") — 한글 더미 텍스트로 채울 것
- 무료 스톡 사진 (수공예 브랜드는 진짜 사진만)

---

## 8. 참고 자료

### 디자인 참조
- 키터샵 (kittershop.co.kr) — 구조와 메뉴 설계
- 아이디어스 (idus.com) — 핸드메이드 상품 페이지 작성법
- 무신사 스튜디오 (musinsastudio.com) — 한글 타이포그래피
- COS (cosstores.com) — 미니멀 한 글로벌 톤

### 기술 문서
- 카페24 디자인 가이드: developers.cafe24.com
- 토스페이먼츠 연동: docs.tosspayments.com
- Supabase Korean: supabase.com/docs (한국어 X, 영어 문서)
- Next.js App Router: nextjs.org/docs

### 법규
- 전자상거래법 표준약관: ftc.go.kr
- 통신판매업 신고: 정부24 (gov.kr)
- 개인정보처리방침 자동 생성: privacy.go.kr

---

## 9. 현재 상태

- [x] 메인 페이지 디자인 시안 (`index.html`) — 이 저장소
- [ ] 사업자등록 (사용자 작업)
- [ ] 도메인 구매 (사용자 작업, gabia.com 또는 hosting.kr)
- [ ] 상품 사진 촬영 (사용자 작업)
- [ ] **다음 단계**: 트랙 A/B 결정 → Phase 1 착수

---

## 10. Claude Code에게 첫 명령

이 파일을 읽고 다음 순서로 작업해주세요.

1. `index.html`을 먼저 열어서 디자인 톤을 파악
2. 사용자에게 트랙 A(카페24)인지 트랙 B(Next.js 직접 개발)인지 확인
3. 트랙 결정 후 Phase 1 첫 항목부터 시작
4. 매 작업마다 모바일 반응형을 함께 확인
5. 새 페이지 만들 때 `index.html`의 헤더·푸터·CSS 변수를 그대로 사용

질문이 생기면 추측하지 말고 사용자에게 물어보세요. 특히 사업자 정보, 실제 상품 사진, 가격 결정은 사용자 입력이 반드시 필요합니다.
