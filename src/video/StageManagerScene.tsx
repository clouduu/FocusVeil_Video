import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS } from './theme';
import { clamp, FPS } from './timeline';

const STAGES = [
  {
    name: 'Todo',
    note: '#FFF3C4',
    rows: ['1. Buy milk 🥛', '2. Reply to Alex ✉️'],
  },
  {
    name: 'Ideas',
    note: '#F3E8FF',
    rows: ['1. Landing page 🎯', '2. Petal icon 🌿'],
  },
  {
    name: 'Groceries',
    note: '#E7F6EC',
    rows: ['1. Oat milk 🥛', '2. Blueberries 🫐'],
  },
];

const Window: React.FC<{ left: number; top: number; width: number; height: number; light?: string }> = ({
  left,
  top,
  width,
  height,
  light = '#F7F9F8',
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
    <div style={{ margin: 18, height: height - 60, borderRadius: 5, background: light }} />
  </div>
);

export const StageManagerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const active = t < 3 ? 0 : t < 6 ? 1 : 2;
  const stage = STAGES[active];
  const enter = interpolate(t, [0, 0.8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: enter, transform: `translateY(${(1 - enter) * 20 + 140}px) scale(1.26)` }}>
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
            <div style={{ position: 'absolute', left: 30, top: 40, display: 'flex', flexDirection: 'column', gap: 56 }}>
              {STAGES.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    width: 120,
                    height: 80,
                    borderRadius: 6,
                    background: '#F5F6F5',
                    border: `2px solid ${i === active ? '#2BB3A6' : '#E5E7EB'}`,
                    padding: 8,
                    boxShadow: i === active ? '0 6px 18px rgba(43,179,166,0.22)' : 'none',
                  }}
                >
                  <div style={{ height: 5, width: 40, borderRadius: 2, background: '#D1D5DB' }} />
                  <div style={{ marginTop: 7, height: 34, borderRadius: 3, background: '#FFFFFF' }} />
                  <div style={{ marginTop: 6, height: 4, width: 60, borderRadius: 2, background: '#E5E7EB' }} />
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', inset: 0, left: 190 }}>
              <Window left={110} top={110} width={560} height={300} light={active === 0 ? '#F7F9F8' : '#EEF4F3'} />
              {active === 1 && <Window left={470} top={240} width={440} height={260} light="#F3EEF9" />}
              {active === 2 && <Window left={380} top={130} width={520} height={340} light="#EAF6EE" />}
            </div>

            <div
              style={{
                position: 'absolute',
                right: active === 0 ? 120 : active === 1 ? 170 : 140,
                top: active === 0 ? 420 : active === 1 ? 380 : 400,
                width: 340,
                minHeight: 220,
                padding: '22px 26px',
                background: stage.note,
                borderRadius: 6,
                boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              }}
            >
              <div style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 700, color: '#3F3A1F' }}>
                {stage.name}
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {stage.rows.map((row) => (
                  <div key={row} style={{ fontFamily: FONT_SANS, fontSize: 19, color: '#4A4324' }}>
                    {row}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MacChrome>
      </div>

      <Logo height={66} style={{ position: 'absolute', left: 72, top: 56 }} />
    </AbsoluteFill>
  );
};
