import type React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Logo } from './Logo';
import { Paper } from './Paper';
import { T, clamp } from './timeline';
import { TitleCard } from './TitleCard';

export const Cover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = interpolate(frame, [0, 0.7 * fps], [0, 1], clamp);
  const rise = spring({
    frame: frame - T.paperIn,
    fps,
    config: { damping: 24, stiffness: 60 },
  });

  // 3.6s 后：以 MacBook 左上角为原点推开，把论文开头送到画面左上。
  const zoom = spring({
    frame: frame - T.zoomStart,
    fps,
    durationInFrames: 4 * fps,
    config: { damping: 30, stiffness: 40, overshootClamping: true },
  });
  const zoomScale = interpolate(zoom, [0, 1], [1, 2.35]);
  const zoomX = interpolate(zoom, [0, 1], [0, 80]);
  const zoomY = interpolate(zoom, [0, 1], [0, -170]);

  // 正文开始向上滚时，MacBook 整框也往下让一点，减少卡片下方留白。
  const frameDrop = interpolate(frame, [T.wobbleStop + 1.1 * fps, T.wobbleStop + 2.0 * fps], [0, 180], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const logoOpacity =
    interpolate(frame, [T.logoIn, T.logoIn + 16], [0, 1], clamp) *
    (1 - interpolate(frame, [T.logoOut, T.logoOutEnd], [0, 1], clamp));

  const titleOut = interpolate(frame, [T.titleOut, T.titleOutEnd], [0, 1], clamp);
  const titleOpacity = 1 - titleOut;
  const titleScale = 1 + titleOut * 0.045;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: '62%',
          left: '50%',
          opacity: sceneIn,
          transform: `translate(-50%, -50%) translateY(${(1 - rise) * 38 + frameDrop}px)`,
        }}
      >
        <div
          style={{
            transformOrigin: '0 0',
            transform: `translate(${zoomX}px, ${zoomY}px) scale(${zoomScale})`,
          }}
        >
          <Paper />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 54,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: logoOpacity,
        }}
      >
        <Logo height={112} />
      </div>

      <TitleCard opacity={titleOpacity} scale={titleScale} />
    </AbsoluteFill>
  );
};
