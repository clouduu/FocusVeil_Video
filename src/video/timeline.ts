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
  duration: f(7.5),
  captionIn: f(18.8),
  end: f(25),
} as const;

export const FOURTH = {
  start: f(25),
  tryIn: f(25.3),
  tryOut: f(28),
  logoIn: f(27.5),
  end: f(33),
} as const;

export const FIFTH = {
  start: f(33),
  paperIn: f(33.2),
  masksIn: f(34.2),
  focusTitleIn: f(35.2),
  cursorIn: f(40),
  selectStart: f(41),
  selectEnd: f(42.5),
  passthroughTitleIn: f(39.4),
  end: f(47),
} as const;

export const SIXTH = {
  start: f(47),
  end: f(57.5),
} as const;

export const SEVENTH = {
  start: f(57.5),
  end: f(73.5),
} as const;

export const EIGHTH = {
  start: f(73.5),
  end: f(82.5),
} as const;

export const NINTH = {
  start: f(82.5),
  end: f(94.5),
} as const;

export const VIDEO_DURATION = f(94.5);

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
