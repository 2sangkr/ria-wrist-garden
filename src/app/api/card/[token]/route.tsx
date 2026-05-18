import { ImageResponse } from 'next/og';
import { slugFromToken } from '@/lib/uploadToken';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

function lighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, r + Math.round((255 - r) * amount));
  const lg = Math.min(255, g + Math.round((255 - g) * amount));
  const lb = Math.min(255, b + Math.round((255 - b) * amount));
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}

function darken(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.max(0, r - Math.round(r * amount));
  const dg = Math.max(0, g - Math.round(g * amount));
  const db = Math.max(0, b - Math.round(b * amount));
  return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`;
}

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const slug = slugFromToken(token);
    if (!slug) return new Response('Not found', { status: 404 });

    const { data: artist, error } = await supabase
      .from('artists')
      .select('name, tags, bio, profile_color')
      .eq('slug', slug)
      .single();

    if (error || !artist) return new Response('Not found', { status: 404 });

    const base = (artist.profile_color as string) || '#b8ddf0';
    const frontBg = base;
    const backBg = lighten(base, 0.55);
    const outerBg = lighten(base, 0.3);
    const textDark = darken(base, 0.65);
    const textMid = darken(base, 0.4);
    const qrBg = lighten(base, 0.6).replace('#', '');
    const qrFg = darken(base, 0.7).replace('#', '');

    const tags: string[] = artist.tags ?? [];
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://mymomo.gallery/artist/${slug}&bgcolor=${qrBg}&color=${qrFg}&margin=8`;

    const fontData = await fetch(
      'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLQ.ttf'
    ).then((r) => r.arrayBuffer());

    const cardStyle = {
      width: 600,
      height: 1020,
      display: 'flex',
      flexDirection: 'column' as const,
      fontFamily: '"NotoSansKR"',
    };

    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'row', background: outerBg, padding: 40, gap: 40 }}>
          {/* 앞면 */}
          <div style={{ ...cardStyle, background: frontBg, borderRadius: 40, padding: '70px 56px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 20, color: textMid, fontWeight: 700, display: 'flex', letterSpacing: 3 }}>
                MOMO GALLERY · ARTIST
              </div>
              <div style={{ fontSize: 110, color: textDark, fontWeight: 900, lineHeight: 1, marginTop: 28, display: 'flex' }}>
                {artist.name}
              </div>
              <div style={{ fontSize: 26, color: textMid, lineHeight: 1.6, marginTop: 24, display: 'flex' }}>
                {artist.bio}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {tags.map((tag: string) => (
                  <div key={tag} style={{ display: 'flex', fontSize: 22, color: textDark, background: 'rgba(255,255,255,0.5)', borderRadius: 60, padding: '6px 24px' }}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: 18, color: textMid, fontWeight: 700 }}>
              mymomo.gallery/artist/{slug}
            </div>
          </div>

          {/* 뒷면 */}
          <div style={{ ...cardStyle, background: backBg, borderRadius: 40, padding: '70px 56px', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            <div style={{ display: 'flex', fontSize: 18, color: textMid, fontWeight: 700, letterSpacing: 3 }}>
              SCAN TO VISIT
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} width={260} height={260} style={{ borderRadius: 20 }} alt="QR" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 48, color: textDark, fontWeight: 900, display: 'flex' }}>
                {artist.name}
              </div>
              <div style={{ fontSize: 24, color: textMid, display: 'flex' }}>
                모든 아이의 모든 예술
              </div>
              <div style={{ fontSize: 18, color: textMid, marginTop: 8, display: 'flex' }}>
                mymomo.gallery/artist/{slug}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1280,
        height: 1100,
        fonts: [{ name: 'NotoSansKR', data: fontData, style: 'normal', weight: 400 }],
      }
    );
  } catch (e) {
    console.error('Card generation error:', e);
    return new Response('Error generating card', { status: 500 });
  }
}
