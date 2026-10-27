import type React from 'react';
import { Composition } from 'remotion';
import { HeroScene } from './HeroScene';
import { FPS, T, VIDEO_DURATION } from './video/timeline';
import { TitleOverlayScene } from './video/TitleOverlay';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Hero"
        component={HeroScene}
        durationInFrames={VIDEO_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroTitleOverlay"
        component={TitleOverlayScene}
        durationInFrames={T.duration}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
