import type React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, GRAIN, TINTS } from './theme';

export const Backdrop: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{ background: TINTS.mint }} />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 120% at 50% 38%, transparent 58%, rgba(20,70,62,0.06) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: GRAIN,
          opacity: 0.035,
          mixBlendMode: 'multiply',
        }}
      />
    </AbsoluteFill>
  );
};
