import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SurchargeSwap — RBA Surcharge Ban Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F5F0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          border: '1px solid #E5E5E5',
        }}
      >
        <div style={{ color: '#E8651A', fontSize: '24px', fontWeight: 700 }}>SurchargeSwap</div>
        <div style={{ color: '#0B1C3D', fontSize: '52px', fontWeight: 800, lineHeight: 1.1, marginTop: '24px', maxWidth: '900px' }}>
          How much will the surcharge ban cost your business?
        </div>
        <div style={{ color: '#525252', fontSize: '26px', marginTop: '28px', maxWidth: '800px' }}>
          Free calculator for 436,000 Australian businesses. 1 Oct 2026.
        </div>
        <div style={{ display: 'flex', gap: '48px', marginTop: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#0B1C3D', fontSize: '32px', fontWeight: 700 }}>436,000</span>
            <span style={{ color: '#525252', fontSize: '18px' }}>businesses affected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#0B1C3D', fontSize: '32px', fontWeight: 700 }}>$910M</span>
            <span style={{ color: '#525252', fontSize: '18px' }}>annual fees eliminated</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#EF4444', fontSize: '32px', fontWeight: 700 }}>Oct 1 2026</span>
            <span style={{ color: '#525252', fontSize: '18px' }}>effective date</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
