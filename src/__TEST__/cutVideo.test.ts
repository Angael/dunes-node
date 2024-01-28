import fs from "fs-extra";
import { join } from "path";

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

  beforeEach(() => {
    expect.hasAssertions();
  });

  it.each(["webm", "mp4", "mp3"])("accepts %s", async function (ext) {});

  it("creates file with provided name", async function () {});

  it("created file is shorter than original", async function () {});

  it("created file is exactly as long as specified", async function () {});
});
