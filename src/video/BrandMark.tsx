import type React from 'react';
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { clamp } from './timeline';

// 左上角品牌标记：第一段「注意力不集中」与第二段「阅读跳行」共用。
export const BrandMark: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [from, from + 15], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        top: 56,
        width: 200,
        opacity: enter,
        translate: `0px ${(1 - enter) * 12}px`,
        zIndex: 10,
      }}
    >
      <Img
        src={staticFile('logo.png')}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};
