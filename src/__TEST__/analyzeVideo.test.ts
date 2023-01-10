import { analyzeVideo } from "../functions";

describe("analyzeVideo", () => {
  it("should return consistent results - vid a", async function () {
    expect(await analyzeVideo("src/__TEST__/videos/a.mp4")).toEqual({
      bitrate: 4746175,
      duration: 29.7,
      height: 1080,
      width: 608,
      size: 18126784,
    });
  });
  it("should return consistent results - vid b", async function () {
    expect(await analyzeVideo("src/__TEST__/videos/b.mp4")).toEqual({
      bitrate: 48830,
      duration: 8,
      height: 180,
      width: 240,
      size: 52589,
    });
  });
});
