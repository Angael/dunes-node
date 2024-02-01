import ffprobeStatic from "ffprobe-static";
import { exec } from "child_process";
import { FfprobeOutput } from "../analyze.type";

export function runFfprobe(filepath: string): Promise<FfprobeOutput> {
  return new Promise((resolve, reject) => {
    exec(
      `${ffprobeStatic.path} -v quiet -print_format json -show_format -show_streams "${filepath}"`,
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
