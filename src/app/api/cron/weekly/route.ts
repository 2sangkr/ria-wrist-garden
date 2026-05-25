import { NextRequest, NextResponse } from 'next/server';
import { getMetrics } from '@/lib/getMetrics';
import { sendTelegram, formatWeeklyReport } from '@/lib/telegram';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const m = await getMetrics();
  await sendTelegram(formatWeeklyReport(m));

  return NextResponse.json({ ok: true });
}
