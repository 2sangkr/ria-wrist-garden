import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { getMetrics } from '@/lib/getMetrics';
import { sendTelegram, formatBriefing } from '@/lib/telegram';
import { tokenForSlug } from '@/lib/uploadToken';

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
  const [cmd, ...args] = text.split(/\s+/);

  if (cmd === '/start') {
    await sendTelegram(
      '안녕하세요! mymomo.gallery 브리핑 봇이에요.\n\n' +
      '/stats — 현재 현황\n' +
      '/top — 좋아요 TOP 3\n' +
      '/link [slug] — 업로드 링크 생성\n' +
      '/artist [이름] — 작가 정보 조회',
      chatId,
    );
  } else if (cmd === '/stats' || cmd === '/brief') {
    const m = await getMetrics();
    await sendTelegram(formatBriefing(m), chatId);
  } else if (cmd === '/top') {
    const m = await getMetrics();
    const top =
      m.topWorks.length > 0
        ? m.topWorks.map((w, i) => `${i + 1}. ${w.artistName} — ${w.title} (♥ ${w.likes})`).join('\n')
        : '없음';
    await sendTelegram(`🏆 좋아요 TOP 3\n\n${top}`, chatId);
  } else if (cmd === '/link') {
    const slug = args[0];
    if (!slug) {
      await sendTelegram('사용법: /link [작가slug]\n예: /link dhee', chatId);
    } else {
      const token = tokenForSlug(slug);
      await sendTelegram(`🔗 업로드 링크\n\nhttps://mymomo.gallery/upload/${token}`, chatId);
    }
  } else if (cmd === '/artist') {
    const name = args.join(' ');
    if (!name) {
      await sendTelegram('사용법: /artist [이름]\n예: /artist D.hee', chatId);
    } else {
      const client = getServiceClient();
      const { data: artists } = await client
        .from('artists')
        .select('name, slug, is_empty')
        .ilike('name', `%${name}%`)
        .eq('is_empty', false);

      if (!artists || artists.length === 0) {
        await sendTelegram(`"${name}" 작가를 찾을 수 없어요.`, chatId);
      } else {
        const artist = artists[0];
        const { count: workCount } = await client
          .from('works')
          .select('*', { count: 'exact', head: true })
          .eq('artist_id', (await client.from('artists').select('id').eq('slug', artist.slug).single()).data?.id);

        const token = tokenForSlug(artist.slug);
        await sendTelegram(
          `👩‍🎨 <b>${artist.name}</b>\n\n` +
          `🖼 작품: ${workCount ?? 0}개\n` +
          `🔗 갤러리: https://mymomo.gallery/artist/${artist.slug}\n` +
          `📤 업로드: https://mymomo.gallery/upload/${token}`,
          chatId,
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
