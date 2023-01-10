import { CompressionOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

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
