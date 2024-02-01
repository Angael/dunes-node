import { SimpleAnalysisStats } from "../types";
import { runFfprobe } from "./ffprobe-helpers/runFfprobe";

/**
 * @param path Path to video
 *
 * @returns Promise with video stats of video from supplied path.
 *
 * @example
 * ```ts
 * import { analyzeVideo } from '@vanih/dunes-node';
 *
 * const result = await analyzeVideo('./video.mp4');
 * ```
 */
export async function analyze(path: string): Promise<SimpleAnalysisStats> {
  const { streams, format } = await runFfprobe(path);

  const videoStream = streams.find((stream) => stream.codec_type === "video");
  const video = videoStream
    ? {
        width: videoStream.width!,
        height: videoStream.height!,
        fps: parseInt(videoStream.r_frame_rate, 10),
      }
    : undefined;

  const audioStream = streams.find((stream) => stream.codec_type === "audio");
  const audio = audioStream
    ? {
        sampleRate: parseInt(audioStream.sample_rate!, 10),
        channels: audioStream.channels!,
      }
    : undefined;

  return {
    video,
    audio,
    durationMs: Number(format.duration) * 1000,
    bitrateKb: parseInt(format.bit_rate, 10) / 1000,
    sizeBytes: parseInt(format.size, 10),
  };
}
