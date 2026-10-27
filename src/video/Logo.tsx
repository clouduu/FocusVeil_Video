import type React from 'react';
import { Img, staticFile } from 'remotion';

type LogoProps = {
  height: number;
  opacity?: number;
  style?: React.CSSProperties;
};

export const Logo: React.FC<LogoProps> = ({ height, opacity = 1, style }) => {
  return (
    <Img
      src={staticFile('logo.png')}
      style={{
        height,
        width: 'auto',
        display: 'block',
        opacity,
        ...style,
      }}
    />
  );
};
