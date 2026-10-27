import type React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { clamp, FPS } from './timeline';

export const ArchiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const enter = interpolate(t, [0, 0.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          transform: `translateY(180px) scale(1.36)`,
          opacity: enter,
        }}
      >
        <MacChrome>
          <div
            style={{
              width: 1100,
              height: 720,
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile('archive-panel.webp')}
              style={{
                width: 1020,
                borderRadius: 10,
                boxShadow: '0 24px 60px rgba(15,40,35,0.16)',
                scale: 0.674,
                translate: '1.5px -58.1px',
                rotate: '-0.1deg'
              }}
            />
          </div>
        </MacChrome>
      </div>

      <Logo height={66} style={{ position: 'absolute', left: 72, top: 56 }} />
    </AbsoluteFill>
  );
};
