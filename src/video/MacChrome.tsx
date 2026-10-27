import type React from 'react';
import { Img, staticFile } from 'remotion';
import { FONT_SANS } from './theme';

export const MacChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        background: '#1A202C',
        padding: '10px 10px 14px',
        borderRadius: 12,
        boxShadow: '0 40px 110px rgba(15,40,35,0.35)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 30,
          padding: '0 14px',
          background: 'rgba(246,246,246,0.96)',
          borderRadius: '6px 6px 0 0',
          fontFamily: FONT_SANS,
        }}
      >
        <span style={{ fontSize: 14, color: '#111827', lineHeight: 1 }}></span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#111827', marginLeft: 12 }}>
          FocusVeil
        </span>
        <div style={{ display: 'flex', gap: 14, marginLeft: 20, fontSize: 10, color: '#4B5563' }}>
          {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            fontSize: 10,
            color: '#4B5563',
          }}
        >
          <Img
            src={staticFile('menubar-logo.webp')}
            style={{
              width: 16,
              height: 16,
              display: 'block',
              translate: '-88.7px 1px'
            }}
          />
          <span style={{ fontSize: 11 }}>≈</span>
          <span
            style={{
              display: 'inline-block',
              width: 18,
              height: 9,
              border: '1px solid #4B5563',
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 1,
                top: 1,
                bottom: 1,
                width: 12,
                background: '#4B5563',
                borderRadius: 1,
              }}
            />
          </span>
          <span>9:41</span>
        </div>
      </div>
      <div style={{ background: '#FFFDF9', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
