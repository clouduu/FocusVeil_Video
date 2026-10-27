import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export const MultitaskCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 14], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        translate: '0px -39px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 980,
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
            padding: '10px 30px',
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
              marginBottom: 10,
            }}
          >
            Multitasking, <span style={{ color: COLORS.tealDeep }}>Forget the Details</span>
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
            多任务，<span style={{ color: COLORS.tealDeep }}>但忘记细节</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
