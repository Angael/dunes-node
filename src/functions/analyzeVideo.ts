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

export async function analyzeVideo(path: string): Promise<VideoStats> {
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
