import { accountsEnabled } from '@/lib/account-settings';
import LoginButton from './LoginButton';
export const metadata = { title: '로그인', robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  const applying = next === '/my/apply';
  return <div className="max-w-md mx-auto px-5 py-20 space-y-6"><h1 className="text-3xl font-bold">{applying ? '나만의 갤러리를 시작하세요' : '모모갤러리 로그인'}</h1>
    <p>{applying ? 'Google 계정으로 로그인한 뒤 신청서를 작성해 주세요. 운영자가 승인하면 갤러리가 만들어집니다.' : 'Google 계정으로 로그인해 내 작품을 관리하세요. 작품 감상은 로그인 없이 가능합니다.'}</p><p className="text-sm text-gray-500">아이의 작품은 보호자 계정으로 신청하고 관리할 수 있습니다. 한 계정으로 여러 작가를 관리할 수 있어요.</p>
    {error && <p role="alert">로그인을 완료하지 못했어요. 다시 시도해 주세요.</p>}
    {accountsEnabled() ? <LoginButton applying={applying} /> : <p>작가 로그인 기능을 준비하고 있습니다.</p>}
  </div>;
}

