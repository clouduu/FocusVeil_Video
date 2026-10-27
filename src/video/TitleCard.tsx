import type React from 'react';
import { useMemo } from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONT_SANS } from './theme';
import { clamp } from './timeline';

const measureTextWidth = (text: string, fontSize: number, spacingPx: number) => {
  const fallback = text.length * fontSize * 0.6 + spacingPx * text.length;
  if (typeof document === 'undefined') {
    return fallback;
  }
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) {
    return fallback;
  }
  ctx.font = `600 ${fontSize}px ${FONT_SANS}`;
  return ctx.measureText(text).width + spacingPx * text.length;
};

type TitleCardProps = {
  opacity: number;
  scale?: number;
};

// 标题动效（30fps）：问句逐字 → 问句上下分开退场 → ADHD 居中 → 左移 → 右侧逐字出现。
const Q_EXIT = [42, 54];
const ADHD_IN = 45;
const MOVE_START = 66;
const MOVE_DURATION = 24;
const EN_START = 90;
const EN_STAGGER = 1.0;
const CN_START = 90;
const CN_STAGGER = 5;
const CHAR_FADE = 8;

export const TitleCard: React.FC<TitleCardProps> = ({ opacity, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const qExit = interpolate(frame, Q_EXIT, [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

  const questionMetrics = useMemo(() => {
    const enWords = ['DO', 'YOU', 'HAVE'];
    const enWidths = enWords.map((word) => measureTextWidth(word, 96, 96 * 0.02));
    const enGap = 24;
    const enFull = enWidths.reduce((sum, width) => sum + width, 0) + enGap * (enWords.length - 1);
    const enShift = enFull / 2 - enWidths[0] / 2;

    const cnWidths = Array.from('你是否有').map((char) => measureTextWidth(char, 96, 0));
    const cnFull = cnWidths.reduce((sum, width) => sum + width, 0);
    const cnShift = cnFull / 2 - cnWidths[0] / 2;

    return { enShift, cnShift };
  }, []);

  const enProgress = interpolate(frame, [9, 24], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cnProgress = interpolate(frame, [15, 24], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const enShiftNow = questionMetrics.enShift * (1 - enProgress);
  const cnShiftNow = questionMetrics.cnShift * (1 - cnProgress);

  const adhdWidth = useMemo(() => measureTextWidth('ADHD', 184, -0.05 * 184), []);
  const adhdStartX = (1280 - adhdWidth) / 2;

  const adhdIn = spring({
    frame: frame - ADHD_IN,
    fps,
    config: { damping: 20, stiffness: 120 },
  });
  const move = spring({
    frame: frame - MOVE_START,
    fps,
    durationInFrames: MOVE_DURATION,
    config: { damping: 30, stiffness: 60, overshootClamping: true },
  });
  const adhdX = interpolate(move, [0, 1], [adhdStartX, 0]);
  const adhdScale = 0.86 + adhdIn * 0.14;

  const appear = (start: number) =>
    interpolate(frame, [start, start + CHAR_FADE], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    });

  const renderWords = (text: string, starts: number[]) =>
    text.split(' ').map((word, index) => {
      const begin = starts[index] ?? starts[starts.length - 1];
      const p = appear(begin);
      return (
        <span
          key={`${word}-${index}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: p,
              translate: `0px ${(1 - p) * 110}%`,
            }}
          >
            {word}
          </span>
        </span>
      );
    });

  const renderChars = (text: string, starts: number[]) =>
    Array.from(text).map((char, index) => {
      const begin = starts[index] ?? starts[starts.length - 1];
      const p = appear(begin);
      return (
        <span
          key={`${char}-${index}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: p,
              translate: `0px ${(1 - p) * 110}%`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      );
    });

  const questionStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    translate: '-50% -50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: 1 - qExit,
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        scale,
        translate: '0px 91.7px'
      }}
    >
      <div style={{ position: 'relative', width: 1280, height: 208 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 1600,
            height: 560,
            translate: '-50% -50%',
            background:
              'radial-gradient(closest-side, rgba(251,253,252,0.985) 0%, rgba(251,253,252,0.97) 52%, rgba(251,253,252,0.72) 74%, rgba(251,253,252,0) 100%)',
            zIndex: -1,
          }}
        />

        <div style={questionStyle}>
          <div
            style={{
              display: 'flex',
              gap: '0.25em',
              fontFamily: FONT_SANS,
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              color: '#3D534F',
              translate: `${enShiftNow}px ${-qExit * 56}px`,
            }}
          >
            {renderWords('DO YOU HAVE', [9, 16.5, 24])}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: FONT_SANS,
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '0em',
              color: COLORS.ink,
              translate: `${cnShiftNow}px ${qExit * 56}px`,
            }}
          >
            {renderChars('你是否有', [15, 18, 21, 24])}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: adhdX,
            top: 5,
            fontFamily: FONT_SANS,
            fontSize: 208,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            color: COLORS.ink,
            opacity: adhdIn,
            scale: adhdScale,
            transformOrigin: 'left center',
            whiteSpace: 'nowrap',
          }}
        >
          ADHD
        </div>

        <div
          style={{
            position: 'absolute',
            left: 600,
            top: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '0em',
              color: COLORS.tealDeep,
              whiteSpace: 'nowrap',
            }}
          >
            {renderChars('Struggles', Array.from('Struggles').map((_, index) => EN_START + index * EN_STAGGER))}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_SANS,
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: COLORS.tealDeep,
              whiteSpace: 'nowrap',
            }}
          >
            {renderChars('注意力困境', Array.from('注意力困境').map((_, index) => CN_START + index * CN_STAGGER))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
