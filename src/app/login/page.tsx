import { accountsEnabled } from '@/lib/account-settings';
import LoginButton from './LoginButton';
export const metadata = { title: '로그인', robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="max-w-md mx-auto px-5 py-20 space-y-6"><h1 className="text-3xl font-bold">모모갤러리 로그인</h1>
    <p>작가 또는 보호자의 Google 계정으로 로그인해 작품을 관리하세요. 작품 감상은 로그인 없이 가능합니다.</p>
    {error && <p role="alert">로그인을 완료하지 못했어요. 다시 시도해 주세요.</p>}
    {accountsEnabled() ? <LoginButton /> : <p>작가 로그인 기능을 준비하고 있습니다.</p>}
  </div>;
}

