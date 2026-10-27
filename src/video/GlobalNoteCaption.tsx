import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export const GlobalNoteCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 14], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 900,
          transform: `translate(-50%, -50%) translateY(${(1 - enter) * 20}px)`,
          opacity: enter,
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textShadow: '0 0 16px rgba(255,255,255,0.85), 0 0 34px rgba(255,255,255,0.6)',
            padding: '14px 40px',
            borderRadius: 26,
            clipPath: `inset(0 0 ${(1 - enter) * 100}% 0)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1,
              color: '#3D534F',
              marginBottom: 12,
            }}
          >
            Global <span style={{ color: COLORS.tealDeep }}>Sticky Note</span>
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 58,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            全局<span style={{ color: COLORS.tealDeep }}>便利贴</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
