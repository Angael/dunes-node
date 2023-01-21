// TODO: Implement
import { ThumbnailOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

/**
 * @returns Promise that resolves when thumbnail is created
 *
 * @throws When ffmpeg encounters error
 *
 * @param srcPath Path to existing original video
 * @param outPath Path to webp thumbnail that you want to create
 * @param options Options for creating thumbnail
 *
 * @example
 * ```ts
 * import { createThumbnail } from '@vanih/dunes-node';
 *
 * const src = './video_in.mp4';
 * const out = './video_out.webp';
 * await createThumbnail(src, out, {
 *   width: 32,
 *   height: 32,
 * });
 * ```
 *
 */
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
