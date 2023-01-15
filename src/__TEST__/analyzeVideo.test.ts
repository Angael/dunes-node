import { analyzeVideo } from "../functions";
import { VideoStats } from "../types";

describe("analyzeVideo", () => {
  it("should return consistent results - vid a", async function () {
    expect(await analyzeVideo("src/__TEST__/videos/a.mp4")).toEqual({
      bitrateKb: 4879,
      durationMs: 29720,
      height: 1080,
      width: 608,
      sizeBytes: 18126784,
    } satisfies VideoStats);
  });

  it("should return consistent results - vid b", async function () {
    expect(await analyzeVideo("src/__TEST__/videos/b.mp4")).toEqual({
      bitrateKb: 52,
      durationMs: 8000,
      height: 180,
      width: 240,
      sizeBytes: 52589,
    } satisfies VideoStats);
  });

  it.each([
    "src/__TEST__/videos/a.mp4",
    "src/__TEST__/videos/b.mp4",
    "src/__TEST__/videos/c.mp4",
    "src/__TEST__/videos/d.mp4",
  ])("bitrate and duration is never NaN", async function (path) {
    // This used to happen with ffprobe npm library
    const result = await analyzeVideo(path);
    expect(result.bitrateKb).not.toBeNaN();
    expect(result.durationMs).not.toBeNaN();
  });
});
