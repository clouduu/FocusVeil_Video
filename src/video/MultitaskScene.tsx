import type React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from './Logo';
import { MacChrome } from './MacChrome';
import { FONT_SANS, FONT_SERIF } from './theme';
import { clamp, FPS } from './timeline';

const TASKS = [{ label: 'Mail' }, { label: 'Calendar' }, { label: 'Reading' }];

const MailContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SANS }}>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#1F2937' }}>Inbox</div>
    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { from: 'Sarah', subject: 'Re: Q3 planning', time: '9:12' },
        { from: 'Alex', subject: 'Deck feedback', time: '8:40' },
        { from: 'Calendar', subject: 'Standup reminder', time: '8:00' },
      ].map((mail) => (
        <div key={mail.subject} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#E7F2EE', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{mail.from}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{mail.subject}</div>
          </div>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{mail.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const CalendarContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SANS }}>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#1F2937' }}>Today</div>
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
      {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
        <div
          key={`${d}-${i}`}
          style={{
            width: 34,
            height: 40,
            borderRadius: 5,
            background: i === 2 ? '#D9F2EC' : '#F7F9F8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: i === 2 ? '#1B7F74' : '#6B7280',
          }}
        >
          <span>{d}</span>
          <span style={{ fontWeight: 700 }}>{19 + i}</span>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ padding: '6px 9px', borderRadius: 4, background: '#EAF6F2', fontSize: 11, color: '#1B7F74' }}>
        9:30 · Standup
      </div>
      <div style={{ padding: '6px 9px', borderRadius: 4, background: '#F3EEF9', fontSize: 11, color: '#6D4E9C' }}>
        11:00 · Design review
      </div>
    </div>
  </div>
);

const ReadingContent: React.FC = () => (
  <div style={{ fontFamily: FONT_SERIF }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: '#1F2937' }}>
      The Limits of Sustained Attention
    </div>
    <div style={{ fontSize: 9, color: '#9CA3AF', margin: '3px 0 10px' }}>R. Chen · 2024</div>
    <p style={{ margin: '0 0 7px', fontSize: 9, lineHeight: 1.6, color: '#4B5563' }}>
      Attention is a limited resource, allocated across the competing streams of information that
      arrive at any given moment.
    </p>
    <p style={{ margin: 0, fontSize: 9, lineHeight: 1.6, color: '#4B5563' }}>
      <span style={{ background: 'rgba(168,219,190,0.55)', padding: '1px 2px' }}>
        Comprehension is not simply a matter of decoding sequences
      </span>
      , but of constructing a coherent model of the text.
    </p>
  </div>
);

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
        translate: '-1063.6px -879.4px'
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
                {i === 0 && <MailContent />}
                {i === 1 && <CalendarContent />}
                {i === 2 && <ReadingContent />}
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
