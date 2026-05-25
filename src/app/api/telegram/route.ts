import { NextRequest, NextResponse } from 'next/server';
import { getMetrics } from '@/lib/getMetrics';
import { sendTelegram, formatBriefing } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-telegram-bot-api-secret-token');
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const msg = body?.message;
  if (!msg?.text) return NextResponse.json({ ok: true });

  const chatId = String(msg.chat.id);
  const text = msg.text.trim();

  if (text === '/start') {
    await sendTelegram(
      '안녕하세요! mymomo.gallery 브리핑 봇이에요.\n\n/stats — 현재 현황\n/top — 좋아요 TOP 3',
      chatId,
    );
  } else if (text === '/stats' || text === '/brief') {
    const m = await getMetrics();
    await sendTelegram(formatBriefing(m), chatId);
  } else if (text === '/top') {
    const m = await getMetrics();
    const top =
      m.topWorks.length > 0
        ? m.topWorks.map((w, i) => `${i + 1}. ${w.artistName} — ${w.title} (♥ ${w.likes})`).join('\n')
        : '없음';
    await sendTelegram(`🏆 좋아요 TOP 3\n\n${top}`, chatId);
  }

  return NextResponse.json({ ok: true });
}
