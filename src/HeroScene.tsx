import type React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AttentionCaption } from './video/AttentionCaption';
import { Backdrop } from './video/Backdrop';
import { BrandMark } from './video/BrandMark';
import { EndLogo } from './video/EndLogo';
import { GlobalNoteCaption } from './video/GlobalNoteCaption';
import { AppStoreScene } from './video/AppStoreScene';
import { ArchiveCaption } from './video/ArchiveCaption';
import { ArchiveScene } from './video/ArchiveScene';
import { StageManagerCaption } from './video/StageManagerCaption';
import { StageManagerScene } from './video/StageManagerScene';
import { GlobalNoteScene } from './video/GlobalNoteScene';
import { MaskFocusCaption } from './video/MaskFocusCaption';
import { MultitaskCaption } from './video/MultitaskCaption';
import { MultitaskScene } from './video/MultitaskScene';
import { MaskFocusScene } from './video/MaskFocusScene';
import { MaskMoveCaption } from './video/MaskMoveCaption';
import { MaskResizeScene } from './video/MaskResizeScene';
import { Cover } from './video/Cover';
import { LineSkipCaption } from './video/LineSkipCaption';
import { ReReadingCaption } from './video/ReReadingCaption';
import { TryCaption } from './video/TryCaption';
import { EIGHTH, FIFTH, FOURTH, FPS, MULTI, NINTH, SECOND, SEVENTH, SIXTH, TENTH, THIRD, T } from './video/timeline';

export const HeroScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Backdrop />
      <Sequence
        name="左上角 logo"
        from={T.captionIn}
        durationInFrames={FOURTH.logoIn - T.captionIn}
      >
        <BrandMark from={0} />
      </Sequence>
      <Cover />

      <Sequence
        name="注意力不集中"
        from={T.captionIn}
        durationInFrames={SECOND.start - T.captionIn}
      >
        <AttentionCaption />
      </Sequence>

      <Sequence
        name="阅读跳行 · 字幕"
        from={SECOND.captionIn}
        durationInFrames={SECOND.end - SECOND.captionIn}
        style={{
          translate: '-620px 0px'
        }}
      >
        <LineSkipCaption />
      </Sequence>

      <Sequence
        name="重复读行 · 字幕"
        from={THIRD.captionIn}
        durationInFrames={THIRD.end - THIRD.captionIn}
        style={{
          translate: '-620px 0px'
        }}
      >
        <ReReadingCaption />
      </Sequence>

      <Sequence
        name="多任务"
        from={MULTI.start}
        durationInFrames={MULTI.end - MULTI.start}
      >
        <Backdrop />
        <MultitaskScene />
      </Sequence>

      <Sequence
        name="多任务 · 字幕"
        from={MULTI.start + 1 * FPS}
        durationInFrames={MULTI.end - MULTI.start - 1 * FPS}
      >
        <MultitaskCaption />
      </Sequence>

      <Sequence
        name="结尾"
        from={FOURTH.start}
        durationInFrames={FOURTH.end - FOURTH.start}
      >
        <Backdrop />
        <Sequence
          name="试试"
          from={FOURTH.tryIn - FOURTH.start}
          durationInFrames={FOURTH.tryOut - FOURTH.tryIn}
        >
          <TryCaption />
        </Sequence>
        <Sequence
          name="Logo"
          from={FOURTH.logoIn - FOURTH.start}
          durationInFrames={FOURTH.end - FOURTH.logoIn}
        >
          <EndLogo />
        </Sequence>
      </Sequence>

      <Sequence
        name="遮罩聚焦"
        from={FIFTH.start}
        durationInFrames={FIFTH.end - FIFTH.start}
      >
        <Backdrop />
        <MaskFocusScene />
      </Sequence>

      <Sequence
        name="遮罩聚焦 · 字幕"
        from={FIFTH.focusTitleIn}
        durationInFrames={FIFTH.passthroughTitleIn - 0.4 - FIFTH.focusTitleIn}
        style={{
          translate: '0px -41.2px'
        }}
      >
        <MaskFocusCaption mode="focus" />
      </Sequence>

      <Sequence
        name="鼠标穿透 · 字幕"
        from={FIFTH.passthroughTitleIn}
        durationInFrames={FIFTH.end - FIFTH.passthroughTitleIn}
        style={{
          translate: '0px -40px'
        }}
      >
        <MaskFocusCaption mode="passthrough" />
      </Sequence>

      <Sequence
        name="遮罩调节"
        from={SIXTH.start}
        durationInFrames={SIXTH.end - SIXTH.start}
      >
        <Backdrop />
        <MaskResizeScene />
      </Sequence>

      <Sequence
        name="移动模式 · 字幕"
        from={SIXTH.start + 9}
        durationInFrames={SIXTH.end - SIXTH.start - 9}
        style={{
          translate: '0px 36.2px'
        }}
      >
        <MaskMoveCaption />
      </Sequence>

      <Sequence
        name="全局便利贴"
        from={SEVENTH.start}
        durationInFrames={SEVENTH.end - SEVENTH.start}
      >
        <Backdrop />
        <GlobalNoteScene />
      </Sequence>

      <Sequence
        name="全局模式 · 字幕"
        from={SEVENTH.start + 9 * FPS}
        durationInFrames={SEVENTH.end - SEVENTH.start - 9 * FPS}
      >
        <GlobalNoteCaption />
      </Sequence>

      <Sequence
        name="分块模式"
        from={EIGHTH.start}
        durationInFrames={EIGHTH.end - EIGHTH.start}
      >
        <Backdrop />
        <StageManagerScene />
      </Sequence>

      <Sequence
        name="分块模式 · 字幕"
        from={EIGHTH.start + 1 * FPS}
        durationInFrames={EIGHTH.end - EIGHTH.start - 1 * FPS}
        style={{
          translate: '0px 70.2px'
        }}
      >
        <StageManagerCaption />
      </Sequence>

      <Sequence
        name="归档便利贴"
        from={TENTH.start}
        durationInFrames={TENTH.end - TENTH.start}
      >
        <Backdrop />
        <ArchiveScene />
      </Sequence>

      <Sequence
        name="归档便利贴 · 字幕"
        from={TENTH.start + 0.6 * FPS}
        durationInFrames={TENTH.end - TENTH.start - 0.6 * FPS}
        style={{
          translate: '0px -61.4px'
        }}
      >
        <ArchiveCaption />
      </Sequence>

      <Sequence
        name="App Store 搜索"
        from={NINTH.start}
        durationInFrames={NINTH.end - NINTH.start}
      >
        <Backdrop />
        <AppStoreScene />
      </Sequence>
    </AbsoluteFill>
  );
};
