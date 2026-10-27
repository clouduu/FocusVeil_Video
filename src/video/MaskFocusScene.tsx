import type React from 'react';
import { MacOSCursor } from '@remotion/mac-cursors';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS, FONT_SERIF } from './theme';
import { clamp, FPS } from './timeline';

const LEFT_PARAGRAPHS = [
  'Attention is a limited resource, allocated across the competing streams of information that arrive at any given moment, and the allocation is never neutral.',
  'When the demands of a task exceed the capacity available to process them, performance does not degrade smoothly, but in a cascade of small failures. The eyes drift away from the line being read; participants report losing track of where they were.',
  'Regressions — backward saccades to passages with ambiguous grammar or intricate phrasing — do not signal failure alone, but reveal the ongoing calibration of effort between interest and the cost of extracting meaning.',
  'Comprehension is not simply a matter of decoding sequences, but of constructing a coherent model of the text as participants read; the spatial uncertainty of the gaze increases salience in predictable ways.',
];

const RIGHT_PARAGRAPHS = [
  'Reading is not a single act but a chain of small, tightly timed decisions: where to look next, how long to hold, when to move on. Each decision costs a fraction of attention, and neither is unlimited.',
  'The reader is left reconstructing meaning from a sequence they no longer quite remember. Comprehension depends on holding the beginning of a sentence in mind while the end of it arrives, and on returning to the same place.',
  'Nothing announces the failure; the reader simply arrives at the bottom of the page with less than they started. Reading is not robust to distraction, and a second study manipulated line length and column width systematically.',
  'Narrower measures reduced regression frequency by 16 percent without cost to reading speed. The result held only for participants reporting high trait inattention; comprehension costs accumulate across sustained sessions.',
];

type Tone = 'green' | 'purple';

const TONE: Record<Tone, string> = {
  green: 'rgba(168, 219, 190, 0.34)',
  purple: 'rgba(196, 176, 238, 0.36)',
};

const Paragraph: React.FC<{ text: string; tone?: Tone; delay: number }> = ({
  text,
  tone,
  delay,
}) => {
  const frame = useCurrentFrame();
  const appear = tone
    ? interpolate(frame, [delay * FPS, (delay + 0.8) * FPS], [0, 1], {
        ...clamp,
        easing: Easing.inOut(Easing.cubic),
      })
    : 0;

  return (
    <p
      style={{
        margin: '0 0 12px',
        position: 'relative',
        padding: '2px 6px',
        marginLeft: -6,
        borderRadius: 3,
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
      {tone && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            background: TONE[tone],
            opacity: appear,
            transform: `translateX(${(1 - appear) * (tone === 'green' ? -60 : 60)}px)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}
    </p>
  );
};

export const MaskFocusScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const paperIn = 1;
  const select = interpolate(t, [8, 9.5], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorX = interpolate(t, [7, 7.8, 9.5], [760, 250, 536], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(t, [7, 7.8, 9.5], [610, 330, 330], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorIn = interpolate(t, [7, 7.3], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          opacity: paperIn,
          transform: `translateY(${(1 - paperIn) * 26}px) scale(1.12)`,
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
            {LEFT_PARAGRAPHS.map((p, index) => (
              <Paragraph key={p.slice(0, 14)} text={p} tone={index === 1 ? 'green' : undefined} delay={1.2} />
            ))}
          </div>
          <div>
            {RIGHT_PARAGRAPHS.map((p, index) => (
              <Paragraph key={p.slice(0, 14)} text={p} tone={index === 1 ? 'purple' : undefined} delay={1.5} />
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 292,
            width: 380 * select,
            height: 28,
            background: 'rgba(56,182,174,0.24)',
            borderRadius: 3,
            opacity: select,
          }}
        />

        <MacOSCursor
          cursor="default"
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            width: 52,
            height: 52,
            opacity: cursorIn,
            translate: '-92.7px -36.7px'
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
