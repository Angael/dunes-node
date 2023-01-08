import child from "child_process";
import ffmpegStatic from "ffmpeg-static";
import { RunFfmpegOptions } from "../../types";
import { parseDataString } from "./parseDataString";

if (!ffmpegStatic) {
  throw new Error("ffmpeg library failed to load");
}

export const runFfmpeg = (
  args: string[],
  { onStart, onProgress, shouldOverwrite = false }: RunFfmpegOptions
): Promise<void> =>
  new Promise((res, rej) => {
    if (onStart) {
      onStart("ffmpeg " + args.join(" "));
    }

    const ffmpegConsole = child.spawn(ffmpegStatic as string, args, {
      windowsVerbatimArguments: true,
    });

    ffmpegConsole.stderr.on("data", (data: Buffer) => {
      const text = data.toString();

      if (text.includes("Overwrite? [y/N]")) {
        ffmpegConsole.stdin.write(shouldOverwrite ? "y\n" : "n\n");
        ffmpegConsole.kill(1);
      }

      if (onProgress) {
        onProgress(parseDataString(text));
      }
    });

    ffmpegConsole.on("close", (code: any) => {
      if (code === 1) {
        rej();
      } else {
        res();
      }
    });
  });
