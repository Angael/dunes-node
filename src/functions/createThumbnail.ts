// TODO: Implement
import { ThumbnailOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

export async function createThumbnail(
  srcPath: string,
  outPath: string,
  options: ThumbnailOptions
) {
  const args = [
    `-i`,
    srcPath,
    "-vframes",
    `1`,
    "-an",
    `-s`,
    `${options.width}x${options.height}`,
    "-ss",
    `${options.time ?? 0}`,
    outPath,
  ];

  // TODO validate that outpath is a webm

  await runFfmpeg(args, options);
}
