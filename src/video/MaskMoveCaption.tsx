import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export const MaskMoveCaption: React.FC = () => {
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
            padding: '14px 40px',
            borderRadius: 26,
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
            Move Mode, <span style={{ color: COLORS.tealDeep }}>Free Transform</span>
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            移动模式，<span style={{ color: COLORS.tealDeep }}>自由变换</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
