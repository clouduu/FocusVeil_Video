import type React from 'react';
import { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { T, clamp } from './timeline';

type WobblyTextProps = {
  text: string;
  seed: number;
  strength?: number;
  color?: string;
};

type RGB = [number, number, number];

const WHITE: RGB = [255, 255, 255];
const BLACK: RGB = [0, 0, 0];

const hexToRgb = (hex: string): RGB => {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((part) => part + part)
          .join('')
      : value;
  const numeric = Number.parseInt(full, 16);
  return [(numeric >> 16) & 255, (numeric >> 8) & 255, numeric & 255];
};

const mix = (from: RGB, to: RGB, amount: number): RGB => [
  Math.round(from[0] + (to[0] - from[0]) * amount),
  Math.round(from[1] + (to[1] - from[1]) * amount),
  Math.round(from[2] + (to[2] - from[2]) * amount),
];

// 推镜落定后，每个字母按自己的节奏不规则缩放、轻微旋转，并在明暗之间游走。
// 三组缩放频率故意不成整数比，相邻字母相位错开，看起来就不会是"整体呼吸"或固定花样。
export const WobblyText: React.FC<WobblyTextProps> = ({
  text,
  seed,
  strength = 1,
  color = '#1F2937',
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - T.wobbleStart);
  const fade = interpolate(frame, [T.wobbleStart, T.wobbleFadeEnd], [0, 1], clamp);
  const stop = interpolate(frame, [T.wobbleStop, T.wobbleStop + 12], [1, 0], clamp);
  const baseColor = useMemo(() => hexToRgb(color), [color]);
  let characterIndex = 0;

  return (
    <>
      {text.split(/(\s+)/).map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`space-${tokenIndex}`} style={{ whiteSpace: 'pre' }}>
              {token}
            </span>
          );
        }

        const wordStart = characterIndex;
        characterIndex += token.length;

        return (
          <span
            key={`word-${tokenIndex}`}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {Array.from(token).map((character, index) => {
              const i = wordStart + index;
              const wave =
                0.45 * Math.sin(t * 0.13 + i * 0.93 + seed * 1.7) +
                0.3 * Math.sin(t * 0.061 + i * 1.61 + seed * 2.9) +
                0.25 * Math.sin(t * 0.27 + i * 2.71 + seed * 4.3);
              const scale = 1 + fade * stop * strength * wave * 0.12;

              const rotateWave =
                1.0 * Math.sin(t * 0.083 + i * 1.21 + seed * 3.1) +
                0.55 * Math.sin(t * 0.17 + i * 2.37 + seed * 1.9);
              const rotate = fade * stop * strength * rotateWave;

              const shadeWave =
                0.62 * Math.sin(t * 0.09 + i * 1.37 + seed * 2.3) +
                0.38 * Math.sin(t * 0.19 + i * 0.73 + seed * 5.1);
              const shade = fade * stop * strength * shadeWave;
              const target = shade >= 0 ? WHITE : BLACK;
              const amount = Math.min(0.3, Math.abs(shade) * (shade >= 0 ? 0.3 : 0.28));
              const [r, g, b] = mix(baseColor, target, amount);

              return (
                <span
                  key={`char-${index}`}
                  style={{
                    display: 'inline-block',
                    color: `rgb(${r}, ${g}, ${b})`,
                    transformOrigin: 'center bottom',
                    transform: `rotate(${rotate}deg) scale(${scale})`,
                  }}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};
