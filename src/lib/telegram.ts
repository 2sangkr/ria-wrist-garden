export async function sendTelegram(text: string, chatId?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const id = chatId ?? process.env.TELEGRAM_CHAT_ID!;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: id, text, parse_mode: 'HTML' }),
  });
}

export function formatBriefing(m: {
  date: string;
  artists: number;
  works: number;
  newWorksThisWeek: number;
  totalLikes: number;
  topWorks: { title: string; artistName: string; likes: number }[];
}) {
  const top =
    m.topWorks.length > 0
      ? m.topWorks.map((w, i) => `  ${i + 1}. ${w.artistName} — ${w.title} (♥ ${w.likes})`).join('\n')
      : '  없음';

  return `📊 <b>mymomo.gallery 브리핑</b>
${m.date}

👩‍🎨 작가: ${m.artists}명
🖼 작품: ${m.works}개 (주간 신작 ${m.newWorksThisWeek}개)
♥ 좋아요: 총 ${m.totalLikes}개

🏆 좋아요 TOP 3
${top}`;
}
