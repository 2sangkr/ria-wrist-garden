import { getServiceClient } from '@/lib/supabase';

export async function getMetrics() {
  const client = getServiceClient();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const [
    { count: artistCount },
    { count: workCount },
    { count: newWorkCount },
    { count: newWorksToday },
    { count: newWorksYesterday },
    { count: totalLikes },
    { data: likesRaw },
    { data: worksRaw },
  ] = await Promise.all([
    client.from('artists').select('*', { count: 'exact', head: true }).eq('is_empty', false),
    client.from('works').select('*', { count: 'exact', head: true }),
    client.from('works').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo.toISOString()),
    client.from('works').select('*', { count: 'exact', head: true }).gte('created_at', oneDayAgo.toISOString()),
    client.from('works').select('*', { count: 'exact', head: true }).gte('created_at', twoDaysAgo.toISOString()).lt('created_at', oneDayAgo.toISOString()),
    client.from('work_likes').select('*', { count: 'exact', head: true }),
    client.from('work_likes').select('work_id'),
    client.from('works').select('id, title, artists(name)'),
  ]);

  const likeMap: Record<string, number> = {};
  for (const row of likesRaw ?? []) {
    likeMap[row.work_id] = (likeMap[row.work_id] ?? 0) + 1;
  }

  const workMap: Record<string, { title: string; artistName: string }> = {};
  for (const w of (worksRaw ?? []) as any[]) {
    workMap[w.id] = { title: w.title, artistName: w.artists?.name ?? '' };
  }

  const topWorks = Object.entries(likeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, likes]) => ({ ...workMap[id], likes }))
    .filter((w) => w.title);

  const today = new Date().toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  });

  return {
    date: today,
    artists: artistCount ?? 0,
    works: workCount ?? 0,
    newWorksThisWeek: newWorkCount ?? 0,
    newWorksToday: newWorksToday ?? 0,
    newWorksYesterday: newWorksYesterday ?? 0,
    totalLikes: totalLikes ?? 0,
    topWorks,
  };
}
