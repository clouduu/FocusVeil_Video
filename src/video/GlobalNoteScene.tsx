import type React from 'react';
import { MacOSCursor } from '@remotion/mac-cursors';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { FONT_SANS } from './theme';
import { clamp, FPS } from './timeline';
import { MacChrome } from './MacChrome';

const Window: React.FC<{ left: number; top: number; width: number; height: number }> = ({
  left,
  top,
  width,
  height,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      background: '#FFFFFF',
      borderRadius: 8,
      boxShadow: '0 20px 50px rgba(20,50,45,0.10)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: 24,
        background: '#F3F5F4',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        paddingLeft: 10,
      }}
    >
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
      ))}
    </div>
    <div
      style={{
        margin: 18,
        height: height - 60,
        borderRadius: 5,
        background: '#F7F9F8',
      }}
    />
  </div>
);

const TODO_ROWS = [
  { text: '1. Buy milk 🥛', at: 0.35 },
  { text: '2. Reply to Alex ✉️', at: 0.62 },
  { text: '3. Finish the deck 📊', at: 0.82 },
];

export const GlobalNoteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const zoom = interpolate(t, [0, 1.4], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const pop = interpolate(t, [1.4, 1.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const noteIn = interpolate(t, [3.6, 4.1], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const type = interpolate(t, [4.1, 6.8], [0, 1], clamp);
  const desktop = interpolate(t, [6.8, 9.2], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const cursorX = interpolate(t, [0.7, 1.4, 3.2], [1480, 1560, 1760], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(t, [0.7, 1.4, 3.2], [260, 180, 460], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorIn = interpolate(t, [0.7, 0.9], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          transform: `translate(${zoom * 170}px, ${zoom * 50}px) scale(${1 + zoom * 0.85})`,
          transformOrigin: '100% 0%',
        }}
      >
        <MacChrome>
          <div
            style={{
              width: 1100,
              height: 720,
              position: 'relative',
              overflow: 'hidden',
              background: '#FFFFFF',
            }}
          >
            <Window left={140} top={110} width={520} height={300} />
            <Window left={120} top={460} width={380} height={210} />
            <Window left={360} top={170} width={600} height={320} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#EDE7F6',
                transform: `translateX(${(1 - desktop) * 100}%)`,
              }}
            >
              <Window left={220} top={120} width={560} height={300} />
              <Window left={460} top={440} width={440} height={230} />
            </div>
          </div>
        </MacChrome>
      </div>

      <Img
        src={staticFile('menu-panel.webp')}
        style={{
          position: 'absolute',
          right: 250,
          top: 110,
          width: 360,
          opacity: pop * (1 - interpolate(t, [3.2, 3.5], [0, 1], clamp)),
          transform: `translateY(${(1 - pop) * 12}px)`,
          transformOrigin: '100% 0%',
          filter: 'drop-shadow(0 20px 40px rgba(15,40,35,0.28))',
          scale: 1.619,
          translate: '-62.6px 190.2px'
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 720,
          top: 360,
          width: 380,
          minHeight: 300,
          padding: '26px 30px',
          background: '#FFF3C4',
          borderRadius: 6,
          boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
          opacity: noteIn,
          transform: `translateY(${(1 - noteIn) * 22}px)`,
        }}
      >
        <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: '#3F3A1F' }}>
          Todo
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TODO_ROWS.map((row) => {
            const show = interpolate(type, [row.at, row.at + 0.1], [0, 1], clamp);
            return (
              <div
                key={row.text}
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 21,
                  color: '#4A4324',
                  opacity: show,
                  transform: `translateY(${(1 - show) * 6}px)`,
                }}
              >
                {row.text}
              </div>
            );
          })}
        </div>
      </div>

      <MacOSCursor
        cursor="default"
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          width: 52,
          height: 52,
          opacity: cursorIn,
          translate: '-240.6px 73.5px'
        }}
      />

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
