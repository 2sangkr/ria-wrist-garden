import { NextRequest, NextResponse } from 'next/server';
import { sendTelegram } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.FORM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, intro, question } = body;

  await sendTelegram(
    `📮 <b>작가 등록 문의 도착!</b>\n\n` +
    `👤 ${name ?? '이름 없음'}\n` +
    `✉️ ${email ?? '이메일 없음'}\n\n` +
    `🎨 활동 소개\n${intro ?? '-'}\n\n` +
    `❓ 궁금한 사항\n${question ?? '-'}`,
  );

  return NextResponse.json({ ok: true });
}
