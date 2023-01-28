import { analyzeVideo, compressVideo } from "../functions";
import fs from "fs-extra";
import { join } from "path";

const videoDir = join(__dirname, "/videos");
const outDir = join(videoDir + "/out");

function checkFileExists(filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filepath, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
}

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
      compressVideo(src, out, {
        crf: 63,
      })
    ).rejects.toBeTruthy();
  });

  it("creates file with provided name", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test2.webm");
    await compressVideo(src, out, {
      crf: 63,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("creates file with bitrate", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test3.webm");
    await compressVideo(src, out, {
      bitrateKbs: 300,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("works with Constrained Quality", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test Constrained Quality.webm");
    await compressVideo(src, out, {
      bitrateKbs: 100,
      crf: 0,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("works with Variable Bitrate", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b-test Variable Bitrate.webm");
    await compressVideo(src, out, {
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
    await compressVideo(src, out, {
      crf: 63,
    });

    const stats = await analyzeVideo(out);

    expect(stats.sizeBytes).toBeTruthy();
    expect(stats.width).toBeTruthy();
    expect(stats.height).toBeTruthy();
    expect(stats.bitrateKb).toBeTruthy();
    expect(stats.durationMs).toBeTruthy();
  });
});
