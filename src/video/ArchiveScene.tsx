import type React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';

export const ArchiveScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: 'translateY(180px) scale(1.36)' }}>
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
              }}
            />
          </div>
        </MacChrome>
      </div>

      <Logo height={66} style={{ position: 'absolute', left: 72, top: 56 }} />
    </AbsoluteFill>
  );
};
