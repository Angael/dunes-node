import { CompressionOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";
import path from "path";

/**
 * @returns Promise that resolves when compression ends.
 *
 * @example Create compressed copy of video, with the worst possible quality and best size. Resolution is kept original
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
  if (path.extname(outPath) !== ".webm") {
    throw new Error("Extension must be webm");
  }

  const args = [`-i`, srcPath];

  if (options.width || options.height) {
    args.push(`-vf`, `scale=${options.width ?? -1}:${options.height ?? -1}`);
  }

  args.push("-c:v", "libvpx-vp9");

  if (options.compression) {
    args.push(`-crf`, `${options.compression}`, "-b:v", "0");
  } else if (options.bitrateKbs) {
    const bitrate: string = Math.round(options.bitrateKbs) + "K";
    args.push("-b:v", bitrate);
  }

  args.push(outPath);

  await runFfmpeg(args, options);
}
