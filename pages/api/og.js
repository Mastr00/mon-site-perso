import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')?.slice(0, 100) || 'Mehdi Mamdouh';
    const subtitle =
      searchParams.get('subtitle')?.slice(0, 120) || 'Étudiant en électronique & développeur IoT';

    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '80px',
          backgroundColor: '#0F172A',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15) 0, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.1) 0, transparent 50%)',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#38BDF8',
            fontSize: '32px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '999px',
              backgroundColor: '#38BDF8',
            }}
          />
          mmsa.app
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '84px',
              fontWeight: 700,
              color: '#F1F5F9',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#38BDF8' }}>&gt; </span>
            {title}
          </div>
          <div
            style={{
              fontSize: '36px',
              color: '#94A3B8',
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '24px',
            color: '#64748B',
            borderTop: '1px solid rgba(56, 189, 248, 0.2)',
            paddingTop: '24px',
          }}
        >
          <span>Mehdi Mamdouh — Nice, France</span>
          <span>Portfolio & IoT</span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
