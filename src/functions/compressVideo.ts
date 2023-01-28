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
 *     crf: 63,
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
    const ensureDisible2 = (num: number | undefined) =>
      num && (num % 2 ? num + 1 : num);

    const width = Math.round(ensureDisible2(options.width) ?? -1);
    const height = Math.round(ensureDisible2(options.height) ?? -1);

    args.push(`-vf`, `scale=${width}:${height}`);
  }

  args.push("-c:v", "libvpx-vp9");

  if (options.minBitrateKbs) {
    args.push(`-minrate`, `${Math.round(options.minBitrateKbs)}K`);
  }
  if (options.maxBitrateKbs) {
    args.push(`-maxrate`, `${Math.round(options.maxBitrateKbs)}K`);
  }

  if (options.crf !== undefined) {
    args.push(`-crf`, `${options.crf}`, "-b:v", "0");

    if (!options.bitrateKbs) {
      args.push("-b:v", "0");
    }
  }

  if (options.bitrateKbs) {
    args.push("-b:v", Math.round(options.bitrateKbs) + "K");
  }

  args.push(outPath);

  await runFfmpeg(args, options);
}
