# 작가 로그인 기능 적용 상태와 다음 단계

작성일: 2026-10-10

## 현재 상태

로컬에서 구현하고 검증했다. Google OAuth 앱과 웹 클라이언트를 대표 계정에서 생성했고, 사용자가 Supabase에 입력·저장한 Google 제공자의 ENABLED 상태를 확인했다. Git 원격 push, 운영 데이터베이스 마이그레이션, 실제 사이트 배포는 아직 하지 않았다.

구현된 기능:
- Google 로그인 및 로그아웃, 승인 작가와 로그인 계정 연결.
- 기존 작가 페이지의 작품 올리기, 기존 작품 상세 화면의 수정·삭제 버튼.
- 작품 설명 입력, 사진 교체, 휴지통 및 복원.
- 사이트 내부 작가 신청·운영자 승인·거절·기존 작가 연결.
- 사용자 ID에 따른 데이터베이스 및 파일 저장소 권한.
- 활성화 후 기존 4명(dhee, james, emma, evan)의 URL 등록은 유지하고, 신규 작가는 로그인 등록을 사용한다. URL에는 수정·삭제 권한을 부여하지 않는다. 비밀번호 관리자 API는 종료한다.

삭제는 공개 목록에서 숨기는 방식이며 파일은 보존한다. 공개 사진의 원래 URL을 알고 있는 사람이 사진을 열람하는 것까지 차단하지 않는다. 자동 영구 삭제를 구현하지 않았다. 교체한 사진 역시 복구를 위해 남긴다.

## 검증 결과

- npm run test:accounts: PostgreSQL 호환 PGlite에서 실제 마이그레이션 실행 및 기존 URL 유지 검사를 포함한 10개 테스트 통과.
- 검사 내용: 익명 등록 금지, 타 작가 작품 변경 금지, 타 작가 파일 변경 금지, 셀프 승인·권한 상승 금지, 휴지통 공개 제외·복원, 운영자 승인·기존 작가 연결.
- Next.js 빌드와 TypeScript 검사 통과.
- 기능을 켠 로컬 서버에서 비로그인 관리 페이지 3곳의 로그인 이동, 이전 업로드·관리 API 3곳의 410 응답 확인.
- 실제 Google 로그인 및 운영 Supabase에서의 사용자 두 명을 이용한 종단 테스트는 제공자 설정 이후 실시해야 한다.
- npm audit fix로 Next.js를 16.4.0으로 업데이트했다. 운영 의존성 audit에서 알려진 취약점 0개.
- 전체 의존성에는 개발 도구 관련 9개(높음 7, 중간 2)가 남아 있다. Tailwind 주요 버전 변경이 필요한 항목은 이 작업에서 강제 업데이트하지 않았다.

## 활성화 설정

ARTIST_ACCOUNTS_ENABLED=true를 서버 환경변수로 지정하면 계정 기능을 활성화한다. 기본값은 꺼짐이다. 기존 작가 4명의 URL은 등록에 계속 사용할 수 있다. 다른 작가의 전용 URL은 /my로 이동하고 토큰 등록 API를 사용할 수 없다.

설정만 먼저 켜면 기존 작가가 업로드하지 못할 수 있다. 아래 전환 순서를 따른다.

## Google 설정

관리 계정: mymomogallery@gmail.com (사용자 확인 완료).

1. Google Cloud 최초 이용 약관은 계정 소유자가 동의했고 대표 계정 접근을 확인했다.
2. mymomo-gallery 프로젝트(mindful-phalanx-511213-e1)를 대표 계정에 만들었다. OAuth 앱 이름은 모모갤러리, 지원 및 연락처 이메일은 대표 계정, 대상은 외부다. 사용자가 최종 정책에 동의하여 앱 및 mymomo-gallery-web 클라이언트 생성을 완료했다.
3. OAuth 웹 클라이언트에 Supabase가 표시하는 Google 콜백 URL을 등록한다.
4. Google 클라이언트 ID/비밀값을 Supabase Authentication의 Google 제공자 설정에 입력한다. 비밀값을 문서·메신저·Git에 남기지 않는다.
5. Supabase의 사이트 URL과 허용 리다이렉트 URL에 운영 도메인의 /auth/callback 및 필요한 테스트 주소를 등록한다. 불필요한 와일드카드는 피한다.
6. 테스트 모드에서 필요한 테스트 계정을 지정하고, 공개 운영 전에 Google 앱의 게시 상태와 요구사항을 확인한다.

이 설정은 사이트 로그인 시 Google이 제공하는 기본 계정 식별 정보만 사용한다. Gmail 메일함이나 Google Drive 파일 접근 권한을 요청하지 않는다.

공식 참고:
- https://supabase.com/docs/guides/auth/social-login/auth-google
- https://supabase.com/docs/guides/auth/server-side/creating-a-client

## 데이터베이스와 전환

### 2026-10-10 운영 사전 확인

- Google 제공자 ENABLED, Skip nonce checks 및 Allow users without an email은 꺼짐.
- Site URL https://mymomo.gallery, 허용 복귀 주소 https://mymomo.gallery/auth/callback 저장 완료.
- scripts/backup-gallery.mjs로 private-backups/2026-10-10T13-25-51.476Z에 artists 4개, works 56개 및 Storage 작품 파일 22개를 백업했다. 파일별 SHA-256 manifest를 만들었다. 이는 작품 데이터·파일 백업이며 DB 전체 스키마/인증 사용자 백업은 아니다. Git 제외 경로다.
- 운영 artists/works는 RLS 켜짐 및 공개 SELECT 정책 각 2개. storage.objects 정책은 없고, ID 시퀀스는 public.works_id_seq다. 계정 연결 테이블은 아직 없다.
- 공유 프로젝트의 rebal_peaks/rebal_stocks/rebal_notifications는 RLS 꺼짐이고 anon 및 authenticated에 SELECT/INSERT 권한이 있다. 이 사이트 코드에는 해당 테이블 사용이 없다. 다른 서비스의 사용 방식 확인 없이 권한을 바꾸지 않았다. 서비스 키로만 사용하는지 확인한 후 일반 사용자 권한을 차단할지 결정해야 한다.
- 운영 마이그레이션과 계정 기능 배포는 아직 하지 않았다.

1. 현재 DB와 Storage 파일의 별도 백업을 확보한다. Git의 사진만으로 Supabase 업로드 작품을 복원할 수는 없다.
2. 운영 프로젝트와 분리된 Supabase 테스트 프로젝트에서 supabase/migrations/20261010_artist_accounts.sql을 먼저 검증한다.
3. 기존 artists/works 정책과 Storage 정책을 확인한다. SQL은 artists/works의 기존 정책을 새 정책으로 교체한다. 다른 공개 테이블은 변경하지 않는다. Storage에 이미 허용 정책이 있다면 합쳐서 권한을 넓히지 않는지 검토해야 한다.
4. 해당 프로젝트의 works ID 시퀀스 이름이 works_id_seq인지 확인한다. SQL은 이 이름으로 INSERT 시퀀스 권한을 지정한다.
5. 최초 운영자가 로그인한 뒤, 신뢰할 수 있는 DB 관리 경로에서 gallery_admins에 해당 auth.users 사용자 ID를 넣는다. 일반 사용자는 운영자 권한을 스스로 만들 수 없다.
6. 기존 작가가 로그인해 신청하면 운영자가 실제 로그인 이메일과 신청자 본인을 확인한 뒤 기존 작가를 선택해 승인한다. 기존 작품 ID·작가 주소·사진을 유지한다.
7. 테스트 계정 두 개로 본인 등록·수정·삭제·복원 및 타 작가 변경 차단을 실제 DB와 Storage에서 확인한다.
8. 운영 마이그레이션, 환경변수, 코드 배포를 함께 계획한다. 기존 작가의 계정 연결을 끝낸 후 기능을 활성화한다.
9. 내부 신청·알림 기능이 준비되기 전까지 기존 Google Forms를 유지한다. 현재 새 신청 승인 시 자동 이메일 발송은 구현하지 않았다.

권장 계정 연결: 운영자 본인 계정에는 필요한 기존 아이 작가들을 연결하고, Evan은 확인된 본인 또는 보호자 계정에 연결한다. 이메일 문자열이 같다는 이유만으로 자동 연결하지 않는다.

## 코드 위치

- 설계: docs/artist-account-plan.md
- 마이그레이션: supabase/migrations/20261010_artist_accounts.sql
- 인증 및 권한: src/lib/account-auth.ts
- 등록·수정·휴지통·승인 처리: src/app/my/actions.ts
- 권한 검증 테스트: tests/artist-accounts.test.mjs

