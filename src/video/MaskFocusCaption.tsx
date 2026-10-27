import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

export const MaskFocusCaption: React.FC<{ mode: 'focus' | 'passthrough' }> = ({ mode }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 14], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const isFocus = mode === 'focus';

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
            {isFocus ? (
              <>Mask <span style={{ color: COLORS.tealDeep }}>Focus</span></>
            ) : (
              <>Copy-Through <span style={{ color: COLORS.tealDeep }}>Overlay</span></>
            )}
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
            {isFocus ? (<>遮罩<span style={{ color: COLORS.tealDeep }}>聚焦</span></>) : (<>鼠标<span style={{ color: COLORS.tealDeep }}>穿透</span></>)}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
