import type React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_SANS, FONT_SERIF } from './theme';
import { FPS, clamp } from './timeline';
import { WobblyText } from './WobblyText';

const LEFT_COLUMN = [
  'Attention is a limited resource, allocated across the competing streams of information that arrive at any given moment.',
  'When the demands of a task exceed the capacity available to process them, performance does not degrade smoothly, but in a cascade of small failures. The eyes drift away from the line being read. Participants report losing track.',
  'Regressions — backward saccades to passages with ambiguous grammar or intricate phrasing — do not signal failure alone, but reveal the ongoing calibration of effort. Both interest in the material and the cost of extracting meaning shape how working memory is distributed.',
  'Comprehension is not simply a matter of decoding sequences, but of constructing a coherent model of the text as participants read. The spatial uncertainty of the gaze increases salience in predictable ways.',
];

const RIGHT_COLUMN = [
  'Reading is not a single act but a chain of small, tightly timed decisions: where to look next, how long to hold, when to move on. Each decision costs a fraction of attention, and neither is unlimited. Under load the chain frays at its weakest link.',
  'The reader is left reconstructing meaning from a sequence they no longer quite remember. Comprehension depends on the reader being able to hold the beginning of a sentence in mind while the end of it arrives, and on returning to the same place.',
  'Nothing announces the failure; the reader simply arrives at the bottom of the page with less than they started. Reading is not robust to distraction. A second study manipulated line length and column width systematically.',
  'Narrower measures reduced regression frequency by 16 percent without cost to reading speed. The result held only for participants reporting high trait inattention. Comprehension costs accumulate across sustained reading sessions.',
];

const Chrome: React.FC = () => (
  <div
    style={{
      height: 44,
      backgroundColor: '#F6F6F6',
      borderBottom: '1px solid #D6D6D6',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 16,
    }}
  >
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 16,
        fontFamily: FONT_SANS,
        fontSize: 13,
        color: '#6B7280',
      }}
    >
      <WobblyText text="attention_limits.pdf" seed={1} strength={0.8} color="#6B7280" />
    </div>
  </div>
);

const CARD_LINE_HEIGHT = 28;
const CARD_LINES = [
  'Reading is a chain of timed decisions.',
  'The eyes move ahead, then back.',
  'When attention slips, the chain breaks.',
  'The reader lands two lines down, then returns.',
  'The words are all there. The order is not.',
];

const LineSkipCard: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const boxLine = interpolate(t, [12.3, 12.9, 13.5, 14.1], [0, 1, 1, 4], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const currentLine = Math.round(boxLine);
  const skipped = t >= 13.5;
  const maskIn = interpolate(t, [12.1, 12.3], [0, 1], clamp);

  return (
    <div
      style={{
        width: 480,
        marginTop: 24,
        padding: '24px 32px',
        background: '#FFFDF9',
        borderRadius: 4,
        border: '1px solid rgba(20,70,62,0.08)',
        boxShadow: '0 30px 80px rgba(20,50,45,0.14)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: -5,
            right: -5,
            top: 8 + boxLine * CARD_LINE_HEIGHT,
            height: 24,
            background: 'rgba(56,182,174,0.10)',
            border: '1.5px solid rgba(34,150,143,0.55)',
            borderRadius: 4,
            zIndex: 0,
            opacity: maskIn,
          }}
        />
        {CARD_LINES.map((line, index) => {
          const current = index === currentLine;
          const isSkipped = skipped && (index === 2 || index === 3);
          return (
            <div
              key={line}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'baseline',
                height: CARD_LINE_HEIGHT,
              }}
            >
              <div
                style={{
                  width: 20,
                  flexShrink: 0,
                  fontFamily: FONT_SANS,
                  fontSize: 7,
                  fontWeight: 500,
                  color: current ? COLORS.tealDeep : isSkipped ? COLORS.faint : COLORS.muted,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 18,
                  lineHeight: `${CARD_LINE_HEIGHT}px`,
                  color: isSkipped ? COLORS.muted : COLORS.ink,
                  opacity: isSkipped ? 0.35 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {line}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const RE_READ_ROWS = [
  { text: CARD_LINES[0], number: '01', duplicate: false },
  { text: CARD_LINES[1], number: '02', duplicate: false },
  { text: CARD_LINES[1], number: '02', duplicate: true },
  { text: CARD_LINES[2], number: '03', duplicate: false },
  { text: CARD_LINES[3], number: '04', duplicate: false },
  { text: CARD_LINES[4], number: '05', duplicate: false },
];

const ReReadingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const boxLine = interpolate(t, [18.8, 19.7, 20.5, 21.1, 21.7], [1, 2, 1, 2, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const currentLine = Math.round(boxLine);
  const duplicateHeight = interpolate(t, [19.1, 19.4], [0, CARD_LINE_HEIGHT], clamp);
  const duplicateOpacity = interpolate(t, [19.1, 19.3], [0, 1], clamp);
  const maskIn = interpolate(t, [18.6, 18.8], [0, 1], clamp);

  return (
    <div
      style={{
        width: 480,
        marginTop: 180,
        padding: '24px 32px',
        background: '#FFFDF9',
        borderRadius: 4,
        border: '1px solid rgba(20,70,62,0.08)',
        boxShadow: '0 30px 80px rgba(20,50,45,0.14)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: -5,
            right: -5,
            top: 8 + boxLine * CARD_LINE_HEIGHT,
            height: 24,
            background: 'rgba(56,182,174,0.10)',
            border: '1.5px solid rgba(34,150,143,0.55)',
            borderRadius: 4,
            zIndex: 0,
            opacity: maskIn,
          }}
        />
        {RE_READ_ROWS.map((row, index) => {
          const current = index === currentLine;
          if (row.duplicate) {
            return (
              <div
                key={`${row.number}-${index}`}
                style={{
                  height: duplicateHeight,
                  overflow: 'hidden',
                  opacity: duplicateOpacity,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    height: CARD_LINE_HEIGHT,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      flexShrink: 0,
                      fontFamily: FONT_SANS,
                      fontSize: 7,
                      fontWeight: 500,
                      color: COLORS.tealDeep,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {row.number}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: 18,
                      lineHeight: `${CARD_LINE_HEIGHT}px`,
                      color: COLORS.ink,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.text}
                    <span style={{ marginLeft: 8, color: COLORS.tealDeep, fontSize: 16 }}>↻</span>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              key={`${row.number}-${index}`}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'baseline',
                height: CARD_LINE_HEIGHT,
              }}
            >
              <div
                style={{
                  width: 20,
                  flexShrink: 0,
                  fontFamily: FONT_SANS,
                  fontSize: 7,
                  fontWeight: 500,
                  color: current ? COLORS.tealDeep : COLORS.muted,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.number}
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 18,
                  lineHeight: `${CARD_LINE_HEIGHT}px`,
                  color: COLORS.ink,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Column: React.FC<{ paragraphs: string[]; seed: number }> = ({ paragraphs, seed }) => (
  <div>
    {paragraphs.map((paragraph, index) => (
      <p
        key={paragraph.slice(0, 24)}
        style={{
          margin: '0 0 18px',
          fontSize: 16,
          lineHeight: 1.8,
          color: '#1F2937',
        }}
      >
        <WobblyText text={paragraph} seed={seed + index} color="#1F2937" />
      </p>
    ))}
  </div>
);

// 一台只露出屏幕的 MacBook。底部会被画框裁掉，保持「从桌面看过去」的视角。
export const Paper: React.FC = () => {
  const frame = useCurrentFrame();
  const lineScroll = interpolate(frame, [10 * FPS, 11.1 * FPS], [0, -700], clamp);
  const reReadScroll = interpolate(frame, [17.5 * FPS, 18.1 * FPS], [0, -368], clamp);
  const scroll = lineScroll + reReadScroll;

  return (
    <div
      style={{
        width: 1400,
        padding: '12px 12px 40px',
        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.28), 0 24px 70px rgba(20,70,62,0.22)',
      }}
    >
      <div
        style={{
          width: 1376,
          height: 860,
          backgroundColor: COLORS.paper,
          borderRadius: '4px 4px 0 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Chrome />
        <div
          style={{
            padding: '60px 90px',
            height: 816,
            fontFamily: FONT_SERIF,
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', translate: `0px ${scroll}px` }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.5,
              color: '#9CA3AF',
              marginBottom: 10,
              fontFamily: FONT_SANS,
            }}
          >
            <WobblyText text="ABSTRACT" seed={2} strength={0.8} color="#9CA3AF" />
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 600,
              margin: '0 0 18px',
              lineHeight: 1.3,
              color: '#111827',
            }}
          >
            <WobblyText text="The Limits of Sustained Attention" seed={3} color="#111827" />
          </h1>
          <div style={{ fontSize: 15, color: '#6B7280', marginBottom: 40 }}>
            <WobblyText text="R. Chen, M. Alvarez · Journal of Attention Science, 2024" seed={4} color="#6B7280" />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              fontFamily: FONT_SERIF,
            }}
          >
            <Column paragraphs={LEFT_COLUMN} seed={5} />
            <Column paragraphs={RIGHT_COLUMN} seed={9} />
          </div>
          <LineSkipCard />
          <ReReadingCard />
          </div>
        </div>
      </div>
    </div>
  );
};
