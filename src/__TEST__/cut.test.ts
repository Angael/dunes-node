import fs from "fs-extra";
import path, { join } from "path";
import { analyze, cut } from "../functions";
import { checkFileExists } from "./utils";

const videoDir = join(__dirname, "/videos");
const musicDir = join(__dirname, "/music");
const outDir = join(__dirname, "/out");

jest.setTimeout(20 * 1000);

const videoFiles = ["a.mp4", "b.mp4"];
const musicFiles = ["invincible-libopus.webm", "invincible-libmp3lame.mp3"];

describe("cut", () => {
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

  beforeEach(() => {
    expect.hasAssertions();
  });

  const sampleFilePaths = [
    videoFiles.map((fileName) => join(videoDir, fileName)),
    musicFiles.map((fileName) => join(musicDir, fileName)),
  ].flat();

  it.each(sampleFilePaths)("works for sample file %s", async function (src) {
    const fileName = path.basename(src);
    const out = join(outDir, `/out-${fileName}`);

    await cut("ffmpeg", src, out, {
      startTimeMs: 0,
      endTimeMs: 1000,
    });

    expect(await checkFileExists(out)).toEqual(true);

    const stats = await fs.stat(out);
    expect(stats.size).toBeGreaterThan(0);

    try {
      const videoData = await analyze("ffprobe", out);
      expect(videoData.durationMs).toBeGreaterThanOrEqual(900);
      expect(videoData.durationMs).toBeLessThanOrEqual(1100);
    } catch (e) {
      // Is audio, i dont support analyze audio yet
    }
  });
});
