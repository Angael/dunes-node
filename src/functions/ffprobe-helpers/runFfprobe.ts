import ffprobeStatic from "ffprobe-static";
import { exec } from "child_process";

export function runFfprobe(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `${ffprobeStatic.path} -hide_banner -i ${filepath}`,
      {},
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stderr);
        }
      }
    );
  });
}
