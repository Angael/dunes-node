import { createThumbnail } from "../functions";
import fs from "fs-extra";
import { join } from "path";

const videoDir = join(__dirname, "/videos");
const outDir = join(videoDir + "/thumbnails");

function checkFileExists(filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filepath, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
}

jest.setTimeout(20 * 1000);

describe("createThumbnail", () => {
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
    const out = join(outDir, "/b-test1.webp");
    await createThumbnail(src, out, {
      width: 32,
      height: 32,
    });

    const exists = await checkFileExists(out);

    expect(exists).toEqual(true);
  });
});
