import { CutOptions } from "../types";
import { runFfmpeg } from "./ffmpeg-helpers/runFfmpeg";
import { msToHMS } from "./utils/msToHMS";

export const cut = async (
  ffmpegPath: string,
  srcPath: string,
  outPath: string,
  options: CutOptions
) => {
  const { startTimeMs, endTimeMs, precise } = options;

  const timeArgs = [
    "-ss",
    `${msToHMS(startTimeMs)}`,
    "-to",
    `${msToHMS(endTimeMs)}`,
  ];

  const args = [
    ...(!precise ? timeArgs : []),
    "-i",
    srcPath,
    ...(precise ? timeArgs : []),
    "-c",
    "copy",
    outPath,
  ];

  await runFfmpeg(ffmpegPath, args, options);
};
