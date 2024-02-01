import { VideoStats } from "../types";
import { runFfprobe } from "./ffprobe-helpers/runFfprobe";
import { stat } from "fs";
import {
  parseBitrate,
  parseDimensions,
  parseDurationInMs,
} from "./ffprobe-helpers/parseFfprobe";

function getFileSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.size);
      }
    });
  });
}

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
export async function analyze(path: string): Promise<VideoStats> {
  const [ffprobeOutput, sizeBytes] = await Promise.all([
    runFfprobe(path),
    getFileSize(path),
  ]);

  const durationMs = parseDurationInMs(ffprobeOutput);

  const bitrateKb = parseBitrate(ffprobeOutput);

  const { width, height } = parseDimensions(ffprobeOutput);

  return {
    width,
    height,
    durationMs,
    bitrateKb,
    sizeBytes,
  };
}
