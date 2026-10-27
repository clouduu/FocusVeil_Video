export const FPS = 30;

const f = (seconds: number) => Math.round(seconds * FPS);

// 第一屏 10s：0–3.5 标题动效，3.5–4.0 退场，4.0–8.0 推镜，7.2 起字幕，余下留白。
export const T = {
  paperIn: f(0.2),
  logoIn: f(0.4),

  logoOut: f(4.4),
  logoOutEnd: f(4.9),
  titleOut: f(4.4),
  titleOutEnd: f(4.9),

  zoomStart: f(4.9),
  wobbleStart: f(4.0),
  wobbleFadeEnd: f(4.1),
  wobbleStop: f(10),

  captionIn: f(7.2),

  duration: f(10),
} as const;

// 第二段：在正文上展示阅读跳行。
export const SECOND = {
  start: f(10),
  duration: f(8),
  captionIn: f(12.3),
  end: f(17.5),
} as const;

export const THIRD = {
  start: f(17.5),
  duration: f(8.5),
  captionIn: f(18.8),
  end: f(26),
} as const;

export const FOURTH = {
  start: f(26),
  tryIn: f(26.3),
  tryOut: f(29),
  logoIn: f(28.5),
  end: f(34),
} as const;

export const FIFTH = {
  start: f(34),
  paperIn: f(34.2),
  masksIn: f(35.2),
  focusTitleIn: f(36.2),
  cursorIn: f(41),
  selectStart: f(42),
  selectEnd: f(43.5),
  passthroughTitleIn: f(40.4),
  end: f(48),
} as const;

export const SIXTH = {
  start: f(48),
  end: f(60),
} as const;

export const SEVENTH = {
  start: f(60),
  end: f(76),
} as const;

export const EIGHTH = {
  start: f(76),
  end: f(90),
} as const;

export const VIDEO_DURATION = f(90);

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
