import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  let juaFont: ArrayBuffer | null = null;

  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Jua&text=' +
        encodeURIComponent('모든아이의예술'),
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      }
    ).then((r) => r.text());

    const urlMatch = css.match(/url\((.+?\.woff2)\)/);
    if (urlMatch?.[1]) {
      juaFont = await fetch(urlMatch[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // system font fallback
  }

  const fontFamily = juaFont ? 'Jua' : 'sans-serif';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(150deg, #fff8f8 0%, #ffffff 45%, #f0f6ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        {/* 크레용 줄무늬 */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 56 }}>
          {['#e8312a', '#f5c518', '#1a6fce', '#2db35d'].map((c, i) => (
            <div
              key={i}
              style={{ width: 52, height: 7, background: c, borderRadius: 4 }}
            />
          ))}
        </div>

        {/* 첫째 줄: 모든 아이의 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 108,
            fontWeight: 900,
            fontFamily,
            color: '#111111',
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              background: '#e8312a',
              color: 'white',
              borderRadius: 14,
              padding: '2px 22px 8px',
              marginRight: 12,
            }}
          >
            모
          </span>
          <span>든 아이의</span>
        </div>

        {/* 둘째 줄: 모든 예술 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 108,
            fontWeight: 900,
            fontFamily,
            color: '#111111',
            lineHeight: 1.1,
            marginTop: 10,
          }}
        >
          <span
            style={{
              background: '#1a6fce',
              color: 'white',
              borderRadius: 14,
              padding: '2px 22px 8px',
              marginRight: 12,
            }}
          >
            모
          </span>
          <span>든 예술</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: juaFont
        ? [{ name: 'Jua', data: juaFont, style: 'normal', weight: 400 }]
        : [],
    }
  );
}
