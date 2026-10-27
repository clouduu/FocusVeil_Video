import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export type AttentionCaptionProps = {
  x?: number;
  y?: number;
  fontSize?: number;
};

// 单独图层。位置/字号改这里，或在 Studio 里直接拖这个图层。
const DEFAULT_LAYOUT = {
  x: 960,
  y: 800,
  fontSize: 80,
};

export const AttentionCaption: React.FC<AttentionCaptionProps> = ({
  x = DEFAULT_LAYOUT.x,
  y = DEFAULT_LAYOUT.y,
  fontSize = DEFAULT_LAYOUT.fontSize,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 15], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        translate: '-632.1px 76.5px',
        scale: 0.937,
        rotate: '0.1deg'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
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
            padding: '20px 60px',
            borderRadius: 32,
            clipPath: `inset(0 0 ${(1 - enter) * 100}% 0)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 104,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '0em',
              color: '#3D534F',
              marginBottom: 16,
            }}
          >
            Inattention
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: COLORS.ink,
            }}
          >
            注意力<span style={{ color: COLORS.tealDeep }}>不集中</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
