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

  it("creates file with provided name", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b.mp4");
    await compressVideo(src, out, {
      compression: 63,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });

  it("creates working video", async function () {
    const src = join(videoDir, "/b.mp4");
    const out = join(outDir, "/b.mp4");
    await compressVideo(src, out, {
      compression: 63,
    });

    const stats = await analyzeVideo(out);

    expect(stats.size).toBeTruthy();
    expect(stats.width).toBeTruthy();
    expect(stats.height).toBeTruthy();
    expect(stats.bitrate).toBeTruthy();
    expect(stats.duration).toBeTruthy();
  });
});
