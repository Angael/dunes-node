export function parseDurationInMs(ffprobeOutput: string): number {
  const durationMatch = ffprobeOutput.match(/Duration: ([\d:.]+)/);
  const durationString = durationMatch && durationMatch[1];
  if (!durationString) {
    throw new Error("couldn't find duration");
  }
  return Math.round(
    durationString
      .split(":")
      .reverse()
      .reduce(
        (acc: number, v: string, i: number) =>
          acc + Number(v) * Math.pow(60, i),
        0
      ) * 1000
  );
}

export function parseDimensions(ffprobeOutput: string) {
  const resMatch = ffprobeOutput.match(/, (\d+)x(\d+)[\s,]/);
  if (!resMatch) {
    throw new Error("couldn't find width and height");
  }

  return {
    width: Number(resMatch[1]),
    height: Number(resMatch[2]),
  };
}

export function parseBitrate(ffprobeOutput: string): number {
  const bitrateMatch = ffprobeOutput.match(/bitrate: (\d+) ([\w/]+)/);
  // const bitrateUnit = bitrateMatch && bitrateMatch[2]; // always kb?
  return Number(bitrateMatch && bitrateMatch[1]);
}
