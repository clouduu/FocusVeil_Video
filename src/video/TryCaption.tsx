import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export const TryCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = 1;
  const exit = interpolate(frame, [66, 81], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const y = interpolate(frame, [0, 14], [56, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const x = interpolate(frame, [66, 81], [0, -180], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          opacity: enter * (1 - exit),
          textShadow: '0 0 16px rgba(255,255,255,0.85), 0 0 34px rgba(255,255,255,0.6)',
          clipPath: `inset(0 0 ${(1 - enter) * 100}% 0)`,
          transform: `translate(${x}px, ${y}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: COLORS.ink,
          }}
        >
          Give it a try
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 104,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: COLORS.tealDeep,
            marginTop: 4,
          }}
        >
          试试
        </div>
      </div>
    </AbsoluteFill>
  );
};
