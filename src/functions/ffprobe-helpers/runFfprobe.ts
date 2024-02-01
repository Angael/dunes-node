import { exec } from "child_process";
import { FfprobeOutput } from "../analyze.type";

export function runFfprobe(
  ffprobePath: string,
  filepath: string
): Promise<FfprobeOutput> {
  return new Promise((resolve, reject) => {
    exec(
      `${ffprobePath} -v quiet -print_format json -show_format -show_streams "${filepath}"`,
      {},
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          // Temporary hack, should validate?
          resolve(JSON.parse(stdout));
        }
      }
    );
  });
}
