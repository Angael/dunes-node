import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";
import { VideoStats } from "../types";
import fs from "fs";

export async function analyzeVideo(path: string): Promise<VideoStats> {
  const { streams } = await ffprobe(path, { path: ffprobeStatic.path });

  const size = await new Promise<number>((resolve, reject) => {
    fs.stat(path, (err, stats) => (err ? reject(err) : resolve(stats.size)));
  });

  const videoStreams = streams.filter(
    (stream) => stream.codec_type === "video"
  );

  if (videoStreams.length !== 1) {
    throw new Error(`${videoStreams.length} video streams found`);
  }

  const videoStream = streams[0];

  return {
    bitrate: Number(videoStream.bit_rate),
    duration: Number(videoStream.duration),
    height: Number(videoStream.height),
    width: Number(videoStream.width),
    size,
  };
}
