import type React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS, FONT_SERIF } from './theme';
import { FPS } from './timeline';

const STAGES = [
  {
    name: 'Today',
    note: '#FFF3C4',
    rows: ['9:30 Standup', '11:00 Design review'],
  },
  {
    name: 'Work',
    note: '#F3E8FF',
    rows: ['1. Q3 plan', '2. Email Alex'],
  },
  {
    name: 'Reading',
    note: '#E7F6EC',
    rows: ['1. Attention paper', '2. Highlight notes'],
  },
];

const CalendarContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SANS }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>September 2026</span>
      <span style={{ fontSize: 11, color: '#9CA3AF' }}>Month</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 14 }}>
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 34,
            borderRadius: 4,
            background: i === 16 ? '#D9F2EC' : '#F7F9F8',
            color: i === 16 ? '#1B7F74' : '#6B7280',
            fontSize: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: i === 16 ? 700 : 400,
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ padding: '8px 10px', borderRadius: 5, background: '#EAF6F2', fontSize: 11, color: '#1B7F74' }}>
        9:30 · Standup
      </div>
      <div style={{ padding: '8px 10px', borderRadius: 5, background: '#F3EEF9', fontSize: 11, color: '#6D4E9C' }}>
        11:00 · Design review
      </div>
    </div>
  </div>
);

const WorkContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SANS }}>
    <div style={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>Q3 Planning</div>
    <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['Define the Q3 roadmap', 'Review the launch checklist', 'Email Alex about the deck'].map((row, i) => (
        <div key={row} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 12, color: '#4B5563' }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              border: '1.5px solid #C4B5FD',
              background: i === 0 ? '#8B5CF6' : '#FFFFFF',
              flexShrink: 0,
            }}
          />
          {row}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, height: 180, borderRadius: 6, background: '#F7F9F8' }} />
  </div>
);

const ReadingContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SERIF }}>
    <div style={{ fontSize: 17, fontWeight: 600, color: '#1F2937' }}>
      The Limits of Sustained Attention
    </div>
    <div style={{ fontSize: 10, color: '#9CA3AF', margin: '4px 0 14px' }}>
      R. Chen, M. Alvarez · Journal of Attention Science, 2024
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 9, lineHeight: 1.65, color: '#4B5563' }}>
      <div>
        <p style={{ margin: '0 0 8px' }}>
          Attention is a limited resource, allocated across the competing streams of information
          that arrive at any given moment.
        </p>
        <p style={{ margin: '0 0 8px' }}>
          When the demands of a task exceed the capacity available, performance does not degrade
          smoothly, but in a cascade of small failures.
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px' }}>
          Regressions — backward saccades to passages with ambiguous grammar — reveal the ongoing
          calibration of effort.
        </p>
        <p style={{ margin: 0 }}>
          <span style={{ background: 'rgba(168,219,190,0.55)', padding: '1px 2px' }}>
            Comprehension is not simply a matter of decoding sequences
          </span>
          , but of constructing a coherent model of the text.
        </p>
      </div>
    </div>
  </div>
);

const Window: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  children?: React.ReactNode;
}> = ({ left, top, width, height, children }) => (
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
    <div style={{ margin: 18, height: height - 60 }}>{children}</div>
  </div>
);

export const StageManagerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const active = t < 2.3 ? 0 : t < 4.6 ? 1 : 2;
  const stage = STAGES[active];
  const enter = 1;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: enter, transform: `translateY(${(1 - enter) * 20 + 220}px) scale(1.45)` }}>
        <MacChrome>
          <div
            style={{
              width: 1100,
              height: 720,
              position: 'relative',
              overflow: 'hidden',
              background: stage.note,
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
              {active === 0 && (
                <Window left={70} top={80} width={620} height={560}>
                  <CalendarContent />
                </Window>
              )}
              {active === 1 && (
                <Window left={90} top={90} width={620} height={560}>
                  <WorkContent />
                </Window>
              )}
              {active === 2 && (
                <Window left={70} top={80} width={660} height={560}>
                  <ReadingContent />
                </Window>
              )}
            </div>

            <div
              style={{
                position: 'absolute',
                right: 70,
                top: 40,
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
