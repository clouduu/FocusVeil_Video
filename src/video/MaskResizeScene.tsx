import type React from 'react';
import { MacOSCursor } from '@remotion/mac-cursors';
import { AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS, FONT_SERIF } from './theme';
import { clamp, FPS } from './timeline';

const LEFT = [
  'Attention is a limited resource, allocated across the competing streams of information that arrive at any given moment, and the allocation is never neutral.',
  'When the demands of a task exceed the capacity available to process them, performance does not degrade smoothly, but in a cascade of small failures.',
  'Regressions — backward saccades to passages with ambiguous grammar or intricate phrasing — do not signal failure alone, but reveal the ongoing calibration of effort.',
];

const RIGHT = [
  'Reading is not a single act but a chain of small, tightly timed decisions: where to look next, how long to hold, when to move on.',
  'The reader is left reconstructing meaning from a sequence they no longer quite remember, holding the beginning of a sentence in mind.',
  'Nothing announces the failure; the reader simply arrives at the bottom of the page with less than they started, and reading is not robust.',
];

const HANDLE = 8;

export const MaskResizeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const handlesIn = interpolate(t, [0.3, 0.6], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const resize = interpolate(t, [1.0, 2.5], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const colorMix = interpolate(t, [3.0, 8.0], [0, 1], clamp);
  const handlesOut = interpolate(t, [3.5, 3.8], [1, 0], clamp);
  const drag = interpolate(t, [4.0, 6.0], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const maskX = 66;
  const maskY = 258 + drag * 92;
  const maskW = 470;
  const maskH = interpolate(resize, [0, 1], [150, 44]);
  const maskColor = interpolateColors(
    colorMix,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgba(168, 219, 190, 0.34)',
      'rgba(196, 176, 238, 0.40)',
      'rgba(247, 214, 140, 0.36)',
      'rgba(160, 204, 240, 0.36)',
      'rgba(148, 226, 216, 0.34)',
    ],
  );

  const cursorX = interpolate(t, [0.8, 1.0, 2.5, 4.0, 6.0], [760, 536, 536, 300, 300], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(t, [0.8, 1.0, 2.5, 4.0, 6.0], [560, 408, 302, 300, 392], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorIn = interpolate(t, [0.8, 1.0], [0, 1], clamp);
  const focus = interpolate(t, [0, 1.5], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const handles = [
    [maskX, maskY],
    [maskX + maskW, maskY],
    [maskX, maskY + maskH],
    [maskX + maskW, maskY + maskH],
  ];

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          transform: `translate(${focus * 36}px, ${focus * 26}px) scale(${1.12 + focus * 0.28})`,
          transformOrigin: '0 0',
        }}
      >
      <MacChrome>
      <div
        style={{
          position: 'relative',
          width: 1100,
          height: 720,
          padding: '56px 76px',
          background: '#FFFDF9',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <div style={{ fontFamily: FONT_SANS, fontSize: 11, letterSpacing: 1.6, color: '#9CA3AF' }}>
          ABSTRACT
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 31,
            fontWeight: 600,
            color: '#111827',
            margin: '10px 0 12px',
            lineHeight: 1.25,
          }}
        >
          The Limits of Sustained Attention
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: '#6B7280', marginBottom: 24 }}>
          R. Chen, M. Alvarez · Journal of Attention Science, 2024
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 44,
            fontFamily: FONT_SERIF,
            fontSize: 13.5,
            lineHeight: 1.62,
            color: '#1F2937',
          }}
        >
          <div>
            {LEFT.map((p) => (
              <p key={p.slice(0, 14)} style={{ margin: '0 0 16px' }}>
                {p}
              </p>
            ))}
          </div>
          <div>
            {RIGHT.map((p) => (
              <p key={p.slice(0, 14)} style={{ margin: '0 0 16px' }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: maskX,
            top: maskY,
            width: maskW,
            height: maskH,
            background: maskColor,
            borderRadius: 3,
          }}
        />

        {handles.map(([x, y]) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: 'absolute',
              left: x - HANDLE / 2,
              top: y - HANDLE / 2,
              width: HANDLE,
              height: HANDLE,
              background: '#FFFFFF',
              border: '1.5px solid #22968F',
              borderRadius: 2,
              opacity: handlesIn * handlesOut,
            }}
          />
        ))}

        <MacOSCursor
          cursor="default"
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            width: 52,
            height: 52,
            opacity: cursorIn,
          }}
        />
      </div>
      </MacChrome>
      </div>

      <Logo
        height={66}
        style={{
          position: 'absolute',
          left: 72,
          top: 56,
        }}
      />
    </AbsoluteFill>
  );
};
