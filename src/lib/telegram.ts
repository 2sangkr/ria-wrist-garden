export async function sendTelegram(text: string, chatId?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const id = chatId ?? process.env.TELEGRAM_CHAT_ID!;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: id, text, parse_mode: 'HTML' }),
  });
}

function delta(today: number, yesterday: number): string {
  const diff = today - yesterday;
  if (diff > 0) return ` <b>(+${diff})</b>`;
  if (diff < 0) return ` <b>(${diff})</b>`;
  return '';
}

export function formatBriefing(m: {
  date: string;
  artists: number;
  works: number;
  newWorksThisWeek: number;
  newWorksToday: number;
  newWorksYesterday: number;
  totalLikes: number;
  viewsToday: number;
  viewsYesterday: number;
  topWorks: { title: string; artistName: string; likes: number }[];
}) {
  const top =
    m.topWorks.length > 0
      ? m.topWorks.map((w, i) => `  ${i + 1}. ${w.artistName} — ${w.title} (♥ ${w.likes})`).join('\n')
      : '  없음';

  return `📊 <b>mymomo.gallery 브리핑</b>
${m.date}

👁 방문: ${m.viewsToday}회${delta(m.viewsToday, m.viewsYesterday)}
👩‍🎨 작가: ${m.artists}명
🖼 작품: ${m.works}개 (주간 신작 ${m.newWorksThisWeek}개${delta(m.newWorksToday, m.newWorksYesterday)})
♥ 좋아요: 총 ${m.totalLikes}개

🏆 좋아요 TOP 3
${top}`;
}

export function formatWeeklyReport(m: {
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

  return `📅 <b>mymomo.gallery 주간 리포트</b>
${m.date}

👩‍🎨 작가: ${m.artists}명
🖼 총 작품: ${m.works}개
✨ 이번 주 신작: ${m.newWorksThisWeek}개
♥ 전체 좋아요: ${m.totalLikes}개

🏆 좋아요 TOP 3
${top}`;
}
