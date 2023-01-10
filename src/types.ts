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
  compression: IntRange<0, 64>;
  width?: number;
  height?: number;
} & RunFfmpegOptions;

export type VideoStats = {
  bitrate: number;
  height: number;
  width: number;
  duration: number;
  size: number;
};

export type RunFfmpegOptions = {
  shouldOverwrite?: boolean;
  onStart?: (command: string) => void;
  onProgress?: (data: FfmpegDataRaw) => void;
};

export type FfmpegDataRaw = {
  rawString: string;
  frame: number;
  fps: number;
  q: number;
  size: number;
  time: number;
  bitrate: number;
  speed: number;
};
