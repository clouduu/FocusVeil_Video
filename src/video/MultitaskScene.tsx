import type React from 'react';
import { MacOSCursor } from '@remotion/mac-cursors';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS } from './theme';
import { clamp, FPS } from './timeline';

const CARDS = [
  { label: 'Mail', left: 90, top: 90, note: '#FFF3C4', rows: ['Reply to Sarah', 'Invoice #204'] },
  { label: 'Calendar', left: 600, top: 90, note: '#E7F6EC', rows: ['9:30 Standup', '11:00 Review'] },
  { label: 'Reading', left: 90, top: 410, note: '#F3E8FF', rows: ['Attention paper', 'Highlight notes'] },
  { label: 'Design', left: 600, top: 410, note: '#E9EEF8', rows: ['Hero section', 'Icon set'] },
];

export const MultitaskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const enter = interpolate(t, [0, 0.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const active = t < 3 ? 0 : t < 5 ? 1 : 2;
  const cursorX = interpolate(t, [0.8, 2.0, 3.0, 4.2, 5.2, 6.4], [900, 900, 780, 780, 300, 300], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(t, [0.8, 2.0, 3.0, 4.2, 5.2, 6.4], [700, 520, 520, 250, 250, 600], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorIn = interpolate(t, [0.8, 1.0], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: enter, transform: `translateY(${(1 - enter) * 20}px)` }}>
        <MacChrome>
          <div style={{ width: 1100, height: 720, position: 'relative', background: '#FFFFFF' }}>
            {CARDS.map((card, i) => {
              const dim = i !== active && t > 2 ? 0.18 : 1;
              return (
                <div
                  key={card.label}
                  style={{
                    position: 'absolute',
                    left: card.left,
                    top: card.top,
                    width: 340,
                    minHeight: 230,
                    padding: '22px 26px',
                    background: card.note,
                    borderRadius: 6,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.16)',
                    opacity: dim,
                  }}
                >
                  <div style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 700, color: '#3F3A1F' }}>
                    {card.label}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {card.rows.map((row) => (
                      <div key={row} style={{ fontFamily: FONT_SANS, fontSize: 18, color: '#4A4324' }}>
                        {row}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </MacChrome>
      </div>

      <MacOSCursor
        cursor="default"
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          width: 52,
          height: 52,
          opacity: cursorIn,
        }}
      />

      <Logo height={66} style={{ position: 'absolute', left: 72, top: 56 }} />
    </AbsoluteFill>
  );
};
