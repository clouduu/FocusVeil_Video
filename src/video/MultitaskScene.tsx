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
  { left: 240, top: 90 },
  { left: 350, top: 170 },
  { left: 460, top: 250 },
];

export const MultitaskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const disappear = interpolate(t, [6.6, 7.4], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        translate: '-1012.6px -773.4px'
      }}
    >
      <div style={{ transform: 'scale(1.82) translateY(210px)' }}>
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
            <MacChrome thin>
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
                    width: 340,
                    minHeight: 200,
                    padding: '20px 22px',
                    background: '#F7F9F8',
                    border: '1px solid #E5E7EB',
                    borderRadius: 10,
                    boxShadow: '0 18px 40px rgba(0,0,0,0.10)',
                  }}
                >
                  <div style={{ fontFamily: FONT_SANS, fontSize: 19, fontWeight: 700, color: '#1F2937' }}>
                    {task.label}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {task.rows.map((row) => (
                      <div key={row} style={{ display: 'flex', gap: 9, alignItems: 'center', fontFamily: FONT_SANS, fontSize: 15, color: '#4B5563' }}>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            border: '1.5px solid #C4B5FD',
                            flexShrink: 0,
                          }}
                        />
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
