import { analyze, compressVideo } from "../functions";
import fs from "fs-extra";
import { join } from "path";
import { checkFileExists } from "./utils";

const ffmpegPath = "ffmpeg";
const ffprobePath = "ffprobe";

const videoDir = join(__dirname, "/videos");
const outDir = join(videoDir + "/out");

jest.setTimeout(20 * 1000);

describe("compressVideo", () => {
  beforeAll(() => {
    fs.ensureDirSync(outDir);
    fs.emptyDirSync(outDir);
  });

  afterEach(() => {
    fs.emptyDirSync(outDir);
  });

  afterAll(() => {
    fs.rmdirSync(outDir);
  });

  it("will throw when out is not webm file", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test1.mp4");

    await expect(
      compressVideo(ffmpegPath, src, out, {
        crf: 63,
      })
    ).rejects.toBeTruthy();
  });

  it("creates file with provided name", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test2.webm");
    await compressVideo(ffmpegPath, src, out, {
      crf: 63,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("creates file with bitrate", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test3.webm");
    await compressVideo(ffmpegPath, src, out, {
      bitrateKbs: 300,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("works with Constrained Quality", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test Constrained Quality.webm");
    await compressVideo(ffmpegPath, src, out, {
      bitrateKbs: 100,
      crf: 0,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("works with Variable Bitrate", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test Variable Bitrate.webm");
    await compressVideo(ffmpegPath, src, out, {
      minBitrateKbs: 100,
      maxBitrateKbs: 200,
      bitrateKbs: 150,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("creates working video", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test4.webm");
    await compressVideo(ffmpegPath, src, out, {
      crf: 63,
    });

    const stats = await analyze(ffprobePath, out);

    expect(stats.sizeBytes).toBeTruthy();
    expect(stats.video?.width).toBeTruthy();
    expect(stats.video?.height).toBeTruthy();
    expect(stats.bitrateKb).toBeTruthy();
    expect(stats.durationMs).toBeTruthy();
  });
});
