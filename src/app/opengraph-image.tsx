import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 108, fontWeight: 900, color: '#111111' }}>
          <span
            style={{
              background: '#e8312a',
              color: 'white',
              borderRadius: 14,
              padding: '2px 20px 6px',
              marginRight: 10,
            }}
          >
            모
          </span>
          <span>든 아이의</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 108, fontWeight: 900, color: '#111111' }}>
          <span
            style={{
              background: '#1a6fce',
              color: 'white',
              borderRadius: 14,
              padding: '2px 20px 6px',
              marginRight: 10,
            }}
          >
            모
          </span>
          <span>든 예술</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
