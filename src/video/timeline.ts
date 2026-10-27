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
  end: f(17),
} as const;

export const THIRD = {
  start: f(17),
  duration: f(7),
  captionIn: f(18.8),
  end: f(24),
} as const;

export const MULTI = {
  start: f(24),
  end: f(31.5),
} as const;

export const FOURTH = {
  start: f(31.5),
  tryIn: f(31.8),
  tryOut: f(34.5),
  logoIn: f(34),
  end: f(39),
} as const;

export const FIFTH = {
  start: f(39),
  paperIn: f(39.2),
  masksIn: f(40.2),
  focusTitleIn: f(41.2),
  cursorIn: f(46),
  selectStart: f(47),
  selectEnd: f(48.5),
  passthroughTitleIn: f(45.4),
  end: f(50.5),
} as const;

export const SIXTH = {
  start: f(50.5),
  end: f(58.5),
} as const;

export const SEVENTH = {
  start: f(58.5),
  end: f(70),
} as const;

export const EIGHTH = {
  start: f(70),
  end: f(77),
} as const;

export const TENTH = {
  start: f(77),
  end: f(83.5),
} as const;

export const NINTH = {
  start: f(83.5),
  end: f(95.5),
} as const;

export const VIDEO_DURATION = f(95.5);

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
