import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

// 单独图层：阅读跳行的中英文配字，位置可在 Studio 里拖动。
export const LineSkipCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 15], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 880,
          transform: `translate(-50%, -50%) translateY(${(1 - enter) * 24}px) scale(${
            0.985 + enter * 0.015
          })`,
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
              fontSize: 80,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '0em',
              color: '#3D534F',
              marginBottom: 12,
            }}
          >
            Line <span style={{ color: COLORS.tealDeep }}>Skipping</span>
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            阅读<span style={{ color: COLORS.tealDeep }}>跳行</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
