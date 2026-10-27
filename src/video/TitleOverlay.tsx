import type React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { TitleCard } from './TitleCard';
import { T, clamp } from './timeline';

// 透明标题层，方便把标题单独合成到别的画面上。
export const TitleOverlayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOut = interpolate(frame, [T.titleOut, T.titleOutEnd], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <TitleCard opacity={1 - titleOut} scale={1 + titleOut * 0.045} />
    </AbsoluteFill>
  );
};
