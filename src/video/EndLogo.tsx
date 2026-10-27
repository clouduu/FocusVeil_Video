import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { clamp } from './timeline';

const START_HEIGHT = 66;
const END_HEIGHT = 232;
const LOGO_RATIO = 1268 / 420;

export const EndLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [0, 90], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const height = interpolate(move, [0, 1], [START_HEIGHT, END_HEIGHT]);
  const width = height * LOGO_RATIO;
  const left = interpolate(move, [0, 1], [72, 960 - (END_HEIGHT * LOGO_RATIO) / 2]);
  const top = interpolate(move, [0, 1], [56, 540 - END_HEIGHT / 2]);

  return (
    <AbsoluteFill>
      <Logo height={height} style={{ position: 'absolute', left, top, width }} />
    </AbsoluteFill>
  );
};
