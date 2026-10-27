import type React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp, FPS } from './timeline';

export const AppStoreScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const enter = interpolate(t, [0, 0.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const type = Math.min(9, Math.floor(interpolate(t, [0.5, 1.5], [0, 9], clamp)));
  const resultIn = interpolate(t, [1.4, 2.0], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const query = 'FocusVeil'.slice(0, type);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 1060,
          padding: '34px 44px 40px',
          background: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 40px 110px rgba(15,40,35,0.18)',
          opacity: enter,
          transform: `translateY(${(1 - enter) * 22}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 700, color: '#111827' }}>
            App Store
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: 420,
              height: 42,
              padding: '0 16px',
              borderRadius: 12,
              background: '#F3F5F4',
              border: '1px solid #E5E7EB',
              fontFamily: FONT_SANS,
              fontSize: 15,
              color: '#111827',
            }}
          >
            <span style={{ fontSize: 15, color: '#6B7280' }}>⌕</span>
            <span>{query}</span>
            <span style={{ width: 1, height: 18, background: '#2BB3A6', marginLeft: 1 }} />
          </div>
        </div>

        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 13, color: '#9CA3AF' }}>
          Search results
        </div>

        <div
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            padding: '22px 24px',
            borderRadius: 18,
            background: '#F7F9F8',
            opacity: resultIn,
            transform: `translateY(${(1 - resultIn) * 14}px)`,
          }}
        >
          <Img
            src={staticFile('app-icon.webp')}
            style={{ width: 118, height: 118, borderRadius: 26, display: 'block' }}
          />
          <div style={{ flex: 1, fontFamily: FONT_SANS }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>FocusVeil</div>
            <div style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
              Focus &amp; reading, together
            </div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 7 }}>
              Productivity · Free · In-App Purchases
            </div>
          </div>
          <div
            style={{
              padding: '9px 30px',
              borderRadius: 999,
              background: COLORS.tealDeep,
              color: '#FFFFFF',
              fontFamily: FONT_SANS,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            GET
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
