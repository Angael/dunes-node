import { CutOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

export const cut = async (
  srcPath: string,
  outPath: string,
  options: CutOptions
) => {
  const { startTimeMs, endTimeMs } = options;

  const args = [
    "-ss",
    `${startTimeMs / 1000}`,
    "-i",
    srcPath,
    "-to",
    `${endTimeMs / 1000}`,
    "-c",
    "copy",
    outPath,
  ];

  await runFfmpeg(args, options);
};
