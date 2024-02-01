export * from "./functions/analyze.type";

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type ThumbnailOptions = {
  width: number;
  height: number;
  time?: number;
} & RunFfmpegOptions;

export type CompressionOptions = {
  width?: number;
  height?: number;
  crf?: IntRange<0, 64>;
  bitrateKbs?: number;
  minBitrateKbs?: number;
  maxBitrateKbs?: number;
  audioBitrateKbs?: number;
} & RunFfmpegOptions;

export type SimpleAnalysisStats = {
  audio?: {
    sampleRate: number;
    channels: number;
  };
  video?: {
    fps: number;
    height: number;
    width: number;
  };
  bitrateKb: number;
  durationMs: number;
  sizeBytes: number;
};

export type RunFfmpegOptions = {
  shouldOverwrite?: boolean;
  onStart?: (command: string) => void;
  onProgress?: (data: FfmpegData) => void;
};

export type FfmpegData = {
  rawString: string;
  frame: number;
  fps: number;
  q: number;
  size: number;
  time: number;
  bitrate: number;
  speed: number;
};

export type CutOptions = {
  startTimeMs: number;
  endTimeMs: number;
  precise?: boolean; // Should recode video to ensure exact start and end time
} & RunFfmpegOptions;
