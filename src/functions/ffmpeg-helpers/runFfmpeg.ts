import child from "child_process";
import { RunFfmpegOptions } from "../../types";
import { parseDataString } from "./parseDataString";

export const runFfmpeg = (
  ffmpegPath: string,
  args: string[],
  { onStart, onProgress, shouldOverwrite = false }: RunFfmpegOptions
): Promise<void> =>
  new Promise((res, rej) => {
    if (onStart) {
      onStart("ffmpeg " + args.join(" "));
    }

    const ffmpegConsole = child.spawn(ffmpegPath, args);

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
