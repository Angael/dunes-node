import { analyze } from "../functions";
import { SimpleAnalysisStats } from "../types";

const ffprobePath = "ffprobe";

describe("analyze", () => {
  it("should return consistent results - vid a", async function () {
    const analysis = await analyze(ffprobePath, "src/__TEST__/videos/a.mp4");

    expect(analysis.bitrateKb).toBeGreaterThanOrEqual(4875);
    expect(analysis.bitrateKb).toBeLessThanOrEqual(4885);
    expect(analysis.durationMs).toBeGreaterThanOrEqual(29710);
    expect(analysis.durationMs).toBeLessThanOrEqual(29725);
    expect(analysis).toMatchObject({
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
    });
  });

  it("should return consistent results - vid b", async function () {
    const analysis = await analyze(ffprobePath, "src/__TEST__/videos/b.mp4");

    expect(analysis.bitrateKb).toBeGreaterThanOrEqual(52);
    expect(analysis.bitrateKb).toBeLessThanOrEqual(53);
    expect(analysis.durationMs).toBeGreaterThanOrEqual(7900);
    expect(analysis.durationMs).toBeLessThanOrEqual(8100);
    expect(analysis).toMatchObject({
      video: {
        height: 180,
        width: 240,
        fps: 30,
      },
      sizeBytes: 52589,
    });
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
