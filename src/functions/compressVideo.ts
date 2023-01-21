import { CompressionOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

/**
 * @returns Promise that resolves when compression ends.
 *
 * @example
 * ```ts
 * import { compressVideo } from '@vanih/dunes-node';
 *
 * const src = './video_in.mp4';
 * const out = './video_out.webm';
 * await compressVideo(src, out, {
 *     compression: 63,
 * });
 * ```
 * @param srcPath Path to existing original video
 * @param outPath Path where compressed video should be saved. Currently only supports webm files.
 * @param options Compression options to use when compressing the video
 *
 * @throws When ffmpeg encounters an error
 */
export async function compressVideo(
  srcPath: string,
  outPath: string,
  options: CompressionOptions
): Promise<void> {
  const args = [
    `-i`,
    srcPath,
    `-vf`,
    `scale=${options.width ?? -1}:${options.height ?? -1}`,
    "-c:v",
    "libvpx-vp9",
    `-crf`,
    `${options.compression}`,
    "-b:v",
    "0",
    outPath,
  ];

  // TODO validate that outpath is a webm

  await runFfmpeg(args, options);
}
