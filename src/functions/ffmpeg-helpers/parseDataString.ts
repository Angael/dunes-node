import { FfmpegData } from "../../types";

const bitrateMultipliers = new Map<string, number>([
  ["kbits/s", 1000],
  ["mbits/s", 1000000],
  ["mbps", 1000000],
  ["bps", 1],
  ["bits/s", 1],
]);

const getBitrateToNumber = (match: RegExpMatchArray): number => {
  if (match[0] === "N/A") {
    return 0;
  } else if (!isNaN(Number(match[2])) && match[3]) {
    const number = Number(match[2]);
    const unit = match[3];

    const multiplier = bitrateMultipliers.get(unit.toLowerCase()) ?? 1;

    return number * multiplier;
  } else {
    return 0;
  }
};

const sizeMultipliers = new Map<string, number>([
  ["b", 1],
  ["kb", 1000],
  ["mb", 1000000],
  ["gb", 1000000000],
  ["tb", 1000000000000],
]);

const getSizeToNumber = (match: RegExpMatchArray): number => {
  if (!isNaN(Number(match[1])) && match[2]) {
    const number = Number(match[1]);
    const unit = match[2];

    const multiplier = sizeMultipliers.get(unit.toLowerCase()) ?? 1;

    return number * multiplier;
  } else {
    return 0;
  }
};

export const parseDataString = (str: string): FfmpegData => {
  const frameMatch = str.match(/frame=\s*(\d+)/);
  const frame = Number(frameMatch?.[1]) || 0;

  const fpsMatch = str.match(/fps=\s*([\d.]+)/);
  const fps = Number(fpsMatch?.[1]) || 0;

  const qMatch = str.match(/q=\s*([\d.]+)/);
  const q = Number(qMatch?.[1]) || 0;

  const sizeMatch = str.match(/size=\s*(\d+)(\w+)/);
  const size = sizeMatch ? getSizeToNumber(sizeMatch) : 0; // 256kB

  // 00:00:04.47
  const timeMatch = str.match(/time=([\d:.]+)/);
  const timeString = timeMatch?.[1] ?? "0";
  const timeInSeconds = timeString
    .split(":")
    .reverse()
    .reduce((acc, v, i) => acc + Number(v) * Math.pow(60, i), 0);

  const bitrateMatch = str.match(/bitrate=\s*(([\d.]+)(\w+\/s))|(N\/A)/);
  const bitrate = bitrateMatch ? getBitrateToNumber(bitrateMatch) : 0;

  const speedMatch = str.match(/speed=\s*([\d.]+)x/);
  const speed = Number(speedMatch?.[1]) || 0;

  return {
    rawString: str,
    frame,
    fps,
    q,
    bitrate,
    size,
    speed,
    time: timeInSeconds,
  };
};
