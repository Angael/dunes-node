import { analyze } from "../functions";
import { SimpleAnalysisStats } from "../types";

const ffprobePath = "ffprobe";

describe("analyze", () => {
  it("should return consistent results - vid a", async function () {
    expect(await analyze(ffprobePath, "src/__TEST__/videos/a.mp4")).toEqual({
      bitrateKb: 4879.678,
      durationMs: 29718,
      audio: {
        channels: 2,
        sampleRate: 48000,
      },
      video: {
        height: 1080,
        width: 608,
        fps: 30,
      },
      sizeBytes: 18126784,
    } satisfies SimpleAnalysisStats);
  });

  it("should return consistent results - vid b", async function () {
    expect(await analyze(ffprobePath, "src/__TEST__/videos/b.mp4")).toEqual({
      bitrateKb: 52.589,
      durationMs: 8000,
      video: {
        height: 180,
        width: 240,
        fps: 30,
      },
      sizeBytes: 52589,
    } satisfies SimpleAnalysisStats);
  });

  it.each([
    "src/__TEST__/videos/a.mp4",
    "src/__TEST__/videos/b.mp4",
    "src/__TEST__/videos/c.mp4",
    "src/__TEST__/videos/d.mp4",
  ])("bitrate and duration is never NaN", async function (path) {
    // This used to happen with ffprobe npm library
    const result = await analyze(ffprobePath, path);
    expect(result.bitrateKb).not.toBeNaN();
    expect(result.durationMs).not.toBeNaN();
  });
});
