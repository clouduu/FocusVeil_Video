import type React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { clamp, FPS } from './timeline';

export const ArchiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const enter = interpolate(t, [0, 0.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
      <Img
        src={staticFile('archive-panel.webp')}
        style={{
          width: 1200,
          marginTop: 36,
          borderRadius: 14,
          boxShadow: '0 40px 110px rgba(15,40,35,0.22)',
          opacity: enter,
          transform: `translateY(${(1 - enter) * 22}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
