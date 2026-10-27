import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS } from './theme';
import { clamp, FPS } from './timeline';

const TASKS = [
  { label: 'Mail', note: '#FFF3C4', rows: ['Reply to Sarah', 'Invoice #204'] },
  { label: 'Calendar', note: '#E7F6EC', rows: ['9:30 Standup', '11:00 Review'] },
  { label: 'Reading', note: '#F3E8FF', rows: ['Attention paper', 'Highlight notes'] },
];

const POS = [
  { left: 220, top: 70 },
  { left: 400, top: 180 },
  { left: 580, top: 290 },
];

export const MultitaskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const disappear = interpolate(t, [6.6, 7.4], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: 'scale(1.45) translateY(170px)' }}>
      {TASKS.map((task, i) => {
        const enter = interpolate(t, [0.3 + i * 0.8, 1.0 + i * 0.8], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            key={task.label}
            style={{
              position: 'absolute',
              left: POS[i].left,
              top: POS[i].top,
              opacity: enter * disappear,
              transform: `translateY(${(1 - enter) * 26}px) scale(${0.96 + enter * 0.04})`,
            }}
          >
            <MacChrome>
              <div
                style={{
                  width: 520,
                  height: 300,
                  background: '#FFFFFF',
                  padding: '22px 24px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 300,
                    minHeight: 190,
                    padding: '20px 22px',
                    background: task.note,
                    borderRadius: 6,
                    boxShadow: '0 18px 40px rgba(0,0,0,0.14)',
                  }}
                >
                  <div style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 700, color: '#3F3A1F' }}>
                    {task.label}
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {task.rows.map((row) => (
                      <div key={row} style={{ fontFamily: FONT_SANS, fontSize: 16, color: '#4A4324' }}>
                        {row}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MacChrome>
          </div>
        );
      })}
      </div>

      <Logo height={66} style={{ position: 'absolute', left: 72, top: 56 }} />
    </AbsoluteFill>
  );
};
