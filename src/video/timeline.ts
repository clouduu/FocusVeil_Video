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
  end: f(16.5),
} as const;

export const THIRD = {
  start: f(16.5),
  duration: f(7),
  captionIn: f(18.8),
  end: f(23.5),
} as const;

export const MULTI = {
  start: f(23),
  end: f(30),
} as const;

export const FOURTH = {
  start: f(30),
  tryIn: f(30.3),
  tryOut: f(33),
  logoIn: f(32.5),
  end: f(37),
} as const;

export const FIFTH = {
  start: f(37),
  paperIn: f(37.2),
  masksIn: f(38.2),
  focusTitleIn: f(39.2),
  cursorIn: f(44),
  selectStart: f(45),
  selectEnd: f(46.5),
  passthroughTitleIn: f(43.4),
  end: f(48),
} as const;

export const SIXTH = {
  start: f(48),
  end: f(55.5),
} as const;

export const SEVENTH = {
  start: f(55.5),
  end: f(66.5),
} as const;

export const EIGHTH = {
  start: f(66.5),
  end: f(73),
} as const;

export const TENTH = {
  start: f(73),
  end: f(79),
} as const;

export const NINTH = {
  start: f(79),
  end: f(91),
} as const;

export const VIDEO_DURATION = f(91);

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
