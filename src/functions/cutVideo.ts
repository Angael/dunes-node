import { CutOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";

export const cutVideo = async (
  srcPath: string,
  outPath: string,
  options: CutOptions
) => {
  const { startTimeMs, endTimeMs } = options;

  const command = [
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

  throw new Error("not implemented yet");

  await runFfmpeg(command, options);
};
