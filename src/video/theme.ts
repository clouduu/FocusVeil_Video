export const COLORS = {
  bg: '#F4FAF8',
  paper: '#FFFFFF',
  ink: '#0F1F1D',
  inkSoft: '#1C2B28',
  body: '#243430',
  muted: '#6F817E',
  faint: '#A9B8B5',
  teal: '#38B6AE',
  tealDeep: '#22968F',
  rose: '#BF8F96',
  roseDeep: '#8F5F68',
} as const;

export const FONT_SANS =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", sans-serif';

export const FONT_SERIF =
  '"New York", "Iowan Old Style", Charter, "Songti SC", Georgia, "Times New Roman", serif';

// 与 part1-reading.html 一致的背景色，只把浓度降低一点，避免抢字。
export const TINTS = {
  mint: `radial-gradient(1200px 760px at 82% 8%, rgba(168,238,222,.62), transparent 62%),
radial-gradient(900px 620px at 4% 96%, rgba(226,199,246,.42), transparent 62%),
radial-gradient(760px 520px at 6% 4%, rgba(255,255,255,.9), transparent 70%)`,
  blue: `radial-gradient(1200px 760px at 84% 6%, rgba(166,208,246,.62), transparent 62%),
radial-gradient(900px 620px at 2% 94%, rgba(206,228,246,.55), transparent 62%),
radial-gradient(760px 520px at 6% 4%, rgba(255,255,255,.9), transparent 70%)`,
  pink: `radial-gradient(1200px 760px at 80% 8%, rgba(245,193,218,.58), transparent 62%),
radial-gradient(900px 620px at 6% 96%, rgba(240,208,226,.5), transparent 62%),
radial-gradient(760px 520px at 6% 4%, rgba(255,255,255,.9), transparent 70%)`,
} as const;

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";
